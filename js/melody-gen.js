// Melody Generator Class for DRUMMER
// Generates chord progressions and melodic lines synchronized with drum patterns

// ===== MUSIC THEORY DEFINITIONS =====
const MELODY_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
window.MELODY_NOTES = MELODY_NOTES;  // Export for other modules

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
window.SCALE_DEGREES = SCALE_DEGREES;  // Export for fretboard.js

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
// Export to window for other modules to use
const CHORD_PROGRESSIONS = window.CHORD_PROGRESSIONS_MELODY = [
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

// ===== ARTIST STYLE PROFILES =====
// Each artist has characteristics that define their melodic style
const ARTIST_STYLES = {
    // ROCK
    'led-zeppelin': {
        name: 'Led Zeppelin',
        genre: 'rock',
        scale: 'minor_pentatonic',
        noteRange: { low: 0, high: 12 },  // semitones from root
        noteDensity: 0.6,  // 0-1, how many notes per beat
        rhythmPatterns: ['8n', '8n', '4n', '8n', '8n', '4n', '2n'],
        intervalPreference: [0, 2, 3, 5, 7],  // minor penta intervals
        bendProbability: 0.2,
        restProbability: 0.15,
        phrases: { min: 3, max: 6 },  // notes per phrase
        style: 'bluesy rock with power'
    },
    'acdc': {
        name: 'AC/DC',
        genre: 'rock',
        scale: 'minor_pentatonic',
        noteRange: { low: 0, high: 7 },
        noteDensity: 0.7,
        rhythmPatterns: ['8n', '8n', '8n', '8n', '4n', '4n'],
        intervalPreference: [0, 3, 5, 7],
        bendProbability: 0.1,
        restProbability: 0.1,
        phrases: { min: 4, max: 8 },
        style: 'driving and repetitive'
    },
    'queen': {
        name: 'Queen',
        genre: 'rock',
        scale: 'major',
        noteRange: { low: 0, high: 14 },
        noteDensity: 0.5,
        rhythmPatterns: ['4n', '4n', '2n', '8n', '8n', '4n', '1n'],
        intervalPreference: [0, 2, 4, 5, 7, 9, 11],
        bendProbability: 0.05,
        restProbability: 0.2,
        phrases: { min: 4, max: 10 },
        style: 'melodic and anthemic'
    },
    'deep-purple': {
        name: 'Deep Purple',
        genre: 'rock',
        scale: 'blues',
        noteRange: { low: 0, high: 12 },
        noteDensity: 0.75,
        rhythmPatterns: ['16n', '16n', '8n', '8n', '16n', '16n', '8n'],
        intervalPreference: [0, 3, 5, 6, 7, 10],
        bendProbability: 0.15,
        restProbability: 0.1,
        phrases: { min: 6, max: 12 },
        style: 'fast and technical'
    },

    // BLUES
    'bb-king': {
        name: 'B.B. King',
        genre: 'blues',
        scale: 'blues',
        noteRange: { low: 0, high: 10 },
        noteDensity: 0.3,  // Few notes, lots of space
        rhythmPatterns: ['4n', '2n', '4n', '4n', '2n', '1n'],
        intervalPreference: [0, 3, 5, 6, 7],
        bendProbability: 0.4,  // Lots of bends
        restProbability: 0.35,  // Lots of silence
        phrases: { min: 2, max: 4 },  // Short phrases
        style: 'sparse and soulful with vibrato'
    },
    'muddy-waters': {
        name: 'Muddy Waters',
        genre: 'blues',
        scale: 'blues',
        noteRange: { low: 0, high: 7 },
        noteDensity: 0.4,
        rhythmPatterns: ['4n', '4n', '8n', '8n', '4n', '2n'],
        intervalPreference: [0, 3, 5, 7],
        bendProbability: 0.3,
        restProbability: 0.25,
        phrases: { min: 3, max: 5 },
        style: 'raw Chicago blues'
    },
    'srv': {
        name: 'Stevie Ray Vaughan',
        genre: 'blues',
        scale: 'blues',
        noteRange: { low: 0, high: 14 },
        noteDensity: 0.7,
        rhythmPatterns: ['16n', '16n', '8n', '16n', '16n', '8n', '4n'],
        intervalPreference: [0, 3, 5, 6, 7, 10, 12],
        bendProbability: 0.35,
        restProbability: 0.1,
        phrases: { min: 6, max: 12 },
        style: 'aggressive Texas blues'
    },
    'john-lee-hooker': {
        name: 'John Lee Hooker',
        genre: 'blues',
        scale: 'minor_pentatonic',
        noteRange: { low: 0, high: 5 },  // Very limited range
        noteDensity: 0.5,
        rhythmPatterns: ['4n', '4n', '4n', '4n', '8n', '8n', '4n'],
        intervalPreference: [0, 3, 5],  // Very simple
        bendProbability: 0.2,
        restProbability: 0.2,
        phrases: { min: 2, max: 4 },
        style: 'hypnotic and repetitive'
    },

    // FUNK
    'james-brown': {
        name: 'James Brown',
        genre: 'funk',
        scale: 'minor_pentatonic',
        noteRange: { low: 0, high: 7 },
        noteDensity: 0.8,  // Very rhythmic
        rhythmPatterns: ['16n', '16n', '16n', '8n', '16n', '16n', '8n'],
        intervalPreference: [0, 3, 5, 7],
        bendProbability: 0.05,
        restProbability: 0.15,
        phrases: { min: 4, max: 8 },
        style: 'rhythmic stabs and shouts'
    },
    'parliament': {
        name: 'Parliament',
        genre: 'funk',
        scale: 'minor_pentatonic',
        noteRange: { low: 0, high: 12 },
        noteDensity: 0.6,
        rhythmPatterns: ['8n', '16n', '16n', '8n', '8n', '4n'],
        intervalPreference: [0, 3, 5, 7, 10, 12],
        bendProbability: 0.1,
        restProbability: 0.2,
        phrases: { min: 4, max: 8 },
        style: 'spacey P-funk grooves'
    },
    'sly-stone': {
        name: 'Sly Stone',
        genre: 'funk',
        scale: 'major',
        noteRange: { low: 0, high: 10 },
        noteDensity: 0.55,
        rhythmPatterns: ['8n', '8n', '4n', '8n', '8n', '4n'],
        intervalPreference: [0, 2, 4, 5, 7, 9],
        bendProbability: 0.05,
        restProbability: 0.2,
        phrases: { min: 3, max: 6 },
        style: 'melodic psychedelic funk'
    },
    'ewf': {
        name: 'Earth Wind & Fire',
        genre: 'funk',
        scale: 'major',
        noteRange: { low: 0, high: 14 },
        noteDensity: 0.5,
        rhythmPatterns: ['4n', '8n', '8n', '2n', '4n', '4n'],
        intervalPreference: [0, 2, 4, 5, 7, 9, 11, 12],
        bendProbability: 0.02,
        restProbability: 0.25,
        phrases: { min: 4, max: 8 },
        style: 'uplifting horn-like melodies'
    },

    // DISCO
    'chic': {
        name: 'Chic',
        genre: 'disco',
        scale: 'major',
        noteRange: { low: 0, high: 12 },
        noteDensity: 0.6,
        rhythmPatterns: ['8n', '8n', '8n', '8n', '4n', '4n'],
        intervalPreference: [0, 2, 4, 5, 7, 9, 11],
        bendProbability: 0.0,
        restProbability: 0.15,
        phrases: { min: 4, max: 8 },
        style: 'elegant string-like lines'
    },
    'bee-gees': {
        name: 'Bee Gees',
        genre: 'disco',
        scale: 'major',
        noteRange: { low: 5, high: 17 },  // High falsetto range
        noteDensity: 0.45,
        rhythmPatterns: ['4n', '4n', '8n', '8n', '2n', '4n'],
        intervalPreference: [0, 2, 4, 5, 7, 9, 11, 12],
        bendProbability: 0.0,
        restProbability: 0.2,
        phrases: { min: 4, max: 6 },
        style: 'high and smooth'
    },
    'donna-summer': {
        name: 'Donna Summer',
        genre: 'disco',
        scale: 'minor',
        noteRange: { low: 0, high: 12 },
        noteDensity: 0.5,
        rhythmPatterns: ['8n', '4n', '8n', '8n', '4n', '2n'],
        intervalPreference: [0, 2, 3, 5, 7, 8, 10],
        bendProbability: 0.05,
        restProbability: 0.2,
        phrases: { min: 4, max: 8 },
        style: 'dramatic and soulful'
    },
    'kc': {
        name: 'KC & Sunshine Band',
        genre: 'disco',
        scale: 'major',
        noteRange: { low: 0, high: 10 },
        noteDensity: 0.65,
        rhythmPatterns: ['8n', '8n', '8n', '8n', '8n', '8n', '4n', '4n'],
        intervalPreference: [0, 2, 4, 5, 7],
        bendProbability: 0.0,
        restProbability: 0.1,
        phrases: { min: 4, max: 8 },
        style: 'party horn riffs'
    },

    // TRIP-HOP
    'massive-attack': {
        name: 'Massive Attack',
        genre: 'triphop',
        scale: 'minor',
        noteRange: { low: 0, high: 7 },
        noteDensity: 0.25,  // Very sparse
        rhythmPatterns: ['2n', '1n', '2n', '4n', '1n'],
        intervalPreference: [0, 2, 3, 5, 7],
        bendProbability: 0.1,
        restProbability: 0.4,  // Lots of space
        phrases: { min: 2, max: 4 },
        style: 'dark and atmospheric'
    },
    'portishead': {
        name: 'Portishead',
        genre: 'triphop',
        scale: 'minor',
        noteRange: { low: 0, high: 10 },
        noteDensity: 0.3,
        rhythmPatterns: ['4n', '2n', '4n', '1n', '2n'],
        intervalPreference: [0, 2, 3, 5, 7, 8],
        bendProbability: 0.15,
        restProbability: 0.35,
        phrases: { min: 3, max: 5 },
        style: 'melancholic and cinematic'
    },
    'tricky': {
        name: 'Tricky',
        genre: 'triphop',
        scale: 'minor_pentatonic',
        noteRange: { low: 0, high: 5 },
        noteDensity: 0.35,
        rhythmPatterns: ['4n', '8n', '8n', '2n', '4n'],
        intervalPreference: [0, 3, 5, 7],
        bendProbability: 0.1,
        restProbability: 0.3,
        phrases: { min: 2, max: 4 },
        style: 'murky and hypnotic'
    },
    'morcheeba': {
        name: 'Morcheeba',
        genre: 'triphop',
        scale: 'major',
        noteRange: { low: 0, high: 12 },
        noteDensity: 0.35,
        rhythmPatterns: ['4n', '4n', '2n', '4n', '2n'],
        intervalPreference: [0, 2, 4, 5, 7, 9],
        bendProbability: 0.05,
        restProbability: 0.3,
        phrases: { min: 3, max: 6 },
        style: 'smooth and dreamy'
    }
};

// Get artists by genre
function getArtistsByGenre(genre) {
    return Object.entries(ARTIST_STYLES)
        .filter(([id, artist]) => artist.genre === genre)
        .map(([id, artist]) => ({ id, ...artist }));
}

// Get random artist from genre
function getRandomArtist(genre) {
    const artists = getArtistsByGenre(genre);
    if (artists.length === 0) return null;
    return artists[Math.floor(Math.random() * artists.length)];
}

console.log('Melody patterns defined:', CHORD_PROGRESSIONS.length, 'chord progressions,', Object.keys(ARTIST_STYLES).length, 'artists');

class MelodyGenerator {
    constructor() {
        // State
        this.isPlaying = false;
        this.currentKey = 'E';  // Default same as BASSIST
        this.currentMode = 'chords';  // 'chords' or 'melody'
        this.currentPattern = null;
        this.currentInstrument = 'piano';
        this.currentOctave = 3;  // Default octave for chords
        this.useItalianNotation = false;  // ITA toggle

        // Melody generation state
        this.currentArtist = null;
        this.melodyCounter = 0;
        this.generatedMelody = null;
        this.currentGenre = null;  // Track genre from chord progression
        this.currentChordRoot = null;  // Current chord root note for bass sync

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
        this.chordsBtn = null;
        this.melodyBtn = null;
        this.patternSelect = null;
        this.octaveDisplay = null;
        this.chordNameDisplay = null;
        this.chordNotesDisplay = null;

        // Instrument presets (controlled from global AUDIO section)
        this.instrumentPresets = {
            piano: {
                oscillator: { type: 'triangle' },
                envelope: { attack: 0.005, decay: 0.3, sustain: 0.2, release: 1.0 }
            },
            organ: {
                oscillator: { type: 'sine', partials: [1, 0.5, 0.3, 0.2, 0.1] },
                envelope: { attack: 0.01, decay: 0.1, sustain: 0.9, release: 0.1 }
            },
            epiano: {
                oscillator: { type: 'sine' },
                envelope: { attack: 0.02, decay: 0.4, sustain: 0.3, release: 0.8 }
            },
            synth: {
                oscillator: { type: 'square' },
                envelope: { attack: 0.01, decay: 0.2, sustain: 0.5, release: 0.4 }
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
            // Sync KEY from BASSIST (BASSIST is source of truth)
            if (window.fretboard) {
                this.currentKey = window.fretboard.rootNote;
            } else {
                this.currentKey = 'E';  // Fallback
            }
            this.selectMode('chords');
            this.selectInstrument('piano');
            console.log('MelodyGenerator: Ready, KEY synced from BASSIST:', this.currentKey);
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

        // Pattern dropdown
        this.patternSelect = document.getElementById('melodyPatternSelect');

        // Octave controls
        this.octaveDisplay = document.getElementById('melodyOctDisplay');
        this.octaveMinus = document.getElementById('melodyOctMinus');
        this.octavePlus = document.getElementById('melodyOctPlus');

        // Display
        this.chordNameDisplay = document.getElementById('chordName');
        this.chordNotesDisplay = document.getElementById('chordNotes');

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

        if (this.currentMode === 'melody') {
            // MELODY mode: show artists grouped by genre
            const genres = ['rock', 'blues', 'funk', 'disco', 'triphop'];

            genres.forEach(genre => {
                const artists = getArtistsByGenre(genre);
                if (artists.length === 0) return;

                const optgroup = document.createElement('optgroup');
                optgroup.label = categoryNames[genre] || genre.toUpperCase();

                artists.forEach(artist => {
                    const option = document.createElement('option');
                    option.value = artist.id;
                    option.textContent = artist.name;
                    optgroup.appendChild(option);
                });

                this.patternSelect.appendChild(optgroup);
            });
        } else {
            // CHORDS mode: show chord progressions
            const patterns = CHORD_PROGRESSIONS;

            // Group by category
            const categories = {};
            patterns.forEach(p => {
                const cat = p.category || 'other';
                if (!categories[cat]) categories[cat] = [];
                categories[cat].push(p);
            });

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

        // KEY is controlled by BASSIST ROOT - sync when it changes
        // (BASSIST calls melodyGen.selectKey() directly when ROOT changes)

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

        // Octave controls
        if (this.octaveMinus) {
            this.octaveMinus.addEventListener('click', () => this.adjustOctave(-1));
        }
        if (this.octavePlus) {
            this.octavePlus.addEventListener('click', () => this.adjustOctave(1));
        }

        // Note: Sound and Volume are now controlled from global AUDIO section

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

    // Note: toggleNotation() removed - now handled by global ITA toggle in app.js

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

    // Called by BASSIST when ROOT changes - MELODY follows BASSIST
    selectKey(key) {
        this.currentKey = key;
        console.log('MelodyGenerator: Key synced from BASSIST:', key);

        // Restart playback with new key if playing
        if (this.currentPattern && this.isPlaying) {
            this.stop();
            this.play();
        }
    }

    selectMode(mode) {
        this.currentMode = mode;
        this.updateModeButtons();
        console.log('MelodyGenerator: Mode selected:', mode);

        // Stop playback when switching modes
        if (this.isPlaying) {
            this.stop();
        }

        // Clear generated melody when switching modes
        this.generatedMelody = null;

        // Update dropdown to show appropriate options for this mode
        this.populatePatternSelect();

        // Reset display based on mode
        if (mode === 'melody') {
            this.updateChordDisplay('MELODY', 'Select artist → plays melody in their style');
        } else {
            this.updateChordDisplay('CHORDS', 'Select a pattern');
        }
    }

    selectPattern(patternId) {
        if (!patternId) {
            this.currentPattern = null;
            this.currentArtist = null;
            return;
        }

        // In MELODY mode, patternId is actually an artist ID
        if (this.currentMode === 'melody') {
            const artist = ARTIST_STYLES[patternId];
            if (artist) {
                this.currentArtist = { id: patternId, ...artist };
                console.log('MelodyGenerator: Artist selected:', artist.name);

                // Sync KEY with BASSIST root (so they start on the same key)
                if (window.fretboard) {
                    this.currentKey = window.fretboard.rootNote;
                    console.log('MelodyGenerator: Synced KEY to BASSIST root:', this.currentKey);
                }

                // Use a default chord progression for this genre
                const genreProgressions = {
                    'rock': 'rock-classic',
                    'blues': 'blues-12bar',
                    'funk': 'funk-twochord',
                    'disco': 'disco-groove',
                    'triphop': 'triphop-dark'
                };
                this.currentPattern = genreProgressions[artist.genre] || 'rock-classic';

                // Also rebuild BASS chord strip if MEL mode is active
                if (window.fretboard?.melodySyncActive) {
                    window.fretboard.buildBassChordStrip();
                }

                // Auto-play
                if (!this.isPlaying) {
                    this.play();
                } else {
                    this.stop();
                    this.play();
                }
            }
            return;
        }

        // CHORDS mode: patternId is a chord progression
        this.currentPattern = patternId;
        console.log('MelodyGenerator: Pattern selected:', patternId);

        // Sync KEY with BASSIST root (BASSIST is the source of truth)
        if (window.fretboard) {
            this.currentKey = window.fretboard.rootNote;
            console.log('MelodyGenerator: Synced KEY to BASSIST root:', this.currentKey);
        }

        // Also rebuild BASS chord strip if MEL mode is active
        if (window.fretboard?.melodySyncActive) {
            window.fretboard.buildBassChordStrip();
        }

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

        // Different behavior based on mode
        if (this.currentMode === 'melody') {
            // Generate and play random melody in artist style
            this.startMelodyPlayback();
        } else {
            // Play chord progression as before
            this.startSequence();
        }

        this.isPlaying = true;

        // Update UI
        if (this.playBtn) {
            this.playBtn.classList.add('active');
        }

        console.log('MelodyGenerator: Playing in', this.currentMode, 'mode');
    }

    stop() {
        // Stop and dispose sequence
        if (this.sequence) {
            this.sequence.stop();
            this.sequence.dispose();
            this.sequence = null;
        }

        // Release any playing notes
        if (this.chordSynth) {
            this.chordSynth.releaseAll();
        }
        if (this.melodySynth) {
            this.melodySynth.triggerRelease();
        }

        this.isPlaying = false;

        // Update UI
        if (this.playBtn) {
            this.playBtn.classList.remove('active');
        }

        // Clear display based on mode
        if (this.currentMode === 'melody') {
            this.updateChordDisplay('MELODY', 'Stopped - select pattern to play');
        } else {
            this.updateChordDisplay('—', 'Stopped');
        }

        // Clear generated melody (it "self-destructs")
        this.generatedMelody = null;

        // Clear fretboard chord display
        if (window.fretboard) {
            window.fretboard.clearMelodyChord();
        }

        console.log('MelodyGenerator: Stopped');
    }

    startSequence() {
        const pattern = this.getCurrentPatternData();
        if (!pattern) return;

        // Stop and dispose any existing sequence first
        if (this.sequence) {
            this.sequence.stop();
            this.sequence.dispose();
            this.sequence = null;
        }

        // Get drum pattern info for sync
        const drumPattern = window.beatGen?.currentPattern
            ? PATTERNS[window.beatGen.currentPattern]
            : null;

        const timeSignature = drumPattern?.timeSignature || '4/4';
        const bars = pattern.bars || 1;
        const stepsPerBar = this.getStepsPerBar(timeSignature);
        const noteDuration = (timeSignature === '12/8' || timeSignature === '6/8') ? '8t' : '16n';
        const totalSteps = bars * stepsPerBar;

        console.log('MelodyGenerator: Starting sequence -', bars, 'bars,', totalSteps, 'steps, time sig:', timeSignature);

        // Build step array from pattern
        const stepArray = this.buildStepArray(pattern, totalSteps);

        console.log('MelodyGenerator: Step array built:', stepArray.filter(s => s !== null).length, 'events');

        // Track which chord index we're playing
        let currentChordIndex = -1;

        // Create Tone.Sequence
        const totalBars = bars;
        this.sequence = new Tone.Sequence((time, step) => {
            // Calculate current bar and step within bar
            const currentBar = Math.floor(step / stepsPerBar);
            const stepInBar = step % stepsPerBar;

            const event = stepArray[step];
            if (!event) return;

            // Find chord index in pattern.steps
            const chordIndex = pattern.steps.indexOf(event);
            if (chordIndex !== -1 && chordIndex !== currentChordIndex) {
                currentChordIndex = chordIndex;
                // Update BASS chord strip position when chord changes
                Tone.Draw.schedule(() => {
                    if (window.fretboard?.melodySyncActive) {
                        window.fretboard.updateBassChordStripPosition(currentChordIndex);
                    }
                }, time);
            }

            console.log('MelodyGenerator: Triggering step', step, event);

            if (this.currentMode === 'chords') {
                // Trigger chord
                const notes = getChordNotes(
                    event.degree,
                    event.quality,
                    this.currentKey,
                    this.currentOctave
                );

                // Calculate and store the chord root for bass sync
                const keyIndex = MELODY_NOTES.indexOf(this.currentKey);
                const degreeOffset = SCALE_DEGREES[event.degree] || 0;
                const rootIndex = (keyIndex + degreeOffset) % 12;
                this.currentChordRoot = MELODY_NOTES[rootIndex];

                if (notes.length > 0) {
                    this.chordSynth.triggerAttackRelease(notes, event.duration || '2n', time);

                    // Trigger bass to play root note (audio - outside Draw.schedule)
                    console.log('MELODY: Chord triggered, checking bass...',
                        'fretboard:', !!window.fretboard,
                        'isPlayingMelody:', window.fretboard?.isPlayingMelody,
                        'chordRoot:', this.currentChordRoot);
                    if (window.fretboard?.isPlayingMelody) {
                        console.log('MELODY: Calling playChordRoot');
                        window.fretboard.playChordRoot(this.currentChordRoot);
                    }

                    // Update display with notation conversion
                    Tone.Draw.schedule(() => {
                        const rootNote = this.toDisplayNote(this.currentChordRoot);
                        // Don't show "maj" for major triads (it's implied)
                        const qualityDisplay = event.quality === 'maj' ? '' : ' ' + event.quality;
                        const chordName = rootNote + qualityDisplay;
                        const noteList = this.toDisplayNotes(notes);
                        this.updateChordDisplay(chordName, noteList);

                        // Get chord notes without octave
                        const chordNotes = notes.map(n => n.replace(/\d/g, ''));

                        // Sync with BASS fretboard UI (visual only)
                        if (window.fretboard) {
                            window.fretboard.showMelodyChord(this.currentChordRoot, chordNotes);
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

        // Always use CHORD_PROGRESSIONS (melody mode uses them for harmonic structure)
        const found = CHORD_PROGRESSIONS.find(p => p.id === this.currentPattern);
        if (!found) {
            console.log('MelodyGenerator: Pattern NOT FOUND:', this.currentPattern);
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

    // Get next ROOT note for BASS display (just the note, no chord quality)
    getNextRootNote(currentChordIndex) {
        const pattern = CHORD_PROGRESSIONS.find(p => p.id === this.currentPattern);
        if (!pattern || !pattern.steps) return '—';

        const nextIndex = (currentChordIndex + 1) % pattern.steps.length;
        const nextChord = pattern.steps[nextIndex];

        // Calculate root note
        const keyIndex = MELODY_NOTES.indexOf(this.currentKey);
        const degreeOffset = SCALE_DEGREES[nextChord.degree] || 0;
        const rootIndex = (keyIndex + degreeOffset) % 12;
        const rootNote = MELODY_NOTES[rootIndex];

        // Return only the root note (converted to ITA if needed)
        return this.toDisplayNote(rootNote);
    }

    // Normalize note name (convert flats to sharps for comparison)
    normalizeNoteName(note) {
        const flatToSharp = {
            'Db': 'C#', 'Eb': 'D#', 'Fb': 'E', 'Gb': 'F#',
            'Ab': 'G#', 'Bb': 'A#', 'Cb': 'B'
        };
        return flatToSharp[note] || note;
    }

    // ===== MELODY GENERATION METHODS =====

    // Generate a random melody in the style of an artist
    generateMelodyInStyle(artistId, chordProgression = null) {
        const artist = ARTIST_STYLES[artistId];
        if (!artist) {
            console.log('MelodyGenerator: Artist not found:', artistId);
            return null;
        }

        this.currentArtist = artist;
        this.melodyCounter++;

        // Get chord progression info
        const pattern = chordProgression || this.getCurrentPatternData();
        const totalBars = pattern?.bars || 4;
        const chordSteps = pattern?.steps || [];

        // Generate melody notes for the full progression
        const notes = [];
        const beatsPerBar = 4;
        const totalBeats = totalBars * beatsPerBar;

        // Generate melody for each bar
        for (let bar = 0; bar < totalBars; bar++) {
            const barStartBeat = bar * beatsPerBar;
            let currentBeat = barStartBeat;
            const barEndBeat = barStartBeat + beatsPerBar;

            // Get the chord for this bar (if available)
            const currentChord = chordSteps[bar] || chordSteps[0];
            const chordRoot = currentChord?.degree || 'I';

            // Number of phrases per bar based on density
            const numPhrases = Math.max(1, Math.floor(artist.noteDensity * 2));

            for (let p = 0; p < numPhrases && currentBeat < barEndBeat; p++) {
                // Phrase length
                const phraseLength = artist.phrases.min +
                    Math.floor(Math.random() * (artist.phrases.max - artist.phrases.min + 1));

                for (let n = 0; n < phraseLength && currentBeat < barEndBeat; n++) {
                    // Decide if this is a rest
                    if (Math.random() < artist.restProbability) {
                        const rhythm = this.pickRandom(artist.rhythmPatterns);
                        currentBeat += this.rhythmToBeat(rhythm);
                        continue;
                    }

                    // Pick interval - bias towards chord tones occasionally
                    let interval = this.pickRandom(artist.intervalPreference);

                    // 30% chance to target a chord tone (root, 3rd, 5th)
                    if (Math.random() < 0.3) {
                        const chordTones = [0, 4, 7]; // root, major 3rd, 5th
                        interval = this.pickRandom(chordTones);
                    }

                    // Calculate semitone offset within note range
                    const semitoneOffset = Math.min(interval, artist.noteRange.high);

                    // Pick rhythm
                    const rhythm = this.pickRandom(artist.rhythmPatterns);

                    // Bend effect
                    const hasBend = Math.random() < artist.bendProbability;

                    notes.push({
                        interval: semitoneOffset,
                        duration: rhythm,
                        beat: currentBeat,
                        bar: bar,
                        chordDegree: chordRoot,
                        bend: hasBend
                    });

                    currentBeat += this.rhythmToBeat(rhythm);
                }

                // Small pause between phrases
                if (p < numPhrases - 1 && currentBeat < barEndBeat - 0.5) {
                    currentBeat += 0.25;
                }
            }
        }

        // Store generated melody
        this.generatedMelody = {
            artistId: artistId,
            artistName: artist.name,
            title: `Untitled #${this.melodyCounter}`,
            scale: artist.scale,
            notes: notes,
            bars: totalBars,
            style: artist.style
        };

        console.log('MelodyGenerator: Generated melody:', this.generatedMelody.title,
            'in style of', artist.name, '-', totalBars, 'bars,', notes.length, 'notes');
        return this.generatedMelody;
    }

    // Convert rhythm notation to beat value
    rhythmToBeat(rhythm) {
        const values = {
            '1n': 4,
            '2n': 2,
            '4n': 1,
            '8n': 0.5,
            '16n': 0.25,
            '8t': 0.333
        };
        return values[rhythm] || 0.5;
    }

    // Pick random item from array
    pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Get note from key + interval
    getNoteFromInterval(key, interval, octave) {
        const keyIndex = MELODY_NOTES.indexOf(key);
        if (keyIndex === -1) return 'C4';

        const noteIndex = (keyIndex + interval) % 12;
        const noteOctave = octave + Math.floor((keyIndex + interval) / 12);
        return MELODY_NOTES[noteIndex] + noteOctave;
    }

    // Get the chord root for a specific bar
    getChordRootForBar(barIndex) {
        // Try to get from chord progression pattern
        const pattern = CHORD_PROGRESSIONS.find(p => p.id === this.currentPattern);
        if (pattern && pattern.steps && pattern.steps[barIndex]) {
            const chord = pattern.steps[barIndex];
            const keyIndex = MELODY_NOTES.indexOf(this.currentKey);
            const degreeOffset = SCALE_DEGREES[chord.degree] || 0;
            const rootIndex = (keyIndex + degreeOffset) % 12;
            return MELODY_NOTES[rootIndex];
        }
        // Fallback to current key
        return this.currentKey;
    }

    // Detect genre from current chord pattern
    detectGenreFromPattern() {
        if (!this.currentPattern) return 'rock';  // Default

        const pattern = CHORD_PROGRESSIONS.find(p => p.id === this.currentPattern);
        return pattern?.category || 'rock';
    }

    // Start melody playback with selected or random artist
    startMelodyPlayback() {
        // Use selected artist if available, otherwise pick random from genre
        let artistId;
        if (this.currentArtist) {
            artistId = this.currentArtist.id;
            this.currentGenre = this.currentArtist.genre;
            console.log('MelodyGenerator: Using selected artist:', this.currentArtist.name);
        } else {
            // Get genre from selected chord progression
            const genre = this.detectGenreFromPattern();
            this.currentGenre = genre;

            // Pick random artist from that genre
            const artist = getRandomArtist(genre);
            if (!artist) {
                console.log('MelodyGenerator: No artists found for genre:', genre);
                return;
            }
            artistId = artist.id;
        }

        // Generate new melody
        this.generateMelodyInStyle(artistId);

        if (!this.generatedMelody) return;

        // Update display
        this.updateMelodyDisplay();

        // Create and start sequence
        this.startMelodySequence();
    }

    // Update display with current melody info
    updateMelodyDisplay() {
        if (!this.generatedMelody) return;

        const artist = this.generatedMelody.artistName;
        const bars = this.generatedMelody.bars;
        const noteCount = this.generatedMelody.notes.length;

        this.updateChordDisplay(
            '♪ PLAY',
            `${artist} style • ${bars} bars`
        );
    }

    // Start the generated melody sequence
    startMelodySequence() {
        if (!this.generatedMelody) return;

        // Stop and dispose any existing sequence first
        if (this.sequence) {
            this.sequence.stop();
            this.sequence.dispose();
            this.sequence = null;
        }

        // Get time signature from drum pattern (default 4/4)
        const drumPattern = window.beatGen?.currentPattern
            ? PATTERNS[window.beatGen.currentPattern]
            : null;
        const timeSignature = drumPattern?.timeSignature || '4/4';

        const melody = this.generatedMelody;
        const notes = melody.notes;
        const totalBars = melody.bars || 1;

        // Build sequence array (steps per bar depend on time signature)
        const stepsPerBar = this.getStepsPerBar(timeSignature);
        const totalSteps = stepsPerBar * totalBars;
        const stepArray = new Array(totalSteps).fill(null);

        // Calculate steps per beat for positioning
        const isTriplet = (timeSignature === '12/8' || timeSignature === '6/8');
        const stepsPerBeat = isTriplet ? 3 : 4;

        notes.forEach(note => {
            const stepIndex = Math.floor(note.beat * stepsPerBeat);
            if (stepIndex >= 0 && stepIndex < totalSteps) {
                stepArray[stepIndex] = note;
            }
        });

        console.log('MelodyGenerator: Building sequence -', totalBars, 'bars,', totalSteps, 'steps,', notes.length, 'notes');

        // Track current bar for display
        let currentBar = 0;
        // Track note index for timeline
        let noteIndex = -1;

        // Create Tone.Sequence
        this.sequence = new Tone.Sequence((time, step) => {
            const event = stepArray[step];

            // Reset at the start of each loop
            if (step === 0) {
                currentBar = 0;
                noteIndex = -1;
            }

            // Update bar indicator and trigger bass on bar change
            const newBar = Math.floor(step / stepsPerBar);
            if (newBar !== currentBar || step === 0) {
                currentBar = newBar;

                // Get the chord root for this bar from the progression
                const chordRoot = this.getChordRootForBar(currentBar);

                // If MEL mode is active in BASSIST, sync the fretboard and play bass
                if (window.fretboard?.melodySyncActive) {
                    console.log('MELODY: Bar', currentBar, '- syncing bass to chord:', chordRoot);

                    // Play bass root note (audio - must be outside Draw.schedule)
                    window.fretboard.playChordRoot(chordRoot);

                    // Update fretboard display with chord root (visual - inside Draw.schedule)
                    Tone.Draw.schedule(() => {
                        window.fretboard.showMelodyChord(chordRoot, [chordRoot]);
                    }, time);
                }
            }

            // Update BASS chord strip
            Tone.Draw.schedule(() => {
                if (window.fretboard?.melodySyncActive) {
                    window.fretboard.updateBassChordStripPosition(currentBar);
                }
            }, time);

            // If no event (rest), skip the rest
            if (!event) return;

            // Increment note index
            noteIndex++;

            // Calculate actual note
            const note = this.getNoteFromInterval(
                this.currentKey,
                event.interval,
                this.currentOctave + 1  // Melody usually an octave higher
            );

            // Trigger note
            this.melodySynth.triggerAttackRelease(note, event.duration, time);

            // Visual feedback for note
            Tone.Draw.schedule(() => {
                const noteName = this.toDisplayNote(note);
                const noteOnly = note.replace(/\d/g, '');  // Remove octave number
                const barNum = currentBar + 1;

                // Update display with note name and bar info
                this.updateChordDisplay(
                    noteName,
                    `${this.generatedMelody.artistName} [${barNum}/${totalBars}]`
                );
            }, time);

        }, [...Array(totalSteps).keys()], isTriplet ? '8t' : '16n');

        this.sequence.loop = true;
        this.sequence.start(0);

        // Start Transport if not already started
        if (Tone.Transport.state !== 'started') {
            Tone.Transport.start();
        }

        console.log('MelodyGenerator: Melody sequence started -', totalBars, 'bars');
    }

    // Generate next melody (called when loop restarts or manually)
    generateNextMelody() {
        if (this.currentMode !== 'melody') return;

        // Stop current sequence
        if (this.sequence) {
            this.sequence.stop();
            this.sequence.dispose();
            this.sequence = null;
        }

        // Generate and start new melody
        this.startMelodyPlayback();
    }
}

// Will be initialized in app.js
console.log('MelodyGenerator class loaded');
