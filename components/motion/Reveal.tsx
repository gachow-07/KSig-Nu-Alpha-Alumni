"use client";

import { createElement, type CSSProperties, type HTMLAttributes, type JSX, type ReactNode } from "react";
import { useInView } from "@/lib/motion";

type Direction = "up" | "left" | "right" | "pop" | "fade" | "none";

type Props = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  /** HTML element to render, e.g. "li" or "section". Defaults to "div". */
  as?: keyof JSX.IntrinsicElements;
  /** Wait this many milliseconds after scrolling into view (for one-after-another effects). */
  delay?: number;
  /**
   * Which way it moves as it appears: "up" (default), "left", "right",
   * "pop" (small scale-in), "fade" (opacity only), or "none" (stays put, but
   * children with data-anim still animate).
   */
  direction?: Direction;
  /** Content, or a function that receives whether the element has been seen. */
  children?: ReactNode | ((inView: boolean) => ReactNode);
};

/** Fades its content in the first time it scrolls into view. Styles live in app/globals.css. */
export default function Reveal({ as = "div", delay = 0, direction = "up", style, children, ...rest }: Props) {
  const [ref, inView] = useInView<HTMLElement>();

  return createElement(
    as,
    {
      ...rest,
      ref,
      "data-reveal": direction,
      "data-shown": inView ? "" : undefined,
      style: { ...style, "--reveal-delay": `${delay}ms` } as CSSProperties,
    },
    typeof children === "function" ? children(inView) : children,
  );
}
