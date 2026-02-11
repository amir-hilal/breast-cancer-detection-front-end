import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Breast Cancer Detection - ML Inference',
  description: 'AI-powered breast cancer detection using machine learning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
