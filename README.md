# DRUMMER + BASSIST

Suite di strumenti web per bassisti - Drum machine + Visualizzatore scale in stile rack/flycase.

**[Prova online](https://jackscampi-backup.github.io/Drummer)**

## Descrizione

Due moduli integrati per esercitarsi al basso:

1. **DRUMMER** - Genera pattern di batteria in tempo reale usando Tone.js
2. **BASSIST** - Visualizza scale, arpeggi, grooves e box position sulla tastiera del basso

Interfaccia in stile **rack unit da tour flycase** con tre moduli:
- **DRUMMER** - Selezione generi e pattern
- **AUDIO** - Controllo suoni e mixer
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
| **Drill** | 4ths, 8ths, 16ths, Shuffle, Accent, 2&4, Offbeat, Mixed | Metronomo |
| **Latin** | Cumbia, Samba, Salsa, Cha-Cha, AfroCuban, Mambo, Songo, Bossa | |
| **Reggae** | OneDrop, Rockers, Steppers, Ska, Dub, RootsSl., Dancehall, StepFast | |
| **Electro** | Massive, Tricky, Fugees, DeLa, Slim, Portis, Morch, Hip-Hop | Trip-Hop |

### Modulo BASSIST

Visualizzatore interattivo per tastiera basso 4 corde (12 tasti).

**Sezioni:**
- **ROOT** - Seleziona la nota fondamentale (12 note cromatiche)
- **SCALE** - Seleziona la scala da visualizzare
- **VIEW** - Toggle per personalizzare la visualizzazione:
  - **ARP** - Mostra solo arpeggio (note dell'accordo: R, 3, 5, 7)
  - **BOX** - Mostra solo la "box shape" (4-5 tasti) per posizione fissa
  - **INT** - Mostra intervalli (R, b3, 5, b7) invece dei nomi note
  - **GROOVE** - Attiva la modalità groove (PLAY suona il groove invece della scala)
  - **PLAY** - Autoplay scala/groove sincronizzato col kick di DRUMMER
- **Pattern Display** - Griglia 16 step sotto la fretboard che mostra il groove corrente (LED verde = nota)
- **Header** - Toggle **ITA** per notazione italiana (Do, Re, Mi)

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

15 pattern di basso originali per esercitarsi con loop:

- **Filtri categoria**: ALL, ROOT LOCK, OCTAVE, PENTA, WALKING, FUNK
- **Selezione**: Dropdown stile audio panel con difficolta' (★)
- **Trasposizione automatica**: I groove si adattano alla ROOT selezionata!
- **Auto-restart**: Cambiando ROOT durante il playback, il groove riparte trasposto
- **Reset automatico**: Cambiando genere in DRUMMER la fretboard si resetta
- **Pattern Display**: Griglia LED identica a DRUMMER che mostra le note del groove
- **Drum accompaniment**: Beat semplice automatico quando DRUMMER e' fermo

### Categoria DRILL

Pattern da metronomo per esercizi tecnici:
- **4ths** - click sui quarti (metronomo classico)
- **8ths** - ottavi
- **16ths** - sedicesimi
- **Shuffle** - feel swing/blues (lungo-corto)
- **Accent** - accento sul primo battito
- **2&4** - backbeat su 2 e 4
- **Offbeat** - solo levare
- **Mixed** - pattern misto per coordinazione

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

### Autoplay Scala (PLAY)

1. Seleziona un **genere** e **pattern** in DRUMMER
2. Seleziona **ROOT** e **SCALE** in BASSIST
3. Premi **PLAY** in BASSIST → la scala suona in sync col kick!
4. La nota corrente si illumina sulla tastiera
5. Premi di nuovo PLAY per fermare

**Consiglio pratico:** Usa i pattern **DRILL** per esercizi con metronomo semplice. Ogni pattern ha un kick diverso - la scala seguira' quel ritmo!

### Come Usare GROOVES

1. Seleziona una **ROOT** (il groove si trasporta automaticamente!)
2. Seleziona una **categoria** o lascia ALL
3. Scegli un **groove** dal dropdown (★ = difficolta')
4. Attiva **GROOVE** nella sezione VIEW
5. Premi **PLAY** per far partire il loop
6. Le note del groove si illuminano sulla tastiera
7. Suona insieme sul basso seguendo le note!

**Sync con DRUMMER:**
- Se DRUMMER sta suonando → il groove usa lo stesso BPM
- Se DRUMMER e' fermo → parte un beat semplice di accompagnamento (kick 1-3, snare 2-4)

## Struttura

```
DRUMMER/
├── index.html          # Pagina principale
├── css/
│   └── style.css       # Stili rack unit
├── fonts/
│   ├── DSEG7Classic-Bold.ttf  # Font LED 7 segmenti
│   └── Dymo.ttf        # Font Dymo per etichette
├── audio/
│   └── vinyl-crackle.mp3  # Loop vinyl per effetto lo-fi
├── SBL/                # PDF di Scott's Bass Lessons (riff futuri)
└── js/
    ├── app.js          # Inizializzazione
    ├── beatgen.js      # DRUMMER - Generatore beat (Tone.js)
    ├── patterns.js     # DRUMMER - 64 pattern di batteria
    ├── scales.js       # BASSIST - Scale e arpeggi
    ├── sounds.js       # BASSIST - Sintetizzatore basso
    ├── fretboard.js    # BASSIST - Visualizzatore tastiera + autoplay
    └── riffs.js        # BASSIST - Libreria grooves (15 pattern originali)
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
- BASSIST legge il pattern corrente di DRUMMER (`window.beatGen.currentPattern`)
- Suona una nota della scala ogni volta che c'e' un kick (`kick[i] === 1`)
- Usa lo stesso `Tone.Transport` per sincronizzazione perfetta

### Sezione GROOVES

Libreria di pattern originali per esercitarsi. 15 grooves in 5 categorie:

**Categorie:**
| Categoria | Descrizione |
|-----------|-------------|
| ROOT LOCK | Pattern sulla root - focus sul timing |
| OCTAVE | Salti di ottava stile disco |
| PENTA | Pattern pentatonici nel box |
| WALKING | Walking bass jazz |
| FUNK | Sincope e ghost notes |

**Grooves disponibili:**
- Root Quarters, Root Eighths, Root & Fifth
- Octave Basic, Disco Pump, Octave Synco
- Penta Climb, Penta Box, Penta Groove
- Walk Basic, Walk Approach
- Funk Basic, Funk Pocket, Funk 16ths

**Sync BPM:**
- Se DRUMMER sta suonando → groove segue il BPM di DRUMMER
- Se DRUMMER e' fermo → groove usa il suo BPM predefinito

---

## Licenza

Uso personale.
