import Sidebar from "./_components/sidebar";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default OrganizationIdLayout;
