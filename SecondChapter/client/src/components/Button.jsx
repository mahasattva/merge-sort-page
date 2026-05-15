export default function Button({ children, variant = 'primary', disabled, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
