"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddFoodModalProps {
  isOpen: boolean
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

export function AddFoodModal({ isOpen, onClose, onSuccess }: AddFoodModalProps) {
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

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://6852821e0594059b23cdd834.mockapi.io/Food", {
        method: "POST",
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
        setFormData({
          food_name: "",
          food_rating: "",
          food_image: "",
          restaurant_name: "",
          restaurant_logo: "",
          restaurant_status: "",
          food_price: "",
        })
        setErrors({})
      } else {
        throw new Error("Failed to add food")
      }
    } catch (error) {
      console.error("Error adding food:", error)
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#FFB30E] text-center">Add a meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              name="food_name"
              placeholder="Food name"
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
            <Input
              name="food_rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Food rating"
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
            <Input
              name="food_image"
              placeholder="Food image (link)"
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
            <Input
              name="food_price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Food price"
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
            <Input
              name="restaurant_name"
              placeholder="Restaurant name"
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
            <Input
              name="restaurant_logo"
              placeholder="Restaurant logo (link)"
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
            <Select
              name="restaurant_status"
              value={formData.restaurant_status}
              onValueChange={(value) => handleInputChange("restaurant_status", value)}
            >
              <SelectTrigger className="bg-gray-50 border-0">
                <SelectValue placeholder="Restaurant status (open/close)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">Open Now</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
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
              {isSubmitting ? "Adding..." : "Add"}
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
