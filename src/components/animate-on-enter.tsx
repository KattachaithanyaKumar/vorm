"use client"

import * as React from "react"

import { gsap } from "gsap"

type AnimateOnEnterProps = {
  className?: string
  once?: boolean
  children: React.ReactNode
  delay?: number
}

export function AnimateOnEnter({
  className,
  once = true,
  children,
  delay = 0,
}: AnimateOnEnterProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)

  // Set initial hidden state synchronously on mount before any paint
  React.useLayoutEffect(() => {
    if (ref.current) {
      gsap.set(ref.current, { opacity: 0, y: 24 })
    }
  }, [])

  // IntersectionObserver to detect when element enters viewport
  React.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      requestAnimationFrame(() => setVisible(true))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [once])

  // GSAP animation when visible
  React.useEffect(() => {
    if (!visible || !ref.current) return

    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      delay: delay / 1000,
    })
  }, [visible, once, delay])

  // Cleanup animation on unmount or re-trigger
  React.useEffect(() => {
    return () => {
      // Cleanup is handled by gsap.to() being a simple tween
    }
  }, [])

  return <div ref={ref} className={className}>{children}</div>
}