type DisplayLinkProps = {
  title: string;
  url: string;
};

const DisplayLink: React.FC<DisplayLinkProps> = ({ title, url }) => {
  console.log(title, url);
  return (
    <div style={{ margin: "10px 0" }}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </div>
  );
};

export default DisplayLink;
