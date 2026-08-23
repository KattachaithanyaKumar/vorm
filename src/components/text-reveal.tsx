"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type TextRevealProps = {
  lines: string[]
  className?: string
  charClassName?: string
  duration?: number
  stagger?: number
  startDelay?: number
}

export function TextReveal({
  lines,
  className,
  charClassName,
  duration = 650,
  stagger = 26,
  startDelay = 0,
}: TextRevealProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true))
      return () => cancelAnimationFrame(id)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -15% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  let charIndex = 0

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {line.split(" ").map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((char) => {
                    const delay = startDelay + charIndex++ * stagger
                    return (
                      <span
                        key={delay}
                        className={cn(
                          "inline-block will-change-transform",
                          inView ? "animate-text-rise" : "opacity-0",
                          charClassName
                        )}
                        style={{
                          animationDuration: `${duration}ms`,
                          animationDelay: `${delay}ms`,
                        }}
                      >
                        {char}
                      </span>
                    )
                  })}
                </span>{" "}
              </React.Fragment>
            ))}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    </span>
  )
}
