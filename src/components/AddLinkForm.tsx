import { useState, useContext } from "react";
import { LinkContext } from "./LinkContext";

const AddLinkForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const { addLink } = useContext(LinkContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addLink(title, url);
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Link title"
        className="block w-full px-4 py-2 rounded-md"
        required
      />
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Link URL"
        className="block w-full px-4 py-2 rounded-md"
        required
      />
      <button
        type="submit"
        className="w-full px-4 py-2 rounded-md bg-blue-600 text-white"
      >
        Add Link
      </button>
    </form>
  );
};

export default AddLinkForm;
