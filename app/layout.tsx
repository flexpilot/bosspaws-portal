import "./globals.css"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "BossPaws Portal",
  description: "Manage your plan, pets, and chat history."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="container flex items-center gap-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/bp-logo.svg" alt="BossPaws" width={140} height={40} priority />
            </Link>
            <nav className="ml-auto flex items-center gap-4">
              <Link className="text-sm hover:text-brand" href="/pricing">Pricing</Link>
              <Link className="text-sm hover:text-brand" href="/login">Login</Link>
              <Link className="btn btn-primary text-sm" href="/signup">Get Started</Link>
            </nav>
          </div>
        </header>
        <main className="container py-10">{children}</main>
        <footer className="border-t">
          <div className="container py-6 text-sm text-gray-500">© {new Date().getFullYear()} BossPaws</div>
        </footer>
      </body>
    </html>
  )
}