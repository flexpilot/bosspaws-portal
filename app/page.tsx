import Link from "next/link"
export default function Home() {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">Your Pet's AI Portal</h1>
        <p className="mt-4 text-gray-600">Login to manage your plan, view usage, and chat history. Upgrade anytime.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/signup" className="btn btn-primary">Create Account</Link>
          <Link href="/pricing" className="btn btn-outline">View Pricing</Link>
        </div>
      </div>
      <div className="card">
        <h3 className="text-lg font-semibold mb-2">Fast Access</h3>
        <ol className="text-sm text-gray-600 list-decimal ml-5 space-y-1">
          <li>Choose your plan</li>
          <li>Sign up (Google or email)</li>
          <li>Go to your dashboard</li>
        </ol>
      </div>
    </section>
  )
}