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
import { FaGoogle } from "react-icons/fa6";

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

        <div className="px-6 space-y-4">
          {/* Google OAuth button - above email form */}

          {/* Email / Password Form */}
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-lg outline-none"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="h-10 rounded-md border border-input bg-transparent px-3 py-2 text-lg outline-none"
            />

            <div className="flex items-center justify-between">
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                size="lg"
                className="w-full cursor-pointer"
              >
                {mode === "signin" ? "Continue" : "Create account"}
              </Button>
            </div>

            {/* Divider */}
            <hr className="my-4 border-t border-gray-200" />

            <Button
              type="button"
              size="lg"
              className="w-full flex items-center justify-center gap-2 mb-4 cursor-pointer"
              onClick={handleGoogle}
              disabled={isSubmitting}
            >
              <FaGoogle />
              Continue with Google
            </Button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-t border-gray-200" />

        {/* Mode toggle link */}
        <div className="text-center text-sm text-muted-foreground">
          {mode === "signin" ? (
            <span>
              Don&apos;t have an account?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-black font-bold hover:underline cursor-pointer"
              >
                Sign up
              </span>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <span
                onClick={() => setMode("signin")}
                className="text-black font-bold hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
