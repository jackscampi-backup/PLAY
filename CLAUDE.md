# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DRUMMER is a browser-based drum beat generator for bass practice. It includes:
- **MIXER** - Audio mixer with volume faders and sound presets
- **DRUMMER** - Drum machine with 64 patterns across 8 genres
- **PIANO** - Chord progressions and melodic accompaniment
- **BASSIST** - 4-string fretboard with scales, arpeggios, and grooves

Uses Tone.js to synthesize all sounds in real-time - no audio files needed. Works offline by opening `index.html` directly.

## Development

No build process required. Open `index.html` in a browser to run.

For development with live reload:
```bash
npx live-server
```

## Architecture

### Core Files

- **index.html** - Main HTML structure (4 rack units)
- **css/style.css** - Vintage rack/flycase styling (dark theme, LED effects)
- **js/patterns.js** - Drum pattern definitions and genre configuration
- **js/beatgen.js** - `BeatGenerator` class for drum sequencing
- **js/scales.js** - Scale definitions (major, minor, pentatonic, etc.)
- **js/sounds.js** - Bass sound synthesis
- **js/riffs.js** - Groove patterns for bass (GROOVES library)
- **js/fretboard.js** - `Fretboard` class for bass visualization and playback
- **js/melody-gen.js** - `MelodyGenerator` class for chord progressions
- **js/app.js** - Entry point

### DRUMMER (Drum Machine)

- 8 genres: Rock, Pop, Funk, Blues, Jazz, Latin, Electronic, World
- 8 patterns per genre (64 total)
- Supports 4/4, 12/8, 6/8 time signatures
- Multi-bar patterns (2 or 4 bars)
- Per-instrument mute and volume
- AUTO mode applies genre-specific sound presets

### BASSIST (Fretboard)

- 12 root notes (chromatic)
- 5 scales: Major, Minor, Pentatonic, Blues, Dorian
- View modes: Scale degrees, Intervals, Arpeggio, Box shape
- GROOVES mode: Practice patterns that sync with DRUMMER
- Transposition: Grooves follow selected root

### PIANO (Accompaniment)

- Chord progressions synced with DRUMMER
- CHORDS mode: plays chord progressions (I-IV-V, etc.)
- MELODY mode: generates melodies in artist styles
- Octave control for pitch range

### Data Formats

**Drum Pattern:**
```javascript
{
    name: 'Pattern Name',
    genre: 'Rock',
    bpm: 120,
    timeSignature: '4/4',  // or '12/8', '6/8'
    bars: 1,  // or 2, 4
    kick:  [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0],
    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
    hihat: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0]
}
```

**Bass Groove:**
```javascript
{
    id: 'groove-id',
    name: 'Groove Name',
    category: 'root',  // root, octave, penta, walking, funk
    bpm: 100,
    bars: 1,
    steps: [
        {s:'E',f:0}, null, null, null,  // s=string, f=fret, null=rest
        {s:'A',f:2}, null, null, null,
        // ... 16 steps per bar
    ]
}
```

### Adding Content

**New drum pattern:** Add to `PATTERNS` in `js/patterns.js`, add key to `GENRES`

**New groove:** Add to `GROOVES` in `js/riffs.js`, categorize appropriately

### Styling

Vintage rack/flycase aesthetic:
- Dark background (#1a1a1a)
- Orange displays (#ff6600)
- Green LEDs for active states
- Hardware-style buttons with bevels
- Monospace fonts (Share Tech Mono, Oswald)
