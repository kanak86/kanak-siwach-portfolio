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

    heroCta: [["#how-i-lead", "How I lead"], ["#timeline", "Explore my career"], ["#ai", "See the AI work"]],
    order: ["about", "how-i-lead", "timeline", "ai", "skills", "architecture", "demos"],
    nav: [["about", "About"], ["how-i-lead", "How I lead"], ["timeline", "Experience"], ["ai", "AI"], ["skills", "Skills"], ["architecture", "Projects"], ["contact", "Contact"]],

    leadership: {
      sub: "Clear plans, high standards, engineers who grow while they deliver. Here is what that looked like on GOAT's biggest Android program, and the habits behind it.",
      program: {
        title: "The Fawkes modernization at GOAT",
        note: "An 11-month program to consolidate fragmented legacy codebases into one MVI + Jetpack Compose architecture, for a platform serving ~120K daily active users.",
        bar: "Modernization program · 9 engineers · 11 months",
        owned: ["Project planning", "Estimation", "Milestones and timelines", "Delivery", "Architecture standards"],
        sdlc: ["Requirements analysis", "Solution design", "Coding", "Testing", "Deployment"],
        after: [
          ["Within 2 months", "91.9% → 99.2% crash-free", "Stronger architecture and test automation"],
          ["Within 3 months", "iOS feature parity", "With my architecture and code-quality reviews across Kotlin and Swift"],
          ["Ongoing", "~50% faster feature delivery", "One framework and CI/CD-backed releases"],
        ],
      },
      pillars: [
        { title: "Plan and deliver", body: "I own the plan and the outcome: scope, estimates, milestones and the path to release.",
          evidence: ["Managed the 9-engineer Fawkes modernization end to end, from requirements to deployment", "Owned GOAT's Checkout pod and payments architecture; Klarna and Affirm lifted order completion 20%+", "Led Ticketmaster's move to a unified React Native codebase"] },
        { title: "Raise the bar", body: "Quality comes from shared standards, not heroics, so I write them down and review against them.",
          evidence: ["Established MVI architecture standards, coding guidelines and documentation at GOAT", "Admin PR reviews of architecture, code quality and docs across Kotlin and Swift", "Defined Grindr's test strategy: 90%+ coverage across 4,000+ tests"] },
        { title: "Grow engineers", body: "I coach through code reviews, design reviews and direct feedback, so the team gets stronger with every release.",
          evidence: ["Mentored and coached engineers on modernization and AI-assisted development at GOAT", "Managed and mentored offshore engineering teams through UpKeep's re-architecture", "Led a team of 4 at Seventy9 and 2 interns at Naukri.com"] },
        { title: "Work across teams", body: "I turn business needs into software with the people around the code, across functions and time zones.",
          evidence: ["Partnered with Product, UX/UI, QA, Backend and business stakeholders at GOAT", "Coordinated teams in Ukraine, China and across US time zones", "Drove AI-native engineering org-wide: Claude Code agents cut UI development time 50%+"] },
      ],
    },
  });
})();
