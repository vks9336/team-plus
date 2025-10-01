import { useSelector, useDispatch } from "react-redux";
import { updateMemberStatus } from "../redux/slices/membersSlice";

const StatusSelector = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.role);
  const members = useSelector((state) => state.members.members);

  // Find current user's member data
  const currentMember = members.find((member) => member.name === currentUser);

  if (!currentMember) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Update Status
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          User not found in team members list.
        </p>
      </div>
    );
  }

  const statusOptions = [
    {
      value: "working",
      label: "Working",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "bg-green-500 hover:bg-green-600",
      description: "Currently working on tasks",
    },
    {
      value: "meeting",
      label: "In Meeting",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      ),
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Attending a meeting",
    },
    {
      value: "break",
      label: "On Break",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      color: "bg-yellow-500 hover:bg-yellow-600",
      description: "Taking a break",
    },
    {
      value: "offline",
      label: "Offline",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
            clipRule="evenodd"
          />
          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
        </svg>
      ),
      color: "bg-gray-500 hover:bg-gray-600",
      description: "Currently offline",
    },
  ];

  const handleStatusChange = (status) => {
    dispatch(
      updateMemberStatus({
        memberId: currentMember.id,
        status,
      })
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Update Your Status
      </h3>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Current status:{" "}
          <span className="font-medium capitalize text-gray-900 dark:text-white">
            {currentMember.status}
          </span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Last updated: {new Date(currentMember.lastActive).toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              currentMember.status === option.value
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg text-white ${option.color}`}>
                {option.icon}
              </div>
              <div className="text-left">
                <p
                  className={`font-medium ${
                    currentMember.status === option.value
                      ? "text-primary-700 dark:text-primary-300"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {option.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {option.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <svg
            className="w-5 h-5 text-blue-500 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              Auto-reset feature
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Your status will automatically reset to "Offline" after 10 minutes
              of inactivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSelector;
