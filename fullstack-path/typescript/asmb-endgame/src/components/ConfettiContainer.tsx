import type { JSX } from "react";
import Confetti from "react-confetti";

interface ConfettiContainerProps {
  isGameWon: boolean;
}

export default function ConfettiContainer({
  isGameWon,
}: ConfettiContainerProps): JSX.Element | null {
  if (!isGameWon) {
    return null;
  } else {
    return <Confetti recycle={false} numberOfPieces={1000} />;
  }
}
