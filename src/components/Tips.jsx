import { CiSearch } from "react-icons/ci";
import { FiCheckSquare } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";

const Tips = () => {
  return (
    <div className="flex-col relative border border-black rounded-2xl p-5 md:p-10 mt-20 mb-10">
      <p className="bg-white md:px-6 pb-5 md:pb-0 relative md:absolute md:-top-5 md:-translate-x-1/2 md:left-1/2 text-xl md:text-2xl font-bold">
        ကားလက်မှတ်လေးတွေ ဘယ်လိုဝယ်ရမလဲ
      </p>

      <div className="flex items-center gap-5 pb-7">
        <CiSearch size={70} className="inline-block" />
        <div>
          <span className="block text-lg md:text-xl font-semibold pb-2">
            Search Your Bus
          </span>
          <span className="block text-base md:text-lg">
            စတင်စီးမယ့်မြို့မှ သွားရောက်မယ့်မြို့ သို့နှင့်
            ခရီးသွားမယ့်နေ့စွဲတို့ကိုရွေးချယ်ပြီး
            လက်မှတ်စတင်ဝယ်ယူနိုင်တဲ့အဆင့်ဖြစ်ပါတယ်။
          </span>
        </div>
      </div>
      <div className="flex items-center gap-5 pb-7">
        <FiCheckSquare size={70} className="inline-block customIconWeight" />
        <div>
          <span className="block text-lg md:text-xl font-semibold pb-2">
            Search Your Bus
          </span>
          <span className="block text-base md:text-lg">
            ကိုယ်ရေးအချက်အလက်များပြည့်စုံစွာဖြည့်ပြီး
            မိမိလိုချင်သောထိုင်ခုံနေရာနှင့်နံပါတ်ကို ရွေးချယ်ပေးရမှာဖြစ်ပါတယ်။
          </span>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <IoBagCheckOutline
          size={70}
          className="inline-block customIconWeight"
        />
        <div>
          <span className="block text-lg md:text-xl font-semibold pb-2">
            Search Your Bus
          </span>
          <span className="block text-base md:text-lg">
            လက်မှတ်ခအတွက် မိမိကြိုက်နှစ်သက်ရာငွေပေးချေမှုများနှင့် အဆင်ပြေသလို
            ပေးချေနိုင်ပြီး လက်မှတ်ဝယ်ယူမှုအောင်မြင်စွာပြီးဆုံးပါပြီ။
          </span>
        </div>
      </div>
    </div>
  );
};

export default Tips;
