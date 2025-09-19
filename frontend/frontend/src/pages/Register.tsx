import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      setMsg("✅ Registered successfully!");
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
        <h2 className="text-xl font-bold">Register</h2>
        <input
          name="username"
          placeholder="Username"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          className="border p-2 w-full"
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Register
        </button>
        <p>{msg}</p>
      </form>
    </div>
  );
}
