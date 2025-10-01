import { useSelector, useDispatch } from "react-redux";
import {
  updateTaskProgress,
  toggleTaskCompletion,
  deleteTask,
} from "../redux/slices/membersSlice";

const TaskList = ({ memberId }) => {
  const dispatch = useDispatch();
  const { currentRole } = useSelector((state) => state.role);
  const member = useSelector((state) =>
    state.members.members.find((m) => m.id === memberId)
  );

  if (!member) return null;

  const handleProgressChange = (taskId, newProgress) => {
    dispatch(
      updateTaskProgress({
        memberId: member.id,
        taskId,
        progress: newProgress,
      })
    );
  };

  const handleToggleCompletion = (taskId) => {
    dispatch(
      toggleTaskCompletion({
        memberId: member.id,
        taskId,
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(
        deleteTask({
          memberId: member.id,
          taskId,
        })
      );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const isOverdue = (dueDate) => {
    return (
      new Date(dueDate) < new Date() &&
      new Date(dueDate).toDateString() !== new Date().toDateString()
    );
  };

  if (member.tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          My Tasks
        </h3>
        <div className="text-center py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            No tasks
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {currentRole === "lead"
              ? "Assign tasks to team members"
              : "You have no assigned tasks"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        My Tasks ({member.tasks.filter((task) => !task.completed).length}{" "}
        active)
      </h3>

      <div className="space-y-4">
        {member.tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg border ${
              task.completed
                ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                : isOverdue(task.dueDate)
                ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                : "bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompletion(task.id)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <h4
                    className={`font-medium ${
                      task.completed
                        ? "text-green-800 dark:text-green-200 line-through"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {task.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Due: {formatDate(task.dueDate)}
                  {isOverdue(task.dueDate) && !task.completed && (
                    <span className="ml-2 text-red-600 dark:text-red-400 font-medium">
                      (Overdue)
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Assigned by: {task.assignedBy}
                </p>
              </div>

              {currentRole === "lead" && (
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  title="Delete task"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progress
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {task.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                    task.progress
                  )}`}
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>

            {/* Progress Controls */}
            {currentRole === "member" && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Adjust progress:
                </span>
                <div className="flex space-x-1">
                  {[0, 25, 50, 75, 100].map((progress) => (
                    <button
                      key={progress}
                      onClick={() => handleProgressChange(task.id, progress)}
                      disabled={task.completed}
                      className={`px-2 py-1 text-xs rounded ${
                        task.completed
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                          : task.progress === progress
                          ? "bg-primary-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                      }`}
                    >
                      {progress}%
                    </button>
                  ))}
                </div>
              </div>
            )}

            {task.completed && (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Task Completed</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
