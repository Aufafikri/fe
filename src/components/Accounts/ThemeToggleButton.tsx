import React from "react";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <h1 className="mt-3 font-semibold">Theme</h1>
      <div className="flex items-center gap-2 mt-2">
        <span>Light</span>
        <Switch
          checked={theme === "dark"}
          onCheckedChange={toggleTheme}
          className="flex-shrink-0"
        />
        <span>Dark</span>
      </div>
    </>
  );
};

export default ThemeToggleButton;
