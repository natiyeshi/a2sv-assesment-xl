"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FoodCard } from "@/components/food-card"
import { AddFoodModal } from "@/components/add-food-modal"
import { EditFoodModal } from "@/components/edit-food-modal"
import { DeleteFoodModal } from "@/components/delete-food-modal"
import { Footer } from "@/components/footer"
import Image from "next/image";
import { FaMotorcycle } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
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

export default function HomePage() {
  const [foods, setFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery")

  const API_BASE = "https://6852821e0594059b23cdd834.mockapi.io/Food"

  // Fetch foods
  const fetchFoods = async (search?: string) => {
    try {
      setLoading(true)
      const url = search ? `${API_BASE}?name=${encodeURIComponent(search)}` : API_BASE
      const response = await fetch(url)
      const data = await response.json()
      setFoods(data)
    } catch (error) {
      console.error("Error fetching foods:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchFoods(searchTerm)
  }

  const handleAddFood = () => {
    setIsAddModalOpen(true)
  }

  const handleEditFood = (food: Food) => {
    setSelectedFood(food)
    setIsEditModalOpen(true)
  }

  const handleDeleteFood = (food: Food) => {
    setSelectedFood(food)
    setIsDeleteModalOpen(true)
  }

  const onFoodAdded = () => {
    fetchFoods()
    setIsAddModalOpen(false)
  }

  const onFoodUpdated = () => {
    fetchFoods()
    setIsEditModalOpen(false)
    setSelectedFood(null)
  }

  const onFoodDeleted = () => {
    fetchFoods()
    setIsDeleteModalOpen(false)
    setSelectedFood(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/Logo.svg" alt="Logo" width={124} height={100} />
          </div>
          <Button
            onClick={handleAddFood}
            className="bg-[#FFB30E] hover:bg-[#FFB30E]/90 text-white px-6 py-2 rounded-full"
          >
            Add Meal
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r overflow-hidden from-[#FFB30E]/80 to-[#FFB30E] px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">Are you starving?</h1>
              <p className="text-white/90 text-lg mb-8">Within a few clicks, find meals that are accessible near you</p>

              {/* Delivery/Pickup Toggle */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setDeliveryType("delivery")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      deliveryType === "delivery" ? "bg-[#F65900]/10 text-[#F65900]" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                   <FaMotorcycle />
                    Delivery
                  </button>
                  <button
                    onClick={() => setDeliveryType("pickup")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      deliveryType === "pickup" ? "bg-[#F65900]/10 text-[#F65900]" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <FaBagShopping />
                    Pickup
                  </button>
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="search-bar"
                      type="text"
                      placeholder="What do you like to eat today?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 py-3 border-gray-200 focus:border-[#FFB30E] focus:ring-[#FFB30E]"
                    />
                  </div>
                  <Button type="submit" className="bg-gradient-to-r from-[#FF7A7A] to-[#F65900] text-white px-6 py-3">
                    Find Meal
                  </Button>
                </form>
              </div>
            </div>

            <div className="hidden lg:block">
                <div className="relative top-[100px]">
                <Image
                  src="/img.png"
                  alt="Delicious food bowl"
                  width={400}
                  height={400}
                  className="w-full max-w-md mx-auto rounded-full"
                  priority
                />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Meals</h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFB30E]"></div>
              <p className="mt-4 text-gray-600">Loading meals...</p>
            </div>
          ) : foods.length === 0 ? (
            <div className="text-center py-12">
              <div className="empty-state-message text-gray-600">No items available</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {foods.map((food) => (
                <FoodCard key={food.id} food={food} onEdit={handleEditFood} onDelete={handleDeleteFood} />
              ))}
            </div>
          )}

          {foods.length > 0 && (
            <div className="text-center mt-12">
              <Button className="bg-[#FFB30E] hover:bg-[#FFB30E]/90 text-white px-6 py-3">
                Load more
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <AddFoodModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={onFoodAdded} />

      <EditFoodModal
        isOpen={isEditModalOpen}
        food={selectedFood}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedFood(null)
        }}
        onSuccess={onFoodUpdated}
      />

      <DeleteFoodModal
        isOpen={isDeleteModalOpen}
        food={selectedFood}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedFood(null)
        }}
        onSuccess={onFoodDeleted}
      />
    </div>
  )
}
