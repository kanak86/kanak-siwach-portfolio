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

  // Experience: same roles and numbers, leadership wording (from the leadership résumé).
  const role = (prefix, o) => Object.assign(P.roles.find(r => r.org.startsWith(prefix)), o);

  role("GOAT", {
    impact: "Managed 9 · 99.2% crash-free",
    tease: "Managed a 9-engineer, 11-month modernization and owned checkout and payments for a ~120K DAU / 400K MAU platform.",
    points: [
      "Grew from Sr. Engineer II to Staff to Senior Staff while leading custom application development and modernization workstreams for a commerce platform serving ~120K DAU / 400K MAU.",
      "Managed a 9-engineer team through an 11-month modernization, owning project planning, estimation, milestones, timelines and delivery while consolidating legacy codebases into one MVI + Jetpack Compose framework.",
      "Guided the team across the full SDLC, from requirements analysis and solution design through coding, testing and deployment, partnering with Product, UX/UI, QA, Backend and business stakeholders.",
      "Improved the crash-free rate from 91.9% to 99.2% within 2 months of release through stronger architecture and test automation.",
      "Accelerated feature development and release cycles by ~50% with a unified MVI/Compose framework and CI/CD pipelines.",
      "Owned the Checkout pod and payments architecture, leading integration of Klarna, Affirm, GOAT Pay and Google Pay with backend services and APIs; Klarna and Affirm drove 20%+ order completion.",
      "Delivered iOS feature parity within 3 months of release, with admin PR reviews of architecture, code quality and documentation across Kotlin and Swift.",
      "Drove AI-native engineering org-wide with custom Claude Code agents, cutting UI development time 50%+, and automated Figma-to-Compose workflows.",
      "Built Python and low-code AI agent tools for GOAT's RAG model, so the AI could retrieve and surface products from GOAT inventory.",
      "Established architecture standards, coding guidelines and documentation; mentored and coached engineers through code reviews, design reviews and feedback.",
      "Coordinated distributed teams in Ukraine, China and across US time zones.",
      "Ran Kotlin Multiplatform and Flutter/Dart proofs of concept for the Sneakers.com vertical to evaluate cross-platform approaches before scaling them.",
    ],
    wins: ["Managed 9 engineers through an 11-month program", "91.9% → 99.2% crash-free in 2 months", "~50% faster feature delivery", "iOS parity within 3 months", "20%+ order completion with Klarna and Affirm", "Claude Code agents deployed org-wide, 50%+ less UI time"],
  });
  role("UpKeep", {
    impact: "Managed offshore teams",
    tease: "Led the re-architecture while managing and mentoring offshore engineering teams.",
    points: [
      "Led the application re-architecture initiative, modernizing core components while managing and mentoring offshore engineering teams through code reviews and development standards.",
      "Directed end-to-end development, feature delivery and software maintenance, coordinating rollouts with zero downtime.",
    ],
    wins: ["Managed and mentored offshore teams", "Zero-downtime production rollouts"],
  });
  role("Grindr", {
    impact: "Defined the test strategy",
    tease: "Led quality engineering and defined the test strategy: 4,000+ tests at 90%+ coverage.",
    points: [
      "Led quality engineering initiatives and defined the test strategy, reaching 90%+ coverage through 4,000+ JUnit unit tests plus Robolectric and Espresso UI test automation, with test-driven development throughout.",
      "Partnered with Product on A/B testing and deployed Google Play In-App Billing for global subscriptions, growing revenue.",
    ],
    wins: ["Defined the test strategy", "90%+ coverage across 4,000+ tests", "Play Billing for global subscriptions"],
  });
  role("Ticketmaster", {
    impact: "Led the React Native move",
    tease: "Led the migration to one React Native codebase; In-Venue Seating lifted order completion 40%+ and engagement 60%+.",
    points: [
      "Led the migration of the native Android app to React Native, architecting a unified cross-platform codebase.",
      "Engineered the interactive venue map as a native module bridged into React Native, lifting order completion 40%+ and engagement 60%+ through In-Venue Seating.",
      "Developed a custom backend service and implemented Microsoft CodePush for over-the-air updates; used A/B testing across checkout journeys to reduce drop-off.",
    ],
    wins: ["Led the move to one cross-platform codebase", "40%+ order completion, 60%+ engagement", "Over-the-air releases with CodePush"],
  });
  role("Calance", { tease: "Owned NFL Sunday Ticket end to end as sole developer: an MVVM rewrite that took the rating from 2.3 to 3.8 in 6 months." });
  role("Seventy9", { impact: "Led 4 · 100% ad delivery" });
  role("Infoedge", { impact: "Sole developer → team lead" });

  P.xpSub = "18 years, from building backend systems on my own to managing a 9-engineer modernization program. Hover a role for the headline, select it to see the impact, what I did and what it achieved.";

  P.growth = [
    ["buongiorno", "2008", "Delivered backend systems", "Telecom billing for 4 operator services"],
    ["naukri", "2011", "Owned an app, then led", "Sole developer, then 2 interns"],
    ["seventy9", "2013", "Led a team", "Team of 4, ad SDK"],
    ["ticketmaster", "2015", "Led a platform migration", "Android to React Native"],
    ["upkeep", "2018", "Managed offshore teams", "Re-architecture, zero downtime"],
    ["goat", "2018–26", "Managed a 9-engineer program", "Sr. Engineer II → Staff → Senior Staff"],
  ];

  // AI: framed as adoption driven across the org, plus the Python / RAG agent work.
  P.ai.sub = "I drove AI-native engineering across GOAT's engineering organization: I wrote 20 of the 40 Claude Code agents and skills in the Android team's toolkit, deployed them across engineering, and built Python and low-code agent tools for our RAG model. Every sample linked here is original code, not employer code.";
  // The RAG card (defined in data.js) leads in this edition.
  P.ai.stories = [...P.ai.stories.filter(x => x.icon === "rag"), ...P.ai.stories.filter(x => x.icon !== "rag")];

  // Skills: grouped the way the leadership résumé groups them, delivery first.
  P.skills = [
    { cat: "Delivery and management", items: [["Managing engineering teams", "GOAT (9 engineers), UpKeep (offshore teams)"], ["Project planning, estimation and milestones", "GOAT Fawkes"], ["Workstream and release planning", "GOAT"], ["Stakeholder management", "GOAT"], ["Mentoring and coaching", "GOAT, UpKeep"], ["Distributed teams across time zones", "GOAT (US, Ukraine, China)"], ["Leading small teams", "Seventy9 (team of 4), Naukri.com (2 interns)"]] },
    { cat: "Architecture and design", items: [["Solution architecture", "GOAT"], ["MVI and MVVM", "GOAT Fawkes, DIRECTV"], ["Clean and modular architecture", "GOAT"], ["Design systems", "GOAT"], ["Architecture and code reviews (Kotlin, Swift)", "GOAT"], ["Application modernization", "GOAT Fawkes, UpKeep, DIRECTV"]] },
    { cat: "Languages and platforms", items: [["Kotlin", "GOAT, Grindr"], ["Java", "Buongiorno, Naukri.com"], ["Python", "GOAT"], ["TypeScript / JavaScript", "Ticketmaster"], ["React Native", "Ticketmaster"], ["Kotlin Multiplatform", "Sneakers.com POC (GOAT)"], ["Flutter / Dart", "Sneakers.com POC vs. KMP (GOAT)"], ["Bluetooth Low Energy (BLE)", "GOAT Android watch app"]] },
    { cat: "APIs and integration", items: [["REST, GraphQL, gRPC, WebSockets", "GOAT, Ticketmaster"], ["Payment system integration", "GOAT"], ["Custom backend services", "Ticketmaster"], ["Java / Spring Boot", "GOAT collaboration"], ["SOA and PHP APIs", "Naukri.com"], ["Telecom billing (IN, Diameter)", "Buongiorno"]] },
    { cat: "AI-native engineering", items: [["AI agents and tools (Python)", "GOAT"], ["RAG (retrieval-augmented generation)", "GOAT"], ["Low-code AI workflows", "GOAT"], ["Claude Code agents and skills", "GOAT"], ["Figma-to-Compose automation", "GOAT"], ["Prompt engineering", "GOAT"]] },
    { cat: "Quality and test strategy", items: [["Test strategy", "Grindr"], ["Test-driven development (TDD)", "Grindr"], ["JUnit, MockK, Turbine", "Grindr, GOAT"], ["Espresso, Robolectric", "Grindr"], ["Compose UI and snapshot testing", "GOAT"], ["A/B testing", "Grindr, Ticketmaster"]] },
    { cat: "CI/CD and release", items: [["GitHub Actions", "GOAT"], ["Bitrise, Jenkins, Fastlane", "Ticketmaster, DIRECTV, Grindr"], ["Staged rollouts and release management", "GOAT"], ["Over-the-air updates (CodePush)", "Ticketmaster"], ["Crashlytics and performance monitoring", "GOAT"]] },
    { cat: "Cloud and payments", items: [["AWS: Cognito, Amplify, AppSync, Lambda, S3", "GOAT"], ["Klarna, Affirm, GOAT Pay, Google Pay", "GOAT"], ["Google Play Billing", "Grindr"]] },
  ];
})();
