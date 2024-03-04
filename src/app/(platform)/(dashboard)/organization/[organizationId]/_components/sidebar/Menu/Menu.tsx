function Menu({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-none pb-1 border-b-[1px] border-gray-500">
      {children}
    </ul>
  );
}

export default Menu;
