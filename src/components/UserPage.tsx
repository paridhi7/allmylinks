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
  const [title, setTitle] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      const userQuery = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userId = userSnapshot.docs[0].id;
        const user = userSnapshot.docs[0].data();

        setTitle(user.title || null);
        setBio(user.bio || null);
        setImageUrl(user.imageUrl || null);

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
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white relative">
      <div className="flex flex-col items-center justify-center pt-28 max-w-lg">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Profile"
            className="rounded-full w-32 h-32 object-cover"
          />
        )}
        <h1 className="text-2xl font-bold mt-4 mb-8">
          {title || "@" + username}
        </h1>
        {bio && <p className="mb-8 mx-8 text-center">{bio}</p>}
        {links.map((link) => (
          <DisplayLink key={link.id} title={link.title} url={link.url} />
        ))}
      </div>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-20"
      >
        <img src={Logo} alt="logo" className="h-8 w-auto" />
      </a>
      <p className="absolute bottom-8">
        Made with ❤ by{" "}
        <a
          href="/paridhi"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-1"
        >
          Paridhi Agarwal
        </a>
      </p>
    </div>
  );
};

export default UserPage;
