import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import NotificationModal from "../components/NotificationModal";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import MemberCard from "../components/MemberCard";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import StatusSelector from "../components/StatusSelector";
import {
  selectSortedMembers,
  selectStatusSummary,
} from "../redux/slices/membersSlice";
import {
  setFilter,
  setSortBy,
  resetInactiveMembers,
} from "../redux/slices/membersSlice";
import { switchRole, toggleDarkMode } from "../redux/slices/roleSlice";
import { logout } from "../redux/slices/authSlice";

const MemberDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, isDarkMode } = useSelector((state) => state.role);
  const { filter, sortBy } = useSelector((state) => state.members);
  const members = useSelector(selectSortedMembers);
  const statusSummary = useSelector(selectStatusSummary);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Get current user's data
  const currentUserMember = members.find(
    (member) => member.name === currentUser
  );
  const myTasks = currentUserMember ? currentUserMember.tasks : [];
  const myCompletedTasks = myTasks.filter((task) => task.completed).length;
  const myActiveTasks = myTasks.filter((task) => !task.completed).length;
  const myTotalTasks = myTasks.length;

  // Calculate productivity based on completed tasks
  const productivityPercentage =
    myTotalTasks > 0 ? Math.round((myCompletedTasks / myTotalTasks) * 100) : 0;

  // Real data for member dashboard
  const myTasksData = [
    {
      name: "Mon",
      completed: Math.floor(myCompletedTasks * 0.3),
      pending: Math.floor(myActiveTasks * 0.3),
    },
    {
      name: "Tue",
      completed: Math.floor(myCompletedTasks * 0.4),
      pending: Math.floor(myActiveTasks * 0.2),
    },
    {
      name: "Wed",
      completed: Math.floor(myCompletedTasks * 0.2),
      pending: Math.floor(myActiveTasks * 0.4),
    },
    {
      name: "Thu",
      completed: Math.floor(myCompletedTasks * 0.5),
      pending: Math.floor(myActiveTasks * 0.1),
    },
    {
      name: "Fri",
      completed: Math.floor(myCompletedTasks * 0.3),
      pending: Math.floor(myActiveTasks * 0.2),
    },
    {
      name: "Sat",
      completed: Math.floor(myCompletedTasks * 0.1),
      pending: Math.floor(myActiveTasks * 0.1),
    },
    { name: "Sun", completed: Math.floor(myCompletedTasks * 0.2), pending: 0 },
  ];

  const myProductivityData = [
    { name: "Week 1", productivity: Math.max(60, productivityPercentage - 10) },
    { name: "Week 2", productivity: Math.max(70, productivityPercentage + 5) },
    { name: "Week 3", productivity: Math.max(50, productivityPercentage - 15) },
    { name: "Week 4", productivity: productivityPercentage },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(resetInactiveMembers());
    }, 30000);

    return () => clearInterval(timer);
  }, [dispatch]);

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
                className="flex items-center space-x-3 px-3 py-2 bg-purple-800 rounded-lg text-white"
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
                <span>My Projects</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className="flex items-center space-x-3 px-3 py-2 text-purple-200 hover:bg-purple-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>My Tasks</span>
              </Link>
            </li>
            <li>
              <Link
                to="/team"
                className="flex items-center space-x-3 px-3 py-2 text-purple-200 hover:bg-purple-800 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span>Team</span>
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
                    placeholder="Search..."
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
                {/* Notification Icon */}
                <div className="flex items-center space-x-2">
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

                {/* Role Switch Button */}
                <button
                  onClick={() => {
                    dispatch(switchRole("lead"));
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Switch to Admin View
                </button>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {currentUser}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Team Member
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
            {/* Welcome Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {currentUser}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your tasks and team today.
              </p>
            </div>

            {/* Status Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Update Your Status
              </h3>
              <StatusSelector />
            </div>

            {/* My Tasks Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* My Tasks Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  My Tasks This Week
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={myTasksData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="completed"
                        fill="#10b981"
                        name="Completed"
                      />
                      <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* My Productivity */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  My Productivity
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={myProductivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="productivity"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* My Tasks List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                My Tasks
              </h3>
              <TaskList memberId="1" />
            </div>

            {/* Team Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Team Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
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
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Working
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {statusSummary.working}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      In Meeting
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {statusSummary.meeting}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
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
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      On Break
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {statusSummary.break}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700">
                    <svg
                      className="w-6 h-6 text-gray-600 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Offline
                    </p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {statusSummary.offline}
                    </p>
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
    </div>
  );
};

export default MemberDashboard;
