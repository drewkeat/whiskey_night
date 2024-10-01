"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";

const SessionContext = createContext<Session | null>(null);

interface SessionContextProviderProps {
  children: React.ReactNode;
}

export default function SessionContextProvider({
  children,
}: SessionContextProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const pathname = usePathname()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname]);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
