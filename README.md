# DRUMMER

Beat Generator per Bassisti - Drum machine web in stile rack/flycase per esercitarsi al basso.

**[Prova online](https://jackscampi-backup.github.io/Drummer)**

## Descrizione

DRUMMER genera pattern di batteria in tempo reale usando Tone.js. Non richiede file audio esterni per i suoni di batteria: tutti i suoni sono sintetizzati nel browser. Include un loop di vinyl crackle opzionale per atmosfera lo-fi.

Interfaccia in stile **rack unit da tour flycase** con due moduli affiancati:
- **DRUMMER** - Selezione generi e pattern
- **AUDIO** - Controllo suoni e mixer

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
| **Rock** | Basic*, Hard, Pop, Half-Time, Shuffle, Punk, Ballad, Fill** | *2 bars, **4 bars con fill |
| **Pop** | Basic, Dance, Ballad†, Upbeat, Motown, Synthpop, Funk, Modern | †6/8 |
| **Funk** | Basic*, JB-Style, FunkyDr., BoomBap, Trap, Lo-Fi, N.Orleans, Breakbeat | *2 bars |
| **Blues** | Shuffle, Slow*†, Chicago, Texas, 12/8†, Jump, Rock, Train | *2 bars, †12/8 |
| **Drill** | 4ths, 8ths, 16ths, Shuffle, Accent, 2&4, Offbeat, Mixed | Metronomo |
| **Latin** | Bossa, Samba, Salsa, Cha-Cha, AfroCuban, Mambo, Songo, BossaSl. | |
| **Reggae** | OneDrop, Rockers, Steppers, Ska, Dub, RootsSl., Dancehall, StepFast | |
| **Electro** | Massive, Tricky, Fugees, DeLa, Slim, Portis, Morch, Hip-Hop | Trip-Hop |

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

## Struttura

```
DRUMMER/
├── index.html          # Pagina principale
├── css/
│   └── style.css       # Stili rack unit
├── fonts/
│   └── DSEG7Classic-Bold.ttf  # Font LED 7 segmenti
├── dymo/
│   └── Dymo.ttf        # Font Dymo per etichette
├── audio/
│   └── vinyl-crackle.mp3  # Loop vinyl per effetto lo-fi
└── js/
    ├── app.js          # Inizializzazione
    ├── beatgen.js      # Generatore beat (Tone.js) + Audio controls
    └── patterns.js     # 64 pattern di batteria
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

## Licenza

Uso personale.
