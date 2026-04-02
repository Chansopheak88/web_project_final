import { useEffect, useMemo, useState } from "react";
import {
  Shield,
  Users,
  AlertTriangle,
  Activity,
  Search,
  Filter,
  RefreshCcw,
  UserCog,
  Ban,
  CheckCircle2,
  ArrowLeft,
  Trash2,
  Pencil,
  Plus,
  Lock,
  LogOut,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface AdminPageProps {
  onBackToHome?: () => void;
}

type UserStatus = "active" | "suspended" | "pending";
type UserRole = "User" | "Admin";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: UserRole | string;
  status: UserStatus;
  lastLoginAt?: string | null;
  createdAt?: string;
}

interface SecurityAlert {
  id: number;
  severity: "Low" | "Medium" | "High";
  title: string;
  detail: string;
}

interface AdminStats {
  totalUsers: number;
  activeSessions: number;
  openAlerts: number;
  moderators: number;
}

const API_BASE = "http://localhost:4000/api/v1";

export function AdminPage({ onBackToHome }: AdminPageProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [stats, setStats] = useState<AdminStats>({ totalUsers: 0, activeSessions: 0, openAlerts: 0, moderators: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminLogin, setAdminLogin] = useState({ username: "", password: "" });

  const [form, setForm] = useState({
    user_name: "",
    email: "",
    password: "",
    role: "User" as UserRole,
    status: "active" as UserStatus,
  });

  const fetchUsers = async () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("query", query.trim());
    if (statusFilter !== "all") params.set("status", statusFilter);

    const response = await fetch(`${API_BASE}/admin/users?${params.toString()}`, {
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch users");
    }

    setUsers(data.users || []);
  };

  const fetchStats = async () => {
    const response = await fetch(`${API_BASE}/admin/stats`, { credentials: "include" });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch stats");
    }
    setStats(data.stats || { totalUsers: 0, activeSessions: 0, openAlerts: 0, moderators: 0 });
  };

  const fetchAlerts = async () => {
    const response = await fetch(`${API_BASE}/admin/alerts`, { credentials: "include" });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch alerts");
    }
    setAlerts(data.alerts || []);
  };

  const loadAdminData = async () => {
    if (!isAuthorized) return;
    setIsLoading(true);
    try {
      await Promise.all([fetchUsers(), fetchStats(), fetchAlerts()]);
    } catch (error: any) {
      toast.error("Admin data error", { description: error.message || "Please login first" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAdminAccess = async () => {
      setIsCheckingAccess(true);
      try {
        const response = await fetch(`${API_BASE}/admin/access`, { credentials: "include" });
        setIsAuthorized(response.ok);
      } catch {
        setIsAuthorized(false);
      } finally {
        setIsCheckingAccess(false);
      }
    };

    checkAdminAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;
    const handler = setTimeout(() => {
      fetchUsers().catch(() => undefined);
    }, 250);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, statusFilter]);

  useEffect(() => {
    if (isAuthorized) {
      loadAdminData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const authenticateAdmin = async () => {
    if (!adminLogin.username || !adminLogin.password) {
      toast.error("Missing credentials", { description: "Username and password are required." });
      return;
    }

    setIsAuthorizing(true);
    try {
      const response = await fetch(`${API_BASE}/admin/access`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include",
        body: JSON.stringify(adminLogin),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Authentication failed");

      setIsAuthorized(true);
      toast.success("Admin access granted");
      setAdminLogin({ username: "", password: "" });
    } catch (error: any) {
      toast.error("Authentication failed", { description: error.message });
    } finally {
      setIsAuthorizing(false);
    }
  };

  const logoutAdminAccess = async () => {
    try {
      await fetch(`${API_BASE}/admin/access/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // no-op
    }
    setIsAuthorized(false);
    setUsers([]);
    setAlerts([]);
  };

  const filteredUsers = useMemo(() => users, [users]);

  const statusBadge = (status: UserStatus) => {
    if (status === "active") return "text-green-400 border-green-500/40 bg-green-500/10";
    if (status === "pending") return "text-yellow-300 border-yellow-500/40 bg-yellow-500/10";
    return "text-red-400 border-red-500/40 bg-red-500/10";
  };

  const formatLastLogin = (date?: string | null) => {
    if (!date) return "Never";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return "Never";
    return d.toLocaleString();
  };

  const createUser = async () => {
    if (!form.user_name || !form.email || !form.password) {
      toast.error("Missing fields", { description: "Name, email and password are required." });
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE}/admin/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create user");

      toast.success("User created");
      setForm({ user_name: "", email: "", password: "", role: "User", status: "active" });
      await loadAdminData();
    } catch (error: any) {
      toast.error("Create failed", { description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const updateStatus = async (id: number, status: UserStatus) => {
    try {
      const response = await fetch(`${API_BASE}/admin/users/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update status");

      toast.success(`Status changed to ${status}`);
      await loadAdminData();
    } catch (error: any) {
      toast.error("Status update failed", { description: error.message });
    }
  };

  const editUser = async (user: AdminUser) => {
    const user_name = window.prompt("Edit name", user.name);
    if (user_name === null) return;
    const email = window.prompt("Edit email", user.email);
    if (email === null) return;
    const role = window.prompt("Edit role (User, Admin)", user.role);
    if (role === null) return;

    try {
      const response = await fetch(`${API_BASE}/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "include",
        body: JSON.stringify({
          user_name,
          email,
          role,
          status: user.status,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update user");

      toast.success("User updated");
      await loadAdminData();
    } catch (error: any) {
      toast.error("Update failed", { description: error.message });
    }
  };

  const deleteUser = async (user: AdminUser) => {
    if (!window.confirm(`Delete ${user.name}?`)) return;

    try {
      const response = await fetch(`${API_BASE}/admin/users/${user.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete user");

      toast.success("User deleted");
      await loadAdminData();
    } catch (error: any) {
      toast.error("Delete failed", { description: error.message });
    }
  };

  if (isCheckingAccess) {
    return (
      <div className="min-h-screen bg-black text-green-500 flex items-center justify-center">
        <p className="font-mono text-lg">Checking admin access...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-green-500 flex items-center justify-center px-4">
        <div className="w-full max-w-md border border-green-500/30 bg-black/60 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Lock className="w-6 h-6" />
            <h1 className="font-mono text-xl font-bold">Admin Authentication</h1>
          </div>
          <p className="text-sm text-green-500/70">Enter admin credentials to access /admin.</p>
          <input
            value={adminLogin.username}
            onChange={(e) => setAdminLogin((prev) => ({ ...prev, username: e.target.value }))}
            placeholder="Username"
            className="w-full bg-black border border-green-500/30 px-3 py-2 text-sm font-mono outline-none focus:border-green-500"
          />
          <input
            value={adminLogin.password}
            onChange={(e) => setAdminLogin((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Password"
            type="password"
            className="w-full bg-black border border-green-500/30 px-3 py-2 text-sm font-mono outline-none focus:border-green-500"
          />
          <div className="flex gap-2">
            <button
              onClick={authenticateAdmin}
              disabled={isAuthorizing}
              className="flex-1 border border-green-500/40 px-3 py-2 hover:bg-green-500 hover:text-black transition disabled:opacity-50"
            >
              {isAuthorizing ? "Verifying..." : "Unlock Admin"}
            </button>
            <button
              onClick={onBackToHome}
              className="border border-green-500/40 px-3 py-2 hover:bg-green-500 hover:text-black transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-500">
      <header className="border-b border-green-500/20 px-6 md:px-8 py-4 sticky top-0 z-20 bg-black/90 backdrop-blur">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="font-mono text-2xl font-bold">ExploitX Admin Console</h1>
              <p className="text-green-500/70 text-sm font-mono">{'>'} /admin control center_</p>
            </div>
          </div>

          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-4 py-2 border border-green-500/40 hover:bg-green-500 hover:text-black transition-all font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO SITE
          </button>
          <button
            onClick={logoutAdminAccess}
            className="flex items-center gap-2 px-4 py-2 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-black transition-all font-mono text-sm"
          >
            <LogOut className="w-4 h-4" />
            LOCK ADMIN
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-10 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: stats.totalUsers.toLocaleString(), icon: <Users className="w-5 h-5" />, tint: "from-cyan-500/10 to-green-500/10" },
            { label: "Active Sessions", value: stats.activeSessions.toLocaleString(), icon: <Activity className="w-5 h-5" />, tint: "from-green-500/10 to-emerald-500/10" },
            { label: "Open Alerts", value: stats.openAlerts.toLocaleString(), icon: <AlertTriangle className="w-5 h-5" />, tint: "from-yellow-500/10 to-orange-500/10" },
            { label: "Admins", value: stats.moderators.toLocaleString(), icon: <UserCog className="w-5 h-5" />, tint: "from-purple-500/10 to-fuchsia-500/10" },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className={`border border-green-500/30 bg-gradient-to-br ${item.tint} p-5`}
            >
              <div className="flex items-center justify-between mb-3 text-green-400">
                {item.icon}
                <button onClick={loadAdminData} className="opacity-50 hover:opacity-100 transition-opacity">
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-400 text-sm">{item.label}</p>
              <p className="text-3xl font-bold font-mono text-white mt-1">{isLoading ? "..." : item.value}</p>
            </motion.div>
          ))}
        </section>

        <section className="border border-green-500/30 bg-black/50 p-5">
          <h2 className="font-mono text-lg font-bold mb-3">Create User</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <input
              value={form.user_name}
              onChange={(e) => setForm((prev) => ({ ...prev, user_name: e.target.value }))}
              placeholder="Name"
              className="bg-black border border-green-500/30 px-3 py-2 text-sm font-mono outline-none focus:border-green-500"
            />
            <input
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Email"
              className="bg-black border border-green-500/30 px-3 py-2 text-sm font-mono outline-none focus:border-green-500"
            />
            <input
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="Password"
              type="password"
              className="bg-black border border-green-500/30 px-3 py-2 text-sm font-mono outline-none focus:border-green-500"
            />
            <select
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value as UserRole }))}
              className="bg-black border border-green-500/30 px-3 py-2 text-sm font-mono outline-none focus:border-green-500"
            >
              <option>User</option>
              <option>Admin</option>
            </select>
            <button
              onClick={createUser}
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-3 py-2 border border-green-500/40 hover:bg-green-500 hover:text-black disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {isSaving ? "Saving..." : "Create"}
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 border border-green-500/30 bg-black/50">
            <div className="p-5 border-b border-green-500/20 flex flex-wrap gap-3 justify-between items-center">
              <h2 className="font-mono text-xl font-bold">User Management</h2>
              <div className="flex gap-2 items-center">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-green-500/60" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search users"
                    className="bg-black border border-green-500/30 pl-9 pr-3 py-2 text-sm font-mono outline-none focus:border-green-500"
                  />
                </div>
                <div className="relative">
                  <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-green-500/60" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as UserStatus | "all")}
                    className="bg-black border border-green-500/30 pl-9 pr-3 py-2 text-sm font-mono outline-none focus:border-green-500"
                  >
                    <option value="all">All status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left font-mono text-sm">
                <thead className="text-green-400/80 border-b border-green-500/20">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Last Login</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-green-500/10 hover:bg-green-500/5">
                      <td className="py-3 px-4">
                        <p className="text-white">{user.name}</p>
                        <p className="text-green-500/60 text-xs">{user.email}</p>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{user.role}</td>
                      <td className="py-3 px-4">
                        <span className={`capitalize px-2 py-1 text-xs border ${statusBadge(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300">{formatLastLogin(user.lastLoginAt)}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateStatus(user.id, "active")}
                            title="Set active"
                            className="px-2 py-1 text-xs border border-green-500/30 hover:border-green-400"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => updateStatus(user.id, "suspended")}
                            title="Suspend"
                            className="px-2 py-1 text-xs border border-red-500/30 text-red-400 hover:border-red-400"
                          >
                            <Ban className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => editUser(user)}
                            title="Edit"
                            className="px-2 py-1 text-xs border border-blue-500/30 text-blue-300 hover:border-blue-400"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteUser(user)}
                            title="Delete"
                            className="px-2 py-1 text-xs border border-red-500/30 text-red-400 hover:border-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td className="py-6 px-4 text-gray-400" colSpan={5}>
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border border-green-500/30 bg-black/50">
            <div className="p-5 border-b border-green-500/20">
              <h2 className="font-mono text-xl font-bold">Security Alerts</h2>
            </div>
            <div className="p-5 space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="border border-green-500/20 p-4 bg-black/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-white">{alert.title}</span>
                    <span className="text-xs px-2 py-1 border border-green-500/30 text-green-400">{alert.severity}</span>
                  </div>
                  <p className="text-xs text-gray-400">{alert.detail}</p>
                </div>
              ))}
              {alerts.length === 0 && <p className="text-sm text-gray-500">No alerts.</p>}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
