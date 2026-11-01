import { Link } from "react-router-dom";
import {
  Eye,
  EyeClosed,
  Mail,
  Lock,
  CircleX,
  CircleAlert,
  Play,
  MoveRight,
  LoaderCircle,
} from "lucide-react";
import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabaseClient";
import { AppContext } from "../../../context/AppContext";
import { SocialIcon, GooglePlayIcon } from "../../socialIcons";
import SignInBg from "../../../assets/sign-in-bg.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
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

    if (isBtnDisabled) console.log("double click");

    if (!validate()) return setIsBtnDisabled(false);

    setIsBtnDisabled(true);

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
    } finally {
      setIsBtnDisabled(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-start h-screen sm:justify-center relative">
      <picture className="absolute inset-0 w-full opacity-50 object-fill border">
        <img src={SignInBg} alt="" />
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
          <section className="flex gap-2  ">
            <Link
              to={"/signin"}
              className={` flex-grow flex justify-center py-2 ${location.pathname === "/signin" && "border-bottom-brand"}`}
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className=" flex-grow flex justify-center py-2"
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
          <form className="flex flex-col gap-6" onSubmit={handleSignIn}>
            <div>
              <div
                className={`bg-elevated flex items-center p-2 rounded-md gap-1 input ${error.email && !email ? "border-error" : ""}`}
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
                className={`bg-elevated flex items-center p-2 rounded-md gap-1 ${error.password && !password ? "border-error" : ""} input`}
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
              {error.password && (
                <div className="flex items-center mt-2 text-fluid-sm gap-1">
                  <CircleX size={15} className="text-error" />
                  <p className="text-error">{error.password}</p>
                </div>
              )}
            </div>

            <section className="flex gap-4 text-fluid-sm justify-between items-center">
              <div className="flex gap-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="text-secondary">
                  Remember me
                </label>
              </div>

              <Link className="text-brand">Forgot password?</Link>
            </section>

            <button className="primary-btn " disabled={isBtnDisabled}>
              {isBtnDisabled ? (
                <>
                  <LoaderCircle className="spin" /> Signing In...
                </>
              ) : (
                <>
                  Sign In <MoveRight />
                </>
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
              <button className="bg-transparent border-0 text-primary">
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
            <Link to={"/signup"} className="text-brand">
              Sign up
            </Link>
          </p>
        </article>
      </div>
    </main>
  );
}

export default SignIn;
