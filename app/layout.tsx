import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Free Image to Byte Array Converter Online | PostgreSQL BYTEA | BitArray",
  description:
    "Convert images (PNG, JPG, WEBP) to byte arrays and PostgreSQL BYTEA format. Free online tool with client-side processing - no uploads. Perfect for developers working with binary image data in Java, Python, C++.",
  keywords: [
    "image to byte array",
    "byte array converter",
    "BYTEA PostgreSQL",
    "image to binary",
    "convert image to bytes",
    "binary image converter",
    "image encoding",
    "PostgreSQL BYTEA",
    "image to hex",
    "byte array to image",
    "online byte converter",
    "image bitarray",
    "hexadecimal image",
    "base64 image",
    "binary data converter",
  ],
  authors: [{ name: "Matheus Ribeiro" }],
  creator: "Matheus Ribeiro",
  publisher: "BitArray",
  metadataBase: new URL("https://bitarray.vercel.app"),

  openGraph: {
    title: "Free Image to Byte Array Converter - BitArray",
    description:
      "Convert images to byte arrays and PostgreSQL BYTEA format online. Free, fast, and secure with client-side processing. Support for PNG, JPG, WEBP.",
    url: "https://bitarray.vercel.app",
    siteName: "BitArray",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png", // Crie esta imagem 1200x630px
        width: 1200,
        height: 630,
        alt: "BitArray - Image to Byte Array Converter",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Image to Byte Array Converter - BitArray",
    description:
      "Convert images to byte arrays online. Free, fast, and secure with client-side processing.",
    images: ["/og-image.png"], // Mesma imagem do OpenGraph
    creator: "@seutwitter", // Adicione seu Twitter se tiver
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://bitarray.vercel.app",
  },

  // Informações adicionais para rich snippets
  applicationName: "BitArray",
  category: "Developer Tools",

  // Para PWA (opcional mas recomendado)
  manifest: "/manifest.json",

  // Outros metadados úteis
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon links */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bitarray.vercel.app/" />
        <meta
          property="og:title"
          content="BitArray - Image to Byte Array Converter"
        />
        <meta
          property="og:description"
          content="Convert images to byte arrays instantly. Client-side processing, 100% secure."
        />
        <meta property="og:image" content="https://bitarray.vercel.app/og-image.png" />

        {/* Twitter  */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bitarray.vercel.app/" />
        <meta
          property="twitter:title"
          content="BitArray - Image to Byte Array Converter"
        />
        <meta
          property="twitter:description"
          content="Convert images to byte arrays instantly. Client-side processing, 100% secure."
        />
        <meta
          property="twitter:image"
          content="https://bitarray.vercel.app/og-image.png"
        />

        {/* Theme color para mobile */}
        <meta name="theme-color" content="#09090b" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "BitArray - Image to Byte Array Converter",
              description:
                "Free online tool to convert images to byte arrays and BYTEA format for PostgreSQL databases",
              url: "https://bitarray.vercel.app",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Convert images to byte arrays",
                "Render byte arrays to images",
                "PostgreSQL BYTEA support",
                "Client-side processing",
                "PNG, JPG, WEBP support",
                "No server uploads",
                "Free forever",
              ],
              screenshot: "https://bitarray.vercel.app/screenshot.png",
              author: {
                "@type": "Person",
                name: "Matheus Ribeiro",
              },
              creator: {
                "@type": "Person",
                name: "Matheus Ribeiro",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
