"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Food {
  id: string
  name: string
  avatar: string
  rating: string
  open: boolean
  logo: string
  Price: string
}

interface DeleteFoodModalProps {
  isOpen: boolean
  food: Food | null
  onClose: () => void
  onSuccess: () => void
}

export function DeleteFoodModal({ isOpen, food, onClose, onSuccess }: DeleteFoodModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!food) return

    setIsDeleting(true)

    try {
      const response = await fetch(`https://6852821e0594059b23cdd834.mockapi.io/Food/${food.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onSuccess()
      } else {
        throw new Error("Failed to delete food")
      }
    } catch (error) {
      console.error("Error deleting food:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#FFB30E] text-center">Delete Meal</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-center text-gray-600 mb-6">
            Are you sure you want to delete this meal? Actions cannot be reversed.
          </p>

          <div className="flex gap-3">
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-[#FFB30E] hover:bg-[#FFB30E]/90 text-white py-3 rounded-lg"
            >
              {isDeleting ? "Deleting..." : "Yes"}
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1 py-3 rounded-lg">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
