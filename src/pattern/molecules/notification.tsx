"use client"

import type React from "react"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"
import { useAppDispatch } from "@/redux/hooks"
import { removeNotification } from "@/redux/features/uiSlice"

interface NotificationProps {
  id: string
  message: string
  type: "success" | "error" | "info"
  duration?: number
}

export const Notification: React.FC<NotificationProps> = ({ id, message, type, duration = 5000 }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeNotification(id))
    }, duration)

    return () => {
      clearTimeout(timer)
    }
  }, [id, duration, dispatch])

  const handleClose = () => {
    dispatch(removeNotification(id))
  }

  const typeStyles = {
    success:
      "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-300",
    error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300",
    info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300",
  }

  const icons = {
    success: <CheckCircle size={18} className="text-green-500 dark:text-green-400" />,
    error: <AlertCircle size={18} className="text-red-500 dark:text-red-400" />,
    info: <Info size={18} className="text-blue-500 dark:text-blue-400" />,
  }

  return (
    <div
      className={cn(
        "p-4 border rounded-lg shadow-soft backdrop-blur-sm flex items-center justify-between slide-in",
        typeStyles[type],
      )}
      role="alert"
    >
      <div className="flex items-center">
        <span className="mr-3">{icons[type]}</span>
        <div className="text-sm font-medium">{message}</div>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-1 transition-colors duration-200"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  )
}
