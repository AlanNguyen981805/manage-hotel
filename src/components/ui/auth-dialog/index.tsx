"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useAuth } from "@/hooks/useAuth";
import useToastStore from "@/store/useToastStore";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { login, register, loading, error } = useAuth();
  const { addToast } = useToastStore();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      addToast("Login successfully", "success");
      onClose();
      setUsername("");
      setPassword("");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(
      registerUsername,
      registerEmail,
      registerPassword
    );

    if (success) {
      addToast("Register successfully", "success");
      onClose();
      setRegisterUsername("");
      setRegisterEmail("");
      setRegisterPassword("");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={loading ? () => {} : onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 border-b">
            <div className="flex -mb-px">
              <button
                className={`mr-1 py-2 px-4 text-sm font-medium ${
                  activeTab === "login"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Đăng nhập
              </button>
              <button
                className={`mr-1 py-2 px-4 text-sm font-medium ${
                  activeTab === "register"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
                onClick={() => setActiveTab("register")}
              >
                Đăng ký
              </button>
            </div>
          </div>

          {activeTab === "login" ? (
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tên đăng nhập
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              {error && (
                <div className="mb-4 text-sm text-red-600">{error}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Đang xử lý..." : "Đăng nhập"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label
                  htmlFor="register-username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tên đăng nhập
                </label>
                <input
                  id="register-username"
                  type="text"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mật khẩu
                </label>
                <input
                  id="register-password"
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              {error && (
                <div className="mb-4 text-sm text-red-600">{error}</div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </button>
            </form>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
