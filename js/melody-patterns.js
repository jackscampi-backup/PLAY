// Melody Patterns Library for DRUMMER
console.log('Loading melody-patterns.js...');

// Chromatic notes array (exported globally)
window.NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES = window.NOTES;  // Local reference
console.log('NOTES defined:', window.NOTES);

// Chord quality formulas (semitone intervals from root)
const CHORD_QUALITIES = {
    'maj': [0, 4, 7],           // Major triad
    'min': [0, 3, 7],           // Minor triad
    'dom7': [0, 4, 7, 10],      // Dominant 7th
    'maj7': [0, 4, 7, 11],      // Major 7th
    'min7': [0, 3, 7, 10],      // Minor 7th
    'dim': [0, 3, 6],           // Diminished
    'aug': [0, 4, 8],           // Augmented
    'sus4': [0, 5, 7],          // Suspended 4th
    'sus2': [0, 2, 7]           // Suspended 2nd
};

// Roman numeral scale degrees to semitone offsets
const SCALE_DEGREES = {
    'I': 0,
    'bII': 1,
    'II': 2,
    'bIII': 3,
    'III': 4,
    'IV': 5,
    '#IV': 6,
    'bV': 6,
    'V': 7,
    'bVI': 8,
    'VI': 9,
    'bVII': 10,
    'VII': 11
};
window.SCALE_DEGREES = SCALE_DEGREES;  // Export for other modules

// Scale intervals (for melodic lines)
const SCALES = {
    'major': {
        intervals: [0, 2, 4, 5, 7, 9, 11],
        name: 'Major'
    },
    'minor': {
        intervals: [0, 2, 3, 5, 7, 8, 10],
        name: 'Natural Minor'
    },
    'minor_pentatonic': {
        intervals: [0, 3, 5, 7, 10],
        name: 'Minor Pentatonic'
    },
    'major_pentatonic': {
        intervals: [0, 2, 4, 7, 9],
        name: 'Major Pentatonic'
    },
    'blues': {
        intervals: [0, 3, 5, 6, 7, 10],
        name: 'Blues Scale'
    },
    'chromatic': {
        intervals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        name: 'Chromatic'
    }
};

/**
 * Get chord notes from degree, quality, key, and octave
 * @param {string} degree - Roman numeral (I, IV, V, etc.)
 * @param {string} quality - Chord quality (maj, min, dom7, etc.)
 * @param {string} key - Root key (C, D, E, etc.)
 * @param {number} octave - Octave number (default 3)
 * @returns {string[]} Array of note strings with octave (e.g., ['C3', 'E3', 'G3'])
 */
function getChordNotes(degree, quality, key, octave = 3) {
    const keyIndex = NOTES.indexOf(key);
    if (keyIndex === -1) return [];

    const degreeOffset = SCALE_DEGREES[degree];
    if (degreeOffset === undefined) return [];

    const rootIndex = (keyIndex + degreeOffset) % 12;
    const intervals = CHORD_QUALITIES[quality] || [0, 4, 7];

    const notes = intervals.map(interval => {
        const noteIndex = (rootIndex + interval) % 12;
        const noteName = NOTES[noteIndex];
        const noteOctave = octave + Math.floor((rootIndex + interval) / 12);
        return noteName + noteOctave;
    });

    return notes;
}

/**
 * Get melody note from scale degree, key, octave, and scale
 * @param {number} degree - Scale degree (1-indexed: 1=root, 2=second, etc.)
 * @param {string} key - Root key (C, D, E, etc.)
 * @param {number} octave - Octave number (default 4)
 * @param {string} scale - Scale type (major, minor_pentatonic, etc.)
 * @returns {string} Note string with octave (e.g., 'C4')
 */
function getMelodyNote(degree, key, octave = 4, scale = 'major') {
    const keyIndex = NOTES.indexOf(key);
    if (keyIndex === -1) return 'C4';

    const scaleData = SCALES[scale] || SCALES['major'];
    const scaleIntervals = scaleData.intervals;

    // Convert 1-indexed degree to 0-indexed array position
    const degreeIndex = (degree - 1) % scaleIntervals.length;
    const interval = scaleIntervals[degreeIndex];

    const noteIndex = (keyIndex + interval) % 12;
    const noteName = NOTES[noteIndex];
    const noteOctave = octave + Math.floor((keyIndex + interval) / 12);

    return noteName + noteOctave;
}

// ===== CHORD PROGRESSIONS =====
// Export as global variables for melody-gen.js

window.CHORD_PROGRESSIONS = [
    // Rock (5 patterns for testing)
    {
        id: 'rock-i-iv-v',
        name: 'I-IV-V (Rock)',
        type: 'chords',
        genre: 'rock',
        key: 'C',
        bars: 4,
        steps: [
            {degree: 'I', quality: 'maj', beat: 0, duration: 4},    // Bar 1: I
            {degree: 'IV', quality: 'maj', beat: 0, duration: 4},   // Bar 2: IV
            {degree: 'V', quality: 'maj', beat: 0, duration: 2},    // Bar 3.1: V
            {degree: 'IV', quality: 'maj', beat: 2, duration: 2},   // Bar 3.2: IV
            {degree: 'I', quality: 'maj', beat: 0, duration: 4}     // Bar 4: I
        ]
    },
    {
        id: 'rock-power',
        name: 'I-V (Power)',
        type: 'chords',
        genre: 'rock',
        key: 'C',
        bars: 1,
        steps: [
            {degree: 'I', quality: 'maj', beat: 0, duration: 2},
            {degree: 'V', quality: 'maj', beat: 2, duration: 2}
        ]
    },

    // Blues (2 patterns for testing)
    {
        id: 'blues-12bar',
        name: '12-Bar Blues',
        type: 'chords',
        genre: 'blues',
        key: 'C',
        bars: 12,
        steps: [
            // Bars 1-4: I7
            {degree: 'I', quality: 'dom7', beat: 0, duration: 4},
            {degree: 'I', quality: 'dom7', beat: 0, duration: 4},
            {degree: 'I', quality: 'dom7', beat: 0, duration: 4},
            {degree: 'I', quality: 'dom7', beat: 0, duration: 4},
            // Bars 5-6: IV7
            {degree: 'IV', quality: 'dom7', beat: 0, duration: 4},
            {degree: 'IV', quality: 'dom7', beat: 0, duration: 4},
            // Bars 7-8: I7
            {degree: 'I', quality: 'dom7', beat: 0, duration: 4},
            {degree: 'I', quality: 'dom7', beat: 0, duration: 4},
            // Bars 9-10: V7-IV7
            {degree: 'V', quality: 'dom7', beat: 0, duration: 4},
            {degree: 'IV', quality: 'dom7', beat: 0, duration: 4},
            // Bars 11-12: I7-V7 (turnaround)
            {degree: 'I', quality: 'dom7', beat: 0, duration: 4},
            {degree: 'V', quality: 'dom7', beat: 0, duration: 4}
        ]
    },
    {
        id: 'blues-turnaround',
        name: 'Blues Turnaround',
        type: 'chords',
        genre: 'blues',
        key: 'C',
        bars: 1,
        steps: [
            {degree: 'I', quality: 'dom7', beat: 0, duration: 1},
            {degree: 'VI', quality: 'dom7', beat: 1, duration: 1},
            {degree: 'II', quality: 'min7', beat: 2, duration: 1},
            {degree: 'V', quality: 'dom7', beat: 3, duration: 1}
        ]
    },

    // Funk (1 pattern for testing)
    {
        id: 'funk-vamp',
        name: 'i-i (Funk Vamp)',
        type: 'chords',
        genre: 'funk',
        key: 'C',
        bars: 1,
        steps: [
            {degree: 'I', quality: 'min7', beat: 0, duration: 4}
        ]
    }
];

// ===== MELODIC LINES =====

window.MELODIC_LINES = [
    // Foundation (2 patterns for testing)
    {
        id: 'major-run',
        name: 'Major Scale Run',
        type: 'melody',
        genre: 'foundation',
        key: 'C',
        bars: 1,
        scale: 'major',
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
    },
    {
        id: 'penta-lick',
        name: 'Minor Pentatonic Lick',
        type: 'melody',
        genre: 'foundation',
        key: 'C',
        bars: 1,
        scale: 'minor_pentatonic',
        steps: [
            {degree: 1, octave: 4, beat: 0, duration: '8n'},
            {degree: 3, octave: 4, beat: 0.5, duration: '8n'},
            {degree: 4, octave: 4, beat: 1, duration: '8n'},
            {degree: 5, octave: 4, beat: 1.5, duration: '8n'},
            {degree: 4, octave: 4, beat: 2, duration: '8n'},
            {degree: 3, octave: 4, beat: 2.5, duration: '8n'},
            {degree: 1, octave: 4, beat: 3, duration: '4n'}
        ]
    },

    // Rock (1 pattern for testing)
    {
        id: 'rock-riff',
        name: 'Rock Power Riff',
        type: 'melody',
        genre: 'rock',
        key: 'C',
        bars: 1,
        scale: 'minor_pentatonic',
        steps: [
            {degree: 1, octave: 4, beat: 0, duration: '8n'},
            {degree: 1, octave: 4, beat: 0.5, duration: '8n'},
            {degree: 3, octave: 4, beat: 1, duration: '8n'},
            {degree: 4, octave: 4, beat: 1.5, duration: '8n'},
            {degree: 5, octave: 4, beat: 2, duration: '4n'},
            {degree: 4, octave: 4, beat: 3, duration: '8n'},
            {degree: 3, octave: 4, beat: 3.5, duration: '8n'}
        ]
    },

    // Blues (1 pattern for testing)
    {
        id: 'blues-call',
        name: 'Blues Call',
        type: 'melody',
        genre: 'blues',
        key: 'C',
        bars: 1,
        scale: 'blues',
        steps: [
            {degree: 1, octave: 4, beat: 0, duration: '8n'},
            {degree: 3, octave: 4, beat: 0.5, duration: '8n'},
            {degree: 4, octave: 4, beat: 1, duration: '8n'},
            {degree: 5, octave: 4, beat: 1.5, duration: '8n'},
            {degree: 6, octave: 4, beat: 2, duration: '16n'},
            {degree: 5, octave: 4, beat: 2.25, duration: '8n'},
            {degree: 3, octave: 4, beat: 2.75, duration: '8n'},
            {degree: 1, octave: 4, beat: 3.25, duration: '4n'}
        ]
    },

    // Funk (1 pattern for testing)
    {
        id: 'funk-stab',
        name: 'Funk Stab',
        type: 'melody',
        genre: 'funk',
        key: 'C',
        bars: 1,
        scale: 'minor_pentatonic',
        steps: [
            {degree: 1, octave: 4, beat: 0, duration: '16n'},
            {degree: 4, octave: 4, beat: 1, duration: '16n'},
            {degree: 5, octave: 4, beat: 2, duration: '16n'},
            {degree: 4, octave: 4, beat: 3, duration: '16n'}
        ]
    }
];

// Make aliases for easier access
const CHORD_PROGRESSIONS = window.CHORD_PROGRESSIONS;
const MELODIC_LINES = window.MELODIC_LINES;

console.log('Melody patterns loaded:', window.CHORD_PROGRESSIONS.length, 'chords,', window.MELODIC_LINES.length, 'melodies');
