import React from "react";

const benefits = [
  {
    title: "Vast Collection",
    desc: "Access thousands of books across every genre imaginable.",
    icon: "📚",
  },
  {
    title: "Personal Growth",
    desc: "Fuel your knowledge, creativity, and inspiration every day.",
    icon: "🌱",
  },
  {
    title: "Innovation",
    desc: "Modern digital reading experience with powerful features.",
    icon: "🚀",
  },
];

const WhyChooseNovare = () => {
  return (
    <section className="py-16 bg-purple-300">
      <div className="container mx-auto px-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Novare?</h2>
        <p className="text-gray-600 font-semibold mb-12">
          Everything you need to renew your reading experience
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-2xl shadow-md p-8 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
              <p className="text-gray-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseNovare;