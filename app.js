// State
const state = {
    examIndex: 0,
    psalmStanzas: [],
    psalmIndex: 0
};

// DOM Elements
const elements = {
    examCard: document.getElementById('exam-card'),
    examText: document.getElementById('exam-text'),
    confessionInput: document.getElementById('confession-input')
};

// INIT
window.addEventListener('scroll', (e) => { e.preventDefault(); }, { passive: false }); // Lock scroll

// *** SERVICE WORKER REGISTRATION (UPDATED) ***
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Explicitly registering with the repository path scope
        navigator.serviceWorker.register('/Quiet-Confessions/sw.js', { scope: '/Quiet-Confessions/' })
            .then(reg => console.log('SW Registered!', reg))
            .catch(err => console.log('SW Failed', err));
    });
}

// App Logic
const app = {
    startExamination: () => {
        switchView('examination');
        app.showQuestion();
    },

    showQuestion: () => {
        elements.examText.style.opacity = 0;
        setTimeout(() => {
            elements.examText.textContent = EXAMINATION_QUESTIONS[state.examIndex];
            elements.examText.style.opacity = 1;
        }, 300);
    },

    nextQuestion: () => {
        state.examIndex++;
        if (state.examIndex >= EXAMINATION_QUESTIONS.length) {
            state.examIndex = 0; // Loop or finish
        }
        app.showQuestion();
    },

    finishExamination: () => {
        switchView('confession');
    },

    submitConfession: () => {
        const text = elements.confessionInput.value.trim();
        if (!text) return; // Don't submit empty

        // VISUAL EFFECT: BURNING/DISSOLVING
        elements.confessionInput.classList.add('dissolve');

        // Logic
        const topic = findTopic(text.toLowerCase());

        // Wait for animation (2s)
        setTimeout(() => {
            setupPsalmResponse(topic);
            switchView('response');

            // Clean up input after view switch
            setTimeout(() => {
                elements.confessionInput.value = '';
                elements.confessionInput.classList.remove('dissolve');
            }, 1000);
        }, 2000);
    },

    reset: () => {
        state.examIndex = 0;
        switchView('entry');
    }
};

// Utilities
function switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.remove('active');
        if (el.id === `view-${viewName}`) {
            el.classList.add('active');
        }
    });
}

function findTopic(text) {
    for (const topic of SCRIPTURE_TOPICS) {
        if (topic.keywords.some(k => text.includes(k))) {
            return topic;
        }
    }
    return SCRIPTURE_TOPICS[SCRIPTURE_TOPICS.length - 1]; // Default
}

function setupPsalmResponse(topic) {
    // 1. Prepare Stanzas
    const stanzas = PSALM_TEXT.split('\n\n').filter(s => s.trim().length > 0);

    // Add specific verse first
    stanzas.unshift(`"${topic.verse}"\n— ${topic.ref}`);
    // Add closing
    stanzas.push("Go in peace.");

    state.psalmStanzas = stanzas;
    state.psalmIndex = 0;

    // 2. Setup Container
    const container = document.getElementById('psalm-content');
    container.innerHTML = '';

    // Slide Element
    const slide = document.createElement('div');
    slide.id = 'current-psalm-slide';
    slide.className = 'psalm-slide fade-in';
    container.appendChild(slide);

    // Navigation Cue
    const cue = document.createElement('div');
    cue.className = 'tap-indicator';
    container.appendChild(cue);
    setTimeout(() => cue.style.opacity = 1, 1000);

    // 3. Render Initial
    showPsalmSlide();

    // 4. Interaction
    cue.onclick = (e) => {
        e.stopPropagation();
        state.psalmIndex++;
        if (state.psalmIndex < state.psalmStanzas.length) {
            showPsalmSlide();

            // Last slide check
            if (state.psalmIndex === state.psalmStanzas.length - 1) {
                cue.style.display = 'none';
                const btn = document.getElementById('btn-restart');
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'all';
            }
        } else {
            cue.style.display = 'none';
        }
    };
}

function showPsalmSlide() {
    const slide = document.getElementById('current-psalm-slide');
    slide.style.opacity = 0;
    setTimeout(() => {
        slide.innerText = state.psalmStanzas[state.psalmIndex];
        slide.style.opacity = 1;
    }, 500);
}
