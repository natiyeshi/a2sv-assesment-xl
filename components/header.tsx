import { Button } from "@/components/ui/button";
import Image from "next/image";
import CustomButton from "./custome-button";

const Header = ({ handleAddFood }: { handleAddFood: Function }) => {
  return (
    <header className="bg-white border-b border-gray-100 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.svg"
            alt="FoodWagen Logo"
            className="w-32 object-contain"
            width={100}
            height={100}
          />
        </div>
        <CustomButton
          onClick={() => handleAddFood()}
          className="bg-[#FFB30E] hover:bg-[#FFB30E]/90 text-white px-6 py-[4px] rounded-lg shadow-md"
        >
          Add Meal
        </CustomButton>
        
      </div>
    </header>
  );
};

export default Header;
