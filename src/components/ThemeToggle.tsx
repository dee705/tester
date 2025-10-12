import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Load the saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const enableDark = saved === "dark" || (!saved && prefersDark);

    document.documentElement.classList.toggle("dark", enableDark);
    setIsDark(enableDark);
  }, []);

  // Toggle the theme and persist the choice
  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    const darkNow = html.classList.contains("dark");
    setIsDark(darkNow);
    localStorage.setItem("theme", darkNow ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="text-2xl p-2 rounded-md transition-transform hover:scale-110"
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
}
