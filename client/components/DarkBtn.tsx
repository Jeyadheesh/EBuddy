import { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const DarkBtn = () => {
  const [theme, setTheme] = useState<string>("light");
  const [forRender, setForRender] = useState<boolean>(true);

  useEffect(() => {
    const lsTheme = localStorage.getItem("theme");
    if (lsTheme) {
      setTheme(lsTheme);
    } else {
      setTheme("light");
    }
    // function setMode() {
    theme == "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
    // console.log(theme);
    // }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme: string = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleClick = () => {
    toggleTheme();
    setForRender((forRender) => !forRender);
  };

  return (
    <button
      onClick={handleClick}
      className="text-[1.6rem] transition-all duration-200 hover:scale-110 hover:transition-all hover:duration-200 active:scale-95 active:transition-all active:duration-200"
    >
      {theme === "dark" ? <MdOutlineLightMode fill="white" /> : <MdDarkMode />}
    </button>
  );
};

export default DarkBtn;
