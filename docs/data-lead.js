// Leadership edition: loaded after data.js on /leadership/. Same career and numbers as the
// Engineer edition; only wording, emphasis and section order change here.
(() => {
  const P = window.PORTFOLIO;

  Object.assign(P, {
    edition: "lead",
    eyebrow: "Lead Engineer · Engineering Manager · Application modernization",
    tagline: "18+ years leading teams to design, build, test and modernize applications: Kotlin, Java, Python, React Native, APIs and microservices, CI/CD, and AI-native engineering.",

    stats: [
      { value: 9, suffix: "", label: "engineers managed", sub: "through an 11-month modernization" },
      { value: 99.2, suffix: "%", decimals: 1, label: "crash-free rate", sub: "up from 91.9% within 2 months of release" },
      { value: 50, prefix: "~", suffix: "%", label: "faster feature delivery", sub: "unified framework and CI/CD" },
      { value: 3, suffix: "", label: "regions on one team", sub: "US, Ukraine and China time zones" },
    ],

    about: "I'm an engineering leader with 18+ years of experience designing, building, testing and modernizing applications, 14+ of them in mobile. Most recently I was Senior Staff Engineer at GOAT, the world's largest sneaker and streetwear marketplace, where I managed a 9-engineer team through an 11-month modernization of the Android app and owned its planning, estimation, milestones and delivery. Within two months of release the crash-free rate rose from 91.9% to 99.2%, and feature delivery got about 50% faster. I also owned GOAT's checkout and payments architecture, and drove AI-native engineering across the organization with Claude Code agents and Python tools for our RAG model. I lead through clear standards, code and design reviews, and coaching, with teams spread across the US, Ukraine and China. Based in Sacramento, CA, and open to engineering lead and manager roles.",

    glance: [
      ["Based in", "Sacramento, CA"],
      ["Open to", "Engineering lead and manager roles"],
      ["Team", "Managed 9 engineers across 3 regions"],
      ["Focus", "Application modernization, delivery, AI-native engineering"],
      ["Hands-on", "Kotlin, Java, Python, TypeScript, Swift"],
      ["Most recent", "Senior Staff Engineer, GOAT"],
    ],
  });
})();
