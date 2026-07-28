import "./globals.css";
import { Raleway } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
const raleway = Raleway({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", raleway.variable)}>
      <body className="min-h-full flex flex-col">{children}
        <Toaster/>
      </body>
    </html>
  );
}
