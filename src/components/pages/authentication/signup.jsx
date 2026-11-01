import { Link } from "react-router-dom";
import {
  User,
  Eye,
  EyeClosed,
  Mail,
  Lock,
  CircleX,
  CircleAlert,
  Play,
  LoaderCircle,
} from "lucide-react";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";

import { SocialIcon, GooglePlayIcon } from "../../socialIcons";
import SignUpBg from "../../../assets/sign-up-bg.png";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  const location = useLocation();

  const validate = () => {
    const newError = {};

    if (!name.trim()) {
      newError.name = "Full name is required";
    }
    if (!email.trim()) {
      newError.email = "Email address is required";
    } else if (!/[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newError.email = "Please enter a valid email address";
    }
    if (!password) {
      newError.password = "Password is required";
    } else if (password.length < 8) {
      newError.password = "Password must be at least 8 characters long";
    }
    if (!confirmPassword) {
      newError.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (isBtnDisabled) return;

    setError("");
    if (!validate()) return;

    setIsBtnDisabled(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        option: {
          data: {
            fullname: name,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      console.log(data);
    } catch (error) {
      setAuthError(error);
    } finally {
      setIsBtnDisabled(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen sm:justify-center relative p-0 sm:py-8">
      <picture className="absolute inset-0 w-full opacity-50 object-fill border">
        <img src={SignUpBg} alt="" />
      </picture>

      <div className="border p-6 flex flex-col gap-6 bg-surface w-full sm:max-w-200 h-full sm:h-auto relative rounded-md">
        <Link to={"/"} className="absolute right-15 top-15 text-secondary">
          Skip
        </Link>
        <header className="flex flex-col items-center justify center mt-2">
          <Link to={"/"} className="site-name">
            <h1 className="">
              <Play fill="var(--brand-color)" color="var(--brand-color)" />
              Cine<span className="text-brand">Hub</span>
            </h1>
          </Link>

          <small className="text-secondary">Discover. Watch. Explore.</small>
        </header>

        <article className="flex flex-col gap-8">
          <section className="flex gap-2 ">
            <Link to={"/signin"} className="flex-grow flex justify-center py-2">
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className={` flex-grow flex justify-center py-2 ${location.pathname === "/signup" && "border-bottom-brand"}`}
            >
              Sign Up
            </Link>
          </section>
          {authError && (
            <div className="border-error text-error flex items-center gap-2 p-2 rounded-md bg-error">
              <CircleAlert />
              <p>{authError.message}</p>
            </div>
          )}
          <form className="flex flex-col gap-6" onSubmit={handleSignUp}>
            <div>
              <div
                className={`bg-elevated flex items-center p-2 rounded-md gap-1 input ${error.name && !name ? "border-error" : ""}`}
              >
                <User size={20} color="var(--secondary-text-color)" />

                <label htmlFor="name"></label>
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-transparent border-0 w-full text-primary"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError((prev) => ({ ...prev, name: null }));
                  }}
                />
              </div>
              {error.name && (
                <div className="flex items-center mt-2 text-fluid-sm gap-1">
                  <CircleX size={15} className="text-error" />
                  <p className="text-error">{error.name}</p>
                </div>
              )}
            </div>

            <div>
              <div
                className={` bg-elevated flex items-center p-2 rounded-md gap-1 input ${error.email && !email ? "border-error" : ""}`}
              >
                <Mail size={20} color="var(--secondary-text-color)" />

                <label htmlFor="email"></label>
                <input
                  type="text"
                  placeholder="Email address"
                  className="bg-transparent border-0 w-full text-primary"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError((prev) => ({ ...prev, email: null }));
                  }}
                />
              </div>
              {error.email && (
                <div className="flex items-center mt-2 text-fluid-sm gap-1">
                  <CircleX size={15} className="text-error" />
                  <p className="text-error">{error.email}</p>
                </div>
              )}
            </div>

            <div>
              <div
                className={`bg-elevated flex items-center p-2 rounded-md gap-1 input ${error.password && !password ? "border-error" : ""}`}
              >
                <Lock size={20} color="var(--secondary-text-color)" />
                <label htmlFor="password"></label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className="bg-transparent border-0 text-primary w-full"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError((prev) => ({ ...prev, password: null }));
                  }}
                />
                <button
                  className="bg-transparent flex border-0"
                  type="button"
                  onClick={() => {
                    setShowPassword((current) => !current);
                  }}
                >
                  {showPassword ? (
                    <Eye color="var(--secondary-text-color)" />
                  ) : (
                    <EyeClosed color="var(--secondary-text-color)" />
                  )}
                </button>
              </div>
              {error.password && !password && (
                <div className="flex items-center mt-2 text-fluid-sm gap-1">
                  <CircleX size={15} className="text-error" />
                  <p className="text-error">{error.password}</p>
                </div>
              )}
            </div>

            <div>
              <div
                className={`bg-elevated flex items-center p-2 rounded-md gap-1 input ${error.confirmPassword && !confirmPassword ? "border-error" : ""}`}
              >
                <Lock size={20} color="var(--secondary-text-color)" />
                <label htmlFor="confirm-password"></label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirm-password"
                  className="bg-transparent border-0 text-primary w-full"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError((prev) => ({ ...prev, confirmPassword: null }));
                  }}
                />
                <button
                  className="bg-transparent flex border-0"
                  type="button"
                  onClick={() => {
                    setShowConfirmPassword((current) => !current);
                  }}
                >
                  {showConfirmPassword ? (
                    <Eye color="var(--secondary-text-color)" />
                  ) : (
                    <EyeClosed color="var(--secondary-text-color)" />
                  )}
                </button>
              </div>
              {error.confirmPassword && !confirmPassword && (
                <div className="flex items-center mt-2 text-fluid-sm gap-1">
                  <CircleX size={15} className="text-error" />
                  <p className="text-error">{error.confirmPassword}</p>
                </div>
              )}
            </div>

            <section className="flex gap-4 text-fluid-sm justify-between items-center">
              <div className="flex gap-2">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember" className="text-secondary">
                  Remember me
                </label>
              </div>

              <Link className="text-brand">Forgot password?</Link>
            </section>

            <button className="primary-btn" disabled={isBtnDisabled}>
              {isBtnDisabled ? (
                <>
                  <LoaderCircle className="spin" /> Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <section className="flex flex-col gap-6">
            <div className="flex items-center justify-center gap-2">
              <span>
                <hr className=" w-16" />
              </span>

              <p className="text-secondary">or continue with</p>

              <span>
                <hr className=" w-16" />
              </span>
            </div>

            <div className="flex justify-between">
              <button className="bg-transparent border-0">
                <SocialIcon
                  platform="google"
                  background="var(--elevated-color)"
                  borderColor="var(--border-color)"
                  borderWidth={1}
                  radius={10}
                  size={38}
                  containerSize={65}
                />
              </button>

              <button className="bg-transparent border-0 text-primary">
                <SocialIcon
                  platform="apple"
                  background="var(--elevated-color)"
                  borderColor="var(--border-color)"
                  borderWidth={1}
                  radius={10}
                  size={38}
                  containerSize={65}
                />
              </button>

              <button className="bg-transparent border-0 text-primary">
                <SocialIcon
                  platform="facebook"
                  background="var(--elevated-color)"
                  borderColor="var(--border-color)"
                  borderWidth={1}
                  radius={10}
                  size={38}
                  containerSize={65}
                />
              </button>
            </div>
          </section>

          <p className="text-secondary">
            Don't have an account?{" "}
            <Link to={"/signin"} className="text-brand">
              Sign in
            </Link>
          </p>
        </article>
      </div>
    </main>
  );
}

export default SignUp;
