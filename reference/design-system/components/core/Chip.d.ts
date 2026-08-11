export interface ChipProps {
  children: React.ReactNode;
  /** Toggled state — fills sun-yellow when selected. */
  selected?: boolean;
  onClick?: () => void;
}
