import { useState } from "react";

const NotificationModal = ({ isOpen, onClose }) => {
  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "New Task Assigned",
      message: "You have been assigned a new task: 'Update user documentation'",
      time: "2 minutes ago",
      type: "task",
      read: false,
    },
    {
      id: 2,
      title: "Team Meeting Reminder",
      message: "Daily standup meeting starts in 15 minutes",
      time: "15 minutes ago",
      type: "meeting",
      read: false,
    },
    {
      id: 3,
      title: "Project Update",
      message:
        "Project 'Website Redesign' has been updated with new requirements",
      time: "1 hour ago",
      type: "project",
      read: true,
    },
    {
      id: 4,
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 11 PM to 1 AM",
      time: "3 hours ago",
      type: "system",
      read: true,
    },
    {
      id: 5,
      title: "New Team Member",
      message: "Sarah Johnson has joined the development team",
      time: "1 day ago",
      type: "team",
      read: true,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "task":
        return (
          <svg
            className="w-5 h-5 text-blue-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "meeting":
        return (
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          </svg>
        );
      case "project":
        return (
          <svg
            className="w-5 h-5 text-purple-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        );
      case "system":
        return (
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "team":
        return (
          <svg
            className="w-5 h-5 text-indigo-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Notifications
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Notifications list */}
          <div className="bg-white dark:bg-gray-800 px-4 pb-4 sm:p-6">
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border ${
                    notification.read
                      ? "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      : "bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium ${
                            notification.read
                              ? "text-gray-900 dark:text-white"
                              : "text-blue-900 dark:text-blue-100"
                          }`}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p
                        className={`text-sm mt-1 ${
                          notification.read
                            ? "text-gray-600 dark:text-gray-400"
                            : "text-blue-700 dark:text-blue-200"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between items-center">
              <button className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                Mark all as read
              </button>
              <button className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                View all notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
