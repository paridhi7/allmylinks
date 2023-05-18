import "./App.css";
import { useEffect } from "react";
import LinkList from "./components/LinkList";
import AddLinkForm from "./components/AddLinkForm";
import LinkProvider from "./components/LinkContext";
import Modal from "react-modal";

function App() {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  return (
    <LinkProvider>
      <div className="p-4 space-y-8">
        <h1 className="text-2xl font-bold">Linktree Clone</h1>
        <AddLinkForm />
        <LinkList />
      </div>
    </LinkProvider>
  );
}

export default App;
