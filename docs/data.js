// All career facts come from the two resumes. Edit here; the whole site updates.
window.PORTFOLIO = {
  name: "Kanak Siwach",
  title: "Mobile Engineering & Architecture Leader",
  tagline: "18+ years shipping Android at scale: Kotlin, Jetpack Compose, MVI, payments, and AI-driven engineering.",
  location: "Sacramento, CA",
  email: "kanak86.us@gmail.com",
  linkedin: "https://www.linkedin.com/in/kanaksiwach",
  repo: "https://github.com/kanak86/kanak-siwach-portfolio",

  stats: [
    { value: 18, suffix: "+", label: "years in software", sub: "14+ focused on Android" },
    { value: 99.2, suffix: "%", decimals: 1, label: "crash-free rate", sub: "up from 91.9% in 2 months" },
    { value: 72, suffix: "", label: "presenters migrated to MVI", sub: "with migration skills I wrote" },
    { value: 20, suffix: "", label: "agents and skills I wrote", sub: "out of a 40-piece team AI toolkit" },
  ],

  about: "I'm an Android engineer with 14+ years of experience and 18+ in software overall. Most recently I was Senior Staff Engineer at GOAT, the world's largest sneaker and streetwear marketplace, where I drove our MVI/MVVM architecture, prototyped Kotlin Multiplatform for the Sneakers.com vertical, and built custom AI agents and skills on Claude Code, including one that turns Figma designs directly into production Compose UI. Before GOAT, I led Android work at Grindr and Ticketmaster, with a focus on testing rigor, A/B testing and revenue-critical features like in-app billing and interactive seat maps. I'm drawn to high-scale consumer mobile engineering at companies that are leaning into AI in how they build, not just in what they ship. Based in Sacramento, CA, and open to senior and staff mobile roles.",

  glance: [
    ["Based in", "Sacramento, CA"],
    ["Open to", "Senior and staff mobile roles"],
    ["Focus", "Android architecture, AI-driven engineering"],
    ["Also", "Kotlin Multiplatform, React Native, BFF services"],
    ["Most recent", "Senior Staff Engineer, GOAT"],
  ],

  roles: [
    { org: "GOAT Group", title: "Senior Staff Engineer", period: "Mar 2026 – Aug 2026", start: 2018.4, end: 2026.6, group: "GOAT", place: "Sacramento, CA", id: "goat", metrics: [{ t: "Crash-free rate · Fawkes rewrite", n: "Within 2 months of release.", rows: [["Before", 91.9, "91.9%"], ["After", 99.2, "99.2%"]], max: 100 }], arch: ["MVI + Compose", "Checkout & payments", "AI-driven engineering"], code: [["MVI core sample", "samples/mvi-core"], ["Checkout payments sample", "samples/checkout-payments"], ["Claude Code agents & skills", "samples/claude-agents"]], media: [], tags: ["Kotlin","Compose","MVI","Claude Code","Payments","Global teams"],
      points: [
        "Highlights below span my full GOAT tenure (Jun 2018 – Aug 2026) across three levels.",
        "Led a 9-engineer team through an 11-month architecture transformation of the Fawkes Android app, consolidating fragmented legacy codebases into one MVI + Jetpack Compose framework.",
        "Raised crash-free rate from 91.9% to 99.2% within 2 months of release through stronger architecture, automated testing and engineering practices.",
        "Cut feature development and rollout time by ~50% by removing cross-architecture dependencies.",
        "Delivered iOS feature parity within 3 months of the Fawkes release.",
        "Owned the Checkout pod and payments architecture: Klarna, Affirm, GOAT Pay and Google Pay.",
        "Built and deployed custom Claude Code agents across engineering, cutting UI development time by 50%+.",
        "Established MVI standards and documentation and mentored engineers on modern architecture and AI-assisted development.",
        "Coordinated work across distributed teams in Ukraine, China and multiple time zones across the US.",
        "Prototyped Kotlin Multiplatform for the Sneakers.com vertical to enable synchronized Android/iOS feature development.",
        "Spearheaded Jetpack Compose adoption, lifting UX/UI quality and reaching iOS parity.",
        "Standardized the design system with UX/UI teams, aligning UI with Google standards and reducing design-to-development friction.",
        "Automated Figma-to-Compose workflows to speed design-to-production delivery.",
        "Drove 20%+ order completion through Klarna and Affirm payment integration."] },
    { org: "GOAT Group", title: "Staff Engineer", period: "Feb 2022 – Mar 2026", group: "GOAT", place: "Sacramento, CA", tags: ["Compose","Design System","Checkout"],
      points: ["Progressive Staff-level scope on the same platform. See the Senior Staff entry for highlights across my GOAT tenure."] },
    { org: "GOAT Group", title: "Sr. Engineer II / Sr. Android Engineer", period: "Jun 2018 – Feb 2022", group: "GOAT", place: "Sacramento, CA", tags: ["Android","Checkout","Klarna","Affirm"],
      points: ["Platform serving ~120K daily active users. See the Senior Staff entry for highlights across my GOAT tenure."] },
    { org: "UpKeep Maintenance Management", title: "Lead Android Developer", period: "Mar 2018 – Jun 2018", place: "Westwood, CA", tags: ["Re-architecture","Mentoring"],
      points: ["Led application re-architecture, modernizing core components while mentoring offshore engineering teams.",
               "Directed end-to-end feature delivery with zero-downtime production rollouts."] },
    { org: "Grindr", title: "Lead Android Developer", period: "Apr 2017 – Feb 2018", place: "Los Angeles, CA", tags: ["TDD","Testing","Billing","A/B"],
      points: ["Followed test-driven development (TDD) throughout, reaching 90%+ test coverage with 4,000+ JUnit tests plus Robolectric and Espresso UI tests.",
               "Partnered with Product on A/B testing and shipped Google Play In-App Billing for global subscriptions."] },
    { org: "Ticketmaster", title: "Senior Android Developer", period: "Jul 2015 – Apr 2017", place: "Los Angeles, CA", id: "ticketmaster", arch: ["React Native bridge"], code: [["React Native native-module bridge", "samples/rn-native-module"]], media: [], tags: ["React Native","Native Module","CodePush","Custom backend service"],
      points: ["Led migration of the native Android app to React Native, architecting a unified codebase shared with iOS.",
               "Built the interactive venue map as a native module bridged into React Native, keeping native performance for seat discovery and purchase.",
               "Developed a custom backend service, then Microsoft CodePush over-the-air updates.",
               "Used A/B tests across checkout, plus shared-element transitions and collapsible headers, to reduce checkout drop-off.",
               "In-Venue Seating: 40%+ higher order completion and 60%+ engagement."] },
    { org: "Calance (DIRECTV)", title: "Sr. Android Developer", period: "Oct 2013 – Jul 2015", place: "", id: "directv", metrics: [{ t: "Crash-free rate · rewritten flows", n: "On the rewritten flows.", rows: [["Before", 85, "85%"], ["After", 98, "98%"]], max: 100 }, { t: "Play Store rating", n: "Within 6 months of the relaunch.", rows: [["Before", 2.3, "2.3 ★"], ["After", 3.8, "3.8 ★"]], max: 5 }], media: [], tags: ["NFL Sunday Ticket","MVVM","RecyclerView","Tablet UI","Video streaming","Solo developer"],
      points: [
        "Sole developer of the DIRECTV NFL Sunday Ticket Android app, including integrated video streaming.",
        "Rewrote the user experience and overhauled the architecture using MVVM. The old UX was hard to maintain and built on ListViews, with jittery scrolling and crashes; the rewrite moved to RecyclerView.",
        "Play Store rating rose from 2.3 to 3.8 stars within the first 6 months after the relaunch.",
        "Crash-free rate on the rewritten flows improved from 85% to 98%.",
        "Adapted the UX to large screens, supporting tablets in both portrait and landscape."] },
    { org: "Seventy9 Media", title: "Sr. Android Application Developer", period: "Jun 2013 – Oct 2013", place: "", id: "seventy9", metrics: [{ t: "Ad delivery rate · AppJacket SDK", n: "Ad delivery rate to devices, before vs after.", rows: [["Before", 48, "48%"], ["After", 100, "100%"]], max: 100 }], media: [], tags: ["AppJacket","Ad SDK","Video / banner / interstitial ads","SQLite","In-memory caching","Offline sync","Team of 4"],
      points: [
        "Led a team of 4 on AppJacket, an in-app advertisement SDK for Android apps, delivering video, banner and interstitial ads.",
        "Implemented in-memory caching, backed by a SQLite database, so already-loaded ads are still shown when the network is unavailable or the server has no new ads.",
        "Kept only the latest 5 ads in memory to hold the footprint down, since Android devices of that era were far less powerful than today's.",
        "Ads were displayed on a random-selection basis from the cache.",
        "Captured ad impressions while offline and synced them to the server once connectivity returned.",
        "Reached a 100% ad delivery rate to devices, up from 48% before."] },
    { org: "Infoedge India Ltd. (Naukri.com)", title: "Sr. Software Engineer", period: "Oct 2011 – Jun 2013", place: "Delhi, India", tags: ["Android SDK","Java","PHP / CodeIgniter APIs","Hybrid WebView","SOA"],
      points: [
        "Built the Naukri.com Android app from scratch as the sole developer; the first release shipped within 3 months.",
        "Owned both the app and its backend integration (Java + PHP): job search, apply, profile edits, user login and user-specific recommendations.",
        "Used the Sherlock compatibility library to bring the Action Bar to Android 2.1–3.0, then shipped a second release on Android 4.0.3 with external-storage install, a wheel date picker and menus.",
        "Integrated m.naukri.com into Android and iPhone apps as a hybrid WebView shell: the app is just 254 KB, changes ship from the backend with no app re-release, and it created a single point of maintenance. Earned an appreciation award.",
        "Built HTML5 front-end integration with the UI team and backend APIs (PHP / CodeIgniter) serving the mobile site and app wrappers, and developed backend services to introduce an SOA architecture.",
        "Later led native Android development for Naukri.com with two interns, after the WebView app went live."] },
    { org: "Buongiorno Digital Innovation", title: "Sr. Software Engineer", period: "Aug 2008 – Oct 2011", place: "Gurgaon, India", tags: ["Java","Linux","MySQL","Telecom billing","Backend"],
      points: [
        "Built a user-subscription engine used for ETISALAT, AIRTEL, IDEA 3G and IDEA 2G at a value-added-services company working with 130+ operators worldwide.",
        "Routed user messages on short codes to the right Java application to subscribe or unsubscribe users.",
        "Implemented IN and Diameter billing and periodic renewals, covering postpaid, prepaid and prepaid-to-postpaid users with fallback, step charging, grace mode, suspension mode and try-and-buy.",
        "Built cron applications for billing and renewal retries, plus event notifications and callbacks to content providers.",
        "Delivered service-pack grouping and upgrades, RRBT / CRBT provisioning, and fully configurable services, durations and billing amounts.",
        "Maintained records and reporting scripts in MySQL, optimized code, and supported the operations team on the projects."] },
  ],

  skills: [
    { cat: "Android & UI", items: [
      ["Kotlin","GOAT, Grindr"],["Jetpack Compose","GOAT"],["Material 3","GOAT"],["Coroutines / Flow","GOAT"],["Hilt / Dagger","GOAT"],["Room, DataStore, WorkManager, Paging 3","GOAT"],["Accessibility (TalkBack, WCAG)","GOAT"],["RecyclerView & tablet / large-screen UI","DIRECTV"],["SQLite & in-memory caching","Seventy9 AppJacket"],["Offline-first impression sync","Seventy9 AppJacket"]] },
    { cat: "Architecture", items: [
      ["MVI","GOAT Fawkes"],["MVVM","GOAT, DIRECTV NFL Sunday Ticket"],["Clean Architecture","GOAT"],["Modular architecture","GOAT"],["Design systems","GOAT"],["SDK design (ad SDK)","Seventy9 AppJacket"]] },
    { cat: "Cross-platform", items: [
      ["React Native","Ticketmaster"],["Native modules / bridging","Ticketmaster"],["Kotlin Multiplatform","Prototype, Sneakers.com vertical (GOAT)"],["CodePush OTA","Ticketmaster"],["Hybrid WebView apps (Android + iPhone)","Naukri.com"]] },
    { cat: "Payments", items: [
      ["Klarna","GOAT"],["Affirm","GOAT"],["Google Pay","GOAT"],["GOAT Pay / Credits","GOAT"],["Google Play Billing","Grindr"]] },
    { cat: "Backend & APIs", items: [
      ["REST","GOAT, Ticketmaster"],["GraphQL","GOAT, Ticketmaster"],["gRPC / Protobuf","GOAT, Ticketmaster"],["WebSockets","GOAT, Ticketmaster"],["Custom backend service","Ticketmaster"],["PHP / CodeIgniter APIs","Naukri.com"],["SOA backend services","Naukri.com"],["Java backend, MySQL, Linux","Buongiorno"],["Telecom billing (IN, Diameter)","Buongiorno"],["Java / Spring Boot","GOAT collaboration"],["Offline-first sync",""]] },
    { cat: "Quality", items: [
      ["JUnit, MockK, Turbine","Grindr, GOAT"],["Test-driven development (TDD)","Grindr"],["Espresso, Robolectric","Grindr"],["Compose UI testing","GOAT"],["Snapshot testing (Paparazzi)","GOAT"],["A/B testing","Grindr, Ticketmaster"]] },
    { cat: "AI-driven engineering", items: [
      ["Claude Code agents & skills","GOAT"],["Prompt engineering","GOAT"],["Figma-to-Compose automation","GOAT"]] },
    { cat: "CI/CD & reliability", items: [
      ["GitHub Actions, Bitrise, Jenkins, Fastlane",""],["Gradle build optimization","GOAT"],["Firebase Crashlytics & Performance","GOAT"],["Play Console staged rollouts","GOAT"]] },
  ],
};
