"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  label?: string
  value: string
  onChange: (color: string) => void
  className?: string
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={cn("relative", className)} ref={pickerRef}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>}
      <div className="flex items-center">
        <button
          type="button"
          className="w-8 h-8 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm"
          style={{ backgroundColor: value }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={`Select color: current value ${value}`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="ml-2 px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white text-sm w-24"
        />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
          <div className="grid grid-cols-6 gap-2">
            {[
              "#000000",
              "#ffffff",
              "#f44336",
              "#e91e63",
              "#9c27b0",
              "#673ab7",
              "#3f51b5",
              "#2196f3",
              "#03a9f4",
              "#00bcd4",
              "#009688",
              "#4caf50",
              "#8bc34a",
              "#cddc39",
              "#ffeb3b",
              "#ffc107",
              "#ff9800",
              "#ff5722",
              "#795548",
              "#9e9e9e",
              "#607d8b",
              "#f5f5f5",
              "#eeeeee",
              "#e0e0e0",
            ].map((color) => (
              <button
                key={color}
                type="button"
                className="w-6 h-6 rounded-sm border border-gray-300 dark:border-gray-700"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color)
                  setIsOpen(false)
                }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
