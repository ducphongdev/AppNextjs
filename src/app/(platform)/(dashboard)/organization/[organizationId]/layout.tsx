import Sidebar from './_components/sidebar';

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      <Sidebar />
      <div className="col-span-4 mx-4 mt-10 w-full">{children}</div>
    </div>
  );
};

export default OrganizationIdLayout;
