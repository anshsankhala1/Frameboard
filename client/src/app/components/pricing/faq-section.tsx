"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Can I try Pro features before paying?",
      answer: "Yes! All new users get a 14-day free trial of Pro features. No credit card required. After the trial, you can choose to continue with Pro or switch to the Free plan."
    },
    {
      question: "What happens when I reach the Free plan limits?",
      answer: "On the Free plan, you're limited to 3 productions and 5 team members. When you reach these limits, you'll need to upgrade to Pro to create more productions or add more team members. Your existing data remains safe."
    },
    {
      question: "Can I upgrade or downgrade anytime?",
      answer: "Absolutely! You can upgrade to Pro at any time to unlock AI features and unlimited projects. If you downgrade from Pro to Free, you'll keep your data but access will be limited to Free plan features."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Annual subscriptions can be paid via invoice for studios and production companies."
    },
    {
      question: "Is there a discount for annual billing?",
      answer: "Yes! Annual Pro subscribers save 17% compared to monthly billing. That's $290/year instead of $348/year, saving you $58."
    },
    {
      question: "What's included in the AI features?",
      answer: "Pro plan includes AI-powered scheduling optimization, automated storyboard generation from scripts, intelligent location recommendations, actor matching based on character descriptions, and conflict detection for complex productions."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes! If you're not satisfied within the first 30 days of your Pro subscription, we'll give you a full refund. No questions asked."
    },
    {
      question: "Can I import my existing production data?",
      answer: "Pro users can import data from Final Draft, Celtx, and other common formats. We also support bulk CSV imports for schedules and contact lists. Our team can help with larger migrations during onboarding."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All data is encrypted in transit and at rest. We use industry-standard security practices and host on secure cloud infrastructure. We never share your production data with third parties."
    },
    {
      question: "Do you offer team or studio pricing?",
      answer: "For teams over 20 users or studios with multiple productions, contact us for custom enterprise pricing. We offer volume discounts, dedicated support, and additional features for larger organizations."
    }
  ]

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-green-300 border-2 border-black font-black text-sm tracking-wider">
              QUESTIONS?
            </span>
          </div>
          <h2 className="text-5xl font-black mb-6 leading-tight">
            FREQUENTLY ASKED
            <br />
            QUESTIONS
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-4 border-black bg-white overflow-hidden"
              style={{
                boxShadow: "4px 4px 0px rgba(0,0,0,1)",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition text-left"
              >
                <span className="font-black text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  strokeWidth={3}
                />
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6 border-t-2 border-gray-200 pt-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="px-8 py-3 bg-blue-400 border-3 border-black font-bold hover:bg-blue-500 transition">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  )
}
