import { getAdminUsers } from "../../_actions/getAdminAllUsers";
import AdminUsersList from "../../_components/AdminUsersList";

export default async function AllUsersPage() {
  const response = await getAdminUsers();
  
  const users = Array.isArray(response) 
    ? response 
    : response?.data || response?.users || [];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      <AdminUsersList initialUsers={users} />
    </div>
  );
}