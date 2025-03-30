import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";

interface UserNameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  loading?: boolean;
  error?: string | null;
}

export const UserNameDialog = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  error = null,
}: UserNameDialogProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name.trim());
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm rounded-lg bg-white p-6">
          <h2 className="text-lg font-semibold mb-4">Nhập tên của bạn</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
              placeholder="Nhập tên của bạn"
              disabled={loading}
            />

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="submit"
                disabled={loading || !name.trim()}
                className="px-4 py-2 bg-accent text-white rounded-md disabled:opacity-50"
              >
                {loading ? "Đang xử lý..." : "Xác nhận"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
