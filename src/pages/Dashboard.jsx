import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import MemberDashboard from "./MemberDashboard";

const Dashboard = () => {
  const { currentRole } = useSelector((state) => state.role);

  // Render appropriate dashboard based on role
  return currentRole === "lead" ? <AdminDashboard /> : <MemberDashboard />;
};

export default Dashboard;
