import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono, Teko } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  variable: "--font-bebas-neue",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const teko = Teko({
  variable: "--font-teko",
  weight: ["400", "300", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova — GameFi Metagame Layer",
  description:
    "Discover Nova, the next evolution of GameFi and the Metagame Layer. Explore immersive Web3 gaming, Play Economy, digital collectibles, and cross-realm progression.",
  keywords: [
    "GameFi",
    "Web3",
    "Metagame",
    "Play Economy",
    "Blockchain Gaming",
    "Crypto Gaming",
    "Digital Collectibles",
    "NFT",
    "On-chain Gaming",
    "Metaverse",
  ],
  authors: [{ name: "Nova Labs" }],
  creator: "Nova Labs",
  publisher: "Nova Labs",
  metadataBase: new URL("https://web3-style.vercel.app/"),

  openGraph: {
    title: "Nova — The Metagame Layer of Web3 Gaming",
    description:
      "Enter the new era of GameFi. Discover Nova—A multi-realm ecosystem powered by Web3, where progression, identity, and rewards extend beyond games.",
    url: "https://web3-style.vercel.app/",
    siteName: "Nova GameFi",
    images: [
      {
        url: "/img/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Nova GameFi OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nova — The Metagame Layer of Web3 Gaming",
    description:
      "Discover the Nova multiverse. Cross-realm identity. Play-to-progress. Web3 rewards. The next evolution of GameFi.",
    images: ["/img/og-banner.jpg"],
    creator: "@nova_gamefi",
  },

  category: "technology",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${teko.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
