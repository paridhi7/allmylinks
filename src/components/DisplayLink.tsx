type DisplayLinkProps = {
  title: string;
  url: string;
};

const DisplayLink: React.FC<DisplayLinkProps> = ({ title, url }) => {
  console.log(title, url);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white text-gray-900 hover:text-indigo-500 rounded-lg px-16 py-2 mb-2 w-full text-left block"
    >
      {title}
    </a>
  );
};

export default DisplayLink;
