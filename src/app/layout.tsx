import { ConfigProvider } from "antd";
import StoreProvider from "./StoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import logo from "./assets/cravefeed_logo.png"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CraveFeed | Social Platform for Food Enthusiasts',
  description: 'Join CraveFeed - where food connoisseurs and enthusiasts share their culinary adventures, discover unique dishes, and connect with fellow foodies. Your personal feed for everything delicious.',
  icons: {
    icon: [
      { url: `/vercel.svg`, sizes: 'any' }
    ],
  },
  keywords: [
    'food social media',
    'foodie community',
    'food connoisseurs',
    'culinary social network',
    'food sharing platform',
    'food enthusiasts',
    'food discovery',
    'restaurant reviews',
    'culinary experiences'
  ],
  openGraph: {
    title: 'CraveFeed - Where Food Enthusiasts Unite',
    description: 'Share your culinary adventures, discover amazing dishes, and connect with fellow food lovers.',
    type: 'website',
    siteName: 'CraveFeed',
    images: [
      {
        url: `${logo.src}`, // Local image in public folder
        width: 1200,
        height: 630,
        alt: 'CraveFeed - Food Social Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CraveFeed - Food Social Platform',
    description: 'Your personal feed for everything delicious. Join the community of food enthusiasts!',
    images: [`${logo.src}`], // Local image in public folder
  },
  applicationName: 'CraveFeed',
  appleWebApp: {
    capable: true,
    title: 'CraveFeed',
    statusBarStyle: 'default',
  },
  other: {
    'theme-color': '#FF4B2B',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider>
          <StoreProvider>{children}</StoreProvider>
        </ConfigProvider>
        </body>
    </html>
  );
}
