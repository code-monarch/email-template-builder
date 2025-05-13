import type React from "react"
import { useAppSelector } from "@/redux/hooks"
import { Notification } from "@/pattern/molecules/notification"

export const NotificationContainer: React.FC = () => {
  const notifications = useAppSelector((state) => state.ui.notifications)

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3 max-w-md w-full">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
        />
      ))}
    </div>
  )
}
