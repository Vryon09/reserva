import { useState } from "react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_URL;

function AdminLogin() {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user.trim(), password: password.trim() }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Invalid Credentials");
      return;
    }

    localStorage.setItem("adminToken", data.token);

    navigate("/admin/dashboard");
  }

  return (
    <form
      className="m-auto flex max-w-[400px] flex-col items-baseline"
      onSubmit={handleLogin}
    >
      <p className="text-xl font-semibold">Admin Login</p>
      <div className="mb-2 flex w-full flex-col">
        <label>User</label>
        <input
          required
          type="text"
          className="input-normal w-full"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div className="flex w-full flex-col">
        <label>Password</label>
        <input
          required
          type="text"
          className="input-normal w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mt-2 flex w-full justify-end">
        <Button type="primary">Login</Button>
      </div>
    </form>
  );
}

export default AdminLogin;
