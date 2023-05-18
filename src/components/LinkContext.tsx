import React, { createContext, useState } from "react";

type Link = {
  title: string;
  url: string;
};

type LinkContextType = {
  links: Link[];
  addLink: (title: string, url: string) => void;
  deleteLink: (index: number) => void;
  updateLink: (index: number, title: string, url: string) => void;
};

type LinkProviderProps = {
  children: React.ReactNode;
};

export const LinkContext = createContext<LinkContextType>(undefined!);

const LinkProvider = ({ children }: LinkProviderProps) => {
  const [links, setLinks] = useState<Link[]>([]);

  const addLink = (title: string, url: string) => {
    setLinks((prevLinks) => [...prevLinks, { title, url }]);
  };

  const deleteLink = (index: number) => {
    setLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, title: string, url: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link, i) => (i === index ? { title, url } : link))
    );
  };

  return (
    <LinkContext.Provider value={{ links, addLink, deleteLink, updateLink }}>
      {children}
    </LinkContext.Provider>
  );
};

export default LinkProvider;

// import React, { createContext, useState } from 'react';

// type LinkType = {
//     title: string,
//     url: string
// }

// type LinkContextType = {
//     links: LinkType[],
//     addLink: (newLink: LinkType) => void
// }

// export const LinkContext = createContext<LinkContextType>({
//     links: [],
//     addLink: () => {}
// });

// type LinkProviderProps = {
//     children: React.ReactNode
// }

// export const LinkProvider: React.FC<LinkProviderProps> = ({ children }) => {
//     const [links, setLinks] = useState<LinkType[]>([]);

//     const addLink = (newLink: LinkType) => {
//         setLinks([...links, newLink]);
//     }

//     return (
//         <LinkContext.Provider value={{ links, addLink }}>
//             {children}
//         </LinkContext.Provider>
//     );
// }
