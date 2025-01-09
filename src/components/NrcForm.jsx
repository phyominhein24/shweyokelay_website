import { townshipData } from "./TownshipData";
import { useState } from "react";

const NrcForm = () => {
  const [region, setRegion] = useState("");
  const [townships, setTownships] = useState([]);
  const [nrcNumber, setNrcNumber] = useState("");
  const [nrcType, setNrcType] = useState("(နိုင်)");
  const regions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  // Simulated townships data (replace with API if necessary)

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    setRegion(selectedRegion);
    setTownships(townshipData[selectedRegion] || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullNrc = `${region}/${townships[0] || ""}${nrcType}${nrcNumber}`;
    alert(`NRC Submitted: ${fullNrc}`);
  };

  return (
    <div>
      <form className="flex gap-1" onSubmit={handleSubmit}>
        {/* region */}
        <div className="flex-none">
          <select
            id="region"
            value={region}
            onChange={handleRegionChange}
            className="p-1 border border-stone-500 bg-transparent"
          >
            <option value="" disabled>
              ရွေးပါ
            </option>

            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Township */}
        <div className="flex-none">
          <select
            id="code"
            className="p-1 border border-stone-500 bg-transparent"
          >
            {townships.length > 0 ? (
              townships.map((township, index) => (
                <option key={index} value={township}>
                  {township}
                </option>
              ))
            ) : (
              <option value="">မရှိပါ</option>
            )}
          </select>
        </div>

        {/* type */}
        <div className="flex-none">
          <select
            id="number_type"
            value={nrcType}
            onChange={(e) => setNrcType(e.target.value)}
            className="p-1 border border-stone-500 bg-transparent"
          >
            <option value="(နိုင်)">နိုင်</option>
            <option value="(ဧည့်)">ဧည့်</option>
            <option value="(ပြု)">ပြု</option>
          </select>
        </div>

        {/* Card no. */}
        <div className="grow ">
          <input
            type="text"
            id="nrcNumber"
            minLength="6"
            maxLength="7"
            value={nrcNumber}
            onChange={(e) => setNrcNumber(e.target.value)}
            className="w-full p-1 border border-stone-500"
            placeholder="123456"
          />
        </div>
      </form>
    </div>
  );
};

export default NrcForm;
