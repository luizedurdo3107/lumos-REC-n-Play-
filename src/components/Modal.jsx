import { useEffect, useRef } from "react";
import { Button } from "./UI";
export function Modal({
  title,
  children,
  onClose,
  wide = false,
  className = "",
}) {
  const dialog = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className={`dialog ${wide ? "dialog-wide" : ""} ${className}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) {
          const bounds = dialog.current.getBoundingClientRect();
          if (
            e.clientX < bounds.left ||
            e.clientX > bounds.right ||
            e.clientY < bounds.top ||
            e.clientY > bounds.bottom
          )
            onClose();
        }
      }}
      aria-label={title}
    >
      <div className="dialog-top">
        <span className="eyebrow">{title}</span>
        <Button
          variant="icon"
          icon="close"
          aria-label="Fechar janela"
          onClick={onClose}
        />
      </div>
      {children}
    </dialog>
  );
}
