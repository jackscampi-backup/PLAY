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

    // Setup BASSIST BPM controls (sync with main BPM)
    const bassBpmMinus = document.getElementById('bassBpmMinus');
    const bassBpmPlus = document.getElementById('bassBpmPlus');
    const bassBpmDisplay = document.getElementById('bassBpmDisplay');

    // Update BASSIST BPM display when main BPM changes
    const updateBassBpmDisplay = () => {
        if (bassBpmDisplay) {
            bassBpmDisplay.textContent = String(beatGen.bpm).padStart(3, '0');
        }
    };

    // Initial sync
    updateBassBpmDisplay();

    // Override setBPM to also update BASSIST display
    const originalSetBPM = beatGen.setBPM.bind(beatGen);
    beatGen.setBPM = (bpm) => {
        originalSetBPM(bpm);
        updateBassBpmDisplay();
    };

    // Setup BPM button with long press for BASSIST
    const setupBassBpmButton = (btn, delta) => {
        if (!btn) return;
        let interval = null;
        let timeout = null;
        let speed = 150;

        const startPress = () => {
            beatGen.adjustBpm(delta);
            speed = 150;
            timeout = setTimeout(() => {
                interval = setInterval(() => {
                    beatGen.adjustBpm(delta);
                    if (speed > 30) {
                        speed -= 20;
                        clearInterval(interval);
                        interval = setInterval(() => beatGen.adjustBpm(delta), speed);
                    }
                }, speed);
            }, 400);
        };

        const endPress = () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };

        btn.addEventListener('mousedown', startPress);
        btn.addEventListener('mouseup', endPress);
        btn.addEventListener('mouseleave', endPress);
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startPress();
        });
        btn.addEventListener('touchend', endPress);
    };

    setupBassBpmButton(bassBpmMinus, -1);
    setupBassBpmButton(bassBpmPlus, 1);

    // Keyboard shortcut per play/pause
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            beatGen.togglePlay();
        }
    });

    console.log('App pronta!');
    console.log('Scegli un genere e una variazione, poi premi Play');
});
