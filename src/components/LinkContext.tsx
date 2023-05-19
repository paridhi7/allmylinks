import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";

type Link = {
  id: string;
  title: string;
  url: string;
};

type LinkContextType = {
  links: Link[];
  setLinks: Dispatch<SetStateAction<Link[]>>;
  addLink: (title: string, url: string) => void;
  deleteLink: (id: string) => void;
  updateLink: (id: string, title: string, url: string) => void;
};

type LinkProviderProps = {
  children: React.ReactNode;
};

export const LinkContext = createContext<LinkContextType>(undefined!);

const LinkProvider = ({ children }: LinkProviderProps) => {
  const [links, setLinks] = useState<Link[]>([]);

  const addLink = (title: string, url: string) => {
    const newLink = { id: uuidv4(), title, url };
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  const deleteLink = (id: string) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const updateLink = (id: string, title: string, url: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => (link.id === id ? { id, title, url } : link))
    );
  };

  return (
    <LinkContext.Provider
      value={{ links, setLinks, addLink, deleteLink, updateLink }}
    >
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
