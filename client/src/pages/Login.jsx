import { Mail, User2Icon, Lock, ArrowLeftIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import api from "../configs/api"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../app/Features/authSlice"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import AuthSkeleton from "../Component/skeleton/AuthSkeleton"

const passwordChecks = {
  length: (p) => p.length >= 8,
  upper: (p) => /[A-Z]/.test(p),
  lower: (p) => /[a-z]/.test(p),
  number: (p) => /\d/.test(p),
  special: (p) => /[@$!%*?&]/.test(p)
}

const Login = () => {
  const query = new URLSearchParams(window.location.search)
  const { loading } = useSelector((state) => state.auth);
const isOnline = useSelector((state) => state.network.isOnline);

  const urlState = query.get("state")?.toLowerCase()
  const navigate = useNavigate()

  const [state, setState] = useState(urlState || "login")
  const [verifying, setVerifying] = useState(false)

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  // ---------------- VERIFY EMAIL ----------------
  const verifyEmail = async () => {
    const token = query.get("token")
    if (!token) return

    try {
      setVerifying(true)
      const { data } = await api.get(`/api/users/verify-email?token=${token}`)
      toast.success("Email verified 🎉 Please login")
      setState("login") 
      window.history.replaceState({}, "", "/login")

    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification failed")
    } finally {
      setVerifying(false)
    }
  }

  useEffect(() => {
    if (state === "verify") verifyEmail()
    // eslint-disable-next-line
  }, [state])

  // ---------------- FORM SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post(`/api/users/${state}`, formData)
      

      if (state === "login") {
        localStorage.setItem("token", data.token)
        dispatch(login({ token: data.token, user: data.user }))
        toast.success("Login successful")
        navigate("/app")
      }

      if (state === "register") {
        toast.success("Verification link sent to your email 📩")
        setState("login")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (loading || !isOnline) {
  return <AuthSkeleton showNameField={state === "register"} />;
}


  // ---------------- VERIFY SCREEN ----------------
  if (state === "verify") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white px-10 py-8 rounded-2xl shadow text-center animate-pulse">
          <h2 className="text-xl font-semibold">Verifying your email...</h2>
          <p className="text-gray-500 mt-2">Please wait a moment</p>
        </div>
      </div>
    )
  }

  // ---------------- PASSWORD STRENGTH ----------------
  const password = formData.password
  const checks = {
    length: passwordChecks.length(password),
    upper: passwordChecks.upper(password),
    lower: passwordChecks.lower(password),
    number: passwordChecks.number(password),
    special: passwordChecks.special(password)
  }

  // ---------------- LOGIN / REGISTER FORM ----------------
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6'>
        <Link to='/' className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-500 transition-all'>
          <ArrowLeftIcon className="size-4" />Back
        </Link>
      </div>


      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="sm:w-87.5 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white animate-fadeIn"
        >
          <h1 className="text-gray-900 text-3xl mt-10 font-medium">
            {state === "login" ? "Login" : "Sign up"}
          </h1>

          <p className="text-gray-500 text-sm mt-2">
            Please {state} to continue
          </p>

          {state === "register" && (
            <div className="flex items-center mt-6 w-full border h-12  rounded-full pl-6 gap-2">
              <User2Icon size={16} />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="focus:outline-none outline-none"
                required
              />
            </div>
          )}

          <div className="flex items-center mt-4 w-full border h-12 rounded-full pl-6 gap-2">
            <Mail size={16} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="focus:outline-none outline-none"
              required
            />
          </div>

          <div className="flex items-center mt-4 w-full border h-12 rounded-full pl-6 gap-2">
            <Lock size={16} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="focus:outline-none outline-none"
              required
            />
          </div>

          {/* 🔐 Forgot Password (ONLY on login) */}
          {state === "login" && (
            <p
              className="text-right text-sm text-green-600 mt-2 cursor-pointer hover:underline"
              onClick={() => toast("Forgot password flow coming soon 🔐")}
            >
              Forgot password?
            </p>
          )}

          {/* 🔒 Live Password Hints (ONLY on register) */}
          {state === "register" && (
            <div className="mt-3 text-left text-xs space-y-1 transition-all">
              {Object.entries({
                "8+ characters": checks.length,
                "Uppercase letter": checks.upper,
                "Lowercase letter": checks.lower,
                "Number": checks.number,
                "Special character": checks.special
              }).map(([label, ok]) => (
                <p
                  key={label}
                  className={`flex items-center gap-1 transition-all duration-300 ${ok ? "text-green-600" : "text-gray-400"
                    }`}
                >
                  {ok ? "✔" : "•"} {label}
                </p>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full h-11 rounded-full text-white bg-green-500 hover:bg-green-600 transition"
          >
            {state === "login" ? "Login" : "Sign up"}
          </button>

          <p
            onClick={() => setState(state === "login" ? "register" : "login")}
            className="text-sm mt-3 mb-11 cursor-pointer"
          >
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span className="text-green-500 ml-1">Click here</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
