import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Spybee Incidents",
  description: "Gestor de incidencias para proyecto de construccion",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
