import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { LinkContext } from "./LinkContext";

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
  url: string;
}

type LinkProps = {
  title: string;
  url: string;
  index: number;
};

const Link: React.FC<LinkProps> = ({
  title: initialTitle,
  url: initialUrl,
  index,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const { deleteLink, updateLink } = useContext(LinkContext);
  const { register, handleSubmit, setValue } = useForm<FormValues>();

  useEffect(() => {
    if (editModalIsOpen) {
      setValue("title", initialTitle);
      setValue("url", initialUrl);
    }
  }, [editModalIsOpen, initialTitle, initialUrl, setValue]);

  const handleDelete = () => {
    setModalIsOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteLink(index);
    setModalIsOpen(false);
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

  const handleConfirmEdit = (data: FormValues) => {
    updateLink(index, data.title, data.url);
    setEditModalIsOpen(false);
  };

  return (
    <div className="flex justify-between items-center border rounded p-4">
      <a
        href={initialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600"
      >
        {initialTitle}
      </a>
      <div className="flex space-x-4">
        <button
          onClick={handleOpenEditModal}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={handleCancelEdit}
        contentLabel="Edit Link"
      >
        <button
          onClick={handleCancelEdit}
          className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center absolute top-4 right-4"
        >
          X
        </button>
        <h2 className="text-xl mb-4">Edit Link</h2>
        <form onSubmit={handleSubmit(handleConfirmEdit)} className="space-y-4">
          <input
            {...register("title")}
            type="text"
            className="block w-full border border-gray-300 rounded p-2"
            placeholder="Title"
            required
          />
          <input
            {...register("url")}
            type="url"
            className="block w-full border border-gray-300 rounded p-2"
            placeholder="URL"
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
        <p className="mb-4">Are you sure you want to delete this link?</p>
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

export default Link;
