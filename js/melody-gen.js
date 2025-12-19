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

// ===== MELODIC LINES (legacy - kept for compatibility) =====
const MELODIC_LINES = [
    {
        id: 'major-run', name: 'Major Scale', type: 'melody', category: 'foundation', bars: 1, scale: 'major',
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

        // Melody generation state
        this.currentArtist = null;
        this.melodyCounter = 0;
        this.generatedMelody = null;
        this.currentGenre = null;  // Track genre from chord progression
        this.currentChordRoot = null;  // Current chord root note for bass sync

        // Saved melodies
        this.savedMelodies = [];
        this.maxSavedMelodies = 8;  // Limit to avoid clutter

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
            // Load saved melodies from localStorage
            this.loadMelodiesFromStorage();
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

        // NEXT button for melody regeneration
        this.nextBtn = document.getElementById('melodyNextBtn');

        // SAVE button
        this.saveBtn = document.getElementById('melodySaveBtn');

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

        // Build step indicators (default 4/4)
        this.buildStepIndicators('4/4');

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

        // NEXT button (for melody mode - generate new melody)
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.handleNextClick());
        }

        // SAVE button
        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => this.handleSaveClick());
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

        // Rebuild chord strip with new notation
        if (this.currentPattern) {
            this.buildChordStrip();
            // Also rebuild BASS chord strip if MEL mode is active
            if (window.fretboard?.melodySyncActive) {
                window.fretboard.buildBassChordStrip();
            }
        }

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

    selectKey(key, fromBass = false) {
        this.currentKey = key;
        this.updateKeyButtons();
        console.log('MelodyGenerator: Key selected:', key);

        // Sync with BASS root (avoid infinite loop)
        if (!fromBass && window.fretboard) {
            window.fretboard.selectRoot(key, true);
        }

        // Rebuild chord strip with new key
        if (this.currentPattern) {
            this.buildChordStrip();
            // Also rebuild BASS chord strip if MEL mode is active
            if (window.fretboard?.melodySyncActive) {
                window.fretboard.buildBassChordStrip();
            }
        }

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

        // Reset display based on mode
        if (mode === 'melody') {
            this.updateChordDisplay('MELODY', 'Select pattern → random artist melody');
        } else {
            this.updateChordDisplay('CHORDS', 'Select a pattern');
            // Hide timeline in chords mode
            this.hideTimeline();
        }
    }

    selectPattern(patternId) {
        if (!patternId) {
            this.currentPattern = null;
            this.buildChordStrip(); // Clear strip
            return;
        }

        this.currentPattern = patternId;
        console.log('MelodyGenerator: Pattern selected:', patternId);

        // Build chord strip for this pattern
        this.buildChordStrip();

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

        // Clear step indicator and chord strip
        this.clearStepIndicator();
        this.clearChordStrip();

        // Clear display based on mode
        if (this.currentMode === 'melody') {
            this.updateChordDisplay('MELODY', 'Stopped - select pattern to play');
        } else {
            this.updateChordDisplay('—', 'Stopped');
        }

        // Clear generated melody (it "self-destructs")
        this.generatedMelody = null;

        // Clear timeline
        this.clearTimeline();

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

        // Build step indicators for this time signature
        this.buildStepIndicators(timeSignature);

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

            // Update step indicator on each step
            Tone.Draw.schedule(() => {
                this.updateStepIndicator(stepInBar);
            }, time);

            const event = stepArray[step];
            if (!event) return;

            // Find chord index in pattern.steps
            const chordIndex = pattern.steps.indexOf(event);
            if (chordIndex !== -1 && chordIndex !== currentChordIndex) {
                currentChordIndex = chordIndex;
                // Update chord strip position when chord changes (both MELODY and BASS)
                Tone.Draw.schedule(() => {
                    this.updateChordStripPosition(currentChordIndex);
                    // Also update BASS chord strip
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

                        // Update mini fretboard
                        this.updateMiniFretboard(this.currentKey, chordNotes);

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
            btn.classList.toggle('active', btn.dataset.key === this.currentKey);
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

    // Build chord strip showing full progression
    buildChordStrip() {
        const strip = document.getElementById('chordStrip');
        if (!strip) {
            console.log('ChordStrip: element not found');
            return;
        }

        // Always search in CHORD_PROGRESSIONS for the strip
        const pattern = CHORD_PROGRESSIONS.find(p => p.id === this.currentPattern);
        console.log('ChordStrip: building for pattern', this.currentPattern, pattern);

        if (!pattern || !pattern.steps) {
            strip.innerHTML = '<span style="color: #555;">Select a pattern</span>';
            return;
        }

        strip.innerHTML = '';

        pattern.steps.forEach((chord, index) => {
            // Calculate chord root note
            const keyIndex = MELODY_NOTES.indexOf(this.currentKey);
            const degreeOffset = SCALE_DEGREES[chord.degree] || 0;
            const rootIndex = (keyIndex + degreeOffset) % 12;
            const rootNote = MELODY_NOTES[rootIndex];

            // Create chord item
            const item = document.createElement('div');
            item.className = 'chord-strip-item';
            item.dataset.index = index;

            const rootDiv = document.createElement('div');
            rootDiv.className = 'chord-root';
            rootDiv.textContent = this.toDisplayNote(rootNote);

            const qualityDiv = document.createElement('div');
            qualityDiv.className = 'chord-quality';
            // Show quality only if not major triad
            qualityDiv.textContent = chord.quality === 'maj' ? '' : chord.quality;

            item.appendChild(rootDiv);
            item.appendChild(qualityDiv);
            strip.appendChild(item);

            // Add arrow between chords (except last)
            if (index < pattern.steps.length - 1) {
                const arrow = document.createElement('span');
                arrow.className = 'chord-strip-arrow';
                arrow.textContent = '→';
                strip.appendChild(arrow);
            }
        });
    }

    // Update chord strip to highlight current chord
    updateChordStripPosition(currentBar) {
        const strip = document.getElementById('chordStrip');
        if (!strip) return;

        const items = strip.querySelectorAll('.chord-strip-item');
        items.forEach((item, index) => {
            item.classList.remove('current', 'next');
            if (index === currentBar) {
                item.classList.add('current');
            } else if (index === currentBar + 1 || (currentBar === items.length - 1 && index === 0)) {
                item.classList.add('next');
            }
        });
    }

    // Clear chord strip highlighting
    clearChordStrip() {
        const strip = document.getElementById('chordStrip');
        if (!strip) return;

        strip.querySelectorAll('.chord-strip-item').forEach(item => {
            item.classList.remove('current', 'next');
        });
    }

    // Build step indicators (16 steps for 4/4, 12 steps for 12/8 shuffle)
    buildStepIndicators(timeSignature = '4/4') {
        const stepRow = document.getElementById('melodyStepRow');
        if (!stepRow) return;

        // Clear existing
        stepRow.innerHTML = '';

        // Determine steps per beat based on time signature
        const isTriplet = (timeSignature === '12/8' || timeSignature === '6/8');
        const stepsPerBeat = isTriplet ? 3 : 4;
        const numBeats = (timeSignature === '6/8') ? 2 : 4;

        // Create beat groups
        for (let beat = 0; beat < numBeats; beat++) {
            const beatGroup = document.createElement('div');
            beatGroup.className = 'beat-group-steps';
            if (isTriplet) beatGroup.classList.add('triplet');

            for (let step = 0; step < stepsPerBeat; step++) {
                const stepDiv = document.createElement('div');
                stepDiv.className = 'step';
                stepDiv.dataset.step = beat * stepsPerBeat + step;
                beatGroup.appendChild(stepDiv);
            }

            stepRow.appendChild(beatGroup);
        }

        // Update beat number display for 6/8
        const beatRow = document.querySelector('#melodyPatternSection .beat-row');
        if (beatRow) {
            const beatGroups = beatRow.querySelectorAll('.beat-group');
            beatGroups.forEach((group, index) => {
                group.style.display = (timeSignature === '6/8' && index >= 2) ? 'none' : 'flex';
            });
        }
    }

    // Update step indicator (highlight current step within bar)
    updateStepIndicator(stepInBar) {
        const stepRow = document.getElementById('melodyStepRow');
        if (!stepRow) return;

        const steps = stepRow.querySelectorAll('.step');
        steps.forEach((step, index) => {
            step.classList.toggle('playing', index === stepInBar);
        });

        // Also update beat numbers
        const beatNums = document.querySelectorAll('#melodyPatternSection .beat-num');
        const currentBeat = Math.floor(stepInBar / 4) + 1;
        beatNums.forEach(num => {
            const beat = parseInt(num.dataset.beat);
            num.classList.toggle('active', beat === currentBeat);
            num.classList.toggle('downbeat', beat === currentBeat && stepInBar % 4 === 0);
        });
    }

    // Clear step indicator
    clearStepIndicator() {
        const stepRow = document.getElementById('melodyStepRow');
        if (stepRow) {
            stepRow.querySelectorAll('.step').forEach(step => {
                step.classList.remove('playing', 'active');
            });
        }

        // Clear beat numbers
        const beatNums = document.querySelectorAll('#melodyPatternSection .beat-num');
        beatNums.forEach(num => {
            num.classList.remove('active', 'downbeat');
        });
    }

    // Update mini fretboard with chord notes (ONE position per note)
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
        const stringOrder = ['E', 'A', 'D', 'G'];

        // Clear all notes
        miniFretboard.querySelectorAll('.mini-note').forEach(n => n.remove());

        // Find ONE best position per chord note
        const positions = [];

        // Find root first (prefer E or A string, low frets)
        let rootPos = null;
        for (const stringName of stringOrder) {
            const fretIndex = strings[stringName].indexOf(root);
            if (fretIndex !== -1) {
                if (!rootPos || fretIndex < rootPos.fret) {
                    rootPos = { string: stringName, fret: fretIndex, note: root, isRoot: true };
                }
            }
        }
        if (rootPos) positions.push(rootPos);

        // Find other chord notes close to root
        const rootFret = rootPos?.fret || 0;
        chordNotes.forEach(note => {
            if (note === root) return; // Already added

            let bestPos = null;
            let bestDist = Infinity;

            for (const stringName of stringOrder) {
                const fretIndex = strings[stringName].indexOf(note);
                if (fretIndex !== -1) {
                    const dist = Math.abs(fretIndex - rootFret);
                    if (dist < bestDist) {
                        bestDist = dist;
                        bestPos = { string: stringName, fret: fretIndex, note, isRoot: false };
                    }
                }
            }
            if (bestPos) positions.push(bestPos);
        });

        // Add notes to fretboard
        positions.forEach(pos => {
            const stringEl = miniFretboard.querySelector(`.mini-string[data-string="${pos.string}"]`);
            if (!stringEl) return;

            const fretEl = stringEl.querySelectorAll('.mini-fret')[pos.fret];
            if (!fretEl) return;

            const noteDiv = document.createElement('div');
            noteDiv.className = 'mini-note';
            noteDiv.classList.add(pos.isRoot ? 'root' : 'active');
            if (pos.isRoot) noteDiv.textContent = 'R';

            fretEl.appendChild(noteDiv);
        });
    }

    // Clear mini fretboard
    clearMiniFretboard() {
        const miniFretboard = document.getElementById('miniFretboard');
        if (miniFretboard) {
            miniFretboard.querySelectorAll('.mini-note').forEach(n => n.remove());
        }
    }

    // Update mini fretboard for melody mode (single note)
    updateMiniFretboardMelody(noteName) {
        const miniFretboard = document.getElementById('miniFretboard');
        if (!miniFretboard) return;

        // String tuning (standard bass) - notes at each fret
        // Order: E (lowest) to G (highest) for priority
        const stringOrder = ['E', 'A', 'D', 'G'];
        const strings = {
            'E': ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#'],
            'A': ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
            'D': ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
            'G': ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#']
        };

        // Clear all notes first
        miniFretboard.querySelectorAll('.mini-note').forEach(n => n.remove());

        // Normalize note name (handle flats)
        const normalizedNote = this.normalizeNoteName(noteName);

        // Find the BEST position (lowest fret, prefer lower strings)
        let bestPosition = null;

        for (const stringName of stringOrder) {
            const notes = strings[stringName];
            for (let fretIndex = 0; fretIndex < notes.length; fretIndex++) {
                if (notes[fretIndex] === normalizedNote) {
                    // Found a position - prefer lower frets
                    if (!bestPosition || fretIndex < bestPosition.fret) {
                        bestPosition = { string: stringName, fret: fretIndex };
                    }
                    break; // Move to next string
                }
            }
        }

        // Show only the best position
        if (bestPosition) {
            const stringEl = miniFretboard.querySelector(`.mini-string[data-string="${bestPosition.string}"]`);
            if (stringEl) {
                const frets = stringEl.querySelectorAll('.mini-fret');
                const fretEl = frets[bestPosition.fret];
                if (fretEl) {
                    const noteDiv = document.createElement('div');
                    noteDiv.className = 'mini-note active';

                    // Show note name in display notation
                    const displayNote = this.useItalianNotation ?
                        (this.italianNotes[normalizedNote] || normalizedNote) : normalizedNote;
                    noteDiv.textContent = displayNote.replace('#', '');

                    fretEl.appendChild(noteDiv);
                }
            }
        }
    }

    // Normalize note name (convert flats to sharps for comparison)
    normalizeNoteName(note) {
        const flatToSharp = {
            'Db': 'C#', 'Eb': 'D#', 'Fb': 'E', 'Gb': 'F#',
            'Ab': 'G#', 'Bb': 'A#', 'Cb': 'B'
        };
        return flatToSharp[note] || note;
    }

    // Build the melody timeline display
    buildMelodyTimeline() {
        const timelineSection = document.getElementById('melodyTimelineSection');
        const timeline = document.getElementById('melodyTimeline');
        if (!timeline || !this.generatedMelody) return;

        // Show timeline section
        if (timelineSection) {
            timelineSection.style.display = 'block';
        }

        // Clear existing timeline
        timeline.innerHTML = '';

        const notes = this.generatedMelody.notes;
        const totalBars = this.generatedMelody.bars || 1;

        // Build a step grid (4 steps per beat, 16 per bar)
        const stepsPerBar = 16;
        const totalSteps = totalBars * stepsPerBar;
        const stepGrid = new Array(totalSteps).fill(null);

        // Place notes in grid
        notes.forEach((note, index) => {
            const stepIndex = Math.floor(note.beat * 4);
            if (stepIndex >= 0 && stepIndex < totalSteps) {
                stepGrid[stepIndex] = { note, index };
            }
        });

        // Build timeline with notes and rests
        let noteIndex = 0;
        for (let step = 0; step < totalSteps; step++) {
            // Add bar marker at bar boundaries (except first)
            if (step > 0 && step % stepsPerBar === 0) {
                const marker = document.createElement('div');
                marker.className = 'timeline-bar-marker';
                timeline.appendChild(marker);
            }

            const cell = stepGrid[step];
            const box = document.createElement('div');

            if (cell) {
                // Note
                box.className = 'timeline-note';
                box.dataset.index = cell.index;

                const noteName = this.getNoteFromInterval(
                    this.currentKey,
                    cell.note.interval,
                    this.currentOctave + 1
                );
                const noteOnly = noteName.replace(/\d/g, '');
                const displayNote = this.useItalianNotation ?
                    (this.italianNotes[noteOnly] || noteOnly) : noteOnly;

                box.textContent = displayNote;
            } else {
                // Rest/pause
                box.className = 'timeline-note timeline-rest';
                box.textContent = '·';
            }

            timeline.appendChild(box);
        }

        console.log('MelodyGenerator: Timeline built with', totalSteps, 'steps,', notes.length, 'notes');
    }

    // Update timeline to highlight current step
    updateTimelinePosition(stepIndex) {
        const timeline = document.getElementById('melodyTimeline');
        if (!timeline) return;

        // Track the current element for scrolling
        let currentElement = null;

        // Adjust index to account for bar markers
        let actualIndex = 0;
        const children = timeline.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].classList.contains('timeline-bar-marker')) {
                continue; // Skip bar markers
            }

            children[i].classList.remove('current', 'played', 'next');

            if (actualIndex < stepIndex) {
                children[i].classList.add('played');
            } else if (actualIndex === stepIndex) {
                children[i].classList.add('current');
                currentElement = children[i];
            } else if (actualIndex === stepIndex + 1) {
                children[i].classList.add('next');
            }
            actualIndex++;
        }

        // Scroll timeline horizontally (not the page)
        if (currentElement) {
            const timelineRect = timeline.getBoundingClientRect();
            const elementRect = currentElement.getBoundingClientRect();
            const elementCenter = elementRect.left + elementRect.width / 2;
            const timelineCenter = timelineRect.left + timelineRect.width / 2;

            // Only scroll if element is not centered
            if (Math.abs(elementCenter - timelineCenter) > timelineRect.width / 4) {
                const scrollOffset = currentElement.offsetLeft - timeline.offsetWidth / 2 + currentElement.offsetWidth / 2;
                timeline.scrollTo({ left: scrollOffset, behavior: 'smooth' });
            }
        }
    }

    // Hide timeline (for chords mode)
    hideTimeline() {
        const timelineSection = document.getElementById('melodyTimelineSection');
        if (timelineSection) {
            timelineSection.style.display = 'none';
        }
    }

    // Clear timeline
    clearTimeline() {
        const timeline = document.getElementById('melodyTimeline');
        if (timeline) {
            timeline.innerHTML = '';
        }
        this.hideTimeline();
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

    // Start melody playback with random artist
    startMelodyPlayback() {
        // Get genre from selected chord progression
        const genre = this.detectGenreFromPattern();
        this.currentGenre = genre;

        // Pick random artist from that genre
        const artist = getRandomArtist(genre);
        if (!artist) {
            console.log('MelodyGenerator: No artists found for genre:', genre);
            return;
        }

        // Generate new melody
        this.generateMelodyInStyle(artist.id);

        if (!this.generatedMelody) return;

        // Update display
        this.updateMelodyDisplay();

        // Build timeline visualization
        this.buildMelodyTimeline();

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

        // Build step indicators for current time signature
        this.buildStepIndicators(timeSignature);

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

                // Trigger bass on downbeat of each bar
                if (window.fretboard?.isPlayingMelody) {
                    // Get the chord root for this bar from the progression
                    const chordRoot = this.getChordRootForBar(currentBar);
                    console.log('MELODY: Bar', currentBar, '- triggering bass root:', chordRoot);
                    window.fretboard.playChordRoot(chordRoot);
                }
            }

            // Always update timeline position, step indicator and chord strip
            const currentStep = step;
            const stepInBar = step % stepsPerBar;
            Tone.Draw.schedule(() => {
                this.updateTimelinePosition(currentStep);
                this.updateStepIndicator(stepInBar);
                this.updateChordStripPosition(currentBar);
                // Also update BASS chord strip
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

                // Update mini fretboard with current note
                this.updateMiniFretboardMelody(noteOnly);

                // Sync with BASS fretboard
                if (window.fretboard) {
                    window.fretboard.showMelodyChord(noteOnly, [noteOnly]);
                }
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

    // Handle NEXT button click
    handleNextClick() {
        // Only works in melody mode and when a pattern is selected
        if (this.currentMode !== 'melody') {
            this.updateChordDisplay('NEXT', 'Switch to MELODY mode first');
            return;
        }

        if (!this.currentPattern) {
            this.updateChordDisplay('NEXT', 'Select a pattern first');
            return;
        }

        // Flash the NEXT button LED
        if (this.nextBtn) {
            this.nextBtn.classList.add('active');
            setTimeout(() => this.nextBtn.classList.remove('active'), 200);
        }

        // Generate new melody
        this.generateNextMelody();

        console.log('MelodyGenerator: NEXT clicked - generating new melody');
    }

    // Handle SAVE button click
    handleSaveClick() {
        if (!this.generatedMelody) {
            this.updateChordDisplay('SAVE', 'No melody to save');
            return;
        }

        // Check limit
        if (this.savedMelodies.length >= this.maxSavedMelodies) {
            this.updateChordDisplay('FULL', `Max ${this.maxSavedMelodies} saved`);
            return;
        }

        // Flash the SAVE button LED
        if (this.saveBtn) {
            this.saveBtn.classList.add('active');
            setTimeout(() => this.saveBtn.classList.remove('active'), 300);
        }

        // Save a copy of the current melody
        const savedMelody = {
            ...this.generatedMelody,
            id: Date.now(),
            savedAt: new Date().toLocaleTimeString(),
            key: this.currentKey,
            pattern: this.currentPattern
        };

        this.savedMelodies.push(savedMelody);
        this.saveMelodiesToStorage();
        this.updateSavedMelodiesList();

        this.updateChordDisplay('SAVED!', `#${this.savedMelodies.length} - ${savedMelody.artistName}`);

        console.log('MelodyGenerator: Melody saved', savedMelody.title);
    }

    // Update the saved melodies UI list
    updateSavedMelodiesList() {
        const section = document.getElementById('savedMelodiesSection');
        const list = document.getElementById('savedMelodiesList');
        if (!list) return;

        // Show/hide section
        if (section) {
            section.style.display = this.savedMelodies.length > 0 ? 'block' : 'none';
        }

        // Clear list
        list.innerHTML = '';

        // Add each saved melody
        this.savedMelodies.forEach((melody, index) => {
            const item = document.createElement('div');
            item.className = 'saved-melody-item';
            item.dataset.id = melody.id;

            const name = document.createElement('span');
            name.className = 'saved-melody-name';
            name.textContent = `${index + 1}. ${melody.artistName}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'saved-melody-delete';
            deleteBtn.textContent = '×';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                this.deleteSavedMelody(melody.id);
            };

            item.appendChild(name);
            item.appendChild(deleteBtn);

            // Click to load
            item.onclick = () => this.loadSavedMelody(melody.id);

            list.appendChild(item);
        });
    }

    // Load a saved melody
    async loadSavedMelody(id) {
        const melody = this.savedMelodies.find(m => m.id === id);
        if (!melody) return;

        // Stop current playback
        if (this.isPlaying) {
            this.stop();
        }

        // Start audio context (required for playback)
        await Tone.start();

        // Restore melody state
        this.generatedMelody = { ...melody };
        this.currentKey = melody.key;
        this.currentPattern = melody.pattern;

        // Update key buttons
        this.updateKeyButtons();

        // Update pattern dropdown
        if (this.patternSelect) {
            this.patternSelect.value = melody.pattern;
        }

        // Switch to melody mode (but don't clear the melody we just loaded)
        this.currentMode = 'melody';
        this.updateModeButtons();

        // Build timeline
        this.buildMelodyTimeline();

        // Update display
        this.updateChordDisplay('▶ PLAY', melody.artistName);

        // Highlight the loaded item
        document.querySelectorAll('.saved-melody-item').forEach(item => {
            item.classList.toggle('active', item.dataset.id == id);
        });

        // Start playing
        this.isPlaying = true;
        if (this.playBtn) this.playBtn.classList.add('active');
        this.startMelodySequence();

        console.log('MelodyGenerator: Loaded and playing saved melody', melody.title);
    }

    // Delete a saved melody
    deleteSavedMelody(id) {
        this.savedMelodies = this.savedMelodies.filter(m => m.id !== id);
        this.saveMelodiesToStorage();
        this.updateSavedMelodiesList();
        console.log('MelodyGenerator: Deleted saved melody', id);
    }

    // Save melodies to localStorage
    saveMelodiesToStorage() {
        try {
            localStorage.setItem('drummer_saved_melodies', JSON.stringify(this.savedMelodies));
            console.log('MelodyGenerator: Saved', this.savedMelodies.length, 'melodies to storage');
        } catch (e) {
            console.warn('MelodyGenerator: Could not save to localStorage', e);
        }
    }

    // Load melodies from localStorage
    loadMelodiesFromStorage() {
        try {
            const data = localStorage.getItem('drummer_saved_melodies');
            if (data) {
                this.savedMelodies = JSON.parse(data);
                this.updateSavedMelodiesList();
                console.log('MelodyGenerator: Loaded', this.savedMelodies.length, 'melodies from storage');
            }
        } catch (e) {
            console.warn('MelodyGenerator: Could not load from localStorage', e);
            this.savedMelodies = [];
        }
    }
}

// Will be initialized in app.js
console.log('MelodyGenerator class loaded');
