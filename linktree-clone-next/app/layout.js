import { AuthProvider } from "@/Contexts/AuthContext.jsx";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Linktree",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
