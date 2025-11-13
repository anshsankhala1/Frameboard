"use client"

export default function StatsSection() {
  const stats = [
    {
      number: "10+",
      label: "Hours Saved",
      sublabel: "Per week per production"
    },
    {
      number: "95%",
      label: "Fewer Conflicts",
      sublabel: "With AI scheduling"
    },
    {
      number: "3x",
      label: "Faster Collaboration",
      sublabel: "All in one place"
    },
    {
      number: "70%",
      label: "Less Stress",
      sublabel: "Reported by users"
    },
    {
      number: "100%",
      label: "On-Time Delivery",
      sublabel: "With automated tracking"
    },
    {
      number: "500+",
      label: "Productions Completed",
      sublabel: "And counting"
    }
  ]

  return (
    <section className="bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 py-20 px-6 border-y-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-white border-2 border-black font-black text-sm tracking-wider">
              BY THE NUMBERS
            </span>
          </div>
          <h2 className="text-6xl font-black mb-6 leading-tight text-white">
            REAL RESULTS FROM
            <br />
            REAL PRODUCTIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-4 border-black bg-white p-8 text-center"
              style={{
                boxShadow: "6px 6px 0px rgba(0,0,0,1)",
              }}
            >
              <div className="text-6xl font-black mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="font-black text-xl mb-2">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.sublabel}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div
            className="inline-block border-4 border-black bg-white px-12 py-8 max-w-3xl"
            style={{
              boxShadow: "8px 8px 0px rgba(0,0,0,1)",
            }}
          >
            <p className="text-2xl font-black mb-4">
              "Frameboard cut our pre-production time in half. We went from chaos to organized in days."
            </p>
            <div className="text-sm text-gray-700">
              <div className="font-bold">— Sarah Mitchell</div>
              <div>Producer, Independent Films</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
