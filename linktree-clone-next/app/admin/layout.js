import Sidebar from "@/Components/Sidebar";

export const metadata = {
  title: "Linktree Admin",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Adding the favicon */}
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <div className="flex bg-[#fefeef] py-3">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
