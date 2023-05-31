import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  title: string;
  url: string;
};

type AddLinkFormProps = {
  onAddLink: (title: string, url: string) => Promise<void>;
};

const AddLinkForm: React.FC<AddLinkFormProps> = ({ onAddLink }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    await onAddLink(data.title, data.url);
    reset();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <button
        type="submit"
        className="py-2 px-4 rounded bg-blue-600 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Link"}
      </button>
    </form>
  );
};

export default AddLinkForm;
