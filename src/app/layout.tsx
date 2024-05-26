import { ConfigProvider } from "antd";
import StoreProvider from "./StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ConfigProvider theme={{
            token : {
              colorPrimary : "#06141D"
            }
          }}>
            {children}
          </ConfigProvider>
        </StoreProvider>
        </body>
    </html>
  );
}
