export interface DieProps {
  value: number;
  isHeld: boolean;
  onHold: () => void;
}

export default function Die({ value, isHeld, onHold }: DieProps) {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <button
      style={styles}
      onClick={onHold}
      aria-pressed={isHeld}
      aria-label={`Die with value ${value},
            ${isHeld ? "held" : "not held"}`}
    >
      {value}
    </button>
  );
}
