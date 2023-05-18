import { useContext } from "react";
import { LinkContext } from "./LinkContext";
import Link from "./Link";

const LinkList: React.FC = () => {
  const { links } = useContext(LinkContext);

  return (
    <div className="space-y-4">
      {links.map((link, index) => (
        <Link key={index} title={link.title} url={link.url} index={index} />
      ))}
    </div>
  );
};

export default LinkList;
