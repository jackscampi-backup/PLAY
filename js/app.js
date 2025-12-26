// DRUMMER - Main Application

document.addEventListener('DOMContentLoaded', () => {
    console.log('DRUMMER - Beat Generator per Bassisti');
    console.log('-------------------------------------');

    // Inizializza il beat generator
    const beatGen = new BeatGenerator();
    console.log('Beat Generator inizializzato');

    // Esponi globalmente per BASSIST sync
    window.beatGen = beatGen;

    // Inizializza melody generator
    const melodyGen = new MelodyGenerator();
    window.melodyGen = melodyGen;

    // Sync MELODY con DRUMMER pattern changes
    window.addEventListener('drummerPatternChange', (e) => {
        const pattern = PATTERNS[e.detail.pattern];
        melodyGen.syncToPattern(pattern);
    });

    // ===== GLOBAL AUDIO CONTROLS =====

    // Global notation toggle (ITA/ABC)
    const globalNotationToggle = document.getElementById('globalNotationToggle');
    let useItalianNotation = false;

    if (globalNotationToggle) {
        globalNotationToggle.addEventListener('click', () => {
            useItalianNotation = !useItalianNotation;
            globalNotationToggle.classList.toggle('active', useItalianNotation);

            // Update MELODY notation
            if (window.melodyGen) {
                window.melodyGen.useItalianNotation = useItalianNotation;
            }

            // Update BASSIST notation
            if (window.fretboard) {
                window.fretboard.useItalianNotes = useItalianNotation;
                window.fretboard.updateDisplay();
                if (window.fretboard.currentGroove) {
                    window.fretboard.displayGroove();
                }
                if (window.fretboard.melodySyncActive) {
                    window.fretboard.buildBassChordStrip();
                }
            }

            console.log('Global notation:', useItalianNotation ? 'ITA' : 'ABC');
        });
    }

    // Global melody sound type
    const melodyTypeGlobal = document.getElementById('melodyTypeGlobal');
    if (melodyTypeGlobal) {
        melodyTypeGlobal.addEventListener('change', (e) => {
            if (window.melodyGen) {
                window.melodyGen.selectInstrument(e.target.value);
            }
        });
    }

    // Global melody/piano volume
    const melodyVolumeGlobal = document.getElementById('melodyVolumeGlobal');
    if (melodyVolumeGlobal) {
        melodyVolumeGlobal.addEventListener('input', (e) => {
            if (window.melodyGen && window.melodyGen.volume) {
                const value = parseInt(e.target.value);
                // 0 = mute (-Infinity), otherwise -30 to +10 dB
                const vol = value === 0 ? -Infinity : (value / 100) * 40 - 30;
                window.melodyGen.volume.volume.value = vol;
            }
        });
    }

    // Global bass sound type
    const bassType = document.getElementById('bassType');
    if (bassType) {
        bassType.addEventListener('change', (e) => {
            if (window.fretboard) {
                window.fretboard.setBassType(e.target.value);
            }
        });
    }

    // Global bass volume
    const bassVolume = document.getElementById('bassVolume');
    if (bassVolume) {
        bassVolume.addEventListener('input', (e) => {
            if (window.fretboard) {
                window.fretboard.setBassVolume(e.target.value / 100);
            }
        });
    }

    console.log('App pronta!');
    console.log('Scegli un genere e una variazione, poi premi Play');
});
