import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask } from "../redux/slices/membersSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);

  const [formData, setFormData] = useState({
    memberId: "",
    title: "",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.memberId || !formData.title || !formData.dueDate) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(
      addTask({
        memberId: formData.memberId,
        task: {
          title: formData.title,
          dueDate: formData.dueDate,
          assignedBy: "Team Lead",
        },
      })
    );

    // Reset form
    setFormData({
      memberId: "",
      title: "",
      dueDate: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Assign New Task
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="memberId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Team Member
          </label>
          <select
            id="memberId"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select a team member</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Assign Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
