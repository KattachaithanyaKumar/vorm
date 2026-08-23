"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useSupabase } from "@/lib/supabase/use-supabase";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthModal({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}) {
  const router = useRouter();
  const { supabase, user } = useSupabase();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (mode === "signin") {
        await supabase.auth.signInWithPassword({ email, password });
      } else {
        await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
      }
      onToggle(false);
      if (mode === "signin") {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setIsSubmitting(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Google sign in failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogContent>
        <div className="p-6 space-y-4">
          <DialogTitle>
            {mode === "signin" ? "Sign in to Vorm" : "Create your account"}
          </DialogTitle>
        </div>

        <div className="p-6 space-y-4">
          {/* Google OAuth button - above email form */}

          {/* Email / Password Form */}
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />

            <div className="flex items-center justify-between">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full"
              >
                {mode === "signin" ? "Continue" : "Create account"}
              </Button>
            </div>

            {/* Divider */}
            <hr className="my-4 border-t border-gray-200" />

            <Button
              type="button"
              className="w-full flex items-center justify-center gap-2 mb-4"
              onClick={handleGoogle}
              disabled={isSubmitting}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 8.5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zM12 4.23c-2.06 0-3.75 1.32-3.95 3h1.99c-.2 1.68.87 3.05 2.5 3.65v.06c0 .31.06.62.16.93L12 17.77l7.3-5.05c.1-.31.16-.62.16-.93V7.23c1.87-2.68 1.53-3.01 2.5-3.69H15.95c.2 1.36-.93 2.74-2.5 3.65l-.02.03-.01.03c-.24.16-.51.26-.75.26H15.5c.03 0 .05 0 .07 0l.02-.03c.24-.16.47-.26.75-.26l.01-.03c1.57-1.06 2.3-2.45 2.5-3.69v-.06c1.57-1.06 2.3-2.45 2.5-3.69H15.5c.03 0 .05 0 .07 0l.02-.03c.24-.16.47-.26.75-.26l.01-.03c1.57-1.06 2.3-2.45 2.5-3.69H15.5c.03 0 .05 0 .07 0l.02-.03c.24-.16.47-.26.75-.26l.01-.03c1.57-1.06 2.3-2.45 2.5-3.69H12zm0 9.75c-2.2 0-4 1.78-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-t border-gray-200" />

        {/* Mode toggle link */}
        <div className="text-center text-sm text-muted-foreground">
          {mode === "signin" ? (
            <span onClick={() => setMode("signup")}>
              Don&apos;t have an account? Sign up
            </span>
          ) : (
            <span onClick={() => setMode("signin")}>
              Already have an account? Sign in
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
