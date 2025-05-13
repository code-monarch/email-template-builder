"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import FocusTrap from "focus-trap-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, description, children, size = "md" }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Handle mounting for SSR
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen || !mounted) return null

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[95vw] w-full h-[90vh]",
  }

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <FocusTrap>
        <div
          ref={modalRef}
          className={cn(
            "bg-background rounded-lg shadow-soft-lg w-full border border-border/40 slide-in overflow-hidden flex flex-col",
            "dark:bg-gray-900 dark:border-gray-700/40 dark:shadow-gray-950/30",
            sizeClasses[size],
            size === "full" ? "max-h-[90vh]" : "max-h-[85vh]",
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-border/40 dark:border-gray-700/40 shrink-0">
            <div>
              <h2 id="modal-title" className="text-lg font-semibold text-foreground">
                {title}
              </h2>
              {description && (
                <p id="modal-description" className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
          <div className="p-4 overflow-y-auto flex-grow">{children}</div>
        </div>
      </FocusTrap>
    </div>
  )

  return createPortal(modal, document.body)
}
