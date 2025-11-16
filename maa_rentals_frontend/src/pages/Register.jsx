// import React, { useState } from 'react'
// import api from '../services/api'
// import { useNavigate } from 'react-router-dom'

// export default function Register() {
//   const [username, setUsername] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const nav = useNavigate()

//   const submit = async (e) => {
//     e.preventDefault()
//     try {
//       await api.post('/auth/register/', { username, email, password })
//       alert('Registered — please login')
//       nav('/login')
//     } catch (err) {
//       alert('Register failed')
//     }
//   }

//   return (
//     <div className="container mx-auto mt-6 max-w-md">
//       <h3 className="text-xl mb-3">Register</h3>
//       <form onSubmit={submit}>
//         <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="form-control mb-2" required />
//         <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="form-control mb-2" required />
//         <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control mb-2" required/>
//         <button className="btn btn-primary">Register</button>
//       </form>
//     </div>
//   )
// }


import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await api.post('/auth/register/', { username, email, password })
      alert('Registered — please login')
      nav('/login')
    } catch (err) {
      setError('Registration failed. Please check your details and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full">
  {/* Fixed background */}
  <div className="fixed top-0 left-0 w-full h-full bg-[url('/car_banner.jpg')] bg-cover bg-center bg-no-repeat -z-10" />

  {/* Fixed centered form */}
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="container mx-auto max-w-md p-6 border rounded-lg shadow-lg bg-white/50 backdrop-blur-l transition-transform hover:scale-[1.01]">
      <h3 className="text-2xl font-semibold mb-4 text-center text-gray-700">Create an Account</h3>

      <form onSubmit={submit}>
        <input
          autoFocus
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="form-control mb-3 w-full p-2 border rounded"
          required
        />

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          className="form-control mb-3 w-full p-2 border rounded"
          required
        />

        <div className="relative mb-3">
          <input
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            className="form-control w-full p-2 border rounded pr-10"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-sm text-blue-500 select-none"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className={`btn btn-primary w-full py-2 rounded text-white transition-transform hover:scale-[1.02] ${loading ? "bg-gray-500" : "bg-green-600"}`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </div>
  </div>
</div>
  )
}
