// src/pages/Auth/RegisterPage.jsx
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { register: authRegister, googleLogin, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authRegister(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL || "https://i.ibb.co/0jK6Z3t/user.png");
      toast.success("Registration Successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Google Registration Success!");
      navigate("/");
    } catch (err) {
      toast.error("Google Registration Failed");
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
            <p className="text-orange-300 text-sm mt-2">Join the Cinematic Revolution!</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input
                {...register("photoURL")}
                type="url"
                placeholder="Photo URL (optional)"
                className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
              />
            </div>

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

            <div>
              <input
                {...register("confirmPassword", {
                  required: "Confirm password",
                  validate: (value) => value === password || "Passwords don't match"
                })}
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-white/10 border border-orange-500/50 rounded-xl text-white placeholder-orange-300 focus:outline-none focus:border-orange-300 transition"
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Register"}
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
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;