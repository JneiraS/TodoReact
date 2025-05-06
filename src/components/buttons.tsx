interface ButtonDarkModProps {
  theme: string;
  toggleTheme: () => void;
}

function ButtonDarkMod({ theme, toggleTheme }: ButtonDarkModProps) {
  return (
    <button className="theme-switch" onClick={toggleTheme}>
      {theme === "light" ? "Mode sombre" : "Mode clair"}
    </button>
  );
}

interface ButtonDeleteProps {
  onDelete: () => void;
}

function ButtonDelete({ onDelete }: ButtonDeleteProps) {
  return (
    <button className="delete-button" onClick={(e) => {
      e.stopPropagation();
      onDelete();
    }}>
      Supprimer
    </button>
  );
}

export { ButtonDarkMod, ButtonDelete };