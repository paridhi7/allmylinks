import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { LinkType } from "../types";
import DisplayLink from "./DisplayLink";

const UserPage = () => {
  const { username } = useParams();
  const [links, setLinks] = useState<LinkType[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userId = userSnapshot.docs[0].id;
        console.log(`userId: ${userId}`);

        const linksQuery = query(
          collection(db, "links"),
          where("userId", "==", userId),
          orderBy("order")
        );
        const linksSnapshot = await getDocs(linksQuery);

        const fetchedLinks = linksSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as LinkType;
        });
        setLinks(fetchedLinks);
        console.log(fetchedLinks);
      }
    };

    fetchLinks();
  }, [username]);

  return (
    <div>
      <h1>{username}&apos;s Links</h1>
      {links.map((link) => (
        <DisplayLink key={link.id} title={link.title} url={link.url} />
      ))}
    </div>
  );
};

export default UserPage;
