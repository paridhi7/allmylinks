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
      className="bg-white text-gray-900 hover:text-indigo-500 rounded-lg py-2 mb-2 w-full max-w-[90%] text-center block"
    >
      {title}
    </a>
  );
};

export default DisplayLink;
