"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Food {
  id: string
  name: string
  avatar: string
  rating: string
  open: boolean
  logo: string
  Price: string
}

interface EditFoodModalProps {
  isOpen: boolean
  food: Food | null
  onClose: () => void
  onSuccess: () => void
}

interface FormData {
  food_name: string
  food_rating: string
  food_image: string
  restaurant_name: string
  restaurant_logo: string
  restaurant_status: string
  food_price: string
}

interface FormErrors {
  food_name?: string
  food_rating?: string
  food_image?: string
  restaurant_name?: string
  restaurant_logo?: string
  restaurant_status?: string
  food_price?: string
}

export function EditFoodModal({ isOpen, food, onClose, onSuccess }: EditFoodModalProps) {
  const [formData, setFormData] = useState<FormData>({
    food_name: "",
    food_rating: "",
    food_image: "",
    restaurant_name: "",
    restaurant_logo: "",
    restaurant_status: "",
    food_price: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (food) {
      setFormData({
        food_name: food.name,
        food_rating: food.rating,
        food_image: food.avatar,
        restaurant_name: food.name, // Using food name as restaurant name for demo
        restaurant_logo: food.logo,
        restaurant_status: food.open ? "Open Now" : "Closed",
        food_price: food.Price,
      })
    }
  }, [food])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.food_name.trim()) {
      newErrors.food_name = "Food Name is required"
    }

    if (!formData.food_rating.trim()) {
      newErrors.food_rating = "Food Rating must be a number"
    } else if (isNaN(Number(formData.food_rating))) {
      newErrors.food_rating = "Food Rating must be a number"
    }

    if (!formData.food_image.trim()) {
      newErrors.food_image = "Food Image URL is required"
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = "Restaurant Name is required"
    }

    if (!formData.restaurant_logo.trim()) {
      newErrors.restaurant_logo = "Restaurant Logo URL is required"
    }

    if (!formData.restaurant_status) {
      newErrors.restaurant_status = "Restaurant Status must be 'Open Now' or 'Closed'"
    }

    if (!formData.food_price.trim()) {
      newErrors.food_price = "Food Price is required"
    } else if (isNaN(Number(formData.food_price)) || Number(formData.food_price) < 0) {
      newErrors.food_price = "Food Price must be a positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !food) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`https://6852821e0594059b23cdd834.mockapi.io/Food/${food.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.food_name,
          rating: formData.food_rating,
          avatar: formData.food_image,
          logo: formData.restaurant_logo,
          open: formData.restaurant_status === "Open Now",
          Price: formData.food_price,
        }),
      })

      if (response.ok) {
        onSuccess()
        setErrors({})
      } else {
        throw new Error("Failed to update food")
      }
    } catch (error) {
      console.error("Error updating food:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-auto h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#FFB30E] text-center">Edit Meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Food name</label>
            <Input
              name="food_name"
              value={formData.food_name}
              onChange={(e) => handleInputChange("food_name", e.target.value)}
              className="bg-gray-50 border-0"
            />
            {errors.food_name && (
              <p id="food-name-error" className="text-red-500 text-sm mt-1">
                {errors.food_name}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Food rating</label>
            <Input
              name="food_rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.food_rating}
              onChange={(e) => handleInputChange("food_rating", e.target.value)}
              className="bg-gray-50 border-0"
            />
            {errors.food_rating && (
              <p id="food-rating-error" className="text-red-500 text-sm mt-1">
                {errors.food_rating}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Food image (link)</label>
            <Input
              name="food_image"
              value={formData.food_image}
              onChange={(e) => handleInputChange("food_image", e.target.value)}
              className="bg-gray-50 border-0"
            />
            {errors.food_image && (
              <p id="food-image-error" className="text-red-500 text-sm mt-1">
                {errors.food_image}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Food price</label>
            <Input
              name="food_price"
              type="number"
              step="0.01"
              min="0"
              value={formData.food_price}
              onChange={(e) => handleInputChange("food_price", e.target.value)}
              className="bg-gray-50 border-0"
            />
            {errors.food_price && (
              <p id="food-price-error" className="text-red-500 text-sm mt-1">
                {errors.food_price}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Restaurant name</label>
            <Input
              name="restaurant_name"
              value={formData.restaurant_name}
              onChange={(e) => handleInputChange("restaurant_name", e.target.value)}
              className="bg-gray-50 border-0"
            />
            {errors.restaurant_name && (
              <p id="restaurant-name-error" className="text-red-500 text-sm mt-1">
                {errors.restaurant_name}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Restaurant logo (link)</label>
            <Input
              name="restaurant_logo"
              value={formData.restaurant_logo}
              onChange={(e) => handleInputChange("restaurant_logo", e.target.value)}
              className="bg-gray-50 border-0"
            />
            {errors.restaurant_logo && (
              <p id="restaurant-logo-error" className="text-red-500 text-sm mt-1">
                {errors.restaurant_logo}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Restaurant status (open/close)</label>
            <Select
              name="restaurant_status"
              value={formData.restaurant_status}
              onValueChange={(value) => handleInputChange("restaurant_status", value)}
            >
              <SelectTrigger className="bg-gray-50 border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">open</SelectItem>
                <SelectItem value="Closed">close</SelectItem>
              </SelectContent>
            </Select>
            {errors.restaurant_status && (
              <p id="restaurant-status-error" className="text-red-500 text-sm mt-1">
                {errors.restaurant_status}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#FFB30E] hover:bg-[#FFB30E]/90 text-white py-3 rounded-lg"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 py-3 rounded-lg">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
