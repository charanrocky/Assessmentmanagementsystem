import { useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setMsg("❌ " + err.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80 space-y-3"
      >
        <h2 className="text-xl font-bold">Login</h2>
        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Login
        </button>
        <p>{msg}</p>
      </form>
    </div>
  );
}
