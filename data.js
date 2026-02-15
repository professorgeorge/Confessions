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

// Questions organized by intensity: Light → Moderate → Deep
const EXAMINATION_QUESTIONS = [
    // LIGHT (Surface behaviors)
    { q: "Have I been impatient or unkind to others?", why: "When did this happen? What was I feeling?" },
    { q: "Have I wasted my time or resources?", why: "What did I choose instead? What was I avoiding?" },
    { q: "Have I taken my blessings for granted?", why: "What gifts have I failed to appreciate?" },
    { q: "Have I dismissed others when they needed to be heard?", why: "Who needed me? Why was I distracted?" },

    // MODERATE (Relational patterns)
    { q: "Have I gossiped or spoken poorly of others?", why: "What did I gain from this? What insecurity drove it?" },
    { q: "Have I been dishonest or deceptive?", why: "What truth was I afraid to face?" },
    { q: "Have I neglected my family or community?", why: "What felt more important? What am I running from?" },
    { q: "Have I put my needs above others in my relationships?", why: "Whose needs did I ignore? What was I protecting?" },
    { q: "Have I envied what others have?", why: "What do I believe I lack? Where does this hunger come from?" },
    { q: "Have I judged others while excusing myself?", why: "What do I see in them that I refuse to see in myself?" },

    // DEEP (Core wounds and patterns)
    { q: "Have I held onto anger or refused to forgive?", why: "What hurt am I protecting? Who have I not released?" },
    { q: "Have I acted out of pride or self-importance?", why: "What am I trying to prove? To whom?" },
    { q: "Have I loved things more than people?", why: "What void am I trying to fill?" },
    { q: "Have I turned away from those in need?", why: "What did I tell myself to justify this?" },
    { q: "Have I acted against my own values for gain?", why: "What did I sell? What part of myself did I betray?" },
    { q: "Have I indulged in lust or used others for pleasure?", why: "What emptiness am I trying to escape?" },
    { q: "Have I abused substances, food, or other comforts?", why: "What pain am I numbing? What am I avoiding?" },
    { q: "Have I let fear control my choices?", why: "What am I most afraid of? What would courage cost me?" },
    { q: "Have I been lazy or avoided what I know I should do?", why: "What responsibility have I run from?" },
    { q: "Have I lost hope or given in to despair?", why: "What light have I stopped believing in?" },
    { q: "Is there a burden I am ready to lay down today?", why: "What would my life look like if I released this?" }
];

// Scripture topics with keywords
const SCRIPTURE_TOPICS = [
    { keywords: ['anger', 'hate', 'resentment'], verse: "Refrain from anger, and forsake wrath! Fret not yourself; it tends only to evil.", ref: "Psalm 37:8" },
    { keywords: ['fear', 'anxiety', 'worry', 'afraid'], verse: "When I am afraid, I put my trust in you.", ref: "Psalm 56:3" },
    { keywords: ['guilt', 'shame', 'regret'], verse: "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness.", ref: "1 John 1:9" },
    { keywords: ['pride', 'ego', 'vanity'], verse: "God opposes the proud but gives grace to the humble.", ref: "James 4:6" },
    { keywords: ['greed', 'money', 'possession'], verse: "For the love of money is a root of all kinds of evils.", ref: "1 Timothy 6:10" },
    { keywords: ['lust', 'desire'], verse: "Flee from sexual immorality. Every other sin a person commits is outside the body, but the sexually immoral person sins against his own body.", ref: "1 Corinthians 6:18" },
    { keywords: ['envy', 'jealous'], verse: "Let us not become conceited, provoking one another, envying one another.", ref: "Galatians 5:26" },
    { keywords: ['default'], verse: "Come to me, all who labor and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" }
];

// Action suggestions based on confession themes
const ACTION_SUGGESTIONS = {
    anger: ["Reach out to the person you're angry with", "Write a letter you don't send to release the anger", "Practice 5 minutes of breathing when you feel anger rising"],
    fear: ["Name your fear out loud to someone you trust", "Take one small step toward what you're avoiding", "Replace one 'what if' with 'even if'"],
    guilt: ["Make amends where possible", "Forgive yourself as you've been forgiven", "Choose one act of kindness today"],
    pride: ["Ask for help with something", "Admit you were wrong to someone", "Serve someone without them knowing"],
    greed: ["Give something valuable away", "Practice gratitude for three things you have", "Spend time with someone who has less"],
    default: ["Choose one person to truly listen to today", "Perform one act of kindness in secret", "Spend 5 minutes in silence before tomorrow begins"]
};
