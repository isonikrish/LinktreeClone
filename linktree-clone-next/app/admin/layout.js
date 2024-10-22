// For admin panel, avoid using <html>, <head>, or <body>
import Preview from "@/Components/Preview";
import Sidebar from "@/Components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-[#f3f3f1] py-3">
      <Sidebar />
      <main className="w-[60%]">{children}</main>
      <Preview />
    </div>
  );
}
