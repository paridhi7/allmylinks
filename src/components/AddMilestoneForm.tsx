import { useState } from "react";
import { useForm } from "react-hook-form";

type MilestoneFormValues = {
  title: string;
  description: string;
  url: string;
  date: string;
};

type AddMilestoneFormProps = {
  onAddMilestone: (
    title: string,
    description: string,
    url: string,
    date: string
  ) => Promise<void>;
};

const AddMilestoneForm: React.FC<AddMilestoneFormProps> = ({
  onAddMilestone,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<MilestoneFormValues>();

  const onSubmit = async (data: MilestoneFormValues) => {
    setIsSubmitting(true);
    await onAddMilestone(data.title, data.description, data.url, data.date);
    reset();
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4 py-11"
    >
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
        placeholder="Description(optional)"
      />
      <input
        {...register("url")}
        type="url"
        className="block w-full border border-gray-300 rounded p-2"
        placeholder="URL(optional)"
      />
      <input
        {...register("date")}
        type="date"
        className="block w-full border border-gray-300 rounded p-2"
        placeholder="Milestone Date"
        required
      />
      <div className="flex justify-center">
        <button
          type="submit"
          className="py-2 px-4 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Milestone"}
        </button>
      </div>
    </form>
  );
};

export default AddMilestoneForm;
