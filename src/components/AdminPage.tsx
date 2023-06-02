import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import AddLinkForm from "./AddLinkForm";
import LinkList from "./LinkList";
import { db } from "../firebase";
import { LinkType } from "../types";

const AdminPage: React.FC = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  const authContext = useContext(AuthContext);
  const user = authContext?.currentUser;

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data()?.username || null);
        }
      }
    };
    const fetchData = async () => {
      const q = query(
        collection(db, "links"),
        where("userId", "==", user?.uid),
        orderBy("order")
      );

      const querySnapshot = await getDocs(q);
      const fetchedLinks = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as LinkType;
      });

      setLinks(fetchedLinks);
    };

    if (user) {
      fetchData();
      fetchUsername();
    }
  }, [user]);

  const getMaxOrder = (links: LinkType[]): number => {
    if (links.length === 0) {
      return 0;
    }
    let maxOrder = 0;
    for (const link of links) {
      if (link.order > maxOrder) {
        maxOrder = link.order;
      }
    }
    return maxOrder;
  };

  const handleAddLink = async (title: string, url: string) => {
    const newLink = {
      title,
      url,
      timestamp: serverTimestamp(),
      userId: user?.uid,
      isActive: true,
      order: getMaxOrder(links) + 1,
    } as LinkType;

    const docRef = doc(collection(db, "links"));
    await setDoc(docRef, newLink);

    setLinks((prevLinks) => [newLink, ...prevLinks]);
  };

  return (
    <div>
      <AddLinkForm onAddLink={handleAddLink} />
      <LinkList links={links} setLinks={setLinks} />
      {user && (
        <a href={`/${username}`} target="_blank" rel="noopener noreferrer">
          Open My Links
        </a>
      )}
    </div>
  );
};

export default AdminPage;
