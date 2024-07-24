import { useNavigate } from "react-router-dom";
import DataTable from "../components/admin/dashboard/DataTable";

export default function Dashboard() {
  const navigate = useNavigate()

  if(!localStorage.getItem('login')){
    console.log('under', localStorage.getItem('login'))
    navigate('/login')
  }
  return (
    <div className="w-full">
      <div className="text-lg font-semibold">All Travel Requests</div>
      <hr className="my-4" />
      <div>
        <DataTable />
      </div>
    </div>
  );
}
