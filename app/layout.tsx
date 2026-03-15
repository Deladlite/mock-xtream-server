export const metadata = {
  title: "Mock Xtream API",
  description: "QA test server for Samsung TV app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
