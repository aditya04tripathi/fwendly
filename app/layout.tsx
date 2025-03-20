import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
	variable: "--font-rubik",
	subsets: ["latin", "latin-ext"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: {
		default: "Monash Fwendly",
		template: "%s | Monash Fwendly",
	},
	description:
		"Connect with fellow Monash students through events, courses, and shared interests",
	keywords: [
		"Monash University",
		"Student Events",
		"Course Networking",
		"Student Interests",
		"University Social Platform",
		"Monash",
		"Fwendly",
		"University",
		"Student",
		"Events",
		"Networking",
		"Interests",
		"Social",
		"Platform",
	],
	authors: [
		{
			name: "Aditya Tripathi",
			url: "https://linkedin.com/in/aditya-tripathi-at04",
		},
	],
	creator: "Aditya Tripathi",
	publisher: "Aditya Tripathi",
	applicationName: "Monash Fwendly",
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-icon.png",
	},
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${rubik.variable} antialiased`}>{children}</body>
		</html>
	);
}
