
interface ButtonDarkModProps {
  theme: string;
  toggleTheme: () => void;
}

function ButtonDarkMod({ theme, toggleTheme }: ButtonDarkModProps) {
  return (
    <button className="theme-switch" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Mode sombre" : "☀️ Mode clair"}
    </button>
  );
}

function ButtonDelete() {
  return (
    <button className="delete-button">Supprimer
    </button>
  )
}
export { ButtonDarkMod, ButtonDelete };