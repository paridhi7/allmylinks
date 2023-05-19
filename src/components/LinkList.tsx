import { useContext } from "react";
import { LinkContext } from "./LinkContext";
import Link from "./Link";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const LinkList: React.FC = () => {
  const { links, setLinks } = useContext(LinkContext);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    setLinks((prevLinks) => {
      // Copy the array of links
      const newLinks = Array.from(prevLinks);

      // Find the moved item by its id
      const movedLink = newLinks.find((link) => link.id === result.draggableId);

      // If the link is not found, return the previous state
      if (!movedLink) {
        return prevLinks;
      }

      // Remove the moved item from its old position
      newLinks.splice(source.index, 1);

      // Insert the moved item at its new position
      newLinks.splice(destination.index, 0, movedLink);

      return newLinks;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="links">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "lightblue" : "grey",
            }}
          >
            {links.map((link, index) => (
              <Draggable key={link.id} draggableId={link.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: snapshot.isDragging
                        ? "lightgreen"
                        : "white",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <Link title={link.title} url={link.url} id={link.id} />
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
