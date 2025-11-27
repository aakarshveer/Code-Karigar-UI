import "./globals.css";

export const metadata = {
  title: "Code-Karigar | AI Software Architect",
  description: "Build software at light speed with AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}