# Team Pulse Dashboard

A modern, role-based dashboard application built with React, Redux Toolkit, and Tailwind CSS for monitoring team productivity and managing tasks.

## 🚀 Features

### Core Functionality

- **Role-Based Views**: Toggle between Team Lead and Team Member perspectives
- **Real-time Status Updates**: Team members can update their working status (Working, Meeting, Break, Offline)
- **Task Management**: Team leads can assign tasks, members can track progress
- **Team Monitoring**: Visual overview of all team members and their current status

### Team Lead View

- Monitor all team member statuses with real-time updates
- Assign tasks to team members with due dates
- Filter and sort team members by status or task count
- Visual charts showing status distribution and task progress
- Direct status management for team members

### Team Member View

- Update personal working status
- View assigned tasks with progress tracking
- Update task progress in 25% increments
- Visual progress indicators and completion status

### Bonus Features

- **Dark Mode**: Toggle between light and dark themes
- **Auto-Reset**: Automatically sets inactive members to "Offline" after 10 minutes
- **Chart Visualizations**: Pie charts for status distribution and bar charts for task analytics
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional interface following modern design principles

## 🛠️ Tech Stack

- **Frontend**: React 19 with Hooks
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Build Tool**: Vite
- **Icons**: Heroicons (SVG)

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/vks9336/team-plus.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Header.jsx       # Navigation and role toggle
│   ├── MemberCard.jsx   # Team member display card
│   ├── TaskForm.jsx     # Task assignment form
│   ├── TaskList.jsx     # Task management interface
│   └── StatusSelector.jsx # Status update controls
├── pages/               # Page components
│   └── Dashboard.jsx    # Main dashboard page
├── redux/               # Redux store and slices
│   ├── store.js         # Store configuration
│   └── slices/          # Redux slices
│       ├── roleSlice.js # Role and user state
│       └── membersSlice.js # Team members and tasks
├── App.jsx              # Main app component
├── main.jsx             # App entry point
└── index.css            # Global styles
```

## 🎯 Usage

### Switching Roles

- Use the "Switch to Lead/Member View" button in the header
- The interface adapts based on your current role

### Team Lead Functions

1. **Monitor Team**: View all team members and their current status
2. **Assign Tasks**: Use the task form to assign new tasks with due dates
3. **Filter Members**: Filter by status or sort by name/tasks
4. **Manage Status**: Directly update team member statuses

### Team Member Functions

1. **Update Status**: Use the status selector to update your working status
2. **Track Tasks**: View assigned tasks and update progress
3. **Progress Updates**: Use the progress buttons to update task completion

## 🎨 Design Features

- **Modern Card-Based Layout**: Clean, organized information display
- **Status Color Coding**: Intuitive color system for different statuses
- **Responsive Grid**: Adapts to different screen sizes
- **Smooth Animations**: Subtle transitions and hover effects
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🔧 Configuration

### Customizing Team Members

Edit the `initialMembers` array in `src/redux/slices/membersSlice.js` to add or modify team members.

### Styling Customization

Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

## 📱 Responsive Design

The dashboard is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🌙 Dark Mode

Toggle dark mode using the moon/sun icon in the header. The theme preference is managed through Redux state.

## 📊 Analytics

The dashboard includes:

- Status distribution pie chart
- Task distribution bar chart
- Real-time status counters
- Progress tracking for individual tasks

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service like Netlify, Vercel, or GitHub Pages.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- Design inspiration from modern admin dashboard layouts
- Icons from Heroicons
- Charts powered by Recharts
- Built with React and Redux Toolkit best practices
