import { createSlice, createSelector } from "@reduxjs/toolkit";

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Initial mock data
const initialMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    status: "working", // 'working', 'break', 'meeting', 'offline'
    lastActive: new Date().toISOString(),
    tasks: [
      {
        id: generateId(),
        title: "Complete user authentication",
        dueDate: "2024-01-15",
        progress: 75,
        completed: false,
        assignedBy: "Team Lead",
      },
      {
        id: generateId(),
        title: "Update documentation",
        dueDate: "2024-01-20",
        progress: 30,
        completed: false,
        assignedBy: "Team Lead",
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    status: "meeting",
    lastActive: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    tasks: [
      {
        id: generateId(),
        title: "Design new dashboard",
        dueDate: "2024-01-18",
        progress: 90,
        completed: false,
        assignedBy: "Team Lead",
      },
    ],
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@company.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    status: "break",
    lastActive: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    tasks: [],
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    status: "offline",
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    tasks: [
      {
        id: generateId(),
        title: "Code review for PR #123",
        dueDate: "2024-01-12",
        progress: 100,
        completed: true,
        assignedBy: "Team Lead",
      },
    ],
  },
];

const membersSlice = createSlice({
  name: "members",
  initialState: {
    members: initialMembers,
    filter: "all", // 'all', 'working', 'break', 'meeting', 'offline'
    sortBy: "name", // 'name', 'tasks', 'status'
    autoResetTimer: null,
  },
  reducers: {
    updateMemberStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        member.status = status;
        member.lastActive = new Date().toISOString();
      }
    },
    addTask: (state, action) => {
      const { memberId, task } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        member.tasks.push({
          id: generateId(),
          ...task,
          progress: 0,
          completed: false,
        });
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, progress } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        const task = member.tasks.find((t) => t.id === taskId);
        if (task) {
          task.progress = Math.max(0, Math.min(100, progress));
          task.completed = task.progress === 100;
        }
      }
    },
    toggleTaskCompletion: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        const task = member.tasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
          // If marking as completed, set progress to 100%
          if (task.completed) {
            task.progress = 100;
          }
        }
      }
    },
    deleteTask: (state, action) => {
      const { memberId, taskId } = action.payload;
      const member = state.members.find((m) => m.id === memberId);
      if (member) {
        member.tasks = member.tasks.filter((t) => t.id !== taskId);
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    addMember: (state, action) => {
      const newMember = {
        id: generateId(),
        ...action.payload,
        status: "offline",
        lastActive: new Date().toISOString(),
        tasks: [],
      };
      state.members.push(newMember);
    },
    removeMember: (state, action) => {
      state.members = state.members.filter((m) => m.id !== action.payload);
    },
    setAutoResetTimer: (state, action) => {
      state.autoResetTimer = action.payload;
    },
    resetInactiveMembers: (state) => {
      const now = new Date();
      const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

      state.members.forEach((member) => {
        const lastActive = new Date(member.lastActive);
        if (lastActive < tenMinutesAgo && member.status !== "offline") {
          member.status = "offline";
        }
      });
    },
  },
});

export const {
  updateMemberStatus,
  addTask,
  updateTaskProgress,
  toggleTaskCompletion,
  deleteTask,
  setFilter,
  setSortBy,
  addMember,
  removeMember,
  setAutoResetTimer,
  resetInactiveMembers,
} = membersSlice.actions;

// Selectors
export const selectAllMembers = (state) => state.members.members;

export const selectFilteredMembers = createSelector(
  [selectAllMembers, (state) => state.members.filter],
  (members, filter) => {
    if (filter === "all") return members;
    return members.filter((member) => member.status === filter);
  }
);

export const selectSortedMembers = createSelector(
  [selectFilteredMembers, (state) => state.members.sortBy],
  (members, sortBy) => {
    return [...members].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "tasks":
          return (
            b.tasks.filter((t) => !t.completed).length -
            a.tasks.filter((t) => !t.completed).length
          );
        case "status":
          const statusOrder = { working: 0, meeting: 1, break: 2, offline: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return 0;
      }
    });
  }
);

export const selectMemberById = (state, memberId) =>
  state.members.members.find((member) => member.id === memberId);

export const selectStatusSummary = createSelector(
  [selectAllMembers],
  (members) => {
    return {
      working: members.filter((m) => m.status === "working").length,
      meeting: members.filter((m) => m.status === "meeting").length,
      break: members.filter((m) => m.status === "break").length,
      offline: members.filter((m) => m.status === "offline").length,
      total: members.length,
    };
  }
);

export default membersSlice.reducer;
