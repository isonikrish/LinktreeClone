"use client"
import Preview from "@/Components/Preview";
import Sidebar from "@/Components/Sidebar";
import { useAuth } from "@/Contexts/AuthContext";

export default function AdminLayout({ children }) {
  const {linktree} = useAuth();
  return (
    <div className="flex bg-[#f3f3f1] py-3">
      <Sidebar />
      <main className="w-[60%]">{children}</main>
      <Preview linktree={linktree}/>
    </div>
  );
}
