"use client"

import { Star, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"

interface Food {
  id: string
  name: string
  avatar: string
  rating: string
  open: boolean
  logo: string
  Price: string
  createdAt: string
}

interface FoodCardProps {
  food: Food
  onEdit: (food: Food) => void
  onDelete: (food: Food) => void
}

export function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isOpen = food.open
  const price = Number.parseFloat(food.Price).toFixed(2)
  const rating = Number.parseFloat(food.rating).toFixed(1)

  const handleEdit = () => {
    setIsMenuOpen(false)
    onEdit(food)
  }

  const handleDelete = () => {
    setIsMenuOpen(false)
    onDelete(food)
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="relative rounded-t-lg overflow-hidden">
        <img src={food.avatar || "/placeholder.svg"} alt={food.name} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3 bg-[#F65900] text-white px-2 py-1 rounded text-sm font-medium">
          ${price}
        </div>
        <div className="absolute top-3 right-3">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/80 hover:bg-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>

            {isMenuOpen && (
              <>
                {/* Backdrop to close menu when clicking outside */}
                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={handleEdit}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Edit Food
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  >
                    Delete Food
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <Image src={food.logo || "/placeholder.svg"} alt="Restaurant logo" className="w-8 h-8 rounded object-cover" width={100} height={100} />
          <div className="flex-1">
            <h3 className="restaurant-name font-semibold text-gray-900 text-sm">{food.name}</h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="restaurant-rating text-sm text-gray-600">{rating}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="restaurant-price text-lg font-bold text-gray-900">${price}</span>
          <span
            className={`restaurant-status px-2 py-1 rounded-full text-xs font-medium ${
              isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </div>
  )
}
