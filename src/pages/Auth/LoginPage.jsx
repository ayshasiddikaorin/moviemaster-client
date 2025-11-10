// src/pages/Auth/LoginPage.jsx
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      toast.success("Login Successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Google Login Success!");
      navigate("/");
    } catch (err) {
      toast.error("Google Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-700 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-orange-500/30 rounded-3xl p-8 shadow-2xl transform transition-all hover:scale-105 duration-300">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              MovieMaster Pro
            </h1>
            <p className="text-orange-300 text-sm mt-2">Welcome Back, Cinephile!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                })}
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" }
                })}
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-orange-800"></div>
            <span className="px-3 text-orange-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-orange-800"></div>
          </div>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full py-3 bg-white/10 border border-orange-500 text-orange-300 font-medium rounded-xl hover:bg-orange-500/20 transition-all transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <img src="https://cdn-icons-png.flaticon.com/32/281/281764.png" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>

          <p className="text-center text-orange-300 text-sm mt-6">
            New here?{" "}
            <Link to="/register" className="text-orange-500 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;