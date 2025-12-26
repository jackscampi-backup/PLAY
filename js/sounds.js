/**
 * Bass Sound Synthesizer
 * Uses Tone.js to generate bass guitar sounds
 */

class BassSound {
    constructor() {
        this.isReady = false;
        this.synth = null;
        this.volume = 10; // dB (louder bass)

        // Note frequencies for bass (E1 to G3 range)
        // Standard 4-string bass tuning: E1-A1-D2-G2
        this.baseFrequencies = {
            'E': 41.20,  // E1 (open E string)
            'F': 43.65,
            'F#': 46.25,
            'G': 49.00,
            'G#': 51.91,
            'A': 55.00,  // A1 (open A string)
            'A#': 58.27,
            'B': 61.74,
            'C': 65.41,
            'C#': 69.30,
            'D': 73.42,  // D2 (open D string)
            'D#': 77.78
        };

        // Fret multiplier: each fret = semitone = 2^(1/12)
        this.semitone = Math.pow(2, 1/12);
    }

    /**
     * Initialize Tone.js - must be called after user interaction
     */
    async init() {
        if (this.isReady) return;

        await Tone.start();

        // Create a bass-like synth
        this.synth = new Tone.MonoSynth({
            oscillator: {
                type: 'fmsine',  // FM sine for warmth
                modulationType: 'sine',
                modulationIndex: 1
            },
            envelope: {
                attack: 0.01,   // Fast attack for pluck
                decay: 0.3,
                sustain: 0.4,
                release: 0.8
            },
            filter: {
                Q: 2,
                type: 'lowpass',
                rolloff: -24
            },
            filterEnvelope: {
                attack: 0.01,
                decay: 0.2,
                sustain: 0.3,
                release: 0.5,
                baseFrequency: 200,
                octaves: 2.5
            }
        }).toDestination();

        this.synth.volume.value = this.volume;
        this.isReady = true;
        console.log('BassSound initialized');
    }

    /**
     * Get frequency for a note at a specific fret
     * @param {string} stringNote - Open string note (E, A, D, G)
     * @param {number} fret - Fret number (0-12)
     * @returns {number} Frequency in Hz
     */
    getFrequency(stringNote, fret) {
        // Get base frequency for the string
        let baseFreq = this.baseFrequencies[stringNote];

        // Adjust for string (A, D, G are higher octaves)
        if (stringNote === 'A') baseFreq = 55.00;
        if (stringNote === 'D') baseFreq = 73.42;
        if (stringNote === 'G') baseFreq = 98.00;

        // Apply fret offset
        return baseFreq * Math.pow(this.semitone, fret);
    }

    /**
     * Play a note
     * @param {string} note - Note name (E, F, F#, etc.)
     * @param {string} stringNote - Which string (E, A, D, G)
     * @param {number} fret - Fret number
     * @param {string} duration - Note duration (e.g., '8n', '4n')
     */
    play(note, stringNote = 'E', fret = 0, duration = '8n') {
        if (!this.isReady) {
            console.warn('BassSound not initialized. Call init() first.');
            return;
        }

        const freq = this.getFrequency(stringNote, fret);
        this.synth.triggerAttackRelease(freq, duration);
    }

    /**
     * Play a note by note name (finds best position automatically)
     * @param {string} note - Note name (E, F, F#, etc.)
     * @param {number} octave - Octave (1-3 for bass)
     * @param {string} duration - Note duration
     */
    playNote(note, octave = 2, duration = '8n') {
        if (!this.isReady) {
            console.warn('BassSound not initialized. Call init() first.');
            return;
        }

        // Calculate frequency
        const baseFreq = this.baseFrequencies[note];
        const freq = baseFreq * Math.pow(2, octave - 1);

        this.synth.triggerAttackRelease(freq, duration);
    }

    /**
     * Set volume
     * @param {number} db - Volume in decibels (-60 to 0)
     */
    setVolume(db) {
        this.volume = db;
        if (this.synth) {
            this.synth.volume.value = db;
        }
    }
}

// Global instance
const bassSound = new BassSound();
