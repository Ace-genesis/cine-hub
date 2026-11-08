import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
  User,
} from "lucide-react";
import { useState, useContext } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { AppContext } from "../../../context/AppContext";
import { SocialIcon, GooglePlayIcon } from "../../socialIcons";
import SignInBg from "../../../assets/sign-in-bg.png";

function InputField({
  leftIcon,
  placeholder,
  state,
  setState,
  showState,
  setShowState,
  rightIcon,
  secondRightIcon,
  error,
  setError,
  errorKey,
}) {
  const Icon = leftIcon;
  const Right = rightIcon;
  const SecondRight = secondRightIcon;
  return (
    <div>
      <div
        className={`bg-elevated border-border border flex items-center p-2 rounded-md focus-within:border focus-within:border-focus gap-1 ${error[errorKey] && !state ? "border-error" : ""} input`}
      >
        <Icon size={20} color="var(--color-secondary)" />
        <label htmlFor={errorKey}></label>
        <input
          type={
            showState === undefined ? "text" : showState ? "text" : "password"
          }
          placeholder={placeholder}
          name={errorKey}
          className="bg-transparent active:bg-tranparent border-0 text-primary w-full focus:outline-none"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setError((prev) => ({ ...prev, [errorKey]: null }));
          }}
        />
        {setShowState && (
          <button
            className="bg-transparent flex border-0"
            type="button"
            onClick={() => setShowState((current) => !current)}
          >
            {showState ? (
              <Right color="var(--color-secondary)" />
            ) : (
              <SecondRight color="var(--color-secondary)" />
            )}
          </button>
        )}
      </div>
      {error[errorKey] && (
        <div className="flex items-center mt-2 text-fluid-sm gap-1">
          <CircleX size={15} className="text-error" />
          <p className="text-error">{error[errorKey]}</p>
        </div>
      )}
    </div>
  );
}

function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({});
  const [authError, setAuthError] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const { setIsSignedIn } = useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();

  const isSignedIn = location.pathname === "/signin";

  const clearStates = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError({});
    setAuthError("");
  };

  const validateSignIn = () => {
    const newError = {};
    if (!email) {
      newError.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newError.email = "Enter a valid email address";
    }
    if (!password) {
      newError.password = "Password is required";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const validateSignUp = () => {
    const newError = {};

    if (!name.trim()) {
      newError.name = "Full name is required";
    }
    if (!email.trim()) {
      newError.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
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

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (isBtnDisabled) return;

    if (!validateSignIn()) return setIsBtnDisabled(false);

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (isBtnDisabled) return;

    setError({});
    if (!validateSignUp()) return;

    setIsBtnDisabled(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name.trim(),
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
    <main className="flex flex-col items-center justify-start h-screen sm:justify-center relative text-primary">
      <picture className="absolute inset-0 w-full opacity-50 object-fill border">
        <img src={SignInBg} alt="" />
      </picture>
      <div className="border border-border p-6 flex flex-col gap-6 bg-surface w-full sm:max-w-90 h-full sm:h-auto relative rounded-md">
        <Link to={"/"} className="absolute right-3 top-3 text-secondary">
          Skip
        </Link>

        <header className="flex flex-col items-center justify center mt-2">
          <Link to={"/"} className="flex items-center gap-2">
            <Play fill="var(--color-brand)" color="var(--color-brand)" />
            <h1 className="font-bold text-3xl ">
              Cine<span className="text-brand">Hub</span>
            </h1>
          </Link>

          <small className="text-secondary">Discover. Watch. Explore.</small>
        </header>

        <article className="flex flex-col gap-5">
          <section className="flex gap-2  ">
            <NavLink
              to={"/signin"}
              onClick={clearStates}
              className={({ isActive }) =>
                ` flex-1 flex justify-center py-2 ${isActive ? "border-b-2 border-b-brand" : ""}`
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to={"/signup"}
              onClick={clearStates}
              className={({ isActive }) =>
                ` flex-1 flex justify-center py-2 ${isActive ? "border-b-2 border-b-brand" : ""}`
              }
            >
              Sign Up
            </NavLink>
          </section>
          {authError && (
            <div className="border-error-border text-error flex items-center gap-2 p-2 rounded-md bg-error-bg">
              <CircleAlert />
              <p>{authError.message}</p>
            </div>
          )}
          <form
            className="flex flex-col gap-4"
            onSubmit={isSignedIn ? handleSignIn : handleSignUp}
          >
            {!isSignedIn && (
              <InputField
                leftIcon={User}
                placeholder={"Name"}
                state={name}
                setState={setName}
                error={error}
                setError={setError}
                errorKey={"name"}
              />
            )}

            <InputField
              leftIcon={Mail}
              placeholder={"Email address"}
              state={email}
              setState={setEmail}
              error={error}
              setError={setError}
              errorKey={"email"}
            />

            <InputField
              leftIcon={Lock}
              placeholder={"Password"}
              state={password}
              setState={setPassword}
              showState={showPassword}
              setShowState={setShowPassword}
              error={error}
              setError={setError}
              rightIcon={Eye}
              secondRightIcon={EyeClosed}
              errorKey={"password"}
            />

            {!isSignedIn && (
              <InputField
                leftIcon={Lock}
                placeholder={"Confirm Password"}
                state={confirmPassword}
                setState={setConfirmPassword}
                showState={showConfirmPassword}
                setShowState={setShowConfirmPassword}
                error={error}
                setError={setError}
                rightIcon={Eye}
                secondRightIcon={EyeClosed}
                errorKey={"confirmPassword"}
              />
            )}
            <section className="flex gap-4 text-fluid-sm justify-between items-center">
              <div className="flex gap-2">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" className="text-secondary">
                  Remember me
                </label>
              </div>

              <Link className="text-brand">Forgot password?</Link>
            </section>
            <button className="btn-primary p-2 gap-2 " disabled={isBtnDisabled}>
              {isBtnDisabled ? (
                <>
                  <LoaderCircle className="animate-spin" />{" "}
                  {isSignedIn ? "Signing In..." : "Signing Up..."}
                </>
              ) : (
                <>
                  {isSignedIn ? "Sign In" : "Sign Up"} <MoveRight />
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

export default AuthPage;
