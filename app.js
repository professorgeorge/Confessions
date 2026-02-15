// State
const state = {
    examIndex: 0,
    psalmStanzas: [],
    psalmIndex: 0,
    audio: new Audio('assets/ambient_chant.mp3'),
    confessionText: '',
    confessionTopic: null,
    isPaused: false
};

// Audio Setup
state.audio.loop = true;
state.audio.volume = 0.5;

// DOM Elements
const elements = {
    examCard: document.getElementById('exam-card'),
    examText: document.getElementById('exam-text'),
    whyPrompt: document.getElementById('why-prompt'),
    confessionInput: document.getElementById('confession-input'),
    confessionCard: document.getElementById('confession-card')
};

// INIT
window.addEventListener('scroll', (e) => { e.preventDefault(); }, { passive: false });

// Create Floating Particles
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.setProperty('--float-duration', (15 + Math.random() * 10) + 's');
        particle.style.setProperty('--float-x', (Math.random() * 40 - 20) + 'px');
        particle.style.animationDelay = Math.random() * 20 + 's';
        container.appendChild(particle);
    }
}

createParticles();

// PWA Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/Quiet-Confessions/sw.js', { scope: '/Quiet-Confessions/' })
            .then(reg => console.log('SW Registered!', reg))
            .catch(err => console.log('SW Failed', err));
    });
}

// App Logic
const app = {
    startExamination: () => {
        // Play audio BEFORE transition to ensure it starts
        state.audio.play().catch(err => console.log("Audio play failed:", err));
        transitionWithCross('examination');
        // showQuestion will be called after transition completes
        setTimeout(() => app.showQuestion(), 600);
    },

    playAudio: () => {
        state.audio.play().catch(err => console.log("Audio play failed:", err));
    },

    showQuestion: () => {
        const q = EXAMINATION_QUESTIONS[state.examIndex];
        elements.examText.style.opacity = 0;
        elements.whyPrompt.style.opacity = 0;

        setTimeout(() => {
            elements.examText.textContent = q.q;
            elements.whyPrompt.textContent = q.why;
            elements.whyPrompt.style.display = 'block';
            elements.examText.style.opacity = 1;
            setTimeout(() => elements.whyPrompt.style.opacity = 1, 500);

            // Hide Next button if at last question
            const nextBtn = document.querySelector('.btn-secondary');
            if (state.examIndex === EXAMINATION_QUESTIONS.length - 1) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'inline-block';
            }
        }, 300);
    },

    nextQuestion: () => {
        console.log('Current index:', state.examIndex, 'Total questions:', EXAMINATION_QUESTIONS.length);
        if (state.examIndex < EXAMINATION_QUESTIONS.length - 1) {
            state.examIndex++;
            app.showQuestion();
        } else {
            console.log('At last question - no more next');
        }
    },

    pauseReflection: () => {
        if (state.isPaused) return;
        state.isPaused = true;

        const currentView = document.querySelector('.view-section.active');
        currentView.style.opacity = 0.3;
        document.getElementById('btn-pause').textContent = 'Reflecting...';
        document.getElementById('btn-pause').style.pointerEvents = 'none';

        setTimeout(() => {
            currentView.style.opacity = 1;
            document.getElementById('btn-pause').textContent = 'Pause to Reflect';
            document.getElementById('btn-pause').style.pointerEvents = 'auto';
            state.isPaused = false;
        }, 10000);
    },

    finishExamination: () => {
        // Show sacred pause before confession
        transitionWithCross('pause');
        startSacredPause();
    },

    submitConfession: () => {
        const text = elements.confessionInput.value.trim();
        if (!text) return;

        state.confessionText = text;
        state.confessionTopic = findTopic(text.toLowerCase());

        // Create ember effect
        createEmbers();

        // SLOWED DISSOLVE: 4 seconds
        elements.confessionInput.classList.add('dissolve');

        setTimeout(() => {
            setupPsalmResponse(state.confessionTopic);
            transitionWithCross('response');

            setTimeout(() => {
                elements.confessionInput.value = '';
                elements.confessionInput.classList.remove('dissolve');
            }, 1000);
        }, 4000); // Changed from 2s to 4s
    },

    showCommitment: () => {
        transitionWithCross('commitment');
    },

    completeJourney: () => {
        const commitment = document.getElementById('commitment-input').value.trim();
        if (commitment) {
            console.log('User commitment:', commitment);
        }

        transitionWithCross('completion');

        // Auto-return after 3 seconds
        setTimeout(() => {
            document.getElementById('commitment-input').value = '';
            state.examIndex = 0;
            state.confessionText = '';
            transitionWithCross('entry');
        }, 3000);
    },

    reset: () => {
        state.examIndex = 0;
        transitionWithCross('entry');
    }
};

// Utilities
function transitionWithCross(viewName) {
    const current = document.querySelector('.view-section.active');

    // Fade to black
    current.classList.add('fading-out');

    setTimeout(() => {
        // Show cross
        const cross = document.createElement('div');
        cross.className = 'transition-cross';
        cross.innerHTML = '✝';
        document.body.appendChild(cross);

        setTimeout(() => cross.remove(), 1000);
    }, 250);

    setTimeout(() => {
        switchView(viewName);
        current.classList.remove('fading-out');
    }, 500);
}

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
    return SCRIPTURE_TOPICS[SCRIPTURE_TOPICS.length - 1];
}

function createEmbers() {
    const card = elements.confessionCard;
    for (let i = 0; i < 12; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        ember.style.left = (Math.random() * 100) + '%';
        ember.style.top = '50%';
        ember.style.setProperty('--ember-x', (Math.random() * 60 - 30) + 'px');
        ember.style.animationDelay = (i * 0.3) + 's';
        card.appendChild(ember);

        setTimeout(() => ember.remove(), 4500);
    }
}

function startSacredPause() {
    let timeLeft = 10;
    const timerDisplay = document.getElementById('pause-timer');

    const interval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(interval);
            setTimeout(() => {
                transitionWithCross('confession');
            }, 500);
        }
    }, 1000);
}

function setupPsalmResponse(topic) {
    const stanzas = PSALM_TEXT.split('\n\n').filter(s => s.trim().length > 0);

    stanzas.unshift(`"${topic.verse}"\n— ${topic.ref}`);
    stanzas.push("Go in peace.");

    state.psalmStanzas = stanzas;
    state.psalmIndex = 0;

    const container = document.getElementById('psalm-content');
    container.innerHTML = '';

    const slide = document.createElement('div');
    slide.id = 'current-psalm-slide';
    slide.className = 'psalm-slide fade-in';
    container.appendChild(slide);

    const cue = document.createElement('div');
    cue.className = 'tap-indicator';
    container.appendChild(cue);
    setTimeout(() => cue.style.opacity = 1, 1000);

    showPsalmSlide();

    cue.onclick = (e) => {
        e.stopPropagation();
        state.psalmIndex++;
        if (state.psalmIndex < state.psalmStanzas.length) {
            showPsalmSlide();

            if (state.psalmIndex === state.psalmStanzas.length - 1) {
                cue.style.display = 'none';
                // After last psalm, show commitment
                setTimeout(() => {
                    app.showCommitment();
                }, 3000);
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
