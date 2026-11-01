import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaApple,
} from "react-icons/fa6";

import { FcGoogle } from "react-icons/fc";
import { SiAppstore } from "react-icons/si";

const brands = {
  facebook: FaFacebookF,
  x: FaXTwitter,
  instagram: FaInstagram,
  youtube: FaYoutube,
  google: FcGoogle,
  appstore: SiAppstore,
  apple: FaApple,
};

export function SocialIcon({
  platform,
  color,
  background = "transparent",
  borderColor = "transparent",
  borderWidth = 0,
  size = 24,
  containerSize = 44,
  radius = 8,
  className = "",
  style = {},
}) {
  const Icon = brands[platform];

  if (!Icon) {
    throw new Error(`Unknown social platform: ${platform}`);
  }

  const originalColors = ["google", "appstore"].includes(platform);

  const iconColor =
    color ?? (platform === "appstore" ? "#0D96F6" : "currentColor");

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: containerSize,
        height: containerSize,
        flexShrink: 0,
        color: iconColor,
        background,
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: radius,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <Icon
        size={size}
        color={originalColors ? undefined : iconColor}
        aria-hidden="true"
      />
    </span>
  );
}

export function GooglePlayIcon({
  background = "transparent",
  borderColor = "transparent",
  borderWidth = 0,
  size = 44,
  radius = 8,
  className = "",
  style = {},
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        flexShrink: 0,
        background,
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: radius,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <svg
        width={size * 0.58}
        height={size * 0.58}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        role="img"
        aria-label="Google Play"
      >
        <defs>
          <linearGradient
            id="google-play-blue"
            x1="3"
            y1="2"
            x2="14"
            y2="12"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00A0FF" />
            <stop offset="1" stopColor="#0066DA" />
          </linearGradient>

          <linearGradient
            id="google-play-green"
            x1="3.5"
            y1="2.5"
            x2="17.5"
            y2="18"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#00D26A" />
            <stop offset="1" stopColor="#00A857" />
          </linearGradient>

          <linearGradient
            id="google-play-yellow"
            x1="14"
            y1="9"
            x2="5"
            y2="21"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FFD500" />
            <stop offset="1" stopColor="#FFB900" />
          </linearGradient>

          <linearGradient
            id="google-play-red"
            x1="12"
            y1="12"
            x2="21"
            y2="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#FF3A44" />
            <stop offset="1" stopColor="#C31162" />
          </linearGradient>
        </defs>

        <path
          d="M3.55 2.25C3.2 2.62 3 3.18 3 3.92v16.16c0 .74.2 1.3.55 1.67L13.2 12 3.55 2.25Z"
          fill="url(#google-play-blue)"
        />

        <path
          d="m16.65 8.55-3.45 3.45 3.45 3.45 4.1-2.32c1.1-.63 1.1-1.63 0-2.26l-4.1-2.32Z"
          fill="url(#google-play-red)"
        />

        <path
          d="m3.55 2.25 13.1 7.5-3.45 3.45L3.55 2.25Z"
          fill="url(#google-play-green)"
        />

        <path
          d="m3.55 21.75 13.1-7.5-3.45-3.45L3.55 21.75Z"
          fill="url(#google-play-yellow)"
        />
      </svg>
    </span>
  );
}
