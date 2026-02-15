const PSALM_TEXT = `Have mercy on me, O God, according to your steadfast love; according to your abundant mercy blot out my transgressions.

Wash me thoroughly from my iniquity, and cleanse me from my sin! For I know my transgressions, and my sin is ever before me.

Against you, you only, have I sinned and done what is evil in your sight, so that you may be justified in your words and blameless in your judgment.

Behold, I was brought forth in iniquity, and in sin did my mother conceive me. Behold, you delight in truth in the inward being, and you teach me wisdom in the secret heart.

Purge me with hyssop, and I shall be clean; wash me, and I shall be whiter than snow. Let me hear joy and gladness; let the bones that you have broken rejoice.

Hide your face from my sins, and blot out all my iniquities. Create in me a clean heart, O God, and renew a right spirit within me.

Cast me not away from your presence, and take not your Holy Spirit from me. Restore to me the joy of your salvation, and uphold me with a willing spirit.

Then I will teach transgressors your ways, and sinners will return to you. Deliver me from bloodguiltiness, O God, O God of my salvation, and my tongue will sing aloud of your righteousness.

O Lord, open my lips, and my mouth will declare your praise. For you will not delight in sacrifice, or I would give it; you will not be pleased with a burnt offering.

The sacrifices of God are a broken spirit; a broken and contrite heart, O God, you will not despise.`;

const EXAMINATION_QUESTIONS = [
    "Have I held onto anger or resentment toward others?",
    "Have I been dishonest in my words or actions?",
    "Have I neglected my responsibilities to my family or community?",
    "Have I acted out of pride or vanity?",
    "Have I been envious of the blessings of others?",
    "Have I failed to help those in need when I had the means?",
    "Have I spoken ill of others behind their backs?",
    "Have I allowed material possessions to become more important than people?",
    "Have I been impatient or lacked compassion?",
    "Have I failed to forgive those who have wronged me?",
    "Have I been wasteful with my time or resources?",
    "Have I ignored wisdom or wise counsel?",
    "Have I acted impulsively without considering the consequences?",
    "Have I judged others harshly while excusing my own faults?",
    "Have I failed to be grateful for the gifts in my life?",
    "Have I let fear prevent me from doing what is right?",
    "Have I been selfish in my relationships?",
    "Have I failed to listen when others needed to be heard?",
    "Have I compromised my integrity for personal gain?",
    "Have I harbored hatred in my heart?",
    "Is there a burden I am ready to lay down today?"
];

// Simple keyword mapping for specific verses (optional enhancement)
const SCRIPTURE_TOPICS = [
    { keywords: ['anger', 'hate', 'resentment'], verse: "Refrain from anger, and forsake wrath! Fret not yourself; it tends only to evil.", ref: "Psalm 37:8" },
    { keywords: ['fear', 'anxiety', 'worry'], verse: "When I am afraid, I put my trust in you.", ref: "Psalm 56:3" },
    { keywords: ['guilt', 'shame', 'regret'], verse: "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.", ref: "1 John 1:9" },
    { keywords: ['pride', 'ego'], verse: "God opposes the proud but gives grace to the humble.", ref: "James 4:6" },
    { keywords: ['default'], verse: "Come to me, all who labor and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" }
];
