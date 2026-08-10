export const Button = ({ className = "", children = "Button", ...props }) => {
  return (
    <span className="rainbow-border-glow">
      <button className={`rainbow-border-button ${className}`} {...props}>
        {children}
      </button>
    </span>
  );
};
