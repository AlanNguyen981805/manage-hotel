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
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <GlobalAuthDialog />
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
