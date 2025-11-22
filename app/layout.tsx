import type { Metadata } from "next";
import "./globals.css";
import Loader from "../components/loader/index";

export const metadata: Metadata = {
  title: "Dibya RS Magar - Full Stack Developer",
  description:
    "Full-stack developer specialized in MERN stack with 5 years of experience building applications that users love.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27><text y=%270.9em%27 font-size=%2790%27>👩‍💻</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body data-theme="dark">
        <Loader />
        {children}
      </body>
    </html>
  );
}
