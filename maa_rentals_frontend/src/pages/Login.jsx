// import React, { useState } from 'react'
// import api from '../services/api'
// import { useNavigate } from 'react-router-dom'

// export default function Login() {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [showPassword, setShowPassword] = useState(false)
//   const [remember, setRemember] = useState(false)
//   const nav = useNavigate()

//   const submit = async (e) => {
//     e.preventDefault()
//     setError(null)
//     setLoading(true)
//     try {
//       const res = await api.post('/auth/login/', { username, password })

//       if (remember) {
//         localStorage.setItem('access_token', res.data.access)
//         localStorage.setItem('refresh_token', res.data.refresh)
//       } else {
//         sessionStorage.setItem('access_token', res.data.access)
//         sessionStorage.setItem('refresh_token', res.data.refresh)
//       }

//       alert('Login Successful')
//       nav('/')
//     } catch (err) {
//       setError('Invalid username or password. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="relative min-h-screen w-full">
//   {/* Fixed background */}
//   <div className="fixed top-0 left-0 w-full h-full bg-[url('/Bike_Banner.jpg')] bg-cover bg-center bg-no-repeat -z-10" />

//   {/* Fixed centered login box */}
//   <div className="fixed inset-0 flex items-center justify-center">
//     <div className="container mx-auto max-w-md p-6 border rounded-lg shadow-lg bg-white/50 backdrop-blur-l transition-transform hover:scale-[1.01]">
//       <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">Login</h3>
      
//       <form onSubmit={submit}>
//         <input
//           autoFocus
//           placeholder="Username"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//           className="form-control mb-3 w-full p-2 border rounded"
//           required
//         />

//         <div className="relative mb-3">
//           <input
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             type={showPassword ? "text" : "password"}
//             className="form-control w-full p-2 border rounded pr-10"
//             required
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-2.5 cursor-pointer text-sm text-blue-500 select-none"
//           >
//             {showPassword ? "Hide" : "Show"}
//           </span>
//         </div>

//         <label className="flex items-center mb-3 text-sm text-gray-600">
//           <input
//             type="checkbox"
//             checked={remember}
//             onChange={() => setRemember(!remember)}
//             className="mr-2"
//           />
//           Remember me
//         </label>

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <button
//           type="submit"
//           className={`btn btn-primary w-full py-2 rounded text-white transition-transform hover:scale-[1.02] ${loading ? "bg-gray-500" : "bg-blue-600"}`}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <p className="text-center text-sm text-gray-600 mt-4">
//         Forgot your password?{" "}
//         <a href="/reset-password" className="text-blue-600 hover:underline">Reset it</a>
//       </p>
//     </div>
//   </div>
// </div>

//   )
// }



import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post("/auth/login/", { username, password });
      const { access, refresh } = res.data;

      if (remember) {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
      } else {
        sessionStorage.setItem("access_token", access);
        sessionStorage.setItem("refresh_token", refresh);
      }

      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (e) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Background Image */}
      <div className="fixed top-0 left-0 w-full h-full bg-[url('/Bike_Banner.jpg')] bg-cover bg-center bg-no-repeat -z-10" />
      <form
        onSubmit={submit}
        className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80 sm:w-96 flex flex-col"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Welcome Back
        </h2>

        <input
          type="text"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type="password"
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <label className="flex items-center text-sm mb-3">
          <input
            type="checkbox"
            className="mr-2"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember me
        </label>

        {error && (
          <p className="text-red-600 font-medium mb-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white transition transform ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
            }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          New User?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline"
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
