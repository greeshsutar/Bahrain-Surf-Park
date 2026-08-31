import { NextRequest, NextResponse } from "next/server";

export interface ConciergeResponseAction {
  type: "BOOKING" | "MAP" | "QUICK_ACTION";
  label: string;
  payload?: string;
  href?: string;
}

export interface ConciergeResponseBody {
  reply: string;
  suggestedActions?: { label: string; query: string }[];
  actionCTA?: ConciergeResponseAction;
}

// Security & Prompt Injection Sanitize Helper
function sanitizeInput(text: string): string {
  if (!text || typeof text !== "string") return "";
  return text.trim().slice(0, 500).replace(/[<>]/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawQuery = body?.query || "";
    const pathname = body?.pathname || "/";

    const query = sanitizeInput(rawQuery);
    if (!query) {
      return NextResponse.json({
        reply: "Welcome to Bahrain Surf Park! How can I assist you with your surf session, wave technology, or park visit today?",
        suggestedActions: [
          { label: "FIND MY WAVE", query: "I need help finding the right wave level." },
          { label: "BOOK A SESSION", query: "I would like to book a surf session." },
          { label: "WHAT SHOULD I BRING?", query: "What should I bring for my visit?" },
        ],
      });
    }

    const lowerQuery = query.toLowerCase();

    // Check optional server-side LLM key if available
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

    if (apiKey && process.env.ENABLE_LLM_CONCIERGE === "true") {
      // LLM execution block if enabled
      try {
        // Reserved for external LLM API call if configured
      } catch (err) {
        console.error("LLM Provider call failed, utilizing site concierge knowledge engine:", err);
      }
    }

    // Official Bahrain Surf Park Knowledge Engine & Intent Router
    let reply = "";
    let suggestedActions: { label: string; query: string }[] | undefined = undefined;
    let actionCTA: ConciergeResponseAction | undefined = undefined;

    // 1. Beginner / Decision Flow
    if (
      lowerQuery.includes("beginner") ||
      lowerQuery.includes("new to surf") ||
      lowerQuery.includes("never surfed") ||
      lowerQuery.includes("first time")
    ) {
      reply =
        "Welcome! For first-time surfers and beginners, we recommend our **Waikiki / Bay Wave** experience. It produces gentle, waist-high white water and knee-high rolling waves perfect for learning stance and standing up confidently.\n\nHow comfortable are you in the water?";
      suggestedActions = [
        { label: "COMPLETELY NEW", query: "I am completely new to surfing." },
        { label: "SOME EXPERIENCE", query: "I have surfed a few times before." },
        { label: "SURF REGULARLY", query: "I surf regularly and want a challenge." },
      ];
      actionCTA = {
        type: "BOOKING",
        label: "BOOK BEGINNER SESSION →",
        payload: "Beginner",
      };
    } else if (lowerQuery.includes("completely new")) {
      reply =
        "Perfect! Our ISA-certified coaches will guide you through a mandatory 45-minute check-in, land training, safety briefing, and equipment fitting. All soft-top boards, safety gear, and locker access are included with your booking.";
      suggestedActions = [
        { label: "WHAT SHOULD I BRING?", query: "What should I bring for my visit?" },
        { label: "BOOK BEGINNER LESSON", query: "I would like to book a beginner lesson." },
      ];
      actionCTA = {
        type: "BOOKING",
        label: "BOOK BEGINNER SESSION →",
        payload: "Beginner",
      };
    } else if (lowerQuery.includes("some experience")) {
      reply =
        "Great! For surfers with basic experience looking to practice pop-ups and initial turns, our **Malibu / Novice Wave** offers waist-high open faces with predictable speed and longer rides.";
      suggestedActions = [
        { label: "VIEW WAVE LEVELS", query: "What are the different wave levels?" },
        { label: "BOOK NOVICE SESSION", query: "I want to book a Novice session." },
      ];
      actionCTA = {
        type: "BOOKING",
        label: "BOOK NOVICE SESSION →",
        payload: "Novice",
      };
    } else if (lowerQuery.includes("surf regularly")) {
      reply =
        "Awesome! Advanced and expert surfers will love our **Turn Wave** (Point) and **Barrel & Air** (Cove) wave profiles. Experience overhead hollow barrels and high-performance air sections generated up to 1,000 waves per hour.";
      suggestedActions = [
        { label: "SHOW BARREL SPECS", query: "Tell me about the Barrel & Air wave profile." },
        { label: "BOOK ADVANCED SESSION", query: "I want to book an Advanced session." },
      ];
      actionCTA = {
        type: "BOOKING",
        label: "BOOK ADVANCED SESSION →",
        payload: "Advanced",
      };

    // 2. Wave Profiles & Levels
    } else if (
      lowerQuery.includes("wave level") ||
      lowerQuery.includes("wave profile") ||
      lowerQuery.includes("compare wave") ||
      lowerQuery.includes("types of wave")
    ) {
      reply =
        "Bahrain Surf Park offers 4 calibrated wave profiles:\n\n" +
        "• **Waikiki (Beginner)**: Gentle knee to waist-high white water for learning balance.\n" +
        "• **Malibu (Novice)**: Waist-high open waves for practicing stance & trimming.\n" +
        "• **Turn Wave (Intermediate)**: Chest to shoulder-high open face waves designed for maneuvers.\n" +
        "• **Barrel & Air (Advanced)**: Fast, hollow overhead barrels and air sections for high-performance surfing.";
      suggestedActions = [
        { label: "I'M A BEGINNER", query: "I'm a beginner. Which wave should I choose?" },
        { label: "BOOK A SESSION", query: "I would like to book a surf session." },
      ];
      actionCTA = {
        type: "BOOKING",
        label: "FIND YOUR WAVE →",
      };

    // 3. Wave Technology Questions
    } else if (
      lowerQuery.includes("technology") ||
      lowerQuery.includes("how is the wave created") ||
      lowerQuery.includes("how does the wave work") ||
      lowerQuery.includes("wavegarden") ||
      lowerQuery.includes("height control") ||
      lowerQuery.includes("consistent")
    ) {
      reply =
        "Our lagoon is powered by world-leading **Wavegarden Cove electro-mechanical technology**:\n\n" +
        "• **Generation**: Independent modular paddle units push water to create up to 1,000 ocean-quality waves per hour.\n" +
        "• **Control**: Wave height, shape, velocity, and frequency are computer-controlled and modified at the push of a button.\n" +
        "• **Water Quality**: Features a 100% closed-loop filtration system keeping the water crystal clear and pristine.\n" +
        "• **Consistency**: Unlike ocean breaks, wave shape and power remain 100% consistent regardless of wind or tide.";
      suggestedActions = [
        { label: "VIEW WAVE PROFILES", query: "What wave profiles are available?" },
        { label: "BOOK A SESSION", query: "I would like to book a surf session." },
      ];
      actionCTA = {
        type: "BOOKING",
        label: "EXPERIENCE THE WAVE →",
      };

    // 4. What to Bring & Amenities
    } else if (
      lowerQuery.includes("bring") ||
      lowerQuery.includes("wetsuit") ||
      lowerQuery.includes("board") ||
      lowerQuery.includes("gear") ||
      lowerQuery.includes("equipment")
    ) {
      reply =
        "Here is what you need for your visit:\n\n" +
        "• **What to bring**: Proper swimwear, towel, reef-safe sunscreen, and dry clothes.\n" +
        "• **Included with booking**: Soft-top surfboard, safety gear (vest/helmet if required), personal locker, and private changing suite access.\n" +
        "• **Own equipment**: You are welcome to bring your own surfboard or upgrade to our high-performance demo fleet at the park.";
      suggestedActions = [
        { label: "CHECK-IN TIME", query: "What time should I check in?" },
        { label: "PARKING & ACCESS", query: "What are the parking details?" },
      ];

    // 5. Arrival, Check-in, Hours & Parking
    } else if (
      lowerQuery.includes("arrive") ||
      lowerQuery.includes("check in") ||
      lowerQuery.includes("check-in") ||
      lowerQuery.includes("timing") ||
      lowerQuery.includes("hours") ||
      lowerQuery.includes("parking") ||
      lowerQuery.includes("valet")
    ) {
      reply =
        "**Park Visit Logistics**:\n\n" +
        "• **Operating Hours**: Open daily from **7:00 AM to 10:00 PM**.\n" +
        "• **Arrival Protocol**: Please arrive **45 minutes prior** to your session for equipment fitting and mandatory safety briefing.\n" +
        "• **Parking**: Free dedicated visitor parking lot and VIP valet drop-off available at the main entrance.";
      suggestedActions = [
        { label: "GETTING HERE", query: "Where is Bahrain Surf Park located?" },
        { label: "BOOK A SESSION", query: "I would like to book a surf session." },
      ];
      actionCTA = {
        type: "MAP",
        label: "VIEW ON MAP →",
        href: "/visit#visit",
      };

    // 6. Location & Map Queries
    } else if (
      lowerQuery.includes("where") ||
      lowerQuery.includes("location") ||
      lowerQuery.includes("getting here") ||
      lowerQuery.includes("address") ||
      lowerQuery.includes("map") ||
      lowerQuery.includes("directions")
    ) {
      reply =
        "Bahrain Surf Park is located along the coast at **Bilaj Al Jazayer, Kingdom of Bahrain** (Coordinates: 26.0125° N, 50.4850° E).\n\nIt is easily accessible by car with dedicated visitor parking and valet drop-off.";
      suggestedActions = [
        { label: "OPERATING HOURS", query: "What are your operating hours?" },
        { label: "WHAT SHOULD I BRING?", query: "What should I bring for my visit?" },
      ];
      actionCTA = {
        type: "MAP",
        label: "VIEW ON MAP →",
        href: "/visit#visit",
      };

    // 7. Academy & Coaching
    } else if (
      lowerQuery.includes("academy") ||
      lowerQuery.includes("coach") ||
      lowerQuery.includes("lesson") ||
      lowerQuery.includes("learn") ||
      lowerQuery.includes("video analysis")
    ) {
      reply =
        "The **Bahrain Surf Academy** features ISA-certified coaches providing:\n\n" +
        "• **Group Coaching**: Structured group lessons with personalized instructor feedback.\n" +
        "• **Private 1-on-1**: Dedicated coaching focused on your individual surf progression.\n" +
        "• **Video Analysis**: Multi-angle footage analysis to refine stance, maneuvers, and wave timing.";
      suggestedActions = [
        { label: "BEGINNER LESSONS", query: "I am a beginner interested in lessons." },
        { label: "BOOK COACHING", query: "I want to book a coaching session." },
      ];
      actionCTA = {
        type: "BOOKING",
        label: "BOOK COACHING →",
        payload: "Academy",
      };

    // 8. Cabanas & VIP Dining
    } else if (
      lowerQuery.includes("cabana") ||
      lowerQuery.includes("vip") ||
      lowerQuery.includes("private pool") ||
      lowerQuery.includes("dining") ||
      lowerQuery.includes("luxury")
    ) {
      reply =
        "Our **Lagoon Cabanas** offer a luxury sanctuary right at the water's edge:\n\n" +
        "• Private plunge pools and shade daybeds.\n" +
        "• Dedicated butler and concierge service.\n" +
        "• Private changing rooms and lagoon-side dining menus.";
      suggestedActions = [
        { label: "BOOK A CABANA", query: "How do I book a private cabana?" },
        { label: "VIEW AMENITIES", query: "What amenities are included in private cabanas?" },
      ];
      actionCTA = {
        type: "BOOKING",
        label: "INQUIRE CABANAS →",
        payload: "Cabana",
      };

    // 9. Booking Handoff Intent
    } else if (
      lowerQuery.includes("book") ||
      lowerQuery.includes("ticket") ||
      lowerQuery.includes("price") ||
      lowerQuery.includes("reservation") ||
      lowerQuery.includes("cost")
    ) {
      reply =
        "I can help you select the ideal experience! When you're ready, continue to our booking portal to choose your date and wave tier.";
      suggestedActions = [
        { label: "I'M A BEGINNER", query: "I'm a beginner. Which wave should I choose?" },
        { label: "SHOW WAVE LEVELS", query: "What are the different wave levels?" },
      ];
      actionCTA = {
        type: "BOOKING",
        label: "BOOK YOUR SESSION →",
      };

    // Default Fallback
    } else {
      reply =
        "Bahrain Surf Park is the Kingdom's premier wave resort located at Bilaj Al Jazayer, featuring Wavegarden Cove technology, ISA coaching, private cabanas, and wave sessions for all skill levels.\n\nHow can I help you plan your visit today?";
      suggestedActions = [
        { label: "FIND MY WAVE", query: "I need help finding the right wave level." },
        { label: "BOOK A SESSION", query: "I would like to book a surf session." },
        { label: "GETTING HERE", query: "Where is Bahrain Surf Park located?" },
      ];
    }

    const responsePayload: ConciergeResponseBody = {
      reply,
      suggestedActions,
      actionCTA,
    };

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error("Concierge API error:", error);
    return NextResponse.json(
      {
        reply: "Something went wrong. Please try asking your question again.",
        suggestedActions: [
          { label: "TRY AGAIN", query: "How can I plan my surf experience?" },
        ],
      },
      { status: 500 }
    );
  }
}
