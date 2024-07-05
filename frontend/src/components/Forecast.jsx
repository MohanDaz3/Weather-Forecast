const Forecast = ({ title, items }) => {
  return (
    <div>
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase">{title}</p>
      </div>
      <hr className="my-1 w-full border-t border-gray-300" />
      <div className="flex items-center justify-between mt-4">
        {items.map((item, index) => (
          <div className="flex flex-col items-center" key={index}>
            <p className="text-sm font-light">{item.title}</p>
            <img
              src={item.icon}
              alt="weather icon"
              className="w-12 my-1"
            />
            <p className="font-medium">{item.temp.toFixed()}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
