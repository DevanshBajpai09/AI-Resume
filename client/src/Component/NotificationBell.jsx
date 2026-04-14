/* eslint-disable react-hooks/set-state-in-effect */
import { Bell, Globe } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import api from "../configs/api"
import socket from "../configs/socket"

const NotificationBell = () => {

  const [notifications, setNotifications] = useState([])
  const [unread, setUnread] = useState(0)
  const [open, setOpen] = useState(false)
  const token = localStorage.getItem("token")


  const dropdownRef = useRef()

  // Load notifications
  const loadNotifications = async () => {
    try {

      const { data } = await api.get("/api/notifications/get-notifications")

      setNotifications(data.notification)
      setUnread(data.unreadCount)

    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  // Real-time notifications
  useEffect(() => {

    socket.on("new_notification", (notification) => {

      setNotifications(prev => [notification, ...prev])
      setUnread(prev => prev + 1)

    })

    return () => socket.off("new_notification")

  }, [])

  // Close dropdown on outside click
  useEffect(() => {

    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handler)

    return () => document.removeEventListener("mousedown", handler)

  }, [])

  // Mark single notification as read
  const markAsRead = async (id) => {

    try {

      await api.put(
  `/api/notifications/mark-read/${id}`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
)

      setNotifications(prev =>
        prev.map(n =>
          n._id === id ? { ...n, read: true } : n
        )
      )

      setUnread(prev => Math.max(prev - 1, 0))

    } catch (err) {
      console.log(err.message)
    }

  }

  return (
    <div className="relative" ref={dropdownRef}>

      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
      >

        <Bell className="w-5 h-5 text-gray-700" />

        {unread > 0 && (
          <span className="
          absolute -top-1 -right-1
          bg-red-500 text-white
          text-[10px] font-semibold
          px-1.5 py-0.5 rounded-full
          shadow
          ">
            {unread}
          </span>
        )}

      </button>

      {/* Dropdown */}
      <div
        className={`
        absolute right-0 mt-3 w-80
        bg-white border border-gray-200
        rounded-xl shadow-xl
        z-999
        overflow-hidden
        origin-top-right
        transform transition-all duration-200
        ${open
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"}
        `}
      >

        {/* Header */}
        

        {/* Empty */}
        {notifications.length === 0 && (
          <p className="p-6 text-gray-500 text-sm text-center">
            No notifications
          </p>
        )}

        {/* Notification List */}
        <div className="max-h-72 overflow-y-auto scrollbar-hide">

          {notifications.map((n) => (

            <div
              key={n._id}
              onClick={() => markAsRead(n._id)}
              className={`
              cursor-pointer
              flex items-start gap-3
              px-4 py-3
              text-sm
              border-b last:border-none
              transition
              hover:bg-gray-50
              ${!n.read ? "bg-blue-50" : ""}
              `}
            >

              {/* Dot Indicator */}
              {!n.read && (
                <span className="mt-2 w-2 h-2 bg-blue-500 rounded-full"></span>
              )}

              {/* Icon */}
              <div className="
              flex items-center justify-center
              w-8 h-8 rounded-full
              bg-blue-100
              flex-shrink-0
              ">
                <Globe className="w-4 h-4 text-blue-600" />
              </div>

              {/* Message */}
              <div className="flex-1 min-w-0">

                <p className="text-gray-700 truncate">
                  {n.message}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(n.createdAt).toLocaleTimeString().replace(/:\d+ /, ' ')}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default NotificationBell