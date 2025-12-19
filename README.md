# DRUMMER + MELODY + BASSIST

Suite di strumenti web per bassisti - Drum machine + Accompagnamento armonico + Visualizzatore scale in stile rack/flycase.

**[Prova online](https://jackscampi-backup.github.io/Drummer)**

## Descrizione

Tre moduli integrati per esercitarsi al basso:

1. **DRUMMER** - Genera pattern di batteria in tempo reale usando Tone.js
2. **MELODY** - Accompagnamento armonico con progressioni di accordi
3. **BASSIST** - Visualizza scale, arpeggi, grooves e box position sulla tastiera del basso

Interfaccia in stile **rack unit da tour flycase** con quattro moduli:
- **DRUMMER** - Selezione generi e pattern
- **AUDIO** - Controllo suoni e mixer
- **MELODY** - Progressioni di accordi sincronizzate
- **BASSIST** - Tastiera basso interattiva (full-width)

Design hardware professionale:
- Display LED arancione (font DSEG7 a 7 segmenti)
- Etichette stile Dymo sui bottoni
- LED verdi per selezione attiva
- Viti angolari decorative
- Slider e controlli stile mixer

## Funzionalita'

### Modulo DRUMMER
- **8 generi musicali** con **64+ pattern totali**
- **Pattern multi-battuta**: supporto per 1, 2 o 4 battute con variazioni e fill
- **Tempi composti**: supporto nativo per 12/8 e 6/8 (terzine vere!)
- Visualizzazione pattern step sequencer (griglia dinamica)
- Beat counter visivo (1-2-3-4)
- **Bar indicator**: LED che mostrano la battuta corrente nei pattern multi-bar
- Shortcut tastiera: Spazio per Play/Pause
- Bottone play con LED di stato

### Modulo AUDIO
- **AUTO mode**: regola automaticamente i preset audio in base al genere
- **BPM**: controllo tempo con +/- e input diretto (40-220)
- **Master Volume**: volume generale
- **Vinyl**: loop di crackle per atmosfera lo-fi/vintage
- **Per ogni strumento** (Kick, Snare, Hi-Hat):
  - Type: seleziona il tipo di suono
  - Vol: volume individuale
  - Decay: durata del suono (si sincronizza col preset)

### Tipi di Suono

**Kick:**
- Deep - basso profondo con punch
- Punchy - attacco veloce e definito
- 808 - sub bass lungo stile trap
- Acoustic - suono naturale

**Snare:**
- Tight - corto e snappy
- Fat - piu' corpo e riverbero
- Rim - metallico, meno noise
- Clap - aperto e largo

**Hi-Hat:**
- Closed - corto e secco
- Open - lungo e sostenuto
- Shaker - morbido e filtrato
- Ride - metallico con coda

## Generi e Pattern

| Genere | Pattern | Note |
|--------|---------|------|
| **Rock** | Basic*, Hard, Pop, Half-Time, Shuffle†, Punk, Ballad, Fill** | *2 bars, **4 bars, †12/8 |
| **Pop** | Basic, Disco, Ballad†, Upbeat, Motown, Synthpop, Funk, Modern | †6/8 |
| **Funk** | Basic*, JB-Style, FunkyDr., BoomBap, Trap, Lo-Fi, N.Orleans, Breakbeat | *2 bars |
| **Blues** | Shuffle†, Slow*†, Chicago, Texas, 12/8†, Jump, Rock, Train | *2 bars, †12/8 |
| **Drill** | 4ths, 8ths, 16ths, Shuffle, Accent, 2&4, Offbeat, Metro | Metronomo |
| **Latin** | Cumbia, Samba, Salsa, Cha-Cha, AfroCuban, Mambo, Songo, Bossa | |
| **Reggae** | OneDrop, Rockers, Steppers, Ska, Dub, RootsSl., Dancehall, StepFast | |
| **Electro** | Massive, Tricky, Fugees, DeLa, Slim, Portis, Morch, Hip-Hop | Trip-Hop |

### Modulo MELODY

Accompagnamento armonico per praticare improvvisazione e groove.

**Controlli:**
- **KEY** - 12 note cromatiche (da E, come BASSIST)
- **MODE** - CHORDS (accordi) o MELODY (linee melodiche)
- **PATTERN** - Dropdown con 12 progressioni in 6 generi
- **SOUND** - Piano o Organ (Hammond style)
- **OCTAVE** - Controllo +/- (1-5)
- **VOL** - Volume slider
- **ITA** - Toggle notazione italiana (Do, Re, Mi)

**Display:**
- Nome accordo (es. Emaj7, Am7)
- Note dell'accordo
- **Mini-fretboard** - Visualizza dove suonare sul basso (R = root arancione, pallini verdi = altre note)

**Pattern disponibili:**

| Genere | Pattern | Accordi |
|--------|---------|---------|
| **Foundation** | Triads | I - IV - V |
| **Foundation** | Fifths | I - V |
| **Rock** | Classic | I - IV - V |
| **Rock** | Anthem | I - V - vi - IV |
| **Blues** | 12 Bar | I7-IV7-I7-V7 (12 battute) |
| **Blues** | Turnaround | I7 - VI7 - ii7 - V7 |
| **Funk** | Vamp | i7 (un accordo) |
| **Funk** | Two Chord | i7 - IV7 |
| **Disco** | Groove | Imaj7 - IVmaj7 - vi7 - V7 |
| **Disco** | Classic | vi7 - ii7 - V7 - Imaj7 |
| **Trip-Hop** | Dark | i7 - bVII |
| **Trip-Hop** | Moody | i7 - iv7 |

**Sync con BASSIST:**
- Attiva **MEL** nel menu VIEW del BASSIST
- Il fretboard grande mostra le note dell'accordo corrente
- Quando cambia accordo, il fretboard si aggiorna automaticamente

### Modulo BASSIST

Visualizzatore interattivo per tastiera basso 4 corde (12 tasti).

**Sezioni:**
- **ROOT** - Seleziona la nota fondamentale (12 note cromatiche)
- **SCALE** - Seleziona la scala da visualizzare
- **VIEW** - Toggle per personalizzare la visualizzazione:
  - **ARP** - Mostra solo arpeggio (note dell'accordo: R, 3, 5, 7)
  - **BOX** - Mostra solo la "box shape" (4-5 tasti) per posizione fissa
  - **INT** - Mostra intervalli (R, b3, 5, b7) invece dei nomi note
  - **GROOVE** - Attiva la modalita' groove con sync DRUMMER
  - **MEL** - Mostra note dell'accordo corrente dal modulo MELODY
- **Pattern Display** - Griglia 16 step sotto la fretboard che mostra il groove corrente (LED verde = nota)
- **BPM Control** - Display LED con bottoni +/- per regolare il tempo (sincronizzato con DRUMMER)
- **Header**:
  - **ON** - Bottone play/stop per avviare scala/groove (a sinistra)
  - **ITA** - Toggle per notazione italiana Do, Re, Mi (a destra)

**Audio:**
- **Click sulle note** - Clicca su qualsiasi nota evidenziata per sentirla
- **Autoplay (PLAY)** - Suona la scala automaticamente in sync col kick del pattern DRUMMER
- Suono basso sintetizzato con Tone.js (MonoSynth FM)

**Scale disponibili (ordinate per utilita' basso):**
1. **Penta Min** - La regina del rock/blues/funk
2. **Blues** - Pentatonica minore + blue note (b5)
3. **Maggiore** - La scala "normale" di riferimento
4. **Minore** - Per brani tristi/drammatici
5. **Penta Maj** - Country, pop allegro

**Arpeggi:**
| Scala | Arpeggio | Note |
|-------|----------|------|
| Penta Min | Min7 | R, b3, 5, b7 |
| Blues | Min7 | R, b3, 5, b7 |
| Maggiore | Maj7 | R, 3, 5, 7 |
| Minore | Min7 | R, b3, 5, b7 |
| Penta Maj | Maj | R, 3, 5 |

**Colori:**
- **Arancione** - Root (nota fondamentale) e note dei groove
- **Verde** - Note della scala
- **Ciano** - Note dell'arpeggio (quando ARP attivo)
- **Grigio tratteggiato** - Note fuori dal box (quando BOX attivo)

### Sezione GROOVES (BASSIST)

**44 pattern di basso** per esercitarsi con loop, organizzati in 6 categorie:

| Categoria | Grooves | Descrizione |
|-----------|---------|-------------|
| **FOUNDATION** | 8 | Esercizi base: whole notes, quarters, eighths, root-fifth, root-octave |
| **ROCK** | 8 | Rock lock, eighths, power chords, shuffle, fills, pentatonic, heavy |
| **BLUES** | 7 | Slow blues, shuffle, walking, turnaround, 12-bar, Texas shuffle |
| **FUNK** | 8 | On the one, syncopation, ghost notes, slap, JB style, Larry Graham |
| **DISCO** | 9 | Octave pump, Chic style, disco runs, slap disco |
| **TRIP-HOP** | 4 | Bristol style: Deep Space, Shadow Walk, Fallen Angel, Heat Wave |

**Funzionalita':**
- **Filtri categoria**: ALL, FOUNDATION, ROCK, BLUES, FUNK, DISCO, TRIP-HOP
- **Selezione**: Dropdown con difficolta' (1-4 stelle)
- **Trasposizione automatica**: I groove si adattano alla ROOT selezionata!
- **Auto-restart**: Cambiando ROOT durante il playback, il groove riparte trasposto
- **Pattern Display**: Griglia LED identica a DRUMMER che mostra le note del groove

**Sync DRUMMER ↔ BASSIST:**
- Selezionando un groove, DRUMMER si imposta automaticamente sul pattern drum abbinato
- Ogni groove ha un `drumPattern` specifico (es. JB Style → funk_jb, Texas Shuffle → blues_texas)
- BPM si sincronizza automaticamente
- Premendo PLAY partono insieme basso e batteria
- Cambiando BPM nel pannello AUDIO, cambiano entrambi

### Categoria DRILL

Pattern da metronomo per esercizi tecnici:
- **4ths** - click sui quarti (kick)
- **8ths** - ottavi
- **16ths** - sedicesimi
- **Shuffle** - feel swing/blues (lungo-corto)
- **Accent** - accento sul primo battito
- **2&4** - backbeat su 2 e 4
- **Offbeat** - solo levare
- **Metro** - metronomo puro (snare sui quarti)

## Come Usare

1. Apri l'app nel browser
2. Il bottone **AUTO** e' attivo di default (LED verde)
3. Scegli un genere - i preset audio si adattano automaticamente
4. Scegli una variazione pattern
5. Premi il bottone play (o Spazio) per avviare
6. Regola i controlli nel pannello AUDIO se vuoi personalizzare
   - Modificare un controllo disattiva AUTO
   - Premi AUTO per ripristinare i preset del genere

### Come Usare BASSIST

1. Scegli una **ROOT** (nota fondamentale) - es. E, A, G
2. Scegli una **SCALE** - inizia con Penta Min
3. Suona sul basso le note evidenziate (arancione = root, verde = scala)
4. **Clicca sulle note** per sentire il suono
5. Usa i toggle per personalizzare la visualizzazione:
   - **INT** on → vedi gli intervalli (R, b3, 4, 5, b7)
   - **ARP** on → vedi solo le note dell'accordo (essenziali!)
   - **BOX** on → limita a 4-5 tasti (una posizione della mano)
   - **ITA** on → notazione italiana

### Come Usare GROOVES

1. Seleziona una **ROOT** (il groove si trasporta automaticamente!)
2. Attiva **GROOVE** nella sezione VIEW
3. Scegli una **categoria** o lascia ALL
4. Scegli un **groove** dal dropdown
5. → DRUMMER si imposta automaticamente sul pattern abbinato!
6. Premi **PLAY** per far partire basso + batteria insieme
7. Le note del groove si illuminano sulla tastiera
8. Suona insieme sul basso seguendo le note!
9. Cambia BPM nel pannello AUDIO per rallentare/accelerare

**Abbinamenti Groove → Drum Pattern:**
| Groove | Drum Pattern |
|--------|--------------|
| JB Style | Funk > JB-Style |
| Texas Shuffle | Blues > Texas |
| Rock Shuffle | Rock > Shuffle |
| Disco Chic | Pop > Disco |
| Blues Walk | Blues > Chicago |
| Funk Ghost | Funk > Lo-Fi |
| ... | (40 abbinamenti totali) |

## Struttura

```
DRUMMER/
├── index.html          # Pagina principale
├── css/
│   └── style.css       # Stili rack unit
├── fonts/
│   ├── DSEG7Classic-Bold.ttf  # Font LED 7 segmenti
│   ├── 7LEDitalic.ttf         # Font LED per display BPM
│   └── Dymo.ttf               # Font Dymo per etichette
├── audio/
│   └── vinyl-crackle.mp3  # Loop vinyl per effetto lo-fi
└── js/
    ├── app.js          # Inizializzazione
    ├── beatgen.js      # DRUMMER - Generatore beat (Tone.js)
    ├── patterns.js     # DRUMMER - 64 pattern di batteria
    ├── melody-gen.js   # MELODY - Generatore accordi e progressioni
    ├── scales.js       # BASSIST - Scale e arpeggi
    ├── sounds.js       # BASSIST - Sintetizzatore basso
    ├── fretboard.js    # BASSIST - Visualizzatore tastiera + sync DRUMMER/MELODY
    └── riffs.js        # BASSIST - Libreria grooves (40 pattern con drum match)
```

## Tecnologie

- HTML5 / CSS3 / JavaScript vanilla
- [Tone.js](https://tonejs.github.io/) per sintesi audio e sequencing
- Font DSEG7 per display LED
- Font Dymo per etichette bottoni

## Note Tecniche

### Pattern
I pattern sono array di step (`1` = colpo, `0` = silenzio):

**4/4 standard** - 16 step per battuta (sedicesimi):
```javascript
{
    kick:  [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0],
    snare: [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0],
    hihat: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0]
}
```

**12/8 (terzine native)** - 12 step per battuta (4 beat × 3):
```javascript
{
    timeSignature: '12/8',
    kick:  [1,0,0, 0,0,0, 1,0,0, 0,0,0],
    snare: [0,0,0, 1,0,0, 0,0,0, 1,0,0],
    hihat: [1,0,1, 1,0,1, 1,0,1, 1,0,1]  // true shuffle!
}
```

**Multi-battuta** - 2 o 4 bars con variazioni:
```javascript
{
    bars: 2,
    kick:  [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0,   // bar 1
            1,0,0,0, 0,0,1,0, 1,0,0,0, 0,0,0,0],  // bar 2 (variazione)
    ...
}
```

### Groove con Drum Pattern
Ogni groove ha un campo `drumPattern` che specifica il pattern DRUMMER abbinato:
```javascript
{
    id: 'funk-jb',
    name: 'JB Style',
    category: 'funk',
    drumPattern: 'funk_jb',  // → DRUMMER si imposta su Funk > JB-Style
    bpm: 108,
    steps: [...]
}
```

### Sintesi Audio
Suoni generati con Tone.js:
- **Kick**: MembraneSynth (sine wave con pitch decay) + NoiseSynth (click layer per attacco)
- **Snare**: NoiseSynth (white/pink noise)
- **Hi-Hat**: NoiseSynth con filtro highpass variabile

### AUTO Mode
Ogni genere ha un preset audio associato che include:
- BPM di default
- Tipo di suono per ogni strumento
- Livelli di volume
- Quantita' di vinyl crackle

### Sintetizzatore Basso (BASSIST)
Suono basso generato con Tone.js MonoSynth:
- **Oscillatore**: FM sine per calore
- **Envelope**: Attack veloce (0.01s) per effetto pluck
- **Filtro**: Lowpass con envelope per tono naturale
- **Frequenze**: E1 (41Hz) - G3 (196Hz)

### Sync DRUMMER ↔ BASSIST
- Selezionando un groove, `syncDrummerToGroove()` imposta genere, pattern e BPM
- DRUMMER e BASSIST usano lo stesso `Tone.Transport` per sincronizzazione perfetta
- Premendo PLAY in BASSIST, parte anche DRUMMER automaticamente
- Fermando il groove, si ferma anche DRUMMER

---

## Licenza

Uso personale.
