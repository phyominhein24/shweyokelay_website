import {
  TbClockCheck,
  TbCreditCard,
  TbHeartHandshake,
  TbShieldCheck,
} from "react-icons/tb";

const StrenghtCards = () => {
  return (
    <section>
      <h1 className="text-2xl md:text-3xl font-bold text-center pt-10 pb-5">
        Why Choose Us
      </h1>
      <div className="flex justify-center flex-wrap align-middle gap-5">
        <div className="w-[220px] h-[230px] border-2 border-black flex flex-col justify-between items-center py-10 rounded-lg shadow-lg">
          <TbShieldCheck
            size={100}
            color="#3e3e3e"
            className="block customIconWeight"
          />
          <div className="text-xl md:text-2xl font-semibold">Safe Journey</div>
        </div>
        <div className="w-[220px] h-[230px] border-2 border-black flex flex-col justify-between items-center py-10 rounded-lg shadow-lg">
          <TbClockCheck
            size={100}
            color="#3e3e3e"
            className="block customIconWeight"
          />
          <div className="text-xl md:text-2xl font-semibold">Right Time</div>
        </div>
        <div className="w-[220px] h-[230px] border-2 border-black flex flex-col justify-between items-center py-10 rounded-lg shadow-lg">
          <TbHeartHandshake
            size={100}
            color="#3e3e3e"
            className="block customIconWeight"
          />
          <div className="text-xl md:text-2xl font-semibold">Best Service</div>
        </div>
        <div className="w-[220px] h-[230px] border-2 border-black flex flex-col justify-between items-center py-10 rounded-lg shadow-lg">
          <TbCreditCard
            size={100}
            color="#3e3e3e"
            className="block customIconWeight"
          />
          <div className="text-xl md:text-2xl font-semibold">Safe Payment</div>
        </div>
      </div>
    </section>
  );
};

export default StrenghtCards;
