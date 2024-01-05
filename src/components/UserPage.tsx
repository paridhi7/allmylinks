import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { LinkType, MilestoneType } from "../types";
import DisplayLink from "./DisplayLink";
import DisplayMilestone from "./DisplayMilestone";
import LogoBlack from "../images/logoBlack.png";
import { groupByYear } from "../utils";
import React from "react";

const UserPage = () => {
  const { username } = useParams();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [milestones, setMilestones] = useState<MilestoneType[]>([]);
  const [title, setTitle] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("links");

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

        const milestonesQuery = query(
          collection(db, "milestones"),
          where("userId", "==", userId),
          orderBy("date", "desc")
        );
        const milestonesSnapshot = await getDocs(milestonesQuery);
        const fetchedMilestones = milestonesSnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() } as MilestoneType;
        });

        setMilestones(fetchedMilestones);
      }
    };

    fetchLinks();
  }, [username]);

  const renderTabContent = () => {
    if (activeTab === "links") {
      return links.map((link) => (
        <DisplayLink key={link.id} title={link.title} url={link.url} />
      ));
    } else if (activeTab === "milestones") {
      const milestonesByYear = groupByYear(milestones);
      return milestonesByYear.map((group) => (
        <React.Fragment key={group.year}>
          <div className="text-2xl font-bold pt-8">{group.year}</div>
          {group.milestones.map((milestone) => (
            <DisplayMilestone
              key={milestone.id}
              title={milestone.title}
              description={milestone.description}
              url={milestone.url}
              date={milestone.date}
            />
          ))}
        </React.Fragment>
      ));
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white lg:relative">
      <div className="flex flex-col items-center justify-center pt-28 max-w-5xl">
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
        {/* Tab headers */}
        <div className="flex justify-center gap-12 mb-8">
          <button
            onClick={() => setActiveTab("links")}
            className={`text-xl p-2 ${
              activeTab === "links"
                ? "text-white border-b-4 border-purple-600"
                : "text-gray-300"
            }`}
          >
            Links
          </button>
          <button
            onClick={() => setActiveTab("milestones")}
            className={`text-xl p-2 ${
              activeTab === "milestones"
                ? "text-white border-b-4 border-purple-600"
                : "text-gray-300"
            }`}
          >
            Milestones
          </button>
        </div>

        {/* Tab content */}
        <div className="w-full px-4">{renderTabContent()}</div>
      </div>
      <div className="flex flex-col items-center gap-1 mb-28">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="lg:absolute lg:bottom-16"
        >
          <img src={LogoBlack} alt="logo" className="h-8 w-auto" />
        </a>
        <p className="lg:absolute lg:bottom-8">
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
    </div>
  );
};

export default UserPage;
