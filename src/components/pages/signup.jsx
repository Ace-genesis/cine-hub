import { Link } from "react-router-dom";
import {
  User,
  Eye,
  EyeClosed,
  Mail,
  Lock,
  CircleX,
  CircleAlert,
} from "lucide-react";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");

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

    setError("");
    if (!validate()) return;

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
    }
  };

  return (
    <main className="auth-main">
      <Link to={"/"} className="skip-link">
        Skip
      </Link>

      <header className="auth-header">
        <h1>
          Cine<span className="name-span">Hub</span>
        </h1>
        <small className="small-text">Discover. Watch. Explore.</small>
      </header>

      <article className="auth-article">
        <section className="nav-section">
          <Link
            to={"/signin"}
            className={`nav ${location.pathname === "/signin" && "active"}`}
          >
            Sign In
          </Link>
          <Link
            to={"/signup"}
            className={`nav ${location.pathname === "/signup" && "active"}`}
          >
            Sign Up
          </Link>
        </section>
        {authError && (
          <div className="auth-error">
            <CircleAlert />
            <p>{authError.message}</p>
          </div>
        )}
        <form className="auth-form" onSubmit={handleSignUp}>
          <div>
            <div className="input-wrapper">
              <User size={20} color="#ff45456e" />

              <label htmlFor="name"></label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {error.name && (
              <div className="input-error">
                <CircleX size={15} color="red" />
                <p>{error.name}</p>
              </div>
            )}
          </div>

          <div>
            <div className="input-wrapper">
              <Mail size={20} color="#ff45456e" />

              <label htmlFor="email"></label>
              <input
                type="text"
                placeholder="Email address"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error.email && (
              <div className="input-error">
                <CircleX size={15} color="red" />
                <p>{error.email}</p>
              </div>
            )}
          </div>

          <div>
            <div className="input-wrapper relative">
              <Lock size={20} color="#ff45456e" />
              <label htmlFor="password"></label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="eye-btn"
                type="button"
                onClick={() => {
                  setShowPassword((current) => !current);
                }}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            {error.password && (
              <div className="input-error">
                <CircleX size={15} color="red" />
                <p>{error.password}</p>
              </div>
            )}
          </div>

          <div>
            <div className="input-wrapper relative">
              <Lock size={20} color="#ff45456e" />
              <label htmlFor="confirm-password"></label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="eye-btn"
                type="button"
                onClick={() => {
                  setShowConfirmPassword((current) => !current);
                }}
              >
                {showConfirmPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
            {error.confirmPassword && (
              <div className="input-error">
                <CircleX size={15} color="red" />
                <p>{error.confirmPassword}</p>
              </div>
            )}
          </div>

          <section className="remember-section">
            <div className="remember">
              <input type="checkbox" name="remember" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <Link>Forgot password?</Link>
          </section>

          <button className="primary-btn auth-btn">Sign Up</button>
        </form>

        <section className="alt-signin">
          <hr />
          <span>or continue with</span>
          <hr />
          <div></div>
        </section>

        <p>
          Don't have an account? <Link>Sign up</Link>
        </p>
      </article>
    </main>
  );
}

export default SignUp;
