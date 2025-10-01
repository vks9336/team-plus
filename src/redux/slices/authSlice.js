import { createSlice } from "@reduxjs/toolkit";

// Mock user database - in a real app, this would come from an API
const mockUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    name: "Admin User",
    role: "lead",
    email: "admin@teampulse.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    username: "john",
    password: "john123",
    name: "John Doe",
    role: "member",
    email: "john@teampulse.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    username: "alice",
    password: "alice123",
    name: "Alice Johnson",
    role: "member",
    email: "alice@teampulse.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 4,
    username: "bob",
    password: "bob123",
    name: "Bob Smith",
    role: "member",
    email: "bob@teampulse.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 5,
    username: "sarah",
    password: "sarah123",
    name: "Sarah Wilson",
    role: "member",
    email: "sarah@teampulse.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    currentUser: null,
    users: mockUsers,
    loginError: null,
    isLoading: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.loginError = null;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      state.isLoading = false;
      state.loginError = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.isLoading = false;
      state.loginError = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.loginError = null;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.loginError = null;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  addUser,
  updateUser,
  deleteUser,
} = authSlice.actions;

// Async action for login
export const login = (credentials) => async (dispatch, getState) => {
  dispatch(loginStart());

  try {
    const { users } = getState().auth;
    const user = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );

    if (user) {
      // Remove password from user object before storing
      const { password, ...userWithoutPassword } = user;
      dispatch(loginSuccess(userWithoutPassword));
      return { success: true, payload: userWithoutPassword };
    } else {
      dispatch(loginFailure("Invalid username or password"));
      return { success: false, error: "Invalid username or password" };
    }
  } catch (error) {
    dispatch(loginFailure("Login failed. Please try again."));
    return { success: false, error: "Login failed. Please try again." };
  }
};

export default authSlice.reducer;
