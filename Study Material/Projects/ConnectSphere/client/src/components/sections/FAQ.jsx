import { ChevronDown } from "lucide-react";

function FAQ() {
  const faqs = [
    {
      question: "What is ConnectSphere?",
      answer:
        "ConnectSphere is a collaboration platform where students can find teammates, build projects, and prepare for internships together.",
    },
    {
      question: "Who can use ConnectSphere?",
      answer:
        "Anyone passionate about technology, including students, developers, designers, and recruiters.",
    },
    {
      question: "Is ConnectSphere free?",
      answer:
        "Yes. The platform is being built with students in mind and core features will be free to use.",
    },
    {
      question: "Can I showcase my projects?",
      answer:
        "Absolutely! You'll be able to create a profile, add projects, and build a portfolio that recruiters can explore.",
    },
    {
      question: "When will ConnectSphere launch?",
      answer:
        "We're actively developing the platform and new features are launching soon.",
    },
  ];

  return (
    <section className="relative bg-slate-950 px-6 py-24">
      <div className="mx-auto max-w-5xl">

        <div className="mb-16 text-center">

          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
            FAQ
          </span>

          <h2 className="mt-6 text-5xl font-bold text-white">
            Frequently Asked
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="mt-6 text-slate-400">
            Everything you need to know about ConnectSphere.
          </p>

        </div>

        <div className="space-y-6">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition hover:border-blue-500/40"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {faq.question}
                </h3>

                <ChevronDown className="text-blue-400" />
              </div>

              <p className="mt-4 leading-8 text-slate-400">
                {faq.answer}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default FAQ;