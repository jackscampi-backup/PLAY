// Melody Generator Class for DRUMMER
// Generates chord progressions and melodic lines synchronized with drum patterns

// ===== MUSIC THEORY DEFINITIONS =====
const MELODY_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const CHORD_QUALITIES = {
    'maj': [0, 4, 7],
    'min': [0, 3, 7],
    'dom7': [0, 4, 7, 10],
    'maj7': [0, 4, 7, 11],
    'min7': [0, 3, 7, 10],
    'dim': [0, 3, 6],
    'aug': [0, 4, 8],
    'sus4': [0, 5, 7],
    'sus2': [0, 2, 7]
};

const SCALE_DEGREES = {
    'I': 0, 'bII': 1, 'II': 2, 'bIII': 3, 'III': 4, 'IV': 5,
    '#IV': 6, 'bV': 6, 'V': 7, 'bVI': 8, 'VI': 9, 'bVII': 10, 'VII': 11
};

const MELODY_SCALES = {
    'major': [0, 2, 4, 5, 7, 9, 11],
    'minor': [0, 2, 3, 5, 7, 8, 10],
    'minor_pentatonic': [0, 3, 5, 7, 10],
    'blues': [0, 3, 5, 6, 7, 10]
};

function getChordNotes(degree, quality, key, octave = 3) {
    const keyIndex = MELODY_NOTES.indexOf(key);
    if (keyIndex === -1) return [];
    const degreeOffset = SCALE_DEGREES[degree] || 0;
    const rootIndex = (keyIndex + degreeOffset) % 12;
    const intervals = CHORD_QUALITIES[quality] || [0, 4, 7];
    return intervals.map(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        const noteOctave = octave + Math.floor((rootIndex + interval) / 12);
        return MELODY_NOTES[noteIndex] + noteOctave;
    });
}

function getMelodyNote(degree, key, octave = 4, scale = 'major') {
    const keyIndex = MELODY_NOTES.indexOf(key);
    if (keyIndex === -1) return 'C4';
    const scaleIntervals = MELODY_SCALES[scale] || MELODY_SCALES['major'];
    const degreeIndex = (degree - 1) % scaleIntervals.length;
    const interval = scaleIntervals[degreeIndex];
    const noteIndex = (keyIndex + interval) % 12;
    const noteOctave = octave + Math.floor((keyIndex + interval) / 12);
    return MELODY_NOTES[noteIndex] + noteOctave;
}

// ===== CHORD PROGRESSIONS =====
const CHORD_PROGRESSIONS = [
    // FOUNDATION
    {
        id: 'foundation-triads', name: 'Triads I-IV-V', category: 'foundation', bars: 4,
        steps: [
            {degree: 'I', quality: 'maj', beat: 0, duration: '1n'},
            {degree: 'IV', quality: 'maj', beat: 0, duration: '1n'},
            {degree: 'V', quality: 'maj', beat: 0, duration: '1n'},
            {degree: 'I', quality: 'maj', beat: 0, duration: '1n'}
        ]
    },
    {
        id: 'foundation-fifths', name: 'Fifths I-V', category: 'foundation', bars: 2,
        steps: [
            {degree: 'I', quality: 'maj', beat: 0, duration: '1n'},
            {degree: 'V', quality: 'maj', beat: 0, duration: '1n'}
        ]
    },

    // ROCK
    {
        id: 'rock-classic', name: 'Classic I-IV-V', category: 'rock', bars: 4,
        steps: [
            {degree: 'I', quality: 'maj', beat: 0, duration: '1n'},
            {degree: 'IV', quality: 'maj', beat: 0, duration: '1n'},
            {degree: 'V', quality: 'maj', beat: 0, duration: '1n'},
            {degree: 'I', quality: 'maj', beat: 0, duration: '1n'}
        ]
    },
    {
        id: 'rock-anthem', name: 'Anthem I-V-vi-IV', category: 'rock', bars: 4,
        steps: [
            {degree: 'I', quality: 'maj', beat: 0, duration: '1n'},
            {degree: 'V', quality: 'maj', beat: 0, duration: '1n'},
            {degree: 'VI', quality: 'min', beat: 0, duration: '1n'},
            {degree: 'IV', quality: 'maj', beat: 0, duration: '1n'}
        ]
    },

    // BLUES
    {
        id: 'blues-12bar', name: '12 Bar Blues', category: 'blues', bars: 12,
        steps: [
            {degree: 'I', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'I', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'I', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'I', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'IV', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'IV', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'I', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'I', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'V', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'IV', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'I', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'V', quality: 'dom7', beat: 0, duration: '1n'}
        ]
    },
    {
        id: 'blues-turnaround', name: 'Turnaround', category: 'blues', bars: 1,
        steps: [
            {degree: 'I', quality: 'dom7', beat: 0, duration: '4n'},
            {degree: 'VI', quality: 'dom7', beat: 1, duration: '4n'},
            {degree: 'II', quality: 'min7', beat: 2, duration: '4n'},
            {degree: 'V', quality: 'dom7', beat: 3, duration: '4n'}
        ]
    },

    // FUNK
    {
        id: 'funk-vamp', name: 'Vamp i7', category: 'funk', bars: 1,
        steps: [
            {degree: 'I', quality: 'min7', beat: 0, duration: '1n'}
        ]
    },
    {
        id: 'funk-twochord', name: 'Two Chord i7-IV7', category: 'funk', bars: 2,
        steps: [
            {degree: 'I', quality: 'min7', beat: 0, duration: '1n'},
            {degree: 'IV', quality: 'dom7', beat: 0, duration: '1n'}
        ]
    },

    // DISCO
    {
        id: 'disco-groove', name: 'Groove I-IV-vi-V', category: 'disco', bars: 4,
        steps: [
            {degree: 'I', quality: 'maj7', beat: 0, duration: '1n'},
            {degree: 'IV', quality: 'maj7', beat: 0, duration: '1n'},
            {degree: 'VI', quality: 'min7', beat: 0, duration: '1n'},
            {degree: 'V', quality: 'dom7', beat: 0, duration: '1n'}
        ]
    },
    {
        id: 'disco-classic', name: 'Classic vi-ii-V-I', category: 'disco', bars: 4,
        steps: [
            {degree: 'VI', quality: 'min7', beat: 0, duration: '1n'},
            {degree: 'II', quality: 'min7', beat: 0, duration: '1n'},
            {degree: 'V', quality: 'dom7', beat: 0, duration: '1n'},
            {degree: 'I', quality: 'maj7', beat: 0, duration: '1n'}
        ]
    },

    // TRIP-HOP
    {
        id: 'triphop-dark', name: 'Dark i-VII', category: 'triphop', bars: 2,
        steps: [
            {degree: 'I', quality: 'min7', beat: 0, duration: '1n'},
            {degree: 'bVII', quality: 'maj', beat: 0, duration: '1n'}
        ]
    },
    {
        id: 'triphop-moody', name: 'Moody i-iv', category: 'triphop', bars: 2,
        steps: [
            {degree: 'I', quality: 'min7', beat: 0, duration: '1n'},
            {degree: 'IV', quality: 'min7', beat: 0, duration: '1n'}
        ]
    }
];

// ===== MELODIC LINES =====
const MELODIC_LINES = [
    {
        id: 'major-run', name: 'Major Scale', type: 'melody', bars: 1, scale: 'major',
        steps: [
            {degree: 1, octave: 4, beat: 0, duration: '8n'},
            {degree: 2, octave: 4, beat: 0.5, duration: '8n'},
            {degree: 3, octave: 4, beat: 1, duration: '8n'},
            {degree: 4, octave: 4, beat: 1.5, duration: '8n'},
            {degree: 5, octave: 4, beat: 2, duration: '8n'},
            {degree: 6, octave: 4, beat: 2.5, duration: '8n'},
            {degree: 7, octave: 4, beat: 3, duration: '8n'},
            {degree: 1, octave: 5, beat: 3.5, duration: '8n'}
        ]
    }
];

console.log('Melody patterns defined:', CHORD_PROGRESSIONS.length, 'chords,', MELODIC_LINES.length, 'melodies');

class MelodyGenerator {
    constructor() {
        // State
        this.isPlaying = false;
        this.currentKey = 'C';
        this.currentMode = 'chords';  // 'chords' or 'melody'
        this.currentPattern = null;
        this.currentInstrument = 'piano';
        this.currentOctave = 3;  // Default octave for chords
        this.useItalianNotation = false;  // ITA toggle

        // Note conversion map
        this.italianNotes = {
            'C': 'Do', 'C#': 'Do#', 'Db': 'Re♭',
            'D': 'Re', 'D#': 'Re#', 'Eb': 'Mi♭',
            'E': 'Mi',
            'F': 'Fa', 'F#': 'Fa#', 'Gb': 'Sol♭',
            'G': 'Sol', 'G#': 'Sol#', 'Ab': 'La♭',
            'A': 'La', 'A#': 'La#', 'Bb': 'Si♭',
            'B': 'Si'
        };

        // Tone.js components
        this.chordSynth = null;
        this.melodySynth = null;
        this.volume = null;
        this.sequence = null;

        // DOM elements (cached)
        this.playBtn = null;
        this.keyButtons = null;
        this.chordsBtn = null;
        this.melodyBtn = null;
        this.patternSelect = null;
        this.soundSelect = null;
        this.octaveDisplay = null;
        this.volumeSlider = null;
        this.chordNameDisplay = null;
        this.chordNotesDisplay = null;

        // Instrument presets (piano e organ)
        this.instrumentPresets = {
            piano: {
                oscillator: { type: 'triangle' },
                envelope: { attack: 0.005, decay: 0.3, sustain: 0.2, release: 1.0 }
            },
            organ: {
                oscillator: { type: 'sine', partials: [1, 0.5, 0.3, 0.2, 0.1] },
                envelope: { attack: 0.01, decay: 0.1, sustain: 0.9, release: 0.1 }
            }
        };

        this.init();
    }

    async init() {
        console.log('MelodyGenerator: Initializing...');

        // Wait for DOM to be fully ready
        await new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });

        await this.setupSynths();
        this.setupUI();
        this.setupEventListeners();

        // Initialize default state
        setTimeout(() => {
            this.selectKey('E');
            this.selectMode('chords');
            this.selectInstrument('piano');
            console.log('MelodyGenerator: Ready');
        }, 100);
    }

    async setupSynths() {
        await Tone.start();

        // Volume node
        this.volume = new Tone.Volume(-10).toDestination();

        // Polyphonic chord synth
        this.chordSynth = new Tone.PolySynth(Tone.Synth, {
            maxPolyphony: 8,
            ...this.instrumentPresets.piano
        }).connect(this.volume);

        // Monophonic melody synth
        this.melodySynth = new Tone.Synth({
            ...this.instrumentPresets.piano
        }).connect(this.volume);

        console.log('MelodyGenerator: Synths initialized');
    }

    setupUI() {
        // Cache DOM elements
        this.playBtn = document.getElementById('melodyPlayBtn');
        this.chordsBtn = document.getElementById('melodyChordsBtn');
        this.melodyBtn = document.getElementById('melodyMelodyBtn');
        this.volumeSlider = document.getElementById('melodyVolume');

        // Pattern dropdown
        this.patternSelect = document.getElementById('melodyPatternSelect');

        // Sound dropdown
        this.soundSelect = document.getElementById('melodySoundSelect');

        // Octave controls
        this.octaveDisplay = document.getElementById('melodyOctDisplay');
        this.octaveMinus = document.getElementById('melodyOctMinus');
        this.octavePlus = document.getElementById('melodyOctPlus');

        // ITA notation toggle
        this.notationToggle = document.getElementById('melodyNotationToggle');

        // Display
        this.chordNameDisplay = document.getElementById('chordName');
        this.chordNotesDisplay = document.getElementById('chordNotes');

        // Get key buttons
        const keyGrid = document.getElementById('melodyKeyButtons');
        if (keyGrid) {
            this.keyButtons = keyGrid.querySelectorAll('.root-btn');
        }

        // Populate pattern dropdown
        this.populatePatternSelect();

        // Update octave display
        this.updateOctaveDisplay();

        console.log('MelodyGenerator: UI setup complete');
    }

    populatePatternSelect() {
        if (!this.patternSelect) return;

        // Clear existing options
        this.patternSelect.innerHTML = '<option value="">-- Select --</option>';

        // Get patterns based on current mode
        const patterns = (this.currentMode === 'chords')
            ? CHORD_PROGRESSIONS
            : MELODIC_LINES;

        // Group by category
        const categories = {};
        patterns.forEach(p => {
            const cat = p.category || 'other';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(p);
        });

        // Category display names
        const categoryNames = {
            'foundation': 'FOUNDATION',
            'rock': 'ROCK',
            'blues': 'BLUES',
            'funk': 'FUNK',
            'disco': 'DISCO',
            'triphop': 'TRIP-HOP',
            'other': 'OTHER'
        };

        // Create optgroups
        Object.keys(categories).forEach(cat => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = categoryNames[cat] || cat.toUpperCase();

            categories[cat].forEach(p => {
                const option = document.createElement('option');
                option.value = p.id;
                option.textContent = p.name;
                optgroup.appendChild(option);
            });

            this.patternSelect.appendChild(optgroup);
        });
    }

    updateOctaveDisplay() {
        if (this.octaveDisplay) {
            this.octaveDisplay.textContent = this.currentOctave;
        }
    }

    setupEventListeners() {
        // Play/Stop button
        if (this.playBtn) {
            this.playBtn.addEventListener('click', () => this.togglePlay());
        }

        // Key buttons
        if (this.keyButtons) {
            this.keyButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.selectKey(btn.dataset.key);
                });
            });
        }

        // Mode buttons
        if (this.chordsBtn) {
            this.chordsBtn.addEventListener('click', () => this.selectMode('chords'));
        }
        if (this.melodyBtn) {
            this.melodyBtn.addEventListener('click', () => this.selectMode('melody'));
        }

        // Pattern dropdown
        if (this.patternSelect) {
            this.patternSelect.addEventListener('change', (e) => {
                this.selectPattern(e.target.value);
            });
        }

        // Sound dropdown
        if (this.soundSelect) {
            this.soundSelect.addEventListener('change', (e) => {
                this.selectInstrument(e.target.value);
            });
        }

        // Octave controls
        if (this.octaveMinus) {
            this.octaveMinus.addEventListener('click', () => this.adjustOctave(-1));
        }
        if (this.octavePlus) {
            this.octavePlus.addEventListener('click', () => this.adjustOctave(1));
        }

        // ITA notation toggle
        if (this.notationToggle) {
            this.notationToggle.addEventListener('click', () => this.toggleNotation());
        }

        // Volume slider
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                const vol = parseInt(e.target.value);
                // Map 0-100 to -40dB to 0dB
                const db = (vol / 100) * 40 - 40;
                this.volume.volume.value = db;
            });
        }

        console.log('MelodyGenerator: Event listeners attached');
    }

    adjustOctave(delta) {
        const newOctave = this.currentOctave + delta;
        if (newOctave >= 1 && newOctave <= 5) {
            this.currentOctave = newOctave;
            this.updateOctaveDisplay();
            console.log('MelodyGenerator: Octave changed to', this.currentOctave);

            // Restart if playing
            if (this.isPlaying && this.currentPattern) {
                this.stop();
                this.play();
            }
        }
    }

    toggleNotation() {
        this.useItalianNotation = !this.useItalianNotation;

        // Update toggle button UI
        if (this.notationToggle) {
            this.notationToggle.classList.toggle('active', this.useItalianNotation);
        }

        // Update KEY buttons labels
        this.updateKeyButtonLabels();

        console.log('MelodyGenerator: Notation:', this.useItalianNotation ? 'ITA' : 'ABC');
    }

    updateKeyButtonLabels() {
        if (!this.keyButtons) return;

        this.keyButtons.forEach(btn => {
            const key = btn.dataset.key;
            btn.textContent = this.useItalianNotation ? (this.italianNotes[key] || key) : key;
        });
    }

    // Convert note to Italian notation if enabled
    toDisplayNote(note) {
        if (!this.useItalianNotation) return note;

        // Remove octave number if present (e.g., "C3" -> "C")
        const noteName = note.replace(/\d/g, '');
        return this.italianNotes[noteName] || note;
    }

    // Convert array of notes to display format
    toDisplayNotes(notes) {
        return notes.map(n => this.toDisplayNote(n.replace(/\d/g, ''))).join(' - ');
    }

    selectKey(key) {
        this.currentKey = key;
        this.updateKeyButtons();
        console.log('MelodyGenerator: Key selected:', key);

        // Restart playback with new key if playing
        if (this.currentPattern && this.isPlaying) {
            this.stop();
            this.play();
        }
    }

    selectMode(mode) {
        this.currentMode = mode;
        this.updateModeButtons();
        this.currentPattern = null;
        console.log('MelodyGenerator: Mode selected:', mode);

        // Stop playback when switching modes
        if (this.isPlaying) {
            this.stop();
        }

        // Repopulate pattern dropdown for new mode
        this.populatePatternSelect();

        // Reset display
        this.updateChordDisplay('—', 'Select a pattern');
    }

    selectPattern(patternId) {
        if (!patternId) {
            this.currentPattern = null;
            return;
        }

        this.currentPattern = patternId;
        console.log('MelodyGenerator: Pattern selected:', patternId);

        // Auto-play if not already playing
        if (!this.isPlaying) {
            this.play();
        } else {
            // Restart with new pattern
            this.stop();
            this.play();
        }
    }

    selectInstrument(instrument) {
        this.currentInstrument = instrument;

        // Update synth presets
        const preset = this.instrumentPresets[instrument];
        if (preset) {
            this.chordSynth.set(preset);
            this.melodySynth.set(preset);
            console.log('MelodyGenerator: Instrument changed to:', instrument);
        }
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
            console.log('MelodyGenerator: No pattern selected');
            this.updateChordDisplay('ERROR', 'Select a pattern first');
            return;
        }

        await Tone.start();
        this.startSequence();
        this.isPlaying = true;

        // Update UI
        if (this.playBtn) {
            this.playBtn.classList.add('active');
        }

        console.log('MelodyGenerator: Playing');
    }

    stop() {
        if (this.sequence) {
            this.sequence.stop();
            this.sequence.dispose();
            this.sequence = null;
        }

        this.isPlaying = false;

        // Update UI
        if (this.playBtn) {
            this.playBtn.classList.remove('active');
        }

        // Clear display
        this.updateChordDisplay('—', 'Stopped');

        // Clear mini fretboard
        this.clearMiniFretboard();

        // Clear fretboard chord display
        if (window.fretboard) {
            window.fretboard.clearMelodyChord();
        }

        console.log('MelodyGenerator: Stopped');
    }

    startSequence() {
        const pattern = this.getCurrentPatternData();
        if (!pattern) return;

        // Get drum pattern info for sync
        const drumPattern = window.beatGen?.currentPattern
            ? PATTERNS[window.beatGen.currentPattern]
            : null;

        const timeSignature = drumPattern?.timeSignature || '4/4';
        const bars = pattern.bars || 1;
        const stepsPerBar = this.getStepsPerBar(timeSignature);
        const noteDuration = (timeSignature === '12/8' || timeSignature === '6/8') ? '8t' : '16n';
        const totalSteps = bars * stepsPerBar;

        console.log('MelodyGenerator: Starting sequence -', bars, 'bars,', totalSteps, 'steps');

        // Build step array from pattern
        const stepArray = this.buildStepArray(pattern, totalSteps);

        console.log('MelodyGenerator: Step array built:', stepArray.filter(s => s !== null).length, 'events');

        // Create Tone.Sequence
        this.sequence = new Tone.Sequence((time, step) => {
            const event = stepArray[step];
            if (!event) return;

            console.log('MelodyGenerator: Triggering step', step, event);

            if (this.currentMode === 'chords') {
                // Trigger chord
                const notes = getChordNotes(
                    event.degree,
                    event.quality,
                    this.currentKey,
                    this.currentOctave
                );

                if (notes.length > 0) {
                    this.chordSynth.triggerAttackRelease(notes, event.duration || '2n', time);

                    // Update display with notation conversion
                    Tone.Draw.schedule(() => {
                        const rootNote = this.toDisplayNote(this.currentKey);
                        const chordName = rootNote + event.quality;
                        const noteList = this.toDisplayNotes(notes);
                        this.updateChordDisplay(chordName, noteList);

                        // Get chord notes without octave
                        const chordNotes = notes.map(n => n.replace(/\d/g, ''));

                        // Update mini fretboard
                        this.updateMiniFretboard(this.currentKey, chordNotes);

                        // Sync with BASS fretboard - show chord notes
                        if (window.fretboard) {
                            window.fretboard.showMelodyChord(this.currentKey, chordNotes);
                        }
                    }, time);
                }
            } else {
                // Trigger melody note
                const note = getMelodyNote(
                    event.degree,
                    this.currentKey,
                    event.octave || 4,
                    pattern.scale || 'major'
                );

                if (note) {
                    this.melodySynth.triggerAttackRelease(note, event.duration || '8n', time);

                    // Update display with notation conversion
                    Tone.Draw.schedule(() => {
                        const noteName = this.toDisplayNote(note);
                        this.updateChordDisplay(noteName, `Octave ${event.octave || 4}`);
                    }, time);
                }
            }
        }, [...Array(totalSteps).keys()], noteDuration);

        this.sequence.loop = true;
        this.sequence.start(0);

        // Start Transport if not already started
        if (Tone.Transport.state !== 'started') {
            Tone.Transport.start();
        }
    }

    buildStepArray(pattern, totalSteps) {
        const stepArray = new Array(totalSteps).fill(null);
        const stepsPerBar = totalSteps / pattern.bars;
        const stepsPerBeat = stepsPerBar / 4;  // 4 beats per bar in 4/4

        // For single-bar patterns, place events directly by beat
        if (pattern.bars === 1) {
            pattern.steps.forEach(event => {
                const stepIndex = Math.floor(event.beat * stepsPerBeat);
                if (stepIndex >= 0 && stepIndex < totalSteps) {
                    stepArray[stepIndex] = event;
                }
            });
        } else {
            // For multi-bar patterns, assume each step is one bar unless multiple steps share same position
            let currentBar = 0;
            let lastBeat = -1;

            pattern.steps.forEach(event => {
                // If beat resets to 0 or goes backward, we're in a new bar
                if (event.beat <= lastBeat && event.beat === 0) {
                    currentBar++;
                }
                lastBeat = event.beat;

                const stepIndex = Math.floor(currentBar * stepsPerBar + event.beat * stepsPerBeat);
                if (stepIndex >= 0 && stepIndex < totalSteps) {
                    stepArray[stepIndex] = event;
                }
            });
        }

        return stepArray;
    }

    syncToPattern(drumPattern) {
        if (!this.isPlaying) return;

        console.log('MelodyGenerator: Syncing to drum pattern:', drumPattern.name);

        // Restart sequence with new timing
        this.stop();
        this.play();
    }

    getCurrentPatternData() {
        if (!this.currentPattern) {
            console.log('MelodyGenerator: No current pattern set');
            return null;
        }

        const patterns = (this.currentMode === 'chords')
            ? CHORD_PROGRESSIONS
            : MELODIC_LINES;

        console.log('MelodyGenerator: Looking for pattern', this.currentPattern, 'in', this.currentMode, 'mode');
        console.log('MelodyGenerator: Available patterns:', patterns?.map(p => p.id));

        const found = patterns?.find(p => p.id === this.currentPattern);
        if (!found) {
            console.log('MelodyGenerator: Pattern NOT FOUND!');
        }
        return found;
    }

    getStepsPerBar(timeSignature) {
        switch (timeSignature) {
            case '12/8': return 12;
            case '6/8': return 6;
            default: return 16;  // 4/4
        }
    }

    // ===== UI UPDATE METHODS =====

    updateKeyButtons() {
        if (!this.keyButtons) return;

        this.keyButtons.forEach(btn => {
            if (btn.dataset.key === this.currentKey) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    updateModeButtons() {
        if (this.chordsBtn && this.melodyBtn) {
            if (this.currentMode === 'chords') {
                this.chordsBtn.classList.add('active');
                this.melodyBtn.classList.remove('active');
            } else {
                this.chordsBtn.classList.remove('active');
                this.melodyBtn.classList.add('active');
            }
        }
    }

    updateChordDisplay(name, notes) {
        if (this.chordNameDisplay) {
            this.chordNameDisplay.textContent = name;
        }
        if (this.chordNotesDisplay) {
            this.chordNotesDisplay.textContent = notes;
        }
    }

    // Update mini fretboard with chord notes
    updateMiniFretboard(root, chordNotes) {
        const miniFretboard = document.getElementById('miniFretboard');
        if (!miniFretboard) return;

        // String tuning (standard bass)
        const strings = {
            'E': ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#'],
            'A': ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
            'D': ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
            'G': ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#']
        };

        // Clear all notes
        miniFretboard.querySelectorAll('.mini-note').forEach(n => n.remove());

        // Add notes for each string
        Object.keys(strings).forEach(stringName => {
            const stringEl = miniFretboard.querySelector(`.mini-string[data-string="${stringName}"]`);
            if (!stringEl) return;

            const frets = stringEl.querySelectorAll('.mini-fret');
            frets.forEach((fretEl, fretIndex) => {
                const noteAtFret = strings[stringName][fretIndex];
                if (!noteAtFret) return;

                // Check if this note is in the chord
                if (chordNotes.includes(noteAtFret)) {
                    const noteDiv = document.createElement('div');
                    noteDiv.className = 'mini-note';

                    if (noteAtFret === root) {
                        noteDiv.classList.add('root');
                        noteDiv.textContent = 'R';
                    } else {
                        noteDiv.classList.add('active');
                    }

                    fretEl.appendChild(noteDiv);
                }
            });
        });
    }

    // Clear mini fretboard
    clearMiniFretboard() {
        const miniFretboard = document.getElementById('miniFretboard');
        if (miniFretboard) {
            miniFretboard.querySelectorAll('.mini-note').forEach(n => n.remove());
        }
    }
}

// Will be initialized in app.js
console.log('MelodyGenerator class loaded');
