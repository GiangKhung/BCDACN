import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  useEffect(() => {
    const isLight = theme === "light";
    document.body.classList.toggle("light", isLight);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return { theme, setTheme };
}

export default function Layout({ children }) {
  const { theme, setTheme } = useTheme();
  const toggle = () => setTheme(theme === "light" ? "dark" : "light");
  return (
    <div>
      <header className="container header">
        <Link to="/" className="brand">
          BDS
        </Link>
        <nav className="nav">
          <Link to="/">Trang chu</Link>
          <Link to="/admin">Quan tri</Link>
          <button className="btn" onClick={toggle}>
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </nav>
      </header>
      <main>{children}</main>
      <footer
        className="container muted"
        style={{
          marginTop: 40,
          paddingTop: 16,
          borderTop: "1px solid var(--border)",
        }}
      >
        © {new Date().getFullYear()} BDS. All rights reserved.
      </footer>
    </div>
  );
}

