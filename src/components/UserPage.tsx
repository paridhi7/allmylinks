import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { LinkType } from "../types";
import DisplayLink from "./DisplayLink";
import Logo from "../images/completeLogo.png";

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
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <div className="flex flex-col items-center justify-center pt-52">
        <h1 className="text-2xl font-bold mb-8">@{username}</h1>
        {links.map((link) => (
          <DisplayLink key={link.id} title={link.title} url={link.url} />
        ))}
      </div>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 pb-16"
      >
        <img src={Logo} alt="logo" className="h-8 w-auto" />
      </a>
    </div>
  );
};

export default UserPage;
