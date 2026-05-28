// 시니어 접근성: 최소 높이 48px, 폰트 18px 굵게, disabled 시 시각+ARIA 표시
export default function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  type = 'button',
  onClick,
  children,
  ariaLabel,
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size === 'lg' && 'btn--lg',
    block && 'btn--block'
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
