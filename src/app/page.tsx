"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard",
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="p-8 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Login with Magic Link</h1>
      {sent ? (
        <p>Check your email for a login link</p>
      ) : (
        <>
          <input
            className="border p-2 mb-2 w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <button
            className="bg-blue-600 text-white p-2 rounded w-full"
            onClick={handleLogin}
          >
            Send Magic Link
          </button>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </>
      )}
    </div>
  );
}
