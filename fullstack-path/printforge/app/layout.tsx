import "./globals.css";
import { Montserrat_Alternates, Albert_Sans } from "next/font/google";

const montserrat = Montserrat_Alternates({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const albert = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${albert.variable}`}>
      <body>{children}</body>
    </html>
  );
}
