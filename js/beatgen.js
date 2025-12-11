// Beat Generator con Tone.js - Rack Unit Style

// Genre audio presets (AUTO mode)
const GENRE_AUDIO_PRESETS = {
    rock: {
        bpm: 120,
        kick: { type: 'punchy', volume: 75, decay: 30 },
        snare: { type: 'tight', volume: 75, decay: 40 },
        hihat: { type: 'closed', volume: 65, decay: 20 },
        vinyl: 0
    },
    pop: {
        bpm: 115,
        kick: { type: 'punchy', volume: 70, decay: 35 },
        snare: { type: 'tight', volume: 70, decay: 45 },
        hihat: { type: 'closed', volume: 60, decay: 25 },
        vinyl: 0
    },
    funk: {
        bpm: 100,
        kick: { type: 'deep', volume: 75, decay: 40 },
        snare: { type: 'tight', volume: 80, decay: 35 },
        hihat: { type: 'closed', volume: 70, decay: 20 },
        vinyl: 15
    },
    blues: {
        bpm: 75,
        kick: { type: 'deep', volume: 70, decay: 50 },
        snare: { type: 'fat', volume: 65, decay: 55 },
        hihat: { type: 'open', volume: 55, decay: 45 },
        vinyl: 30
    },
    drill: {
        bpm: 100,
        kick: { type: 'punchy', volume: 80, decay: 25 },
        snare: { type: 'rim', volume: 75, decay: 20 },
        hihat: { type: 'closed', volume: 70, decay: 15 },
        vinyl: 0
    },
    latin: {
        bpm: 100,
        kick: { type: 'acoustic', volume: 70, decay: 40 },
        snare: { type: 'rim', volume: 65, decay: 35 },
        hihat: { type: 'shaker', volume: 60, decay: 30 },
        vinyl: 5
    },
    reggae: {
        bpm: 80,
        kick: { type: 'deep', volume: 80, decay: 55 },
        snare: { type: 'rim', volume: 65, decay: 40 },
        hihat: { type: 'closed', volume: 55, decay: 25 },
        vinyl: 20
    },
    electro: {
        bpm: 90,
        kick: { type: '808', volume: 80, decay: 70 },
        snare: { type: 'clap', volume: 75, decay: 45 },
        hihat: { type: 'closed', volume: 65, decay: 15 },
        vinyl: 0
    }
};

// Sound presets
const KICK_PRESETS = {
    deep: {
        pitchDecay: 0.07,
        octaves: 8,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 0.4, sustain: 0.05, release: 0.35 }
    },
    punchy: {
        pitchDecay: 0.05,
        octaves: 6,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.002, decay: 0.35, sustain: 0.01, release: 0.3 }
    },
    '808': {
        pitchDecay: 0.15,
        octaves: 10,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 0.8, sustain: 0.1, release: 0.8 }
    },
    acoustic: {
        pitchDecay: 0.06,
        octaves: 5,
        oscillator: { type: 'triangle' },
        envelope: { attack: 0.003, decay: 0.4, sustain: 0.01, release: 0.35 }
    }
};

const SNARE_PRESETS = {
    tight: {
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.1 }
    },
    fat: {
        noise: { type: 'pink' },
        envelope: { attack: 0.001, decay: 0.3, sustain: 0.02, release: 0.2 }
    },
    rim: {
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.05 }
    },
    clap: {
        noise: { type: 'white' },
        envelope: { attack: 0.005, decay: 0.25, sustain: 0.01, release: 0.15 }
    }
};

const HIHAT_PRESETS = {
    closed: {
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.02 },
        filterFreq: 8000
    },
    open: {
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.3, sustain: 0.05, release: 0.2 },
        filterFreq: 7000
    },
    shaker: {
        noise: { type: 'pink' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.02, release: 0.08 },
        filterFreq: 5000
    },
    ride: {
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.5, sustain: 0.1, release: 0.4 },
        filterFreq: 6000
    }
};

class BeatGenerator {
    constructor() {
        this.isPlaying = false;
        this.currentPattern = null;
        this.currentGenre = null;
        this.currentStep = 0;
        this.bpm = 120;

        // Multi-bar support
        this.totalBars = 1;
        this.currentBar = 0;
        this.stepsPerBar = 16;

        // Current sound types
        this.kickType = 'deep';
        this.snareType = 'tight';
        this.hihatType = 'closed';

        // Auto mode
        this.autoMode = true;

        // Synth per i suoni di batteria
        this.kick = null;
        this.snare = null;
        this.hihat = null;
        this.hihatFilter = null;

        // Volumi
        this.kickVol = null;
        this.snareVol = null;
        this.hihatVol = null;
        this.masterVol = null;

        // Vinyl effect
        this.vinylNoise = null;
        this.vinylFilter = null;
        this.vinylVol = null;

        // Sequencer
        this.sequence = null;

        // DOM elements
        this.beatPlayBtn = document.getElementById('beatPlayBtn');
        this.genreButtonsContainer = document.getElementById('genreButtons');
        this.variationButtonsContainer = document.getElementById('variationButtons');

        // BPM controls
        this.bpmDisplay = document.getElementById('bpmDisplay');
        this.bpmMinus = document.getElementById('bpmMinus');
        this.bpmPlus = document.getElementById('bpmPlus');

        // Pattern display
        this.kickPatternEl = document.getElementById('kickPattern');
        this.snarePatternEl = document.getElementById('snarePattern');
        this.hihatPatternEl = document.getElementById('hihatPattern');

        // Bar indicator
        this.barIndicator = document.getElementById('barIndicator');

        // Audio controls
        this.autoModeBtn = document.getElementById('autoModeBtn');
        this.masterVolumeSlider = document.getElementById('masterVolume');
        this.vinylAmountSlider = document.getElementById('vinylAmount');
        this.kickVolumeSlider = document.getElementById('kickVolume');
        this.kickTypeSelect = document.getElementById('kickType');
        this.snareVolumeSlider = document.getElementById('snareVolume');
        this.snareTypeSelect = document.getElementById('snareType');
        this.hihatVolumeSlider = document.getElementById('hihatVolume');
        this.hihatTypeSelect = document.getElementById('hihatType');

        this.init();
    }

    init() {
        this.setupSounds();
        this.renderGenreButtons();
        this.setupEventListeners();
        this.setupAudioControls();
        this.createPatternDisplay();
        this.updateBpmDisplay();

        // Seleziona il primo genere
        this.selectGenre('rock');
    }

    renderGenreButtons() {
        let html = '';
        Object.keys(GENRES).forEach(genreKey => {
            const genre = GENRES[genreKey];
            html += `<button class="genre-btn" data-genre="${genreKey}">
                <span class="genre-led"></span>
                <span class="dymo-label">${genre.name}</span>
            </button>`;
        });
        this.genreButtonsContainer.innerHTML = html;
    }

    renderVariationButtons(genreKey) {
        const genre = GENRES[genreKey];
        let html = '';
        genre.patterns.forEach(patternKey => {
            const pattern = PATTERNS[patternKey];
            html += `<button class="variation-btn" data-pattern="${patternKey}">
                <span class="variation-led"></span>
                <span class="dymo-label">${pattern.name}</span>
            </button>`;
        });
        this.variationButtonsContainer.innerHTML = html;

        // Aggiungi event listeners alle nuove variazioni
        this.variationButtonsContainer.querySelectorAll('.variation-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectPattern(btn.dataset.pattern);
            });
        });
    }

    setupSounds() {
        // Master volume
        this.masterVol = new Tone.Volume(0).toDestination();

        // Volumi individuali
        this.kickVol = new Tone.Volume(-6).connect(this.masterVol);
        this.snareVol = new Tone.Volume(-6).connect(this.masterVol);
        this.hihatVol = new Tone.Volume(-10).connect(this.masterVol);

        // Kick drum - layered: membrane (sub) + noise (click)
        this.kick = new Tone.MembraneSynth(KICK_PRESETS[this.kickType]).connect(this.kickVol);

        // Click layer for attack
        this.kickClickFilter = new Tone.Filter({
            frequency: 3500,
            type: 'bandpass',
            Q: 1.5
        }).connect(this.kickVol);

        this.kickClick = new Tone.NoiseSynth({
            noise: { type: 'white' },
            envelope: {
                attack: 0.001,
                decay: 0.02,
                sustain: 0,
                release: 0.01
            }
        }).connect(this.kickClickFilter);

        // Snare
        this.snare = new Tone.NoiseSynth(SNARE_PRESETS[this.snareType]).connect(this.snareVol);

        // Hi-hat
        const hihatPreset = HIHAT_PRESETS[this.hihatType];
        this.hihatFilter = new Tone.Filter(hihatPreset.filterFreq, 'highpass').connect(this.hihatVol);
        this.hihat = new Tone.NoiseSynth({
            noise: hihatPreset.noise,
            envelope: hihatPreset.envelope
        }).connect(this.hihatFilter);

        // Vinyl crackle - loop sample
        this.vinylVol = new Tone.Volume(-Infinity).toDestination();
        this.vinylPlayer = new Tone.Player({
            url: 'audio/vinyl-crackle.mp3',
            loop: true
        }).connect(this.vinylVol);
    }

    setupAudioControls() {
        // Auto mode button
        this.autoModeBtn.addEventListener('click', () => {
            this.autoMode = !this.autoMode;
            this.autoModeBtn.classList.toggle('active', this.autoMode);
            if (this.autoMode && this.currentGenre) {
                this.applyGenreAudioPreset(this.currentGenre);
            }
        });
        // Set initial state
        this.autoModeBtn.classList.add('active');

        // Master volume
        this.masterVolumeSlider.addEventListener('input', () => {
            const value = parseInt(this.masterVolumeSlider.value);
            // Convert 0-100 to dB (-60 to 0)
            const db = value === 0 ? -Infinity : (value - 100) * 0.6;
            this.masterVol.volume.value = db;
        });

        // Vinyl crackle
        this.vinylAmountSlider.addEventListener('input', () => {
            this.disableAutoMode();
            const value = parseInt(this.vinylAmountSlider.value);
            if (value === 0) {
                this.vinylVol.volume.value = -Infinity;
                if (this.vinylPlayer.state === 'started') {
                    this.vinylPlayer.stop();
                }
            } else {
                // Convert 0-100 to dB (-40 to -10dB)
                const db = -40 + (value * 0.3);
                this.vinylVol.volume.value = db;
                if (this.vinylPlayer.state !== 'started') {
                    this.vinylPlayer.start();
                }
            }
        });

        // Kick controls
        this.kickVolumeSlider.addEventListener('input', () => {
            this.disableAutoMode();
            const value = parseInt(this.kickVolumeSlider.value);
            const db = value === 0 ? -Infinity : (value - 100) * 0.6;
            this.kickVol.volume.value = db;
        });

        this.kickTypeSelect.addEventListener('change', () => {
            this.disableAutoMode();
            this.kickType = this.kickTypeSelect.value;
            this.rebuildKick();
        });

        // Snare controls
        this.snareVolumeSlider.addEventListener('input', () => {
            this.disableAutoMode();
            const value = parseInt(this.snareVolumeSlider.value);
            const db = value === 0 ? -Infinity : (value - 100) * 0.6;
            this.snareVol.volume.value = db;
        });

        this.snareTypeSelect.addEventListener('change', () => {
            this.disableAutoMode();
            this.snareType = this.snareTypeSelect.value;
            this.rebuildSnare();
        });

        // Hi-hat controls
        this.hihatVolumeSlider.addEventListener('input', () => {
            this.disableAutoMode();
            const value = parseInt(this.hihatVolumeSlider.value);
            const db = value === 0 ? -Infinity : (value - 100) * 0.6;
            this.hihatVol.volume.value = db;
        });

        this.hihatTypeSelect.addEventListener('change', () => {
            this.disableAutoMode();
            this.hihatType = this.hihatTypeSelect.value;
            this.rebuildHihat();
        });
    }

    disableAutoMode() {
        if (this.autoMode) {
            this.autoMode = false;
            this.autoModeBtn.classList.remove('active');
        }
    }

    rebuildKick() {
        if (this.kick) {
            this.kick.dispose();
        }
        if (this.kickClick) {
            this.kickClick.dispose();
        }
        if (this.kickClickFilter) {
            this.kickClickFilter.dispose();
        }

        const preset = KICK_PRESETS[this.kickType];
        this.kick = new Tone.MembraneSynth(preset).connect(this.kickVol);

        // Click layer for attack
        this.kickClickFilter = new Tone.Filter({
            frequency: 3500,
            type: 'bandpass',
            Q: 1.5
        }).connect(this.kickVol);

        this.kickClick = new Tone.NoiseSynth({
            noise: { type: 'white' },
            envelope: {
                attack: 0.001,
                decay: 0.02,
                sustain: 0,
                release: 0.01
            }
        }).connect(this.kickClickFilter);
    }

    rebuildSnare() {
        if (this.snare) {
            this.snare.dispose();
        }
        const preset = SNARE_PRESETS[this.snareType];
        this.snare = new Tone.NoiseSynth(preset).connect(this.snareVol);
    }

    rebuildHihat() {
        if (this.hihat) {
            this.hihat.dispose();
        }
        if (this.hihatFilter) {
            this.hihatFilter.dispose();
        }
        const preset = HIHAT_PRESETS[this.hihatType];
        this.hihatFilter = new Tone.Filter(preset.filterFreq, 'highpass').connect(this.hihatVol);
        this.hihat = new Tone.NoiseSynth({
            noise: preset.noise,
            envelope: preset.envelope
        }).connect(this.hihatFilter);
    }

    applyGenreAudioPreset(genreKey) {
        const preset = GENRE_AUDIO_PRESETS[genreKey];
        if (!preset) return;

        // BPM
        this.setBPM(preset.bpm);

        // Kick
        this.kickTypeSelect.value = preset.kick.type;
        this.kickType = preset.kick.type;
        this.rebuildKick();
        this.kickVolumeSlider.value = preset.kick.volume;
        this.kickVol.volume.value = (preset.kick.volume - 100) * 0.6;

        // Snare
        this.snareTypeSelect.value = preset.snare.type;
        this.snareType = preset.snare.type;
        this.rebuildSnare();
        this.snareVolumeSlider.value = preset.snare.volume;
        this.snareVol.volume.value = (preset.snare.volume - 100) * 0.6;

        // Hi-hat
        this.hihatTypeSelect.value = preset.hihat.type;
        this.hihatType = preset.hihat.type;
        this.rebuildHihat();
        this.hihatVolumeSlider.value = preset.hihat.volume;
        this.hihatVol.volume.value = (preset.hihat.volume - 100) * 0.6;

        // Vinyl
        this.vinylAmountSlider.value = preset.vinyl;
        if (preset.vinyl === 0) {
            this.vinylVol.volume.value = -Infinity;
            if (this.vinylPlayer.state === 'started') {
                this.vinylPlayer.stop();
            }
        } else {
            const db = -40 + (preset.vinyl * 0.3);
            this.vinylVol.volume.value = db;
            if (this.vinylPlayer.state !== 'started') {
                this.vinylPlayer.start();
            }
        }
    }

    setupEventListeners() {
        // Play/Pause
        this.beatPlayBtn.addEventListener('click', () => this.togglePlay());

        // Genre selection
        this.genreButtonsContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.genre-btn');
            if (btn) {
                this.selectGenre(btn.dataset.genre);
            }
        });

        // BPM input
        this.bpmDisplay.addEventListener('change', () => this.handleBpmInput());
        this.bpmDisplay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleBpmInput();
                this.bpmDisplay.blur();
            }
        });

        // BPM buttons with long press
        this.setupBpmButton(this.bpmMinus, -1);
        this.setupBpmButton(this.bpmPlus, 1);

        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                this.togglePlay();
            }
        });
    }

    handleBpmInput() {
        this.disableAutoMode();
        let value = parseInt(this.bpmDisplay.value);
        if (isNaN(value)) value = 120;
        value = Math.max(40, Math.min(220, value));
        this.setBPM(value);
    }

    setupBpmButton(btn, delta) {
        let interval = null;
        let timeout = null;
        let speed = 150; // Starting speed in ms

        const startPress = () => {
            this.adjustBpm(delta); // First click
            speed = 150;
            timeout = setTimeout(() => {
                interval = setInterval(() => {
                    this.adjustBpm(delta);
                    // Accelerate
                    if (speed > 30) {
                        speed -= 20;
                        clearInterval(interval);
                        interval = setInterval(() => this.adjustBpm(delta), speed);
                    }
                }, speed);
            }, 400); // Wait before long press kicks in
        };

        const endPress = () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };

        // Mouse
        btn.addEventListener('mousedown', startPress);
        btn.addEventListener('mouseup', endPress);
        btn.addEventListener('mouseleave', endPress);

        // Touch
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startPress();
        });
        btn.addEventListener('touchend', endPress);
    }

    adjustBpm(delta) {
        this.disableAutoMode();
        this.setBPM(Math.max(40, Math.min(220, this.bpm + delta)));
    }

    updateBpmDisplay() {
        // Always show 3 digits with leading zeros
        this.bpmDisplay.value = String(this.bpm).padStart(3, '0');
    }

    createPatternDisplay(timeSignature = '4/4') {
        // Determine grid structure based on time signature
        let beatsPerBar, stepsPerBeat;
        if (timeSignature === '12/8') {
            beatsPerBar = 4;
            stepsPerBeat = 3;
        } else if (timeSignature === '6/8') {
            beatsPerBar = 2;
            stepsPerBeat = 3;
        } else {
            beatsPerBar = 4;
            stepsPerBeat = 4;
        }

        [this.kickPatternEl, this.snarePatternEl, this.hihatPatternEl].forEach(row => {
            row.innerHTML = '';
            for (let beat = 0; beat < beatsPerBar; beat++) {
                const beatGroup = document.createElement('div');
                beatGroup.className = 'beat-group-steps';
                // For 12/8, add a class to adjust CSS grid
                if (stepsPerBeat === 3) {
                    beatGroup.classList.add('triplet');
                }
                for (let s = 0; s < stepsPerBeat; s++) {
                    const stepIndex = beat * stepsPerBeat + s;
                    const step = document.createElement('div');
                    step.className = 'step';
                    step.dataset.step = stepIndex;
                    beatGroup.appendChild(step);
                }
                row.appendChild(beatGroup);
            }
        });

        // Update beat row for time signature
        this.createBeatRow(timeSignature);
    }

    createBeatRow(timeSignature = '4/4') {
        const beatRow = document.querySelector('.beat-row');
        if (!beatRow) return;

        let beatsPerBar, dotsPerBeat;
        if (timeSignature === '12/8') {
            beatsPerBar = 4;
            dotsPerBeat = 2;  // 1 · · for triplet feel
        } else if (timeSignature === '6/8') {
            beatsPerBar = 2;
            dotsPerBeat = 2;
        } else {
            beatsPerBar = 4;
            dotsPerBeat = 3;  // 1 · · · for 16ths
        }

        beatRow.innerHTML = '';
        for (let beat = 1; beat <= beatsPerBar; beat++) {
            const group = document.createElement('div');
            group.className = 'beat-group';

            const beatNum = document.createElement('span');
            beatNum.className = 'beat-num';
            beatNum.dataset.beat = beat;
            beatNum.textContent = beat;
            group.appendChild(beatNum);

            for (let d = 0; d < dotsPerBeat; d++) {
                const dot = document.createElement('span');
                dot.className = 'beat-dot';
                dot.textContent = '·';
                group.appendChild(dot);
            }
            beatRow.appendChild(group);
        }
    }

    updatePatternDisplay() {
        if (!this.currentPattern) return;

        const pattern = PATTERNS[this.currentPattern];

        const updateRow = (row, data) => {
            row.querySelectorAll('.step').forEach((step, i) => {
                step.classList.toggle('active', data[i] === 1);
            });
        };

        updateRow(this.kickPatternEl, pattern.kick);
        updateRow(this.snarePatternEl, pattern.snare);
        updateRow(this.hihatPatternEl, pattern.hihat);
    }

    highlightStep(step) {
        document.querySelectorAll('.step-row .step').forEach(s => {
            s.classList.remove('playing');
        });

        [this.kickPatternEl, this.snarePatternEl, this.hihatPatternEl].forEach(row => {
            const stepEl = row.querySelector(`[data-step="${step}"]`);
            if (stepEl) stepEl.classList.add('playing');
        });
    }

    selectGenre(genreKey) {
        if (!GENRES[genreKey]) return;

        this.currentGenre = genreKey;

        this.genreButtonsContainer.querySelectorAll('.genre-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.genre === genreKey);
        });

        // Apply audio preset if AUTO mode is on
        if (this.autoMode) {
            this.applyGenreAudioPreset(genreKey);
        }

        // Dispatch event for BASSIST to reset fretboard
        window.dispatchEvent(new CustomEvent('drummerGenreChange', {
            detail: { genre: genreKey }
        }));

        this.renderVariationButtons(genreKey);
        const firstPattern = GENRES[genreKey].patterns[0];
        this.selectPattern(firstPattern);
    }

    selectPattern(patternName) {
        if (!PATTERNS[patternName]) return;

        this.currentPattern = patternName;
        const pattern = PATTERNS[patternName];

        // Dispatch event for BASSIST auto-resync
        window.dispatchEvent(new CustomEvent('drummerPatternChange', {
            detail: { pattern: patternName }
        }));
        const timeSignature = pattern.timeSignature || '4/4';

        this.variationButtonsContainer.querySelectorAll('.variation-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.pattern === patternName);
        });

        // Update multi-bar state
        this.stepsPerBar = this.getStepsPerBar(timeSignature);
        this.totalBars = pattern.bars || 1;
        this.currentBar = 0;

        // Render bar indicator
        this.renderBarIndicator(this.totalBars);

        // Recreate pattern display for time signature
        this.createPatternDisplay(timeSignature);

        this.setBPM(pattern.bpm);
        this.updatePatternDisplay();

        if (this.isPlaying) {
            this.stopSequence();
            this.currentStep = 0;
            this.currentBar = 0;
            this.startSequence();
        }
    }

    setBPM(bpm) {
        this.bpm = bpm;
        Tone.Transport.bpm.value = bpm;
        this.updateBpmDisplay();
    }

    async togglePlay() {
        if (this.isPlaying) {
            this.stop();
        } else {
            await this.play();
        }
    }

    async play() {
        if (!this.currentPattern) {
            this.selectGenre('rock');
        }

        await Tone.start();
        this.startSequence();
        this.isPlaying = true;
        this.beatPlayBtn.classList.add('active');
    }

    stop() {
        this.stopSequence();
        this.isPlaying = false;
        this.beatPlayBtn.classList.remove('active');
        this.currentStep = 0;
        this.highlightStep(-1);
        this.clearBeatCounter();
    }

    startSequence() {
        const pattern = PATTERNS[this.currentPattern];
        const timeSignature = pattern.timeSignature || '4/4';
        Tone.Transport.bpm.value = this.bpm;

        // Calculate total steps based on bars and time signature
        this.stepsPerBar = this.getStepsPerBar(timeSignature);
        this.totalBars = pattern.bars || 1;
        const totalSteps = this.totalBars * this.stepsPerBar;

        // Note duration based on time signature
        // 4/4: 16th notes, 12/8 and 6/8: 8th note triplets
        const noteDuration = (timeSignature === '12/8' || timeSignature === '6/8') ? '8t' : '16n';

        // Render bar indicator
        this.renderBarIndicator(this.totalBars);

        this.sequence = new Tone.Sequence((time, step) => {
            this.currentStep = step;
            this.currentBar = Math.floor(step / this.stepsPerBar);
            const stepInBar = step % this.stepsPerBar;

            if (pattern.kick[step]) {
                this.kick.triggerAttackRelease('C1', '8n', time);
                this.kickClick.triggerAttackRelease('32n', time);
            }
            if (pattern.snare[step]) {
                this.snare.triggerAttackRelease('8n', time);
            }
            if (pattern.hihat[step]) {
                this.hihat.triggerAttackRelease('32n', time);
            }

            Tone.Draw.schedule(() => {
                this.highlightStep(stepInBar);
                this.updateBeatCounter(stepInBar);
                this.updateBarIndicator(this.currentBar);
                this.updatePatternDisplayForBar(this.currentBar);
            }, time);

        }, [...Array(totalSteps).keys()], noteDuration);

        this.sequence.start(0);
        Tone.Transport.start();
    }

    updateBeatCounter(step) {
        // Calculate beat based on time signature
        const pattern = PATTERNS[this.currentPattern];
        const timeSignature = pattern?.timeSignature || '4/4';
        const stepsPerBeat = (timeSignature === '12/8' || timeSignature === '6/8') ? 3 : 4;

        const beat = Math.floor(step / stepsPerBeat) + 1;

        document.querySelectorAll('.beat-num').forEach(beatEl => {
            const beatNum = parseInt(beatEl.dataset.beat);
            beatEl.classList.remove('active', 'downbeat');

            if (beatNum === beat) {
                beatEl.classList.add('active');
                if (beatNum === 1) {
                    beatEl.classList.add('downbeat');
                }
            }
        });
    }

    clearBeatCounter() {
        document.querySelectorAll('.beat-num').forEach(beatEl => {
            beatEl.classList.remove('active', 'downbeat');
        });
    }

    stopSequence() {
        if (this.sequence) {
            this.sequence.stop();
            this.sequence.dispose();
            this.sequence = null;
        }
        Tone.Transport.stop();
    }

    // Multi-bar helper methods
    getStepsPerBar(timeSignature) {
        switch(timeSignature) {
            case '12/8': return 12;  // 4 beat × 3 subdivisions
            case '6/8': return 6;    // 2 beat × 3 subdivisions
            default: return 16;      // 4/4: 4 beat × 4 subdivisions
        }
    }

    renderBarIndicator(numBars) {
        if (!this.barIndicator) return;

        // Hide if only 1 bar
        if (numBars <= 1) {
            this.barIndicator.style.display = 'none';
            return;
        }

        this.barIndicator.style.display = 'flex';
        this.barIndicator.innerHTML = '';
        for (let i = 0; i < numBars; i++) {
            const led = document.createElement('span');
            led.className = 'bar-led';
            led.dataset.bar = i;
            if (i === 0) led.classList.add('active');
            this.barIndicator.appendChild(led);
        }
    }

    updateBarIndicator(bar) {
        if (!this.barIndicator) return;
        this.barIndicator.querySelectorAll('.bar-led').forEach((led, i) => {
            led.classList.toggle('active', i === bar);
        });
    }

    updatePatternDisplayForBar(bar) {
        if (!this.currentPattern) return;
        const pattern = PATTERNS[this.currentPattern];

        // Only update if multi-bar pattern
        if (!pattern.bars || pattern.bars <= 1) return;

        const startStep = bar * this.stepsPerBar;

        const updateRow = (row, data) => {
            row.querySelectorAll('.step').forEach((step, i) => {
                const absoluteStep = startStep + i;
                step.classList.toggle('active', data[absoluteStep] === 1);
            });
        };

        updateRow(this.kickPatternEl, pattern.kick);
        updateRow(this.snarePatternEl, pattern.snare);
        updateRow(this.hihatPatternEl, pattern.hihat);
    }
}

window.BeatGenerator = BeatGenerator;
