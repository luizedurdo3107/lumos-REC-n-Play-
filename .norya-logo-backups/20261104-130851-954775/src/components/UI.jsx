import { forwardRef } from "react";
import {
  Accessibility,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Bookmark,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  Eye,
  FolderPlus,
  Gift,
  Globe2,
  GraduationCap,
  Keyboard,
  Laptop,
  Leaf,
  Lightbulb,
  MessageCircle,
  Minus,
  Moon,
  Plus,
  RotateCcw,
  Search,
  Send,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Trash2,
  Type,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
const icons = {
  accessibility: Accessibility,
  arrow: ArrowRight,
  back: ArrowLeft,
  external: ArrowUpRight,
  book: BookOpen,
  bookmark: Bookmark,
  calendar: CalendarDays,
  check: Check,
  done: CheckCheck,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  circleCheck: CircleCheck,
  help: CircleHelp,
  eye: Eye,
  folder: FolderPlus,
  gift: Gift,
  globe: Globe2,
  school: GraduationCap,
  keyboard: Keyboard,
  laptop: Laptop,
  sprout: Leaf,
  bulb: Lightbulb,
  chat: MessageCircle,
  minus: Minus,
  moon: Moon,
  plus: Plus,
  reset: RotateCcw,
  search: Search,
  send: Send,
  settings: Settings2,
  sliders: SlidersHorizontal,
  sparkles: Sparkles,
  sun: Sun,
  trash: Trash2,
  type: Type,
  volume: Volume2,
  mute: VolumeX,
  close: X,
};
export function Icon({ name, size = 22, ...props }) {
  const Component = icons[name] || Sparkles;
  return (
    <Component size={size} strokeWidth={1.7} aria-hidden="true" {...props} />
  );
}
export const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    icon,
    className = "",
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`button button-${variant} ${className}`}
      {...props}
    >
      {children}
      {icon && <Icon name={icon} size={20} />}
    </button>
  );
});
export function Pill({ children, icon, className = "" }) {
  return (
    <span className={`pill ${className}`}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </span>
  );
}
export function Heading({ label, title, children, align = "center" }) {
  return (
    <div className={`page-heading align-${align}`}>
      {label && <p className="eyebrow">{label}</p>}
      <h1 tabIndex={-1}>{title}</h1>
      {children && <p className="page-description">{children}</p>}
    </div>
  );
}
export function Feathers({ className = "" }) {
  return (
    <span className={`feathers ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}
export function Mascot({ lumos = false, className = "" }) {
  return (
    <img
      className={`mascot ${lumos ? "mascot-lumos" : "mascot-norya"} ${className}`}
      src={`${import.meta.env.BASE_URL}brand/${lumos ? "lumos" : "norya"}-mascot.png`}
      alt={
        lumos
          ? "Mascote robô original da Lumos Connect, acenando"
          : "Mascote original da Norya, um pássaro azul com a asa aberta"
      }
    />
  );
}
export function Brand({ lumos = false }) {
  return (
    <img
      className={`brand-image ${lumos ? "brand-lumos" : "brand-norya"}`}
      src={`${import.meta.env.BASE_URL}brand/${lumos ? "lumos" : "norya"}-logo.png`}
      alt={lumos ? "Lumos Connect" : "Norya, by Lumos Connect"}
    />
  );
}
export function EmptyState({ icon = "book", title, children, action }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icon name={icon} size={32} />
      </span>
      <h2>{title}</h2>
      <p>{children}</p>
      {action}
    </div>
  );
}
export function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="toggle-row">
      <span>
        <strong>{label}</strong>
        {description && <small>{description}</small>}
      </span>
      <span className="toggle">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span aria-hidden="true" />
      </span>
    </label>
  );
}
