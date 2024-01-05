import { AiOutlineLink } from "react-icons/ai";

type DisplayMilestoneProps = {
  title: string;
  description?: string;
  url?: string;
  date: string;
};

const DisplayMilestone: React.FC<DisplayMilestoneProps> = ({
  title,
  description,
  url,
  date,
}) => {
  return (
    <div className="flex justify-between items-center border-dashed border-b-2 rounded p-4 max-w-full mx-auto gap-28">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-purple-900">{title}</h3>
        {description && <p className="text-sm text-white-500">{description}</p>}
      </div>

      <div className="flex justify-end items-center space-x-2 mt-2">
        <time dateTime={date} className="text-sm text-white-500">
          {new Date(date).toLocaleDateString("default", {
            month: "short",
            day: "numeric",
          })}
        </time>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open link"
            className="text-white-500 hover:text-purple-500"
          >
            <AiOutlineLink size={24} />
          </a>
        )}
      </div>
    </div>
  );
};

export default DisplayMilestone;
