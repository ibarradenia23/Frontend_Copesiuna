import { useState, useEffect } from "react";
import { Moon, Sun, Cloud, Eye, EyeOff } from "lucide-react";

import { ToogleThemeButton } from "./common/components/ToogleTheme";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sunPosition, setSunPosition] = useState(0);
  const [moonPosition, setMoonPosition] = useState(-100);
  const [cloudPosition, setCloudPosition] = useState(0);

  const savedTheme = localStorage.getItem("color-theme");

  useEffect(() => {
    
    const initialDarkMode = savedTheme === "dark";
    setIsDarkMode(initialDarkMode);
    if (initialDarkMode) {
      document.documentElement.classList.add("dark");
    }
    updateCelestialPositions(initialDarkMode);
  }, [savedTheme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCloudPosition((prev) => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const updateCelestialPositions = (isDark: boolean) => {
    if (isDark) {
      setSunPosition(-100);
      setMoonPosition(0);
    } else {
      setSunPosition(0);
      setMoonPosition(-100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inicio de sesión con:", email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    updateCelestialPositions(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center overflow-hidden ${
        isDarkMode ? "bg-gray-900" : "bg-[#F4E0D0]"
      } transition-colors duration-1000 z-0`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Sol */}
        <div
          className="absolute w-20 h-20 bg-[#D27E2C] rounded-full transition-all duration-1000 ease-in-out"
          style={{
            top: "10%",
            left: "10%",
            transform: `translateY(${sunPosition}vh)`,
            boxShadow: isDarkMode
              ? "none"
              : "0 0 60px 30px rgba(210, 126, 44, 0.3)",
          }}
        />
        {/* Luna */}
        <div
          className="absolute w-16 h-16 bg-gray-200 rounded-full transition-all duration-1000 ease-in-out"
          style={{
            top: "10%",
            right: "10%",
            transform: `translateY(${moonPosition}vh)`,
            boxShadow: isDarkMode
              ? "0 0 20px 10px rgba(255, 255, 255, 0.2)"
              : "none",
          }}
        />
        {/* Nubes */}
        <Cloud
          className="absolute text-white text-opacity-80 transition-all duration-100 ease-linear"
          style={{
            top: "20%",
            left: `${cloudPosition}%`,
            fontSize: "100px",
          }}
        />
        <Cloud
          className="absolute text-white text-opacity-80 transition-all duration-100 ease-linear"
          style={{
            top: "40%",
            left: `${(cloudPosition + 50) % 100}%`,
            fontSize: "80px",
          }}
        />
      </div>
      <div className="z-50 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <div className="flex justify-between">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h5>
            <ToogleThemeButton />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ms-auto text-sm text-primary hover:underline dark:text-primary"
            >
              Lost Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary hover:bg-[#8C541D] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-[#8C541D] dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
         
        </form>
      </div>
    </div>
  );
}

export default App;
