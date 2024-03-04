import Sidebar from './_components/sidebar';

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start justify-center">
      <Sidebar />
      <div className="max-w-[825px] min-w-[288px] w-full mx-4 mt-10">
        {children}
      </div>
    </div>
  );
};

export default OrganizationIdLayout;
