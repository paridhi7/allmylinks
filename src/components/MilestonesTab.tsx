import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import AddMilestoneForm from "./AddMilestoneForm";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { MilestoneType } from "../types";
import Milestone from "./Milestone";
import { groupByYear } from "../utils";

const MilestonesTab: React.FC = () => {
  const [milestones, setMilestones] = useState<MilestoneType[]>([]);
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
        collection(db, "milestones"),
        where("userId", "==", user?.uid),
        orderBy("date", "desc")
      );

      const querySnapshot = await getDocs(q);
      const fetchedMilestones = querySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as MilestoneType;
      });

      setMilestones(fetchedMilestones);
    };

    if (user) {
      fetchData();
      fetchUsername();
    }
  }, [user]);

  const handleAddMilestone = async (
    title: string,
    description: string,
    url: string,
    date: string
  ) => {
    const newMilestone = {
      title,
      description,
      url,
      date,
      userId: user?.uid,
    } as MilestoneType;

    try {
      // Add to Firestore and get the generated document reference
      const docRef = await addDoc(collection(db, "milestones"), newMilestone);

      // Update local state with the new milestone including its Firestore ID
      setMilestones((prevMilestones) =>
        [{ ...newMilestone, id: docRef.id }, ...prevMilestones].sort((a, b) =>
          b.date.localeCompare(a.date)
        )
      );
    } catch (error) {
      console.error("Error adding milestone: ", error);
    }
  };

  const handleMilestoneDeleted = (deletedMilestoneId: string) => {
    setMilestones((prevMilestones) =>
      prevMilestones.filter((milestone) => milestone.id !== deletedMilestoneId)
    );
  };

  const handleMilestoneUpdated = (updatedMilestone: MilestoneType) => {
    setMilestones(
      (prevMilestones) =>
        prevMilestones
          .map((milestone) =>
            milestone.id === updatedMilestone.id ? updatedMilestone : milestone
          )
          .sort((a, b) => b.date.localeCompare(a.date)) // Sort after update
    );
  };

  const milestonesByYear = groupByYear(milestones);

  return (
    <div>
      <AddMilestoneForm onAddMilestone={handleAddMilestone} />
      {milestonesByYear.map((group) => (
        <React.Fragment key={group.year}>
          <div className="text-2xl font-bold px-4 pt-4">{group.year}</div>
          {group.milestones.map((milestone) => (
            <Milestone
              key={milestone.id}
              id={milestone.id}
              title={milestone.title}
              description={milestone.description}
              url={milestone.url}
              date={milestone.date}
              onDelete={handleMilestoneDeleted}
              onUpdate={handleMilestoneUpdated}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MilestonesTab;
