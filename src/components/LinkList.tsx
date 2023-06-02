import Link from "./Link";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import {
  doc,
  writeBatch,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { LinkType } from "../types";
import { useEffect } from "react";
import { auth } from "../firebase";

type LinkListProps = {
  links: LinkType[];
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
};

const LinkList: React.FC<LinkListProps> = ({ links, setLinks }) => {
  useEffect(() => {
    const userId = auth.currentUser?.uid;

    // Ensure the useEffect does not proceed if no user is logged in
    if (!userId) return;

    const q = query(
      collection(db, "links"),
      where("userId", "==", userId),
      orderBy("order")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newLinks: LinkType[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newLinks.push({
          id: doc.id,
          title: data.title,
          url: data.url,
          order: data.order,
          timestamp: data.timestamp,
          userId: data.userId,
          isActive: data.isActive,
        });
      });
      newLinks.sort((a, b) => a.order - b.order);
      setLinks(newLinks);
    });

    return () => unsubscribe();
  }, [setLinks]);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // Calculate the new links state first
    const newLinks = Array.from(links);
    const movedLink = newLinks[source.index];
    newLinks.splice(source.index, 1);
    newLinks.splice(destination.index, 0, movedLink);

    // Update the orders in Firestore
    const batch = writeBatch(db);
    newLinks.forEach((link, index) => {
      const linkRef = doc(db, "links", link.id);
      batch.update(linkRef, { order: index + 1 });
    });
    await batch.commit();

    // Update the local state
    setLinks(newLinks);
  };

  const handleLinkDeleted = (deletedLinkId: string) => {
    setLinks((prevLinks) =>
      prevLinks.filter((link) => link.id !== deletedLinkId)
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="links">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {links.map((link, index) => (
              <Draggable key={link.id} draggableId={link.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Link
                      id={link.id}
                      title={link.title}
                      url={link.url}
                      onDelete={handleLinkDeleted}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LinkList;
