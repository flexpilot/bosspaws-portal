import Link from "next/link"
export default function PricingPage() {
  const plans = [
    { id: "free", name: "Free", desc: "2 questions/week", cta: "Start Free" },
    { id: "plan1", name: "Plan 1", desc: "40 questions/week", cta: "Choose Plan 1" },
    { id: "plan2", name: "Plan 2", desc: "Unlimited questions", cta: "Choose Plan 2" },
  ]
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map(p => (
        <div key={p.id} className="card">
          <h3 className="text-xl font-semibold">{p.name}</h3>
          <p className="text-gray-600 mt-1">{p.desc}</p>
          <Link href={`/signup?plan=${p.id}`} className="btn btn-primary mt-4">{p.cta}</Link>
        </div>
      ))}
    </div>
  )
}