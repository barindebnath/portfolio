import { useInView } from "framer-motion";
import { useRef } from "react";

interface UseScrollRevealOptions {
  once?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { once = true } = options;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once });
  return { ref, isInView };
}
