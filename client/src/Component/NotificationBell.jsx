/* eslint-disable react-hooks/set-state-in-effect */

import { Bell, Globe } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import api from "../configs/api";
import socket from "../configs/socket";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);

  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });

  const token = localStorage.getItem("token");

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Load notifications
  const loadNotifications = async () => {
    try {
      const { data } = await api.get(
        "/api/notifications/get-notifications"
      );

      setNotifications(data.notification || []);
      setUnread(data.unreadCount || 0);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  // Real-time notifications
  useEffect(() => {
    socket.on("new_notification", (notification) => {
      setNotifications((prev) => [
        notification,
        ...prev,
      ]);

      setUnread((prev) => prev + 1);
    });

    return () => {
      socket.off("new_notification");
    };
  }, []);

  // Update dropdown position
  const updateDropdownPosition = () => {
    if (!buttonRef.current) return;

    const rect =
      buttonRef.current.getBoundingClientRect();

    setDropdownPosition({
      top: rect.bottom + 10,
      right: window.innerWidth - rect.right,
    });
  };

  // Toggle dropdown
  const toggleNotifications = () => {
    if (!open) {
      updateDropdownPosition();
    }

    setOpen((prev) => !prev);
  };

  // Keep dropdown positioned correctly
  useEffect(() => {
    if (!open) return;

    const handlePosition = () => {
      updateDropdownPosition();
    };

    window.addEventListener(
      "scroll",
      handlePosition,
      true
    );

    window.addEventListener(
      "resize",
      handlePosition
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handlePosition,
        true
      );

      window.removeEventListener(
        "resize",
        handlePosition
      );
    };
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;

    const handler = (e) => {
      const clickedButton =
        buttonRef.current?.contains(e.target);

      const clickedDropdown =
        dropdownRef.current?.contains(e.target);

      if (!clickedButton && !clickedDropdown) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handler
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handler
      );
    };
  }, [open]);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await api.put(
        `/api/notifications/mark-read/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id
            ? { ...n, read: true }
            : n
        )
      );

      setUnread((prev) =>
        Math.max(prev - 1, 0)
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  // Format time
  const formatTime = (date) => {
    if (!date) return "";

    const created = new Date(date);
    const now = new Date();

    const diff =
      now.getTime() - created.getTime();

    const minutes = Math.floor(
      diff / 60000
    );

    const hours = Math.floor(
      minutes / 60
    );

    const days = Math.floor(
      hours / 24
    );

    if (minutes < 1) return "Just now";

    if (minutes < 60)
      return `${minutes}m ago`;

    if (hours < 24)
      return `${hours}h ago`;

    if (days < 7)
      return `${days}d ago`;

    return created.toLocaleDateString(
      undefined,
      {
        day: "numeric",
        month: "short",
      }
    );
  };

  // Notification dropdown
  const notificationDropdown = open
    ? createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: "fixed",
            top: `${dropdownPosition.top}px`,
            right: `${dropdownPosition.right}px`,
            width: "320px",
            zIndex: 2147483647,
          }}
          className="
            bg-white
            rounded-lg
            border
            border-gray-200
            shadow-lg
            overflow-hidden
          "
        >
          {/* Simple Header */}

          <div className="
            flex
            items-center
            justify-between
            px-4
            py-3
            border-b
            border-gray-200
          ">
            <div>
              <h3 className="
                text-sm
                font-medium
                text-gray-800
              ">
                Notifications
              </h3>

              {unread > 0 && (
                <p className="
                  text-[11px]
                  text-gray-400
                  mt-0.5
                ">
                  {unread} unread
                </p>
              )}
            </div>
          </div>

          {/* Empty */}

          {notifications.length === 0 && (
            <div className="
              px-4
              py-8
              text-center
            ">
              <Bell
                className="
                  w-7
                  h-7
                  mx-auto
                  mb-2
                  text-gray-300
                "
              />

              <p className="
                text-sm
                text-gray-500
              ">
                No notifications
              </p>
            </div>
          )}

          {/* Notification List */}

          {notifications.length > 0 && (
            <div className="
              max-h-72
              overflow-y-auto
              scrollbar-hide
            ">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() =>
                    !n.read &&
                    markAsRead(n._id)
                  }
                  className={`
                    relative
                    flex
                    items-start
                    gap-3
                    px-4
                    py-3
                    border-b
                    border-gray-100
                    last:border-none
                    transition
                    hover:bg-gray-50

                    ${
                      !n.read
                        ? "bg-blue-50/50 cursor-pointer"
                        : ""
                    }
                  `}
                >
                  {/* Unread indicator */}

                  {!n.read && (
                    <span className="
                      absolute
                      left-0
                      top-0
                      bottom-0
                      w-[2px]
                      bg-blue-500
                    " />
                  )}

                  {/* Icon */}

                  <div className="
                    flex
                    items-center
                    justify-center
                    w-8
                    h-8
                    rounded-full
                    bg-blue-50
                    flex-shrink-0
                  ">
                    <Globe
                      className="
                        w-4
                        h-4
                        text-blue-600
                      "
                    />
                  </div>

                  {/* Content */}

                  <div className="
                    flex-1
                    min-w-0
                  ">
                    <p className="
                      text-sm
                      text-gray-700
                      leading-relaxed
                    ">
                      {n.message}
                    </p>

                    <p className="
                      text-[11px]
                      text-gray-400
                      mt-1
                    ">
                      {formatTime(
                        n.createdAt
                      )}
                    </p>
                  </div>

                  {/* Unread dot */}

                  {!n.read && (
                    <span className="
                      w-1.5
                      h-1.5
                      mt-2
                      rounded-full
                      bg-blue-500
                      flex-shrink-0
                    " />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>,

        document.body
      )
    : null;

  return (
    <>
      {/* Bell */}

      <div className="relative">
        <button
          ref={buttonRef}
          onClick={toggleNotifications}
          className="
            relative
            p-2
            rounded-lg
            hover:bg-gray-100
            transition
            cursor-pointer
          "
        >
          <Bell
            className="
              w-5
              h-5
              text-gray-700
            "
          />

          {unread > 0 && (
            <span
              className="
                absolute
                -top-1
                -right-1
                bg-red-500
                text-white
                text-[10px]
                font-semibold
                px-1.5
                py-0.5
                rounded-full
                shadow
              "
            >
              {unread}
            </span>
          )}
        </button>
      </div>

      {notificationDropdown}
    </>
  );
};

export default NotificationBell;