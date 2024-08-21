import { useRef, useState } from "react";

export function ThemeSwitcher() {
  const channelRef = useRef(new BroadcastChannel("themeModeChannel"));
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") ?? "system"
  );

  channelRef.current.onmessage = (ev) => {
    const themeMode = ev.data;
    localStorage.setItem("themeMode", themeMode);
    document.documentElement.className = themeMode;
    setThemeMode(themeMode)
  };

  function handleChange(ev) {
    channelRef.current.postMessage(ev.target.value);
    setThemeMode(ev.target.value);
  }

  return (
    <div>
      Theme Mode:
      <select value={themeMode} onChange={handleChange}>
        <option value="system">🖥️System Default</option>
        <option value="light">☀️Light</option>
        <option value="dark">🌚Dark</option>
      </select>
    </div>
  );
}
