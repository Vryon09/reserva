import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const API_BASE_URL = import.meta.env.VITE_API_URL;

//Make this look more professional and improve functionality, change the static user and password
function AdminLogin() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard");
      return;
    }
  }, [navigate]);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.trim(), password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid Credentials");
        return;
      }

      toast.success("Logged in successfully.");

      localStorage.setItem("adminToken", data.token);

      navigate("/admin/dashboard");
    } catch (err) {
      toast.error("Logging in unsuccessful.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="px-4">
      <form
        className="m-auto flex max-w-[400px] flex-col items-baseline gap-4 rounded-3xl px-6 py-4 shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
        onSubmit={handleLogin}
      >
        <p className="text-xl font-semibold">Admin Login</p>
        <div className="mb-2 flex w-full flex-col gap-0.5">
          <label>User</label>
          <input
            required
            disabled={isLoading}
            type="text"
            className="input-normal w-full"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-0.5">
          <label>Password</label>
          <input
            required
            disabled={isLoading}
            type="password"
            className="input-normal w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mt-2 flex w-full justify-end">
          <Button disabled={isLoading} type="primary">
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin;
