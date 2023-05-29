import AddLinkForm from "./AddLinkForm";
import LinkList from "./LinkList";

const AdminPage: React.FC = () => {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <AddLinkForm />
      <LinkList />
    </div>
  );
};

export default AdminPage;
