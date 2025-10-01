import { useState } from "react";
import NewTaskForm from "./forms/NewTaskForm";
import NewProjectForm from "./forms/NewProjectForm";
import AddEmployeeForm from "./forms/AddEmployeeForm";
import NewClientForm from "./forms/NewClientForm";
import SupportTicketForm from "./forms/SupportTicketForm";
import ScheduleMeetingForm from "./forms/ScheduleMeetingForm";

const AddNewModal = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState("");

  const addNewOptions = [
    {
      type: "task",
      title: "New Task",
      description: "Create a new task for team members",
      icon: (
        <svg
          className="w-8 h-8 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      type: "project",
      title: "New Project",
      description: "Start a new project with team members",
      icon: (
        <svg
          className="w-8 h-8 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      ),
    },
    {
      type: "employee",
      title: "Add Employee",
      description: "Add a new team member to the organization",
      icon: (
        <svg
          className="w-8 h-8 text-purple-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
    {
      type: "client",
      title: "New Client",
      description: "Add a new client to the system",
      icon: (
        <svg
          className="w-8 h-8 text-orange-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
    },
    {
      type: "ticket",
      title: "Support Ticket",
      description: "Create a new support ticket",
      icon: (
        <svg
          className="w-8 h-8 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
        </svg>
      ),
    },
    {
      type: "meeting",
      title: "Schedule Meeting",
      description: "Schedule a new team meeting",
      icon: (
        <svg
          className="w-8 h-8 text-indigo-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const handleOptionClick = (type) => {
    setSelectedType(type);
  };

  const handleBackToOptions = () => {
    setSelectedType("");
  };

  const handleClose = () => {
    setSelectedType("");
    onClose();
  };

  const renderForm = () => {
    switch (selectedType) {
      case "task":
        return <NewTaskForm onClose={handleClose} />;
      case "project":
        return <NewProjectForm onClose={handleClose} />;
      case "employee":
        return <AddEmployeeForm onClose={handleClose} />;
      case "client":
        return <NewClientForm onClose={handleClose} />;
      case "ticket":
        return <SupportTicketForm onClose={handleClose} />;
      case "meeting":
        return <ScheduleMeetingForm onClose={handleClose} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {selectedType && (
                  <button
                    onClick={handleBackToOptions}
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {selectedType ? "Create New Item" : "Add New Item"}
                </h3>
              </div>
              <button
                onClick={handleClose}
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

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 px-4 pb-4 sm:p-6">
            {selectedType ? (
              renderForm()
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addNewOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => handleOptionClick(option.type)}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors text-left"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">{option.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {option.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewModal;
