import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const description =
  "ASH Digital is a digital agency offering UI/UX design, web development and social media marketing that help brands look great, work fast and get found.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ASH Digital | UI/UX Design, Web Development & Digital Marketing",
    template: "%s | ASH Digital",
  },
  description,
  keywords: [
    "ASH Digital", "UI/UX design agency", "web development", "digital marketing",
    "social media marketing", "website design", "Coimbatore",
  ],
  applicationName: "ASH Digital",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ASH Digital",
    title: "ASH Digital | UI/UX Design, Web Development & Digital Marketing",
    description,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASH Digital",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05040a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
