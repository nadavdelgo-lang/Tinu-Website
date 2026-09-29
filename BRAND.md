# Tinu brand standard

Version 1.0. September 2026.

Owner: Nadav Delgo, nadav.d@tinu.ai. He approves every exception.

This document is the single authority on how Tinu looks and sounds. Where a
rule here disagrees with a shipped file, this document wins and the file gets
fixed. Where two rules here appear to disagree, the one with a measured number
wins. Section 13 lists every place the shipped files currently deviate.

Every colour ratio in this document is a WCAG 2.2 contrast ratio that was
computed, not estimated. Every logo measurement was taken from the path data in
the SVG files.

---

## 1. What Tinu is

Tinu builds and runs frontier GPU capacity for teams training large models. We
deliver it three ways. We install and run GPUs inside a customer datacenter. We
sell capacity on our own cloud. We write orchestration software that lets work
burst from the cluster a customer already runs out to outside capacity.

The brand line is **Frontier compute by engineers and scientists**.

The audience is an engineering or infrastructure leader. They are technical.
They are busy. They have been pitched by many vendors this quarter. They
discount adjectives and they check numbers.

That reader sets the whole identity. The brand is quiet, precise, and honest
about what does not exist yet. It never raises its voice to be noticed. It earns
attention with a fact the reader can go and verify.

### The two assets that carry the idea

**The mark is a hand drawn tree.** It is not a chip, a cube, a hexagon, or a
node graph. Every compute company uses those. A tree is what a research group
draws on a whiteboard. It says the company is run by people who do the science,
which is the claim the brand line makes in words. Keep it hand drawn. The
wobble is the point.

**The field is the compute.** The background of the website is a grid of cells
that carries a wave on its own and lights up when a visitor touches it. It is
the mark's colours, rearranged into a machine. The tree and the field are the
same palette in two registers: one organic, one computed. That relationship is
the identity. Do not break it by introducing a third visual language.

---

## 2. The name

Write the company as **Tinu**. Capital T, lower case inu. No space, no hyphen.

Write the product and the site as **Tinu.ai**. Write a bare domain in running
copy as **tinu.ai**, lower case, with no protocol and no www.

Never write TINU, never write Tinu.AI, never write Tinu ai. The possessive is
Tinu's.

The three services are written **GPU on prem**, **AI cloud**, and
**Orchestration software**. Sentence case. They describe what is sold, so they
are never title cased and never trademarked. Write them in sentence case in the
source and let CSS apply the uppercase.

Open decision: record one pronunciation respelling and one sentence on what the
name means. See section 14.

---

## 3. Logo

Three files ship. There are no others.

| File | Use | Wordmark colours |
|---|---|---|
| `logo-light.svg` | Light backgrounds. The website uses this one. | Tinu `#12302C`, .ai `#4A6360` |
| `logo.svg` | Dark backgrounds. | Tinu `#FFFFFF`, .ai `#B9CBC7` |
| `logo-mark.svg` | The tree alone. | none |

The wordmark is Outfit converted to outlines. The logo needs no font installed
and renders identically on any machine. Never rebuild the lockup with live
text.

### Construction

Every logo rule is expressed against **H**, the reproduced height of the
artwork. H is the same number for the mark and for the lockup, because the tree
fills the full height of both files.

- Mark width = **0.83522 x H**. viewBox `0 0 150.34 180`.
- Lockup width = **2.06450 x H**. viewBox `0 0 371.61 180`.
- Gap between mark and wordmark = **30 units at H 180**, which is H/6.
- Wordmark cap height = **46 units at H 180**.
- The mark and the wordmark are centred on each other to within 0.03 percent.

The website inlines the lockup at viewBox `0 0 375.61 180`. The extra 4 units
are deliberate right padding. This is correct and must not be trimmed.

### The one measured ratio

The thinnest sustained stroke in the mark is **1.044 percent of H**. Write it
as `t = 0.01044 x H`. Every minimum size below comes from this number. Use it
to derive a floor for any process the guide does not list: find the thinnest
line that process holds, then solve for H.

### Clear space

Keep **C = H/4** clear on all four sides, measured from the edge of the
viewBox, not from the ink.

Check it by eye without a ruler. C equals one wordmark cap height, or two trunk
widths measured across the straight part of the trunk.

Nothing enters that box. No type, no rule, no image edge, no trim edge, no
other logo.

### Minimum size

| Asset | Floor | Preferred | Faithful |
|---|---|---|---|
| Mark on screen | 32 px tall | 48 px | 96 px and above |
| Lockup on screen | 34 px tall (70 px wide) | 46 px tall | 80 px and above |
| Mark in print | 10 mm tall | 16 mm | 25 mm and above |
| Lockup in print | 12 mm tall | 20 mm | 32 mm and above |

These are measured, not guessed. At 16 px the weakest of the nine colours
reaches half coverage and survives on one to three pixels. At 24 px it reaches
0.73. At 32 px every colour holds nine or more fully saturated pixels. At 48 px
all nine reach full coverage. At 96 px the thinnest stroke is a full pixel
wide, so no stroke depends on antialiasing.

Below the lockup floor, use the mark alone. Below the mark floor, set the name
in type.

### Backgrounds

Use `logo-light.svg` on white, on `#F5F8F8`, and on any ground lighter than 55
percent luminance.

Use `logo.svg` only on grounds **darker than `#545454`**. Below that threshold
the `.ai` in `#B9CBC7` drops under 4.5:1.

Never place either lockup on the brand teal `#40777A`. Five of the nine mark
colours fall below 2:1 there.

On photography, place the logo on a white plate with padding equal to C on all
four sides. Never set the mark directly on an image.

### Monochrome

A single colour version is legal and needs no redrawing. Replace all nine fills
with one colour. The paths are disjoint and carry `fill-rule="evenodd"`, so the
counters hold and the tree reads correctly.

Use `#12302C` on light grounds and `#FFFFFF` on dark. This is the version for
screen print, embroidery, laser etch, one colour offset, and fax.

### Never

- Never redraw, retrace, smooth, or "clean up" the artwork. The wobble is the mark.
- Never recolour an individual path. The nine colours are fixed.
- Never rotate, skew, mirror, or apply a horizontal scale.
- Never add a shadow, glow, bevel, gradient, or outline.
- Never place the mark inside a shape that is not the white plate described above.
- Never crop the mark. The favicon exception in section 10 is the only one.
- Never re-space the lockup, and never set the wordmark yourself to fake one.

---

## 4. Colour

The brand runs **four palettes**. Every colour belongs to exactly one, and may
only be used for that palette's purpose.

| Palette | Jurisdiction |
|---|---|
| Interface | All text, all UI, all rules and surfaces |
| Semantic | State only: success, warning, error, information |
| Data | Chart series only |
| Logo | Inside the mark only |
| Field | The animated background and its frozen print form only |

No colour crosses a boundary without being derived again and measured again.

### The derivation rule

Every new brand colour comes from an existing logo colour by one operation.
Hold the CIELAB hue angle. Ease chroma by 0 to 20 percent. Lower L\* until the
required contrast ratio is met.

Never pick a new hue by eye. Never raise chroma above the source logo colour.
This one rule generates every colour the brand does not have yet.

### Interface, light

| Token | Hex | On white |
|---|---|---|
| `--fg` | `#12302C` | 14.14:1 |
| `--fg-2` | `#4A6360` | 6.47:1 |
| `--fg-3` | `#5E7A76` | 4.64:1 |
| `--fg-4` | `#7C918E` | 3.33:1 |
| `--acc` | `#40777A` | 5.08:1 |
| `--acc-hi` | `#34636A` | 6.69:1 |
| `--bg` | `#FFFFFF` | ground |
| `--bg-2` | `#F5F8F8` | 1.07:1 tint |
| `--ink` | `#FFFFFF` | 5.08:1 on `--acc` |
| `--line` | `rgba(64,119,122,.20)` | hairline |
| `--line-2` | `rgba(64,119,122,.34)` | emphasised hairline |

`--fg` is ink. `--fg-2` is secondary copy. `--fg-3` is labels and chrome.
`--fg-4` is for text at 24 px and above, and for rules. Never set body copy in
`--fg-4`.

The teal `#40777A` was sampled from a swatch the founder supplied. It is the
one brand colour outside the logo palette.

### Interface, dark

The website is white only today. Use this set when a dark surface is needed.
Each value holds its light counterpart's hue and reproduces its contrast ratio.

| Token | Hex | On `#0F1F1D` |
|---|---|---|
| `--bg` | `#0F1F1D` | ground |
| `--bg-2` | `#142623` | 1.08:1 |
| `--fg` | `#D2F1EB` | 14.20:1 |
| `--fg-2` | `#8DA5A2` | 6.51:1 |
| `--fg-3` | `#718B87` | 4.66:1 |
| `--fg-4` | `#5F716F` | 3.30:1 |
| `--acc` | `#5E9598` | 5.05:1 |
| `--acc-hi` | `#7BAAB2` | 6.67:1 |
| `--ink` | `#0F1F1D` | 5.05:1 on `--acc` |
| `--line` | `rgba(64,119,122,.17)` | hairline |
| `--line-2` | `rgba(64,119,122,.29)` | emphasised hairline |

### Semantic

| State | Solid | On white | Surface |
|---|---|---|---|
| Success | `#2B5800` | 8.40:1 | `#EAEEE6` |
| Warning | `#B15E28` | 4.67:1 | `#F7EFEA` |
| Error | `#AE262E` | 6.74:1 | `#F7E9EA` |
| Information | `#005292` | 8.01:1 | `#E6EEF4` |

Each is derived from a logo colour by the rule above. The four plus `--acc`
stay separable under normal, protanopic, deuteranopic and tritanopic vision.

Body text on a semantic surface is `--fg`. The solid is for icons, rules and
headings on its own surface. `--warning` on its own surface is 4.11:1, so use
it there only at 24 px and above.

State is never carried by colour alone. Every semantic colour travels with an
icon that has a distinct silhouette and a text label.

### Data

Assign chart series in this order and never reorder to suit a chart.

| # | Colour | Hex | On white |
|---|---|---|---|
| 1 | Navy | `#1D3B72` | 10.93:1 |
| 2 | Yellow | `#BF8C00` | 3.01:1 |
| 3 | Cyan | `#039FD8` | 3.02:1 |
| 4 | Mid blue | `#0E6BB5` | 5.54:1 |
| 5 | Red | `#E02B39` | 4.59:1 |
| 6 | Magenta | `#DE1D8C` | 4.51:1 |
| 7 | Leaf green | `#6BA419` | 3.02:1 |
| 8 | Orange | `#E37830` | 3.00:1 |
| 9 | Light green | `#859F00` | 3.02:1 |

A chart with one series uses `--acc`. Use at most four categorical series.
Five and six are permitted only when each also carries a shape, a dash pattern,
or a direct label. Seven or more is not permitted: aggregate, facet, or switch
to a sequential ramp.

Axis labels, ticks, legends and value labels are `--fg-2`. Never set label text
in its series colour. Gridlines are `--line`.

### Logo

The nine mark colours are fixed. They appear only inside the mark.

`#1D3B72` navy, `#8DC63F` leaf green, `#F2843C` orange, `#BED63F` light green,
`#DE1D8C` magenta, `#E02B39` red, `#0E6BB5` mid blue, `#F2B825` yellow,
`#11A2DB` cyan.

Navy carries the most ink. It is the trunk and the branches.

### Field

Eight colours, each derived from a logo colour by the rule above. Navy is the
only mark colour not used in the field.

| Logo | Field | Solid | As rendered |
|---|---|---|---|
| `#8DC63F` | `#92A972` | 2.58:1 | 1.80:1 |
| `#BED63F` | `#A0B37A` | 2.28:1 | 1.68:1 |
| `#F2B825` | `#B4A06D` | 2.56:1 | 1.80:1 |
| `#F2843C` | `#A07B5E` | 3.83:1 | 2.26:1 |
| `#E02B39` | `#8D5A56` | 5.63:1 | 2.82:1 |
| `#DE1D8C` | `#8A5573` | 5.79:1 | 2.86:1 |
| `#11A2DB` | `#6194A7` | 3.33:1 | 2.10:1 |
| `#0E6BB5` | `#47658A` | 6.01:1 | 2.91:1 |

Quote the rendered ratios, not the solid ones. The canvas paints every cell at
`pow(alpha, 0.85) * 0.66`, so the solid colour never appears on screen. Bright
cell centres are each field colour multiplied by 0.74, and they appear only
above alpha 0.72, at the heart of a dispatch.

The chroma of each field colour is about half the chroma of its logo colour.
That is the house derivation rule applied hard: the hue is held so the canopy
stays recognisable, and the chroma is cut so the page stays quiet. Two colours
carry an extra lightness nudge, because at half chroma the red and the magenta
otherwise read as a bruise next to the ink.

**Hue comes from place, not from chance.** Each cell takes its colour from a
smooth function of its position, so neighbouring cells share a hue and the
field reads as drifting colour regions about five cells across. Never assign
hue per cell at random. A grid of unrelated colours reads as confetti, which is
the one thing this field must not be.

**The field is decorative.** It may never carry text, an icon, a border, a
chart series, a status, or anything a reader has to interpret.

### Service accents

Three colours mark the three services on the website and the one pager.

GPU on prem `#46B7E0`. AI cloud `#F0B93E`. Orchestration software `#9ED139`.

These are close to but not identical to the logo colours they resemble. They
are permitted because each dot sits immediately before a text label that names
the service, so no meaning rests on the colour. Do not add a fourth. See
section 14 for the open decision on aligning them to the data palette.

---

## 5. Typography

Two faces. They do not overlap and they never substitute for each other.

### Outfit

Display and body. Designed by Rodrigo Fuenzalida. Version 1.100.
Source: https://github.com/Outfitio/Outfit-Fonts

A geometric sans built on the circle, with a single storey a and a single
storey g. There is no italic in any cut.

### Geist Mono

Labels, tags, and data. Made by Vercel with basement.studio and Andrés
Briganti. Version 1.701.
Source: https://github.com/vercel/geist-font

Every ASCII glyph advances exactly 0.600em, so label widths are computable. It
has a marked zero.

### Licence

Both faces are under the **SIL Open Font License, Version 1.1**. Neither
declares a Reserved Font Name.

- Copyright 2021 The Outfit Project Authors (https://github.com/Outfitio/Outfit-Fonts)
- Copyright (c) 2023 Vercel, in collaboration with basement.studio

Commercial use, web embedding and application embedding are all permitted with
no fee and no reporting. The one prohibition is selling either font on its own.

Because the website embeds both fonts as base64, it redistributes the font
software. It must therefore carry both copyright notices and ship the full OFL
text. See section 13.

### Delivery

Both faces ship subset and inlined as base64 WOFF2 inside the page. The page
makes zero font requests. Keep it that way. Never move a face to a CDN, to
Google Fonts, or to a separate file.

Every `@font-face` rule for Outfit must declare `font-weight:100 900`. This is
not cosmetic. The default instance is Thin, so without that descriptor every
weight on the page renders Thin.

Fallback stacks, declared once and referenced only through a custom property:

```
--sans: 'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;
--mono: 'Geist Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace;
```

### Weights

Three weights, and only three.

- **400** body.
- **500** display, buttons, and all mono labels.
- **700** one case only: bold emphasis inside the status pill.

Never use 100, 200, 300, 600, 800 or 900. Never set italic or oblique in either
face. Any italic on a Tinu surface is a browser synthesising a slant. Carry
emphasis with weight 500 against 400, or with the teal.

### Roles

**Outfit** sets everything a person reads as language: headlines, body,
buttons, email.

**Geist Mono** sets labels, tags, status strings, counts and machine data.
Never running text. Never a headline. Never a button.

Set any identifier in Geist Mono: part numbers, GPU SKUs, serials, order
references, cluster names, file paths, anything a reader may retype. In Outfit
the lowercase l and the capital I differ by one unit of width and are
indistinguishable.

### Scale, screen

| Role | Size | Line height | Tracking |
|---|---|---|---|
| h1 | `clamp(2.05rem, 5.4vw, 4.8rem)` | 1.02 | -.035em |
| h1, under 720px | `clamp(1.8rem, 8.2vw, 2.7rem)` | 1.02 | -.035em |
| Sub | `clamp(1.02rem, 1.55vw, 1.35rem)` | 1.5 | none |
| Body | 16px | 1.6 | none |
| Service body | .95rem | 1.5 | none |
| Button | 1.02rem | 1.35 | -.01em |
| Mono label, content | 11px, weight 500 | 1 | .12em to .14em |
| Mono label, chrome | 10.5px, weight 500 | 1 | .14em |

### Scale, US Letter

The one pager runs at 816 by 1056 px, which is 8.5 by 11 inches at 96dpi.

| Role | Size | Line height | Tracking |
|---|---|---|---|
| h1 | 35px, weight 500 | 1.07 | -.028em |
| Sub | 14px | 1.48 | none |
| Lede | 12.2px | 1.58 | none |
| Service body | 11.8px | 1.5 | none |
| Service note | 11px | 1.5 | none |
| Mono tag | 8.5px to 9px, weight 600 | 1 to 1.7 | .13em to .15em |
| Fine print | 7.6px | 1.62 | none |
| Button | 13.5px | 1.35 | -.01em |

Mono tags step up to weight 600 in print because 500 thins out on paper.

### Tracking rule

Tracking tightens as type grows and opens as it shrinks. Never the reverse.

Outfit at 2rem and above takes -.035em. Outfit between 1rem and 1.35rem takes
-.01em on buttons and nothing elsewhere. Outfit below 1rem takes nothing. Geist
Mono takes .12em to .15em at every size it is used.

### Mono labels

Always uppercase, and the uppercase is applied with `text-transform`, never
typed into the source. Author every label in sentence case so it stays
readable, greppable, and correct if it is ever reused outside a label.

A mono label never wraps. Set `white-space: nowrap`. If a label does not fit,
shorten the words. Do not reduce the tracking and do not drop the size.

Label width in pixels is characters multiplied by size, multiplied by 0.600,
plus the tracking. At 11px with .14em that is 8.140px per character.

### Figures

Any figure in a column, a table, a price, or a value that updates in place
takes `font-variant-numeric: tabular-nums`. Outfit's default figures are
proportional and will not align. Figures inside a sentence keep the default.

Geist Mono needs no numeric settings. All ten digits are the same width.

### Glyph coverage

Both subsets carry the same 106 characters: ASCII 0x20 to 0x7E, plus non
breaking space, `©`, `·`, `×`, the six curly quotation marks, the bullet, and
the ellipsis.

**The em dash and the en dash are not in the fonts.** The house rule against
them is enforced by the artwork.

The degree sign, all arrows, and every accented Latin character are also
absent. Write "deg C" rather than a degree sign. Write "to" rather than an
arrow. Do not set a name carrying an accent until the subsets are rebuilt, and
rebuild both files together.

---

## 6. Layout

### Spacing scale

Use **4px steps**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. Two exceptions are
allowed: 1px and 2px for hairlines and focus rings.

The shipped website predates this scale and uses several off scale values. New
work uses the scale. See section 13.

### Page gutter

`--pad: clamp(20px, 4.5vw, 64px)`. This is the horizontal margin on every
screen surface. Never let content run closer than 20px to a viewport edge.

### Radius

Four values, and only four.

- `999px` for buttons, pills and status chips.
- `50%` for dots and circular markers.
- `2px` for focus rings.
- `1px` for the small square in the motion control.

A card or a panel takes a **6px to 7px** radius on a print surface only. On
screen, Tinu does not use cards. Separation comes from a hairline rule and
white space.

### Rules

A hairline is 1px in `--line`. An emphasised hairline is 1px in `--line-2`.
Never use a rule heavier than 1px on screen, or heavier than 0.25mm in print.

### Grids

Three columns for the three services, on both screen and print. Columns
collapse to one below 720px. The gap is 24px to 26px.

---

## 7. Motion and the field

The website background is a canvas grid of compute cells.

| Constant | Value |
|---|---|
| `PITCH` | 26 (grid spacing) |
| `CELL` | 15 (cell size) |
| `IDLE` | 0.9 on desktop, 0.42 below 760px |
| Painted alpha | `pow(alpha, 0.85) * 0.66` |
| Resting gate | cells light above wave 0.66 |
| Pointer glow | 0.38 within a 138px radius |
| Dispatch ring | 285px per second on a click, 215 on a drag |
| Ring life | 2.5s on a click, 2.1s on a drag |
| Ring band | 34px wide |
| Self dispatch | every 6.5 to 10.5 seconds, at 0.7 strength |
| Easing | `cubic-bezier(.2, .7, .2, 1)` |
| Transitions | .2s, .25s, .3s |
| Status pulse | 2.6s |

A diagonal wave runs on its own. A click, a tap or a drag dispatches a kernel
and the cells light in the field colours.

The field is calm by design. It moves slowly, it never reaches full strength,
and a dispatch reads as a swell rather than a flash. When the page fires by
itself it does so at 0.7 strength, so an unattended page never looks like
somebody is touching it.

### Rules

- Every visitor gets a **Pause motion** control. It is not optional.
- `prefers-reduced-motion` gets one still frame, and the pause control reads
  "none" for it.
- Pausing must redraw the frame that is already on screen, not a new one.
- Below 760px the resting wave drops to 42 percent so copy stays clean. A touch
  still lights the grid at full strength.
- In print the wave is frozen as a corner bloom in the top right plus a thin
  rail down the right margin, both clear of all copy. Maximum opacity 0.24.

The field is never the subject. It is the room the copy sits in.

---

## 8. Accessibility

The standard is **WCAG 2.2 AA**.

- Body text meets 4.5:1. Text at 24px regular or 18.66px bold meets 3:1.
- Non text elements that carry meaning, including icons, chart marks and focus
  indicators, meet 3:1.
- Meaning never rests on colour alone. Every coloured marker carries a label,
  an icon with a distinct silhouette, or a shape.
- Every interactive element has a visible focus state. Focus rings are 2px.
- Text over the field needs a scrim that holds the local ground at **97 percent
  white or lighter**. Measure it, do not judge it by eye.
- A control's label says what happens. A button that publishes says Publish.

---

## 9. Voice

Write so a busy engineer finishes the sentence and believes it.

### Sentences

Target 12 words. Keep most sentences under 15 and nearly all under 20. The hard
ceiling is 25. Never put two long sentences next to each other.

One idea per sentence. Two commas maximum. If a sentence needs a third, split
it.

Active voice in every body sentence. Passive is allowed only in legal fine
print, where it is the register.

Lead with the reader. Use "you" about twice as often as "we". Never use "I".

Write "we" when the company acts. Write "Tinu" when the sentence states
ownership, money, or a legal fact. Do not mix them in one sentence.

Never use a contraction. Write cannot, do not, it is, we are.

Never write a rhetorical question. Never use an exclamation mark.

### Punctuation

Body copy uses the period, the comma, and the possessive apostrophe.

**Never use an em dash or an en dash.** Replace an em dash with a period when
the halves are separate thoughts, and with a comma when the second half
modifies the first. Write ranges with the word "to": six to eight weeks, never
6-8 weeks.

Do not hyphenate compound modifiers. Write on prem, take or pay, multi year,
pro rata, end to end. The hyphen is reserved for official form numbers such as
W-9.

The colon has one use: introducing where a claim can be checked. "Check it:
the project is on the public list." Never use a colon to introduce a sales
promise.

Use the serial comma. Write "the US, UK, and Israel".

Headlines, buttons and mono labels take no terminal period. Body paragraphs
take a period on every sentence.

Never set emphasis in italics. Emphasise with weight or with the teal, and only
ever a load bearing fact: a figure, a date, an honest negative, an address.

### Banned words

Each list is banned for a reason. A buyer who cannot falsify one claim
discounts every other claim on the page.

**Scale adjectives.** leading, industry leading, world class, best in class,
cutting edge, state of the art, next generation, revolutionary, unparalleled,
massive, hyperscale, fastest, cheapest. Replace each with the number it stands
in for.

**Vague verbs.** transform, empower, unlock, leverage, enable, streamline,
optimize, supercharge, democratize, disrupt, revolutionize. Name the physical
action.

**Category nouns.** solution, platform, ecosystem, journey, offering, suite,
synergy. Name the thing that is sold.

**Intensifiers and hedges.** very, really, simply, just, literally, truly,
extremely, incredibly, significantly, essentially, basically, virtually. Delete
the word, or write the figure it was covering for.

**Trust adjectives.** proven, trusted, award winning, reliable, secure, robust,
powerful, flexible, agile, smart, intelligent, advanced, comprehensive,
seamless, effortless, turnkey, scalable, easy, simple, fast. State the
mechanism or the measurement.

**Guarantees.** guarantee, ensure, always, zero downtime. A commitment belongs
in the agreement, not in the copy.

### Numbers, dates and names

Spell out zero through nine and all ordinals. Use numerals for 10 and above,
for money, and for years. Never open a sentence with a numeral.

Write money as `$50,000`. Never 50k, never USD 50,000.

Write durations bare: 30 days notice, 72 hours, six weeks.

Write dates as month then year: **October 2026**. Never Oct 2026, never
10/2026, never October 31st. Relative time such as "this quarter" is allowed
only on a surface that carries a date stamp. An undated surface such as the
website writes the month and the year in full.

Write vendor names in full on every mention: Vera Rubin, Kubernetes. Write part
numbers as uppercase letters and digits with the following word lowercase:
**B300 and GB300 class hardware**.

Write acronyms in full caps with no periods: GPU, AI, HPC, MSA, DPA, US, UK.

Write datacenter as one word. Write on prem as two words.

### Writing about what does not exist yet

This is the brand's sharpest habit. Say it plainly, first, in the reader's
words.

> Tinu is new. Start with a paid pilot, not a term commitment.

> None yet. No public customers. Price the first order accordingly.

Never dress an absence in an adjective. Never call an order a track record.
Mark a forward date as a target and name what it depends on.

> We are targeting Vera Rubin systems online by the end of October 2026,
> subject to vendor delivery.

### Before and after

| Do not write | Write |
|---|---|
| Our cutting-edge platform unlocks massive scale | We install and run GPUs inside your datacenter |
| Industry-leading orchestration solutions | Work bursts from the cluster you already run |
| Trusted by leading AV companies | Tinu is new. No public customers |
| Available Q4 2026 | Targeting October 2026, subject to vendor delivery |
| 6-8 weeks | six to eight weeks |
| Flexible, scalable pricing | Buy capacity as you use it. No take or pay |

---

## 10. Applications

### Website

One page. Static HTML. Zero network requests. White ground, canvas field, three
services, two buttons. No address is printed as visible text anywhere; every
contact is a `mailto:` link.

### Favicon and app icon

The page ships a 32px favicon and a 180px apple touch icon as base64 PNGs, both
cropped renderings of the mark. The crop loses the trunk root flare and part of
one loop. It is acceptable at icon size and is the only permitted crop of the
mark.

Add a 16px PNG and an SVG icon. See section 13.

### One pager

US Letter, 816 by 1056 px. One page, always. Header with the lockup and a mono
eyebrow. Headline, sub, lede. Three service columns. One emphasis band. A terms
strip. A close with one ask and one button. Fine print at 7.6px. Footer with
the brand line.

The page never names the recipient. It describes their situation from public
sources so they recognise it themselves.

### Email signature

Not yet built. See section 14.

### Social and Open Graph images

Not yet built. The site has no `og:image` and no `twitter:card`. See section 13.

### Co-branding

Never lock the Tinu mark up with another mark. Place a partner mark on the
other side of a 1px vertical rule in `--line-2`, with C of clear space on both
sides.

Never place a university, customer or vendor mark in a way that implies
endorsement. Written permission comes first. Princeton University's published
rules require approval before its name appears in promotional material, and
they ask for a mock up to be sent to their Office of Communications or
Trademark Licensing.

---

## 11. Tokens

```css
:root{
  /* interface, light */
  --bg:#FFFFFF; --bg-2:#F5F8F8; --ink:#FFFFFF;
  --fg:#12302C; --fg-2:#4A6360; --fg-3:#5E7A76; --fg-4:#7C918E;
  --acc:#40777A; --acc-hi:#34636A;
  --line:rgba(64,119,122,.20); --line-2:rgba(64,119,122,.34);
  /* semantic */
  --success:#2B5800; --warning:#B15E28; --error:#AE262E; --info:#005292;
  --success-bg:#EAEEE6; --warning-bg:#F7EFEA;
  --error-bg:#F7E9EA; --info-bg:#E6EEF4;
  /* system */
  --pad:clamp(20px,4.5vw,64px);
  --ease:cubic-bezier(.2,.7,.2,1);
  --sans:'Outfit','Helvetica Neue',Helvetica,Arial,sans-serif;
  --mono:'Geist Mono',ui-monospace,'SF Mono',Menlo,Consolas,monospace;
}
```

---

## 12. Pre-publish checklist

1. Every text colour meets 4.5:1 against its real background, measured.
2. No em dash and no en dash anywhere, including file names and alt text.
3. No banned word from section 9.
4. Every date carries a month and a year.
5. Every forward date says it is a target and names what it depends on.
6. The logo clears C on all four sides and sits above its minimum size.
7. Mono is uppercase by CSS, sentence case in the source, and does not wrap.
8. Every claim a reader might check is true, and says where to check it.

---

## 13. Known deviations

These are places the shipped files disagree with this document. Fix them.

| What | Where | Fix |
|---|---|---|
| `--brand` declared, never used, duplicates `--acc` | `index.html` | Delete the token |
| `--bg-2` declared, never used | `index.html` | Use it or delete it |
| The status line reads "online by end of October" with no year | `index.html` and its meta description | Write "end of October 2026" |
| No `og:image` and no `twitter:card` | `index.html` | Add both |
| No 16px favicon and no SVG icon | `index.html` | Add both |
| The OFL notices and licence text are not shipped, although both fonts are redistributed as base64 | repository | Add `OFL.txt` and a comment above the `@font-face` rules |
| `logo.svg` on a dark ground renders the navy trunk, 37 percent of the mark's ink, as a near invisible silhouette | `logo.svg` | See section 14 |
| Several spacing values sit off the 4px scale | `index.html` | Leave as is. New work uses the scale |
| The one pager source lives in a temporary directory | scratchpad | Move it to a private repository |

---

## 14. Open decisions

Each needs an owner and a date.

1. **The dark logo.** On dark grounds the navy trunk disappears, so the
   identity becomes a wordmark under confetti. Decide whether to lighten the
   trunk for the dark lockup only, or to accept the silhouette. This is a
   design decision, not a measurement.
2. **Service accents.** `#46B7E0`, `#F0B93E` and `#9ED139` are near duplicates
   of logo colours and belong to no declared palette. Decide whether to align
   them to data series 3, 2 and 7, which would change two live documents.
3. **Pronunciation.** Record one respelling and one sentence on what the name
   means, for the press kit and for every speaker bio.
4. **Email signature, social images, and a slide template.** None exist.
5. **Legal marks.** Decide whether Tinu is used with TM, and record the legal
   entity name for contracts and fine print.
