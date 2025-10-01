import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NotificationModal from "../components/NotificationModal";
import AddNewModal from "../components/AddNewModal";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { switchRole, toggleDarkMode } from "../redux/slices/roleSlice";
import { logout } from "../redux/slices/authSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, isDarkMode } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.members);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false);

  // Calculate real data from Redux state
  const totalTasks = members.reduce(
    (sum, member) => sum + member.tasks.length,
    0
  );
  const completedTasks = members.reduce(
    (sum, member) => sum + member.tasks.filter((task) => task.completed).length,
    0
  );
  const activeTasks = totalTasks - completedTasks;
  const totalMembers = members.length;

  // Employee data for line chart (showing task completion over time)
  const employeeData = [
    { name: "0 Jan", value: Math.floor(totalTasks * 0.8) },
    { name: "31 Jan", value: Math.floor(totalTasks * 0.7) },
    { name: "22 Feb", value: Math.floor(totalTasks * 0.6) },
    { name: "15 Mar", value: Math.floor(totalTasks * 0.75) },
    { name: "05 Apr", value: Math.floor(totalTasks * 0.65) },
    { name: "26 Apr", value: Math.floor(totalTasks * 0.8) },
    { name: "17 May", value: Math.floor(totalTasks * 0.9) },
    { name: "08 Jun", value: totalTasks },
    { name: "29 Jun", value: Math.floor(totalTasks * 0.85) },
    { name: "20 Jul", value: Math.floor(totalTasks * 0.95) },
  ];

  // Gender data based on actual members
  const genderData = [
    {
      name: "Women",
      value:
        members.filter(
          (m) =>
            m.name.includes("Alice") ||
            m.name.includes("Sarah") ||
            m.name.includes("Emma")
        ).length || Math.floor(totalMembers * 0.3),
      color: "#ec4899",
    },
    {
      name: "Men",
      value:
        totalMembers -
        (members.filter(
          (m) =>
            m.name.includes("Alice") ||
            m.name.includes("Sarah") ||
            m.name.includes("Emma")
        ).length || Math.floor(totalMembers * 0.3)),
      color: "#3b82f6",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-purple-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-purple-800">
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-900"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Team Pulse</h1>
          </Link>
        </div>

        {/* My-Task Button */}
        <div className="p-4">
          <Link
            to="/tasks"
            className="w-full bg-purple-800 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
            <span>My-Task</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-3 px-3 py-2 text-purple-200 hover:bg-purple-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className="flex items-center space-x-3 px-3 py-2 text-purple-200 hover:bg-purple-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tickets"
                className="flex items-center space-x-3 px-3 py-2 text-purple-200 hover:bg-purple-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                </svg>
                <span>Tickets</span>
              </Link>
            </li>
            <li>
              <Link
                to="/clients"
                className="flex items-center space-x-3 px-3 py-2 text-purple-200 hover:bg-purple-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span>Our Clients</span>
              </Link>
            </li>
            <li>
              <Link
                to="/employees"
                className="flex items-center space-x-3 px-3 py-2 bg-purple-800 rounded-lg text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span>Employees</span>
              </Link>
            </li>
            <li>
              <Link
                to="/accounts"
                className="flex items-center space-x-3 px-3 py-2 text-purple-200 hover:bg-purple-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 14a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
                <span>Accounts</span>
              </Link>
            </li>
            <li>
              <Link
                to="/payroll"
                className="flex items-center space-x-3 px-3 py-2 text-purple-200 hover:bg-purple-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                <span>Payroll</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-purple-800">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-200">Enable Dark Mode!</span>
              <button
                onClick={() => {
                  dispatch(toggleDarkMode());
                  document.documentElement.classList.toggle("dark");
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDarkMode ? "bg-purple-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDarkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-200">Enable RTL Mode!</span>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-64 px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Role Switch Button */}
                <button
                  onClick={() => {
                    dispatch(switchRole("member"));
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Switch to Member View
                </button>

                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex -space-x-2">
                    <img
                      src="https://randomuser.me/api/portraits/men/1.jpg"
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/women/1.jpg"
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <img
                      src="https://randomuser.me/api/portraits/men/2.jpg"
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  </div>
                  <button
                    onClick={() => setIsAddNewModalOpen(true)}
                    className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setIsNotificationModalOpen(true)}
                    className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors relative"
                  >
                    <svg
                      className="w-5 h-5 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    {/* Notification badge */}
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentUser}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Admin Profile
                    </p>
                  </div>
                  <img
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => dispatch(logout())}
                  className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
          <div className="space-y-6">
            {/* Employees Info Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Employees Info
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={employeeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#f97316"
                      strokeWidth={2}
                      dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Applications Card */}
              <div className="bg-blue-600 text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">26060</p>
                    <p className="text-blue-100">Applications</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Interviews Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      5670
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Interviews
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <svg
                    className="w-16 h-8 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
              </div>

              {/* Hired Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      2415
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">Hired</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <svg
                    className="w-16 h-8 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Employees Availability */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Employees Availability
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-6 h-6 text-green-600 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Attendance
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      2511
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Late Coming
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      156
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-6 h-6 text-red-600 dark:text-red-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Absent
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      89
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-6 h-6 text-blue-600 dark:text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V9h-5v2zM9 9H4v2h5V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Leave Apply
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      20
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Employees */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Total Employees
                </h3>
                <div className="text-center">
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    6021
                  </p>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={genderData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          dataKey="value"
                        >
                          {genderData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Women
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Man
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Interviews */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Upcoming Interviews
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://randomuser.me/api/portraits/men/2.jpg"
                      alt="Peter Piperg"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Peter Piperg
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Web Design
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>9.00 - 11:30 AM</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://randomuser.me/api/portraits/women/1.jpg"
                      alt="Natalie Gibson"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Natalie Gibson
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Ui/UX Designer
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>1.30 - 3:30 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
      <AddNewModal
        isOpen={isAddNewModalOpen}
        onClose={() => setIsAddNewModalOpen(false)}
      />
    </div>
  );
};

export default AdminDashboard;
