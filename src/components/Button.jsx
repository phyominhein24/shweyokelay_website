// eslint-disable-next-line react/prop-types
const Button = ({ buttonName, buttonAction }) => {
  return (
    <div>
      <button
        onClick={buttonAction}
        className="min-w-[133px] bg-lime-0 hover:bg-secondary-0 px-5 py-[10px] border-none rounded-md text-[14px] font-semibold transition-colors duration-400 "
      >
        {buttonName}
      </button>
    </div>
  );
};

export default Button;
