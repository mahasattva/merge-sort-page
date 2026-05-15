# Second Chapter — Dating App for Seniors

## Technical Stack

### Frontend
- **Platform:** Mobile web app (responsive, mobile-first)
- **Framework:** React
- **Styling:** CSS with high-contrast, large-font design (min 16pt) per UX requirements

### Backend
- **Runtime:** Node.js
- **Framework:** Express
- **ORM:** Prisma
- **Database:** PostgreSQL

### Project Structure
```
second-chapter/
├── client/          # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
├── server/          # Express backend
│   ├── routes/
│   ├── middleware/
│   └── index.js
└── prisma/
    └── schema.prisma
```

### Dev Commands
```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# Start backend (dev)
cd server && npm run dev

# Start frontend (dev)
cd client && npm start
```

---

## Data Models

### User
```
id, email, passwordHash, name, age, location, bio
photoUrl (optional), isVerified, realNameConfirmed
lifestyleType (ACTIVE_OUTDOORSY | HOMEBODY_READER | ...)
createdAt, updatedAt
```

### Interest (lookup table)
```
id, name  (e.g., "Bridge Club", "Classical Music", "Gardening")
```

### UserInterest (join table)
```
userId, interestId
```

### LifeChapterPrompt
```
id, userId, questionKey, answer
```

### Match
```
id, userId1, userId2, compatibilityScore, status (PENDING | ACCEPTED | REJECTED)
createdAt
```

### Message
```
id, matchId, senderId, type (TEXT | VOICE_NOTE), content, createdAt
```

### Group
```
id, name, interestId, description
```

### GroupMembership
```
groupId, userId, joinedAt
```

### SafetyReport
```
id, reporterId, reportedUserId, reason, status, createdAt
```

---



**Target Audience:** Adults 55+ seeking companionship, meaningful relationships, and emotional connection.

**Core Vision:** A moderated, interest-driven community platform that prioritizes profile depth, safety, and the transition from virtual conversation to real-world, safe meet-ups.

**Brand Tagline:** "Connecting chapters of your life."

---

## I. Concept & Brand Identity

### The Problem
Existing dating apps are designed for fast-paced, disposable encounters — leading to frustration, superficiality, and safety concerns for older demographics. Seniors desire companionship and deeper connection, not a simple "date."

### The Solution
A moderated, interest-driven community platform that prioritizes profile depth, safety, and the transition from virtual conversation to real-world safe meet-ups (e.g., coffee meet-ups, group activities).

### Tone & Aesthetic
- **Tone:** Warm, gentle, optimistic, sophisticated, trustworthy.
- **Aesthetics:** Classic, readable, high-contrast. No loud colors, flashy animations, or overly young cultural references.
- **Color Palette:** Muted, warm, trustworthy colors — deep teal, burnt orange, soft gold.

---

## II. UX/UI Design Principles

Complexity, tiny text, and confusing navigation are major barriers for this demographic. UI/UX is paramount.

### UX Principles
1. **Clarity First** — Large, legible fonts (sans-serif: Arial or Helvetica). High contrast (dark text on light background).
2. **Low Friction** — Minimal taps for key actions. Intuitive navigation.
3. **Calm Pace** — Deliberate, not overwhelming. No endless swiping.
4. **Focus on Text/Interests** — Photos supplement the conversation, not define it.

### UI Elements

| Element | Requirement | Rationale |
|---|---|---|
| Typography | Minimum 16pt base font size, high contrast | Readability for aging eyes |
| Navigation | Bottom nav bar, 4–5 icons only (Home, Matches, Messages, Profile) | Simplicity |
| Imagery | User photos optional/secondary; emphasis on profile write-ups | Reduces focus on appearance |
| Color Palette | Muted, warm, trustworthy (deep teal, burnt orange, soft gold) | Avoids aggressive or "sexy" colors |
| Interaction | Structured carousels for reading profiles, not infinite scroll | Reduces fatigue, encourages thoughtful reading |

---

## III. Core Features

### Profile Creation (Depth over Surface)
- **Required fields:** Name, Age, Location, Bio.
- **"Life Chapter" Prompts (signature feature):** Deep, shared-experience questions:
  - "If I could revisit any decade, I would choose..."
  - "My ideal weekend involves..." (e.g., hiking, gardening, museum visits)
  - "Three things I hope to share with a companion are..."
- **Interest Tagging:** Mandatory selection of 3–5 specific interests (e.g., Bridge Club, Classical Music, Gardening, History). This is the primary matching mechanism.
- **Verification:** Mandatory document upload (utility bill or driver's license snippet) to combat fraud.

### Matching & Discovery (The Connection Flow)
1. **Initial Match Filter** — Algorithm prioritizes Shared Interests and Lifestyle compatibility (e.g., "Active/Outdoorsy" vs. "Homebody/Reader").
2. **Discovery Flow** — Users are presented with a *Compatibility Card* showing why they might match, with suggested shared activities.
3. **Icebreaker Questions** — First message prompt suggests a question based on a shared interest (e.g., "Since we both love opera, what's your favorite composer?").

### Communication (Safety & Structure)
- **Direct Messaging** — Standard one-on-one chat.
- **Voice Notes** — Highly encouraged. Hearing tone and laughter is critical for building rapport.
- **Community Group Chat** — Interest-based groups (e.g., "South Beach Bookworms," "Garden Enthusiasts"). Keeps the app community-focused, not just date-focused.
- **Pre-Meetup Safety Checklist** — Before a meetup, the app prompts users to establish a mutual safety plan (meet in public, inform a friend of time and place).

### Premium Features (Second Chapter Gold — Paid)
- **Advanced Filters** — Filter by niche interests, religious practices, or desired relationship pace.
- **"Deep Dive View"** — See a potential match's full activity history and all "Life Chapter" prompt responses.
- **Visibility Boost** — Temporary boost to appear higher in localized search results.

---

## IV. Safety, Moderation & Trust

Safety is not a feature — it is the foundation.

- **Mandatory Photo Policy** — No vehicle selfies or unidentifiable group photos. Require clear, smiling headshots.
- **Real-Name Focus** — Strong encouragement (or requirement) to use real names.
- **AI/Human Moderation** — AI flags abusive language; rapid human review of flagged accounts.
- **Reporting Tools** — Prominent, easy-to-use "Report User" buttons with clear categories: harassment, scams, suspicious behavior.
- **Scam Prevention** — Dedicated warning banners and resources for spotting romance scams and financial fraud.

---

## V. Business Model (Freemium)

Focused on community value over transactional features.

| Revenue Stream | Description | Pricing | Value |
|---|---|---|---|
| Premium Subscription (Second Chapter Gold) | Removes ads, unlocks advanced filters, unlimited Deep Dive View, priority visibility | $10–$20/month or quarterly | Enhanced experience and safety |
| Curated Events/Partnerships | Senior centers, museum passes, local restaurants, organized group outings | Commission/ticket fee per booking | Turns digital connections into real-world activity |
| Profile Enhancement (Optional) | Badges for completing safety training or verifying credentials | Small one-time purchase | Increases perceived trust |
| Subscription Tiering | "Family Plan" or "Circle Plan" for groups of friends | Group rate discount | Encourages friends to join together |

---

## VI. Marketing & Launch Strategy

### MVP Scope
The initial MVP focuses solely on the core loop:

**Interest-Based Profile Creation → Voice-Note Messaging → Compatibility Rating**

### Beta Launch (Phase 1)
- **Target Location:** Single contained geographic area (retirement community or high-senior-population city).
- **Partnerships:** Local senior centers, community centers, AARP chapters — for instant legitimacy and trust.
- **Outreach:** Host physical "meet-and-greet" events (pre-app) where features are demonstrated in a real-world setting.

### Marketing Message Pillars
1. **Companionship, not Romance** — Language: "Shared Adventures," "Heartwarming Connections," "A Friend for Life."
2. **Safety First** — "Your Safety Is Our Priority." (Repeated consistently across all channels.)
3. **Lifestyle Integration** — Market as a community activity resource, not just a dating tool.
