"use client";

import { useEffect } from "react";
import useUserStore from "@/store/useUserStore";
import { useAuthDialog } from "@/hooks/useAuthDialog";

export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return function WithAuth(props: P) {
    const { user, loading } = useUserStore();
    const { openAuthDialog } = useAuthDialog();

    useEffect(() => {
      if (!loading && !user) {
        // Mở dialog đăng nhập thay vì chuyển hướng
        openAuthDialog();
      }
    }, [user, loading, openAuthDialog]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

    if (!user) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-600">Vui lòng đăng nhập để tiếp tục</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
