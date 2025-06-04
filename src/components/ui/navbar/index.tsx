"use client";

import { useAuth } from "@/hooks/useAuth";
import { useAuthDialog } from "@/hooks/useAuthDialog";
import useBookingState from "@/store/useRoomState";
import useToastStore from "@/store/useToastStore";
import useUserStore from "@/store/useUserStore";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUserStore();
  const { logout } = useAuth();
  const { openAuthDialog } = useAuthDialog();
  const { addToast } = useToastStore();

  const handleLogout = () => {
    logout();
    addToast("Logout successfully", "success");
    setIsMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-white hover:text-gray-300 transition-colors"
              >
                Booking
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className="text-white inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-gray-300 transition-colors"
              >
                Home
              </Link>
              {/* <Link
                href="/booking"
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Book Room
              </Link> */}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm leading-4 rounded-md text-white hover:text-gray-300 transition-colors"
                    onClick={() => {
                      const { setOpenHistory, isOpenHistory } =
                        useBookingState.getState();
                      setOpenHistory(!isOpenHistory);
                    }}
                  >
                    <span>History</span>
                    <svg
                      className="ml-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="flex text-sm rounded-full focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <span className="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md text-white hover:text-gray-300 transition-colors">
                      {user.username}
                      <svg
                        className="-mr-0.5 ml-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </div>

                {isMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-md py-1 bg-white/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthDialog}
                className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white hover:text-gray-300 transition-colors"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
