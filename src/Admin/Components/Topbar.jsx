const Topbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h2 className="text-2xl font-semibold">Smt pn Doshi women's college</h2>

      <div className="flex items-center gap-4">
        <div className="bg-purple-200 px-4 py-2 rounded-full font-semibold">Admin</div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
      </div>
    </div>
  );
};

export default Topbar;
