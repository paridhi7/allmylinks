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
      className="bg-white text-gray-900 hover:text-indigo-500 rounded-lg px-32 py-2 mb-2 w-full text-center block"
    >
      {title}
    </a>
  );
};

export default DisplayLink;
