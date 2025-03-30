"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import useUserStore from "@/store/useUserStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const { checkAuth } = useAuth();
  const { setLoading } = useUserStore();

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      await checkAuth();
      setIsLoading(false);
      setLoading(false);
    };

    initAuth();
  }, [checkAuth, setLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
