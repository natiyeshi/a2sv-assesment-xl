import { Button } from "@/components/ui/button"

const Header = ({ handleAddFood} : { handleAddFood : Function}) => {
    return (
         <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FFB30E] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">🍔</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FoodWagen</span>
          </div>
          <Button
            onClick={() => handleAddFood()}
            className="bg-[#FFB30E] hover:bg-[#FFB30E]/90 text-white px-6 py-2 rounded-full"
          >
            Add Meal
          </Button>
        </div>
      </header>
    )
}

export default Header;