export interface QuickAction {
  label: string;
  query: string;
}

export interface PageContextConfig {
  headerPrompt: string;
  proactiveGreeting: string;
  suggestions: QuickAction[];
}

export const ROUTE_CONTEXTS: Record<string, PageContextConfig> = {
  "/technology": {
    headerPrompt: "Want to understand how our wave system works?",
    proactiveGreeting: "Want to see how the wave is engineered?",
    suggestions: [
      { label: "HOW IS THE WAVE CREATED?", query: "How is the wave created?" },
      { label: "HOW DOES HEIGHT CONTROL WORK?", query: "How is wave height controlled?" },
      { label: "WHAT ARE WAVE PROFILES?", query: "What wave profiles are available?" },
      { label: "WHY ARE WAVES CONSISTENT?", query: "Why are the waves consistent?" },
    ],
  },
  "/visit": {
    headerPrompt: "Planning your visit to Bahrain Surf Park?",
    proactiveGreeting: "Planning your visit?",
    suggestions: [
      { label: "WHAT SHOULD I BRING?", query: "What should I bring for my visit?" },
      { label: "WHERE ARE YOU LOCATED?", query: "Where are you located?" },
      { label: "WHAT TIME SHOULD I ARRIVE?", query: "What time should I check in?" },
      { label: "PARKING & ACCESS", query: "What are the parking details?" },
    ],
  },
  "/surf": {
    headerPrompt: "Looking for the right surf experience?",
    proactiveGreeting: "Not sure which wave is right for you?",
    suggestions: [
      { label: "I'M A BEGINNER", query: "I'm a beginner. Which wave should I choose?" },
      { label: "SHOW WAVE LEVELS", query: "What are the different wave levels?" },
      { label: "WHAT BOARD DO I NEED?", query: "Are wetsuits and surfboards provided?" },
      { label: "BOOK A SESSION", query: "I would like to book a surf session." },
    ],
  },
  "/find-your-wave": {
    headerPrompt: "Which wave profile suits your surfing level?",
    proactiveGreeting: "Not sure which wave is right for you?",
    suggestions: [
      { label: "I'M A BEGINNER", query: "I'm a beginner. Which wave should I choose?" },
      { label: "SHOW WAVE LEVELS", query: "Compare the available wave levels." },
      { label: "INTERMEDIATE PROGRESSION", query: "What wave is best for intermediate surfers?" },
      { label: "BOOK A SESSION", query: "I would like to book a session." },
    ],
  },
  "/academy": {
    headerPrompt: "Looking to improve your surfing?",
    proactiveGreeting: "Looking to improve your surfing?",
    suggestions: [
      { label: "BEGINNER LESSONS", query: "What beginner lessons do you offer?" },
      { label: "INTERMEDIATE COACHING", query: "Tell me about ISA coaching and progression." },
      { label: "HOW DOES VIDEO ANALYSIS WORK?", query: "How does video motion analysis work?" },
      { label: "BOOK COACHING", query: "How can I book surf coaching?" },
    ],
  },
  "/cabanas": {
    headerPrompt: "Interested in private luxury cabanas?",
    proactiveGreeting: "Interested in private luxury cabanas?",
    suggestions: [
      { label: "CABANA AMENITIES", query: "What amenities are included in private cabanas?" },
      { label: "VIP & GROUP BOOKINGS", query: "Can I book cabanas for group events?" },
      { label: "FOOD & LAGOON DINING", query: "What dining options are available at cabanas?" },
    ],
  },
  "/services": {
    headerPrompt: "Exploring park amenities & services?",
    proactiveGreeting: "Exploring park amenities & services?",
    suggestions: [
      { label: "EQUIPMENT & DEMO FLEET", query: "What surfboard rentals and equipment are available?" },
      { label: "LOCKERS & CHANGING SUITES", query: "Are lockers and changing suites available?" },
      { label: "OPERATING HOURS", query: "What are your operating hours?" },
    ],
  },
  default: {
    headerPrompt: "How can we help you plan your surf experience?",
    proactiveGreeting: "Ready to find your wave?",
    suggestions: [
      { label: "FIND MY WAVE", query: "I need help finding the right wave level." },
      { label: "BOOK A SESSION", query: "I would like to book a surf session." },
      { label: "WHAT SHOULD I BRING?", query: "What should I bring for my visit?" },
      { label: "HOW DOES WAVE TECH WORK?", query: "How does the wave technology work?" },
      { label: "GETTING HERE", query: "Where is Bahrain Surf Park located?" },
    ],
  },
};

export function getPageContext(pathname: string): PageContextConfig {
  if (ROUTE_CONTEXTS[pathname]) {
    return ROUTE_CONTEXTS[pathname];
  }
  return ROUTE_CONTEXTS.default;
}
