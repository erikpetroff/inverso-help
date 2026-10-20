import { inter } from "../fonts";
import "../globals.css";

export default function StudioRootLayout({ children }: LayoutProps<"/studio">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
