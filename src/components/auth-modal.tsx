"use client"

import { useState, useEffect } from "react"

import { useSupabase } from "@/lib/supabase/use-supabase"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AuthModal({
  isOpen,
  onToggle,
}: {
  isOpen: boolean
  onToggle: (open: boolean) => void
}) {
  const { supabase, user, loading } = useSupabase()

  // When user is already logged in, show welcome and close button, don't render modal
  if (user) {
    return (
      <p className="text-green-600 fixed top-4 left-4">
        Welcome, {user.email || "user"}! 
        <Button size="sm" onClick={() => onToggle(false)} className="inline">
          Close
        </Button>
      </p>
    )
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        onClick={() => onToggle(false)}
        role="presentation"
      >
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Modal itself - pointer-events contained */}
          <div
            className="relative bg-white rounded-2xl w-full max-w-md mx-4 sm:max-w-md shadow-2xl transform transition-all duration-300 sm:scale-100"
            style={{ transform: isOpen ? "scale(1)" : "scale(0.96)" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6 space-y-4">

              {/* Email Form */}
              <div className="space-y-4">
                <Input
                  placeholder="Email"
                  value=""
                  onChange={(e) => {}}
                  disabled={loading}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value=""
                  onChange={(e) => {}}
                  disabled={loading}
                />
                <Button type="submit" className="w-full">
                  Sign In with Email
                </Button>
              </div>

              {/* Divider */}
              <hr className="my-4 border-t border-gray-200" />

              {/* Google Form */}
              <Button
                type="button"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => {
                  const { error } = supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                      redirectTo: `${window.location.origin}/auth/callback`,
                    },
                  })
                  if (error) {
                    // Show error somewhere - for now just log
                    console.error(error.message)
                  }
                }}
                disabled={loading}
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M22.54 2.73a5.94 5.94 0 0 0-4.2 .94H2c-.58.21-.93.56-.93.88 0 .31.12.62.12.93v12.25c0 .31.12.62.12.93v1.46h5.96l-.41 4.61a2.06 2.06 0 0 0 .6 1.81h2.12a2.06 2.06 0 0 0 1.83-.6l.42-4.61h5.96a2.06 2.06 0 0 0 1.83-.6l.41-4.61h2.08a1.03 1.03 0 0 0 .75-.26 1.03 1.03 0 0 0-.13-.95l-4.95-3.24a1.06 1.06 0 0 0-.6-.57l-5.26 0a1.06 1.06 0 0 0-.6.57l-4.95 3.24a1.03 1.03 0 0 0-.13.95H2.08a2.06 2.06 0 0 0-1.83.6l-.42 4.61H5.96a2.06 2.06 0 0 0-.6 1.81l-.41 4.61c0 .31.12.62.12.93v12.25c0 .31.12.62.12.93h2.57a5.97 5.97 0 0 0 4.2-.94l4.38-3.07a1.14 1.14 0 0 0 0-1.82zM7.53 9.28a2.49 2.49 0 1 1 0-4.98 2.49 2.49 0 0 1 0 4.98zM7.53 15.72a2.49 2.49 0 1 1 0-4.98 2.49 2.49 0 0 1 0 4.98zM2.08 9.58a1.03 1.03 0 1 1 0-2.06 1.03 1.03 0 0 1 0 2.06zM2.08 14.06a1.03 1.03 0 1 1 0-2.06 1.03 1.03 0 0 1 0 2.06zM15.65 5.73a1.06 1.06 0 0 1 .6.57l4.95 3.24a1.03 1.03 0 0 1 .13.95H18.88a1.03 1.03 0 1 1-.75-.26l-3.42-2.24a1.06 1.06 0 0 1-.6-.57l-5.26 0a1.06 1.06 0 0 1-.6-.57l-4.95-3.24a1.03 1.03 0 0 1-.13-.95H15.65z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}