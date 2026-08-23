"use client"

import { useState } from "react"
import { useSupabase } from "@/lib/supabase/use-supabase"
import { Button } from "@/components/ui/button"

const Dashboard = () => {
  const { supabase } = useSupabase()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    try {
      await supabase.auth.signOut()
      // Redirect to login page or home
      window.location.href = "/"
    } catch (err) {
      console.error("Sign out error", err)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Button
        onClick={handleSignOut}
        disabled={isLoggingOut}
        className="mt-4"
      >
        {isLoggingOut ? "Signing out..." : "Sign Out"}
      </Button>
    </div>
  )
}

export default Dashboard;
