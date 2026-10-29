import { Link } from "react-router-dom";
import { Eye, EyeClosed, Mail, Lock, CircleX, CircleAlert } from "lucide-react";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { AppContext } from "../../context/AppContext";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");
  const { setIsSignedIn } = useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();

  const validate = () => {
    const newError = {};
    if (!email) {
      newError.email = "Email address is required";
    } else if (!/[^\s@]+@[^\s@]+\.[^\s@]+$/) {
      newError.email = "Enter a valid email address";
    }
    if (!password) {
      newError.password = "Password is required";
    } else if (password.length < 8) {
      newError.password = "Password must be at least 8 characters long";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.session) {
        setIsSignedIn(true);
        navigate("/");
      }
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
        <form className="auth-form" onSubmit={handleSignIn}>
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

          <section className="remember-section">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <Link>Forgot password?</Link>
          </section>

          <button className="primary-btn auth-btn">Sign In</button>
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

export default SignIn;
