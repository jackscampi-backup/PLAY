// BASSIST - Fretboard visualization

class Fretboard {
    constructor() {
        this.rootNote = 'E';
        this.currentScale = null;  // No scale selected initially
        this.numFrets = 12;
        this.fretMarkers = [3, 5, 7, 9, 12];  // Standard bass markers
        this.showIntervals = false;  // Show note names by default
        this.useItalianNotes = false;  // Use English notation by default
        this.showShape = false;  // Show only box shape when enabled
        this.shapeWidth = 4;  // Shape covers 4 frets (e.g., frets 0-3, or 5-8)
        this.showArpeggio = false;  // Show only chord tones (R, 3, 5, 7)

        // Autoplay state
        this.isPlaying = false;
        this.scaleSequence = null;
        this.currentNoteIndex = 0;

        // Groove state
        this.currentGroove = null;
        this.isPlayingGroove = false;
        this.grooveSequence = null;
        this.drumSequence = null;  // Simple drum accompaniment
        this.selectedCategory = null;  // null = all categories
        this.grooveModeActive = false;  // Whether groove panel is visible

        this.init();
    }

    // Find the lowest fret where root appears on E string (or closest)
    getRootFret() {
        const rootIndex = NOTES.indexOf(this.rootNote);
        const eIndex = NOTES.indexOf('E');
        // Calculate fret on E string where root appears
        let fret = (rootIndex - eIndex + 12) % 12;
        return fret;
    }

    // Calculate semitone offset from E to current root
    getRootOffset() {
        const rootIndex = NOTES.indexOf(this.rootNote);
        const eIndex = NOTES.indexOf('E');
        return (rootIndex - eIndex + 12) % 12;
    }

    // Transpose a groove step by semitones
    transposeStep(step, semitones) {
        if (!step) return null;

        const stringPitches = { 'E': 0, 'A': 5, 'D': 10, 'G': 15 };
        const strings = ['E', 'A', 'D', 'G'];

        // Calculate current absolute pitch
        const currentPitch = stringPitches[step.s] + step.f;

        // Add offset
        const newPitch = currentPitch + semitones;

        // Find best string/fret combination (prefer staying within frets 0-12)
        for (let i = strings.length - 1; i >= 0; i--) {
            const stringPitch = stringPitches[strings[i]];
            const fret = newPitch - stringPitch;
            if (fret >= 0 && fret <= 12) {
                return { s: strings[i], f: fret };
            }
        }

        // Fallback: use E string
        const fret = Math.max(0, Math.min(12, newPitch));
        return { s: 'E', f: fret };
    }

    // Get transposed groove steps based on current root
    getTransposedGrooveSteps() {
        if (!this.currentGroove) return [];

        const offset = this.getRootOffset();
        return this.currentGroove.steps.map(step => this.transposeStep(step, offset));
    }

    // Check if a fret is within the current shape
    isInShape(fret) {
        if (!this.showShape) return true;  // If shape mode off, all frets are valid

        const rootFret = this.getRootFret();
        // Shape starts 1 fret before root (if possible) and extends shapeWidth frets
        const shapeStart = Math.max(0, rootFret - 1);
        const shapeEnd = shapeStart + this.shapeWidth;

        return fret >= shapeStart && fret <= shapeEnd;
    }

    init() {
        this.renderRootButtons();
        this.renderScaleButtons();
        this.renderFretboard();
        this.renderGrooveCategories();
        this.renderGrooveSelect();
        this.renderGroovePatternDisplay();
        this.updateDisplay();
        this.updateGrooveSectionState();  // Start with groove section disabled

        // Listen for DRUMMER pattern changes to auto-resync
        window.addEventListener('drummerPatternChange', (e) => {
            if (this.isPlaying) {
                console.log('BASSIST: Auto-resync to pattern:', e.detail.pattern);
                this.stopPlay();
                this.startPlay();
            }
        });

        // Listen for DRUMMER genre changes to reset fretboard
        window.addEventListener('drummerGenreChange', () => {
            this.clearFretboard();
        });
    }

    /**
     * Render the 16-step groove pattern display (same structure as DRUMMER)
     */
    renderGroovePatternDisplay() {
        const container = document.getElementById('grooveStepRow');
        if (!container) return;

        container.innerHTML = '';

        // Create 4 beat groups, each with 4 steps (same as DRUMMER)
        for (let beat = 0; beat < 4; beat++) {
            const beatGroup = document.createElement('div');
            beatGroup.className = 'beat-group-steps';

            for (let s = 0; s < 4; s++) {
                const stepIndex = beat * 4 + s;
                const step = document.createElement('div');
                step.className = 'step';
                step.dataset.step = stepIndex;
                beatGroup.appendChild(step);
            }
            container.appendChild(beatGroup);
        }
    }

    /**
     * Update groove pattern display when a groove is selected
     */
    updateGroovePatternDisplay() {
        const steps = document.querySelectorAll('#grooveStepRow .step');

        // Clear all
        steps.forEach(step => {
            step.classList.remove('active', 'playing');
        });

        if (!this.currentGroove) return;

        // Mark active steps (where there's a note)
        const grooveSteps = this.currentGroove.steps;
        const stepsPerBar = 16;

        // Only show first bar in display
        for (let i = 0; i < Math.min(stepsPerBar, grooveSteps.length); i++) {
            if (grooveSteps[i] !== null) {
                const stepEl = document.querySelector(`#grooveStepRow .step[data-step="${i}"]`);
                if (stepEl) stepEl.classList.add('active');
            }
        }
    }

    /**
     * Highlight current step in groove pattern display
     */
    highlightGrooveStep(stepIndex) {
        const steps = document.querySelectorAll('#grooveStepRow .step');
        steps.forEach(step => step.classList.remove('playing'));

        // Show step within first bar (modulo 16)
        const displayStep = stepIndex % 16;
        const stepEl = document.querySelector(`#grooveStepRow .step[data-step="${displayStep}"]`);
        if (stepEl) stepEl.classList.add('playing');

        // Update beat counter
        this.updateGrooveBeatCounter(displayStep);
    }

    /**
     * Update beat counter in groove display
     */
    updateGrooveBeatCounter(step) {
        const beat = Math.floor(step / 4) + 1;

        document.querySelectorAll('#groovePatternDisplay .beat-num').forEach(beatEl => {
            const beatNum = parseInt(beatEl.dataset.beat);
            beatEl.classList.toggle('active', beatNum === beat);
        });
    }

    /**
     * Clear groove pattern display
     */
    clearGroovePatternDisplay() {
        document.querySelectorAll('#grooveStepRow .step').forEach(step => {
            step.classList.remove('active', 'playing');
        });
        document.querySelectorAll('#groovePatternDisplay .beat-num').forEach(beat => {
            beat.classList.remove('active');
        });
    }

    /**
     * Clear all highlights from fretboard (reset to neutral state)
     */
    clearFretboard() {
        // Remove all highlight classes
        document.querySelectorAll('.note').forEach(note => {
            note.classList.remove('playing', 'riff-note');
        });

        // Stop any playback
        if (this.isPlaying) {
            this.stopPlay();
        }
        if (this.isPlayingGroove) {
            this.stopGroovePlay();
        }

        // Reset groove selection
        this.currentGroove = null;
        const select = document.getElementById('grooveSelect');
        if (select) select.value = '';

        // Re-apply scale display (keeps root/scale but clears groove highlights)
        this.updateDisplay();
    }

    // Get note display name based on notation setting
    getDisplayNote(note) {
        return this.useItalianNotes ? noteToItalian(note) : note;
    }

    renderRootButtons() {
        const container = document.getElementById('rootButtons');
        if (!container) return;

        container.innerHTML = '';
        NOTES.forEach(note => {
            const btn = document.createElement('button');
            btn.className = 'root-btn';
            btn.textContent = this.getDisplayNote(note);
            btn.dataset.note = note;
            if (note === this.rootNote) btn.classList.add('active');
            btn.addEventListener('click', () => this.selectRoot(note));
            container.appendChild(btn);
        });
    }

    renderScaleButtons() {
        const container = document.getElementById('scaleButtons');
        if (!container) return;

        container.innerHTML = '';
        Object.entries(SCALES).forEach(([key, scale]) => {
            const btn = document.createElement('button');
            btn.className = 'scale-btn';
            btn.textContent = scale.name;
            btn.dataset.scale = key;
            if (key === this.currentScale) btn.classList.add('active');
            btn.addEventListener('click', () => this.selectScale(key));
            container.appendChild(btn);
        });
    }

    renderFretboard() {
        const container = document.getElementById('fretboard');
        if (!container) return;

        container.innerHTML = '';

        // Fret numbers header
        const fretNumbers = document.createElement('div');
        fretNumbers.className = 'fret-numbers';
        for (let fret = 0; fret <= this.numFrets; fret++) {
            const num = document.createElement('div');
            num.className = 'fret-num';
            num.textContent = fret;
            fretNumbers.appendChild(num);
        }
        container.appendChild(fretNumbers);

        // Strings (from high G to low E for visual display)
        const stringsReversed = [...BASS_TUNING].reverse();
        stringsReversed.forEach((stringNote, stringIndex) => {
            const stringRow = document.createElement('div');
            stringRow.className = 'string-row';

            // String label
            const label = document.createElement('div');
            label.className = 'string-label';
            label.dataset.note = stringNote;
            label.textContent = this.getDisplayNote(stringNote);
            stringRow.appendChild(label);

            // Frets
            const fretsContainer = document.createElement('div');
            fretsContainer.className = 'frets-container';

            for (let fret = 0; fret <= this.numFrets; fret++) {
                const fretDiv = document.createElement('div');
                fretDiv.className = 'fret';
                if (fret === 0) fretDiv.classList.add('nut');
                if (this.fretMarkers.includes(fret)) fretDiv.classList.add('marker');

                const note = getNoteAtFret(stringNote, fret);
                const noteDiv = document.createElement('div');
                noteDiv.className = 'note';
                noteDiv.dataset.note = note;
                noteDiv.dataset.string = stringNote;
                noteDiv.dataset.fret = fret;
                noteDiv.textContent = note;

                // Click to play sound
                noteDiv.addEventListener('click', () => this.playNote(stringNote, fret));

                fretDiv.appendChild(noteDiv);
                fretsContainer.appendChild(fretDiv);
            }

            stringRow.appendChild(fretsContainer);
            container.appendChild(stringRow);
        });

        // Fret markers row
        const markersRow = document.createElement('div');
        markersRow.className = 'markers-row';
        for (let fret = 0; fret <= this.numFrets; fret++) {
            const markerDiv = document.createElement('div');
            markerDiv.className = 'marker-dot-container';
            if (this.fretMarkers.includes(fret)) {
                const dot = document.createElement('div');
                dot.className = 'marker-dot';
                if (fret === 12) dot.classList.add('double');
                markerDiv.appendChild(dot);
            }
            markersRow.appendChild(markerDiv);
        }
        container.appendChild(markersRow);
    }

    selectRoot(note) {
        this.rootNote = note;

        // Update button states
        document.querySelectorAll('.root-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.note === note);
        });

        // Clear fretboard highlights before updating
        this.clearPlayingHighlights();

        this.updateDisplay();

        // Update groove display if one is selected
        if (this.currentGroove) {
            this.displayGroove();
        }

        // Resync groove or scale playback with new root
        this.resyncIfPlaying();
        this.resyncGrooveIfPlaying();
    }

    /**
     * Resync groove playback if currently playing (when root changes)
     */
    resyncGrooveIfPlaying() {
        if (this.isPlayingGroove) {
            console.log('BASSIST: Resync groove to new root:', this.rootNote);
            this.stopGroovePlay();
            this.startGroovePlay();
        }
    }

    /**
     * Clear only playing highlights (not groove/scale notes)
     */
    clearPlayingHighlights() {
        document.querySelectorAll('.note.playing').forEach(note => {
            note.classList.remove('playing');
        });
    }

    selectScale(scaleKey) {
        // Toggle: if clicking same scale, deselect it
        if (this.currentScale === scaleKey) {
            this.currentScale = null;
        } else {
            this.currentScale = scaleKey;
        }

        // Update button states
        document.querySelectorAll('.scale-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.scale === this.currentScale);
        });

        // Clear playing highlights before updating
        this.clearPlayingHighlights();

        this.updateDisplay();
        this.resyncIfPlaying();
    }

    updateDisplay() {
        // Get notes to display based on arpeggio mode (empty if no scale selected)
        const scaleNotes = this.currentScale
            ? (this.showArpeggio
                ? getArpeggioNotes(this.rootNote, this.currentScale)
                : getScaleNotes(this.rootNote, this.currentScale))
            : [];

        document.querySelectorAll('.note').forEach(noteDiv => {
            const note = noteDiv.dataset.note;
            const fret = parseInt(noteDiv.dataset.fret);
            const inShape = this.isInShape(fret);

            // Reset classes
            noteDiv.classList.remove('in-scale', 'root', 'out-of-shape', 'in-arpeggio');

            // If no scale selected, show nothing
            if (!this.currentScale) {
                noteDiv.textContent = this.getDisplayNote(note);
                return;
            }

            // Check if note is in scale/arpeggio AND in shape (if shape mode is on)
            const isNoteRoot = isRoot(note, this.rootNote);
            const isNoteInScale = scaleNotes.includes(note);

            if (isNoteRoot && inShape) {
                noteDiv.classList.add('root');
                noteDiv.textContent = this.showIntervals ? 'R' : this.getDisplayNote(note);
            } else if (isNoteInScale && inShape) {
                noteDiv.classList.add(this.showArpeggio ? 'in-arpeggio' : 'in-scale');
                if (this.showIntervals) {
                    const interval = this.showArpeggio
                        ? getArpeggioIntervalName(note, this.rootNote, this.currentScale)
                        : getIntervalName(note, this.rootNote, this.currentScale);
                    noteDiv.textContent = interval || this.getDisplayNote(note);
                } else {
                    noteDiv.textContent = this.getDisplayNote(note);
                }
            } else if ((isNoteRoot || isNoteInScale) && !inShape) {
                // Note is in scale but outside shape - dim it
                noteDiv.classList.add('out-of-shape');
                noteDiv.textContent = this.getDisplayNote(note);
            } else {
                // Not in scale
                noteDiv.textContent = this.getDisplayNote(note);
            }
        });

        // Update string labels
        document.querySelectorAll('.string-label').forEach(label => {
            const note = label.dataset.note;
            if (note) {
                label.textContent = this.getDisplayNote(note);
            }
        });

        // Update root buttons
        document.querySelectorAll('.root-btn').forEach(btn => {
            const note = btn.dataset.note;
            if (note) {
                btn.textContent = this.getDisplayNote(note);
            }
        });

        // Update toggle button state (LED on = intervals, LED off = notes)
        const toggleBtn = document.getElementById('displayToggle');
        if (toggleBtn) {
            toggleBtn.classList.toggle('active', this.showIntervals);
        }

        // Update notation toggle button state
        const notationBtn = document.getElementById('notationToggle');
        if (notationBtn) {
            notationBtn.classList.toggle('active', this.useItalianNotes);
        }

        // Update shape toggle button state
        const shapeBtn = document.getElementById('shapeToggle');
        if (shapeBtn) {
            shapeBtn.classList.toggle('active', this.showShape);
        }

        // Update arpeggio toggle button state
        const arpBtn = document.getElementById('arpToggle');
        if (arpBtn) {
            arpBtn.classList.toggle('active', this.showArpeggio);
        }
    }

    toggleDisplay() {
        this.showIntervals = !this.showIntervals;
        this.updateDisplay();
    }

    toggleNotation() {
        this.useItalianNotes = !this.useItalianNotes;
        this.updateDisplay();
    }

    toggleShape() {
        this.showShape = !this.showShape;
        this.updateDisplay();
        this.resyncIfPlaying();
    }

    toggleArpeggio() {
        this.showArpeggio = !this.showArpeggio;
        this.updateDisplay();
        this.resyncIfPlaying();
    }

    /**
     * Toggle groove mode (switches PLAY button behavior)
     */
    toggleGrooveMode() {
        this.grooveModeActive = !this.grooveModeActive;

        const grooveToggle = document.getElementById('grooveToggle');
        if (grooveToggle) {
            grooveToggle.classList.toggle('active', this.grooveModeActive);
        }

        // Enable/disable groove section controls
        this.updateGrooveSectionState();

        // If deactivating groove mode and playing groove, stop it
        if (!this.grooveModeActive && this.isPlayingGroove) {
            this.stopGroovePlay();
        }

        // Clear groove selection and reset select when deactivating
        if (!this.grooveModeActive) {
            this.currentGroove = null;
            const select = document.getElementById('grooveSelect');
            if (select) select.value = '';
            // Clear groove notes from fretboard
            document.querySelectorAll('.note.riff-note').forEach(n => {
                n.classList.remove('riff-note');
            });
            this.updateDisplay();
        }
    }

    /**
     * Update groove section enabled/disabled state based on grooveModeActive
     */
    updateGrooveSectionState() {
        const grooveSection = document.querySelector('.groove-section');
        if (grooveSection) {
            grooveSection.classList.toggle('disabled', !this.grooveModeActive);
        }

        // Reset category buttons active state when disabled
        if (!this.grooveModeActive) {
            document.querySelectorAll('.groove-cat-btn').forEach(btn => {
                btn.classList.remove('active');
            });
        } else {
            // When enabling, set ALL as active (or current category)
            document.querySelectorAll('.groove-cat-btn').forEach(btn => {
                const isAll = !btn.dataset.category;
                const isMatch = isAll ? !this.selectedCategory : btn.dataset.category === this.selectedCategory;
                btn.classList.toggle('active', isMatch);
            });
        }
    }

    /**
     * Resync autoplay if currently playing (when scale/root/options change)
     */
    resyncIfPlaying() {
        if (this.isPlaying) {
            console.log('BASSIST: Resync due to scale/option change');
            this.stopPlay();
            this.startPlay();
        }
    }

    /**
     * Play a note on the bass
     * @param {string} stringNote - Which string (E, A, D, G)
     * @param {number} fret - Fret number
     */
    async playNote(stringNote, fret) {
        // Initialize sound on first click (required by browsers)
        if (!bassSound.isReady) {
            await bassSound.init();
        }
        bassSound.play(null, stringNote, fret, '8n');
    }

    /**
     * Build array of scale notes to play across all 4 strings in box position
     * Returns array of {string, fret, note} objects ordered low to high
     */
    buildScaleNotes() {
        if (!this.currentScale) return [];  // No scale selected

        const notes = [];
        const scaleNotes = this.showArpeggio
            ? getArpeggioNotes(this.rootNote, this.currentScale)
            : getScaleNotes(this.rootNote, this.currentScale);

        // Strings from low to high
        const strings = ['E', 'A', 'D', 'G'];

        // Always use box position for playback (realistic fingering)
        const rootFret = this.getRootFret();
        const boxStart = Math.max(0, rootFret - 1);
        const boxEnd = boxStart + this.shapeWidth;

        // Traverse all strings, collecting scale notes within box
        for (const string of strings) {
            for (let fret = boxStart; fret <= boxEnd; fret++) {
                const noteAtFret = getNoteAtFret(string, fret);
                if (scaleNotes.includes(noteAtFret)) {
                    notes.push({
                        string: string,
                        fret: fret,
                        note: noteAtFret
                    });
                }
            }
        }

        // Sort by pitch (string index * 5 semitones + fret)
        const stringIndex = { 'E': 0, 'A': 5, 'D': 10, 'G': 15 };
        notes.sort((a, b) => {
            const pitchA = stringIndex[a.string] + a.fret;
            const pitchB = stringIndex[b.string] + b.fret;
            return pitchA - pitchB;
        });

        return notes;
    }

    /**
     * Highlight a note on the fretboard during playback
     */
    highlightPlayingNote(noteInfo) {
        // Remove previous highlight
        document.querySelectorAll('.note.playing').forEach(el => {
            el.classList.remove('playing');
        });

        if (noteInfo) {
            // Find and highlight the current note
            const noteEl = document.querySelector(
                `.note[data-string="${noteInfo.string}"][data-fret="${noteInfo.fret}"]`
            );
            if (noteEl) {
                noteEl.classList.add('playing');
            }
        }
    }

    /**
     * Toggle autoplay (scale or groove depending on mode)
     */
    async togglePlay() {
        // Initialize sound if needed
        if (!bassSound.isReady) {
            await bassSound.init();
        }

        // If groove mode active and a groove is selected, play groove
        if (this.grooveModeActive && this.currentGroove) {
            if (this.isPlayingGroove) {
                this.stopGroovePlay();
            } else {
                this.startGroovePlay();
            }
        } else {
            // Otherwise play scale
            if (this.isPlaying) {
                this.stopPlay();
            } else {
                this.startPlay();
            }
        }
    }

    startPlay() {
        console.log('BASSIST: startPlay() called');

        const scaleNotes = this.buildScaleNotes();
        console.log('BASSIST: scaleNotes =', scaleNotes);
        if (scaleNotes.length === 0) {
            console.warn('BASSIST: No scale notes to play!');
            alert('Select a scale first!');
            return;
        }

        // Get current DRUMMER pattern for kick sync
        console.log('BASSIST: window.beatGen =', window.beatGen);
        console.log('BASSIST: typeof window.beatGen =', typeof window.beatGen);
        if (window.beatGen) {
            console.log('BASSIST: beatGen.currentPattern =', window.beatGen.currentPattern);
            console.log('BASSIST: beatGen keys =', Object.keys(window.beatGen));
        }

        if (!window.beatGen) {
            console.warn('BASSIST: beatGen not found on window');
            alert('Errore: beatGen non trovato!');
            return;
        }

        if (!window.beatGen.currentPattern) {
            console.warn('BASSIST: No DRUMMER pattern selected');
            alert('Seleziona un pattern in DRUMMER prima!\n(currentPattern = ' + window.beatGen.currentPattern + ')');
            return;
        }

        const pattern = PATTERNS[window.beatGen.currentPattern];
        console.log('BASSIST: pattern =', pattern);

        if (!pattern || !pattern.kick) {
            console.warn('BASSIST: Pattern has no kick array');
            alert('Pattern senza kick!');
            return;
        }

        this.isPlaying = true;
        this.currentNoteIndex = 0;

        // Update button state
        const btn = document.getElementById('scalePlayBtn');
        if (btn) btn.classList.add('active');

        // Determine step duration based on time signature
        const timeSignature = pattern.timeSignature || '4/4';
        let stepDuration = '16n';  // Default: 16th notes for 4/4
        if (timeSignature === '12/8') stepDuration = '8t';  // Triplet 8ths
        if (timeSignature === '6/8') stepDuration = '8n';

        // Get total steps (handle multi-bar patterns)
        const bars = pattern.bars || 1;
        const kickArray = pattern.kick;
        const totalSteps = kickArray.length;

        // Create sequence synced with kick pattern
        this.scaleSequence = new Tone.Sequence(
            (time, step) => {
                // Check if kick hits on this step
                if (kickArray[step] === 1) {
                    const noteInfo = scaleNotes[this.currentNoteIndex % scaleNotes.length];

                    // Play the note
                    bassSound.play(null, noteInfo.string, noteInfo.fret, '8n');

                    // Highlight on the UI (use Draw for visual sync)
                    Tone.Draw.schedule(() => {
                        this.highlightPlayingNote(noteInfo);
                    }, time);

                    // Advance to next scale note
                    this.currentNoteIndex++;
                }
            },
            // Array of step indices
            [...Array(totalSteps).keys()],
            stepDuration
        );

        this.scaleSequence.loop = true;
        this.scaleSequence.start(0);

        // Start transport if not already running
        if (Tone.Transport.state !== 'started') {
            Tone.Transport.start();
        }
    }

    stopPlay() {
        this.isPlaying = false;

        // Update button state
        const btn = document.getElementById('scalePlayBtn');
        if (btn) btn.classList.remove('active');

        // Stop and dispose sequence
        if (this.scaleSequence) {
            this.scaleSequence.stop();
            this.scaleSequence.dispose();
            this.scaleSequence = null;
        }

        // Clear highlight
        this.highlightPlayingNote(null);
    }

    // ==================== GROOVE METHODS ====================

    /**
     * Render category filter buttons
     */
    renderGrooveCategories() {
        const container = document.getElementById('grooveCategories');
        if (!container) return;

        container.innerHTML = '';

        // Add "ALL" button (no active class - starts disabled)
        const allBtn = document.createElement('button');
        allBtn.className = 'groove-cat-btn';
        allBtn.textContent = 'ALL';
        allBtn.onclick = () => this.filterByCategory(null);
        container.appendChild(allBtn);

        // Add category buttons
        Object.entries(GROOVE_CATEGORIES).forEach(([key, cat]) => {
            const btn = document.createElement('button');
            btn.className = 'groove-cat-btn';
            btn.textContent = cat.name;
            btn.dataset.category = key;
            btn.onclick = () => this.filterByCategory(key);
            container.appendChild(btn);
        });
    }

    /**
     * Filter grooves by category
     */
    filterByCategory(category) {
        this.selectedCategory = category;

        // Update button states
        document.querySelectorAll('.groove-cat-btn').forEach(btn => {
            const isAll = !btn.dataset.category;
            const isMatch = isAll ? !category : btn.dataset.category === category;
            btn.classList.toggle('active', isMatch);
        });

        // Re-render select
        this.renderGrooveSelect();
    }

    /**
     * Populate the groove dropdown
     */
    renderGrooveSelect() {
        const select = document.getElementById('grooveSelect');
        if (!select) return;

        select.innerHTML = '<option value="">-- Select Groove --</option>';

        const grooves = this.selectedCategory
            ? getGroovesByCategory(this.selectedCategory)
            : getAllGrooves();

        grooves.forEach(groove => {
            const option = document.createElement('option');
            option.value = groove.id;
            const stars = '★'.repeat(groove.difficulty);
            // Format: NAME - desc - BPM - ★★
            option.textContent = `${groove.name} - ${groove.description} - ${groove.bpm} BPM - ${stars}`;
            select.appendChild(option);
        });
    }

    /**
     * Select a groove and display it
     */
    selectGroove(grooveId) {
        // Clear previous groove highlights first
        document.querySelectorAll('.note.riff-note, .note.playing').forEach(note => {
            note.classList.remove('riff-note', 'playing');
        });

        // Stop playback if running
        if (this.isPlayingGroove) {
            this.stopGroovePlay();
        }

        if (!grooveId) {
            this.currentGroove = null;
            this.updateDisplay();
            this.clearGroovePatternDisplay();
            return;
        }

        this.currentGroove = getGroove(grooveId);
        if (this.currentGroove) {
            console.log('BASSIST: Selected groove:', this.currentGroove.name);
            this.displayGroove();
            this.updateGroovePatternDisplay();
        }
    }

    /**
     * Select random groove
     */
    randomGroove() {
        const groove = getRandomGroove(this.selectedCategory);
        if (groove) {
            const select = document.getElementById('grooveSelect');
            if (select) select.value = groove.id;
            this.selectGroove(groove.id);
        }
    }

    /**
     * Display groove notes on fretboard (transposed to current root)
     */
    displayGroove() {
        if (!this.currentGroove) return;

        // Clear previous highlights
        document.querySelectorAll('.note').forEach(n => {
            n.classList.remove('in-scale', 'root', 'in-arpeggio', 'riff-note');
        });

        // Get transposed steps
        const transposedSteps = this.getTransposedGrooveSteps();

        // Highlight all notes used in this groove
        const usedNotes = new Set();
        transposedSteps.forEach(step => {
            if (step) {
                usedNotes.add(`${step.s}-${step.f}`);
            }
        });

        usedNotes.forEach(key => {
            const [string, fret] = key.split('-');
            const noteEl = document.querySelector(`.note[data-string="${string}"][data-fret="${fret}"]`);
            if (noteEl) {
                noteEl.classList.add('riff-note');
            }
        });
    }

    /**
     * Start playing current groove
     */
    startGroovePlay() {
        if (!this.currentGroove) {
            alert('Select a groove first!');
            return;
        }

        this.isPlayingGroove = true;

        const btn = document.getElementById('scalePlayBtn');
        if (btn) btn.classList.add('active');

        // Sync with DRUMMER if playing, otherwise use groove's BPM
        if (window.beatGen && window.beatGen.isPlaying) {
            // DRUMMER is playing - it controls the tempo
            console.log('BASSIST: Syncing with DRUMMER at', Tone.Transport.bpm.value, 'BPM');
        } else {
            // DRUMMER not playing - use groove's BPM
            Tone.Transport.bpm.value = this.currentGroove.bpm;
            console.log('BASSIST: Using groove BPM:', this.currentGroove.bpm);
        }

        // Get transposed steps based on current root
        const steps = this.getTransposedGrooveSteps();
        const totalSteps = steps.length;

        this.grooveSequence = new Tone.Sequence(
            (time, stepIndex) => {
                const step = steps[stepIndex];
                if (step) {
                    bassSound.play(null, step.s, step.f, '16n');
                    Tone.Draw.schedule(() => {
                        this.highlightGrooveNote(step);
                        this.highlightGrooveStep(stepIndex);
                    }, time);
                } else {
                    Tone.Draw.schedule(() => {
                        this.highlightGrooveNote(null);
                        this.highlightGrooveStep(stepIndex);
                    }, time);
                }
            },
            [...Array(totalSteps).keys()],
            '16n'
        );

        this.grooveSequence.loop = true;
        this.grooveSequence.start(0);

        // Add simple drum accompaniment if DRUMMER not playing
        if (!window.beatGen || !window.beatGen.isPlaying) {
            this.startDrumAccompaniment();
        }

        if (Tone.Transport.state !== 'started') {
            Tone.Transport.start();
        }
    }

    /**
     * Start simple drum accompaniment for groove
     * Basic beat: kick on 1,3 - snare on 2,4 - hihat on 8ths
     */
    async startDrumAccompaniment() {
        // Make sure Tone.js is started
        await Tone.start();

        // Use beatGen's synths if available
        if (!window.beatGen) return;
        if (!window.beatGen.kick) return;

        console.log('BASSIST: Starting drum accompaniment');

        // Simple 16-step pattern (1 bar of 16th notes)
        // Kick: 1 and 3 (steps 0, 8)
        // Snare: 2 and 4 (steps 4, 12)
        // Hihat: every 8th (steps 0, 2, 4, 6, 8, 10, 12, 14)
        const pattern = {
            kick:  [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
            snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
            hihat: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0]
        };

        const bg = window.beatGen;

        this.drumSequence = new Tone.Sequence(
            (time, step) => {
                if (pattern.kick[step] && bg.kick) {
                    bg.kick.triggerAttackRelease('C1', '8n', time);
                }
                if (pattern.snare[step] && bg.snare) {
                    bg.snare.triggerAttackRelease('8n', time);
                }
                if (pattern.hihat[step] && bg.hihat) {
                    bg.hihat.triggerAttackRelease('16n', time);
                }
            },
            [...Array(16).keys()],
            '16n'
        );

        this.drumSequence.loop = true;
        this.drumSequence.start(0);
    }

    /**
     * Stop groove playback
     */
    stopGroovePlay() {
        this.isPlayingGroove = false;

        const btn = document.getElementById('scalePlayBtn');
        if (btn) btn.classList.remove('active');

        if (this.grooveSequence) {
            this.grooveSequence.stop();
            this.grooveSequence.dispose();
            this.grooveSequence = null;
        }

        // Stop drum accompaniment
        if (this.drumSequence) {
            this.drumSequence.stop();
            this.drumSequence.dispose();
            this.drumSequence = null;
        }

        this.highlightGrooveNote(null);

        // Clear playing highlight but keep active notes
        document.querySelectorAll('#grooveStepRow .step').forEach(step => {
            step.classList.remove('playing');
        });
        document.querySelectorAll('#groovePatternDisplay .beat-num').forEach(beat => {
            beat.classList.remove('active');
        });
    }

    /**
     * Highlight current groove note
     */
    highlightGrooveNote(step) {
        document.querySelectorAll('.note.playing').forEach(el => {
            el.classList.remove('playing');
        });

        if (step) {
            const noteEl = document.querySelector(
                `.note[data-string="${step.s}"][data-fret="${step.f}"]`
            );
            if (noteEl) {
                noteEl.classList.add('playing');
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.fretboard = new Fretboard();
});
