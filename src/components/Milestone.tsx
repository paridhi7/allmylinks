import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AiFillEdit, AiFillDelete, AiOutlineLink } from "react-icons/ai";
import { MilestoneType } from "../types";
import { AuthContext } from "./AuthProvider";

if (Modal.defaultStyles.overlay) {
  Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,0.5)";
}
Modal.defaultStyles.content = {
  position: "absolute",
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  border: "none",
  borderRadius: "0.375rem",
  padding: "2rem",
  width: "80%",
  maxWidth: "24rem",
};

interface FormValues {
  title: string;
  description?: string;
  url?: string;
  date: string;
}

type MilestoneProps = {
  id: string;
  title: string;
  description?: string;
  url?: string;
  date: string;
  onDelete: (id: string) => void;
  onUpdate: (milestone: MilestoneType) => void;
};

const Milestone: React.FC<MilestoneProps> = ({
  id,
  title: initialTitle,
  description: initialDescription,
  url: initialUrl,
  date: initialDate,
  onDelete,
  onUpdate,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  const authContext = useContext(AuthContext);
  const user = authContext?.currentUser;

  useEffect(() => {
    if (editModalIsOpen) {
      setValue("title", initialTitle);
      setValue("description", initialDescription);
      setValue("url", initialUrl);
      setValue("date", initialDate);
    }
  }, [
    editModalIsOpen,
    initialTitle,
    initialDescription,
    initialUrl,
    initialDate,
    setValue,
  ]);

  const handleDelete = () => {
    setModalIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    const milestoneRef = doc(db, "milestones", id);
    await deleteDoc(milestoneRef);
    setModalIsOpen(false);
    onDelete(id);
  };

  const handleCancelDelete = () => {
    setModalIsOpen(false);
  };

  const handleOpenEditModal = () => {
    setEditModalIsOpen(true);
  };

  const handleCancelEdit = () => {
    setEditModalIsOpen(false);
  };

  const handleConfirmEdit = async (data: FormValues) => {
    const userId = user?.uid;

    const updatedMilestone: MilestoneType = {
      ...data,
      id,
      userId: user?.uid ?? null,
    };

    const milestoneRef = doc(db, "milestones", id);
    await updateDoc(milestoneRef, {
      title: data.title,
      description: data.description,
      url: data.url,
      date: data.date,
    });

    onUpdate(updatedMilestone); // Call the passed callback function
    setEditModalIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center border-dashed border-b-2 rounded p-4 max-w-7xl mx-auto">
      {/* Content Section */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900">{initialTitle}</h3>
        {initialDescription && (
          <p className="text-sm text-gray-500">{initialDescription}</p>
        )}
      </div>

      {/* Date and Action Buttons */}
      <div className="flex justify-end items-center space-x-2 mt-2">
        {/* Date displayed */}
        <time dateTime={initialDate} className="text-sm text-gray-500">
          {new Date(initialDate).toLocaleDateString("default", {
            month: "short",
            day: "numeric",
          })}
        </time>

        {initialUrl && (
          <a
            href={initialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open link"
            className="text-gray-500 hover:text-indigo-500"
          >
            <AiOutlineLink size={24} />
          </a>
        )}

        {/* Edit button */}
        <button
          onClick={handleOpenEditModal}
          aria-label="Edit"
          className="text-gray-500 hover:text-indigo-500"
        >
          <AiFillEdit size={24} />
        </button>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          aria-label="Delete"
          className="text-gray-500 hover:text-red-500"
        >
          <AiFillDelete size={24} />
        </button>
      </div>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={handleCancelEdit}
        contentLabel="Edit Milestone"
      >
        <button
          onClick={handleCancelEdit}
          className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center absolute top-4 right-4"
        >
          X
        </button>
        <h2 className="text-xl mb-4">Edit Milestone</h2>
        <form onSubmit={handleSubmit(handleConfirmEdit)} className="space-y-4">
          <input
            {...register("title")}
            type="text"
            className="block w-full border border-gray-300 rounded p-2"
            placeholder="Title"
            required
          />
          <input
            {...register("description")}
            type="text"
            className="block w-full border border-gray-300 rounded p-2"
            placeholder="Description"
          />
          <input
            {...register("url")}
            type="url"
            className="block w-full border border-gray-300 rounded p-2"
            placeholder="URL"
          />
          <input
            {...register("date")}
            type="date"
            className="block w-full border border-gray-300 rounded p-2"
            placeholder="Date"
            required
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="py-2 px-4 rounded border border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded bg-blue-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCancelDelete}
        contentLabel="Delete Confirmation"
      >
        <button
          onClick={handleCancelDelete}
          className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center absolute top-4 right-4"
        >
          X
        </button>
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this milestone?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancelDelete}
            className="py-2 px-4 rounded border border-gray-300"
          >
            No, Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="py-2 px-4 rounded bg-blue-600 text-white"
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Milestone;
