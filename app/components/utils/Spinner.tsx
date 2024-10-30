const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 bg-utility-brand-300 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-utility-brand-300 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-utility-brand-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Spinner;
