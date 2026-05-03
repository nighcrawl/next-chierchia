import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "wp-block-styles";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Ange Chierchia - Développeur Web full-stack",
	description: "Blog personnel d'Ange Chierchia, développeur Web full-stack. Partage de réflexions, découvertes et expériences techniques.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="fr"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white">
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
