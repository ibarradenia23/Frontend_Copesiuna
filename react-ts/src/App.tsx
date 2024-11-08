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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const initialDarkMode = savedTheme === "dark";
    setIsDarkMode(initialDarkMode);
    if (initialDarkMode) {
      document.documentElement.classList.add("dark");
    }
    updateCelestialPositions(initialDarkMode);
  }, []);

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
    <>
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <div className="flex justify-between">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h5>
            <ToogleThemeButton />
          </div>

          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                for="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{" "}
            <a
              href="#"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
