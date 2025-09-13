import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOMAD KOREA | 대한민국 디지털 노마드를 위한 최고의 도시 찾기",
  description: "한국에서 디지털 노마드로 생활하기 위한 완벽한 도시를 찾아보세요. 생활비, 인터넷 속도, 안전도 등 실질적인 정보를 바탕으로 맞춤형 추천을 받아보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
