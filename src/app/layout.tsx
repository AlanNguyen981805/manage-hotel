import { AuthProvider } from "@/providers/AuthProvider";
import Navbar from "@/components/ui/navbar";
import { GlobalAuthDialog } from "@/components/ui/global-auth-dialog";
import "./globals.css";
import Footer from "@/components/layout/footer";
import ToastContainer from "@/components/ui/toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen">
        <AuthProvider>
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
            <GlobalAuthDialog />
            <Footer />
          </div>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
