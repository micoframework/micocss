### Font Family

- `.f-sans` -- Sets a default sans-serif font stack (e.g., system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif).
- `.f-serif` -- Sets a default serif font stack (e.g., Georgia, Cambria, "Times New Roman", Times, serif).
- `.f-mono` -- Sets a default monospace font stack (e.g., SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace).
- `.f-display` -- Sets a font stack specifically designated for display text/headings (if defined in your theme).
- `.f-body` -- Sets a font stack specifically designated for body text (if defined in your theme and different from primary sans/serif).

### Font Size

- `.fs-xs` -- Sets an extra-small font size from your typographic scale.
- `.fs-sm` -- Sets a small font size from your typographic scale.
- `.fs-base` -- Sets the base/normal font size from your typographic scale (often 16px).
- `.fs-lg` -- Sets a large font size from your typographic scale.
- `.fs-xl` -- Sets an extra-large font size from your typographic scale.
- `.fs-2xl` -- Sets a 2x extra-large font size from your typographic scale.
- `.fs-3xl` -- Sets a 3x extra-large font size from your typographic scale.
- `.fs-4xl` -- Sets a 4x extra-large font size from your typographic scale.
- `.fs-5xl` -- Sets a 5x extra-large font size from your typographic scale.
- `.fs-6xl` -- Sets a 6x extra-large font size from your typographic scale.
- `.fs-7xl` -- Sets a 7x extra-large font size from your typographic scale.
- `.fs-8xl` -- Sets an 8x extra-large font size from your typographic scale.
- `.fs-9xl` -- Sets a 9x extra-large font size from your typographic scale.

### Font Smoothing (Antialiasing)

- `.antialiased` -- Applies browser-specific font smoothing for a sharper look on high-DPI screens (`-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`). Note: These are non-standard properties but widely used.
- `.subpixel-antialiased` -- Applies browser-specific font smoothing that leverages subpixel rendering (`-webkit-font-smoothing: subpixel-antialiased; -moz-osx-font-smoothing: auto;` or simply `auto`). Note: This is often the browser default.

### Font Style

- `.italic` -- Sets `font-style: italic;`.
- `.not-italic` -- Sets `font-style: normal;`, resetting any inherited italic style.

### Font Weight

- `.fw-100` -- Sets `font-weight: 100;`.
- `.fw-200` -- Sets `font-weight: 200;`.
- `.fw-300` -- Sets `font-weight: 300;`.
- `.fw-400` -- Sets `font-weight: 400;` (often the default).
- `.fw-500` -- Sets `font-weight: 500;`.
- `.fw-600` -- Sets `font-weight: 600;`.
- `.fw-700` -- Sets `font-weight: 700;`.
- `.fw-800` -- Sets `font-weight: 800;`.
- `.fw-900` -- Sets `font-weight: 900;`.

### Font Variant Numeric

- `.normal-nums` -- Resets all numeric font variants (`font-variant-numeric: normal;`).
- `.ordinal` -- Enables ordinal markers (e.g., 1st, 2nd) if the font supports it (`font-variant-numeric: ordinal;`).
- `.slashed-zero` -- Enables slashed zeros if the font supports it (`font-variant-numeric: slashed-zero;`).
- `.lining-nums` -- Enables lining figures (uniform height, sit on the baseline) if the font supports it (`font-variant-numeric: lining-nums;`).
- `.oldstyle-nums` -- Enables old-style figures (varying ascenders/descenders) if the font supports it (`font-variant-numeric: oldstyle-nums;`).
- `.proportional-nums` -- Enables proportional-width figures (varying widths) if the font supports it (`font-variant-numeric: proportional-nums;`).
- `.tabular-nums` -- Enables tabular-width (fixed-width) figures if the font supports it (`font-variant-numeric: tabular-nums;`).
- `.diagonal-fractions` -- Enables diagonal fractions (e.g., ½) if the font supports it (`font-variant-numeric: diagonal-fractions;`).
- `.stacked-fractions` -- Enables stacked fractions (e.g., ½ vertically) if the font supports it (`font-variant-numeric: stacked-fractions;`).

### Font Variant Ligatures

- `.common-ligatures` -- Enables common ligatures (e.g., fi, fl) (`font-variant-ligatures: common-ligatures;`). This is often on by default.
- `.no-common-ligatures` -- Disables common ligatures (`font-variant-ligatures: no-common-ligatures;`).
- `.discretionary-ligatures` -- Enables discretionary ligatures (ornamental, not always on by default) (`font-variant-ligatures: discretionary-ligatures;`).
- `.no-discretionary-ligatures` -- Disables discretionary ligatures (`font-variant-ligatures: no-discretionary-ligatures;`).
- `.historical-ligatures` -- Enables historical ligatures (`font-variant-ligatures: historical-ligatures;`).
- `.no-historical-ligatures` -- Disables historical ligatures (`font-variant-ligatures: no-historical-ligatures;`).
- `.contextual-ligatures` -- Enables contextual ligatures (`font-variant-ligatures: contextual;`).
- `.no-contextual-ligatures` -- Disables contextual ligatures (`font-variant-ligatures: no-contextual;`).

### Font Variant Caps

- `.small-caps` -- Enables small capitals (`font-variant-caps: small-caps;`).
- `.all-small-caps` -- Enables small capitals for both upper and lowercase letters (`font-variant-caps: all-small-caps;`).
- `.petite-caps` -- Enables petite capitals (`font-variant-caps: petite-caps;`).
- `.all-petite-caps` -- Enables petite capitals for both upper and lowercase letters (`font-variant-caps: all-petite-caps;`).
- `.unicase` -- Enables unicase (mix of small caps for uppercase and lowercase for lowercase) (`font-variant-caps: unicase;`).
- `.titling-caps` -- Enables titling capitals (designed for all-caps titles) (`font-variant-caps: titling-caps;`).
- `.normal-caps` -- Resets `font-variant-caps` to normal (`font-variant-caps: normal;`).

### Font Stretch (Controls the width of glyphs if the font family has variable widths)

- `.f-stretch-ultra-condensed` -- Sets `font-stretch: ultra-condensed;` (50%).
- `.f-stretch-extra-condensed` -- Sets `font-stretch: extra-condensed;` (62.5%).
- `.f-stretch-condensed` -- Sets `font-stretch: condensed;` (75%).
- `.f-stretch-semi-condensed` -- Sets `font-stretch: semi-condensed;` (87.5%).
- `.f-stretch-normal` -- Sets `font-stretch: normal;` (100%).
- `.f-stretch-semi-expanded` -- Sets `font-stretch: semi-expanded;` (112.5%).
- `.f-stretch-expanded` -- Sets `font-stretch: expanded;` (125%).
- `.f-stretch-extra-expanded` -- Sets `font-stretch: extra-expanded;` (150%).
- `.f-stretch-ultra-expanded` -- Sets `font-stretch: ultra-expanded;` (200%).

### Letter Spacing (Tracking)

- `.ls-xs` -- Sets a tighter letter spacing (e.g., -0.05em).
- `.ls-sm` -- Sets a slightly tighter letter spacing (e.g., -0.025em).
- `.ls-base` -- Sets normal letter spacing (`letter-spacing: normal;` or 0).
- `.letter-space -- Sets a slightly wider letter spacing (e.g., 0.025em).
- `.ls-lg` -- Sets a wider letter spacing (e.g., 0.05em).
- `.ls-xl` -- Sets the widest letter spacing (e.g., 0.1em).

### Line Height (Leading)

- `.lh-xs` -- Sets `line-height: 1;`.
- `.lh-sm` -- Sets a tight line height (e.g., 1.25).
- `.lh-base` -- Sets a normal line height (e.g., 1.5).
- `.lh-lg` -- Sets a relaxed line height (e.g., 1.625).
- `.lh-xl` -- Sets a loose line height (e.g., 2).
- `.lh-2xl` -- Sets line height based on a numeric scale (e.g., 0.75rem).
- `.lh-3xl` -- Sets line height based on a numeric scale (e.g., 1rem).
- `.lh-4xl` -- Sets line height based on a numeric scale (e.g., 1.25rem).
- `.lh-5xl` -- Sets line height based on a numeric scale (e.g., 1.5rem).
- `.lh-6xl` -- Sets line height based on a numeric scale (e.g., 1.75rem).
- `.lh-7xl` -- Sets line height based on a numeric scale (e.g., 2rem).
- `.lh-8xl` -- Sets line height based on a numeric scale (e.g., 2.25rem).
- `.lh-9xl` -- Sets line height based on a numeric scale (e.g., 2.5rem).

### List Style Type

- `.list-none` -- Sets `list-style-type: none;`.
- `.list-disc` -- Sets `list-style-type: disc;` (default for `<ul>`).
- `.list-decimal` -- Sets `list-style-type: decimal;` (default for `<ol>`).
- `.list-square` -- Sets `list-style-type: square;`.
- `.list-roman` -- Sets `list-style-type: upper-roman;`.
- `.list-lower-roman` -- Sets `list-style-type: lower-roman;`.
- `.list-alpha` -- Sets `list-style-type: upper-alpha;`.
- `.list-lower-alpha` -- Sets `list-style-type: lower-alpha;`.

### List Style Position

- `.list-inside` -- Sets `list-style-position: inside;`.
- `.list-outside` -- Sets `list-style-position: outside;` (default).

### Text Alignment

- `.text-left` -- Sets `text-align: left;`.
- `.text-center` -- Sets `text-align: center;`.
- `.text-right` -- Sets `text-align: right;`.
- `.text-justify` -- Sets `text-align: justify;`.
- `.text-start` -- Sets `text-align: start;` (logical property, aligns left in LTR, right in RTL).
- `.text-end` -- Sets `text-align: end;` (logical property, aligns right in LTR, left in RTL).

### Text Color

_(Refer to your framework's color palette for specific classes like `.text-primary`, `.text-gray-700`, `.text-red-500`)_

- `.text-inherit` -- Sets `color: inherit;`.
- `.text-current` -- Sets `color: currentColor;`.
- `.text-transparent` -- Sets `color: transparent;`.
  _(Write/Find opacity variants like `.text-black-op-50` in the color.css file, not here)_

### Text Decoration Line

- `.underline` -- Sets `text-decoration-line: underline;`.
- `.overline` -- Sets `text-decoration-line: overline;`.
- `.line-through` -- Sets `text-decoration-line: line-through;`.
- `.no-underline` -- Sets `text-decoration-line: none;` (removes all decoration lines).

### Text Decoration Color

_(Write/Find the framework's color palette for specific classes like `.decoration-primary`, `.decoration-red-500`) in the colors.css file, not here_

- `.decoration-inherit` -- Sets `text-decoration-color: inherit;`.
- `.decoration-current` -- Sets `text-decoration-color: currentColor;`.
- `.decoration-transparent` -- Sets `text-decoration-color: transparent;`.

### Text Decoration Style

- `.decoration-solid` -- Sets `text-decoration-style: solid;` (default).
- `.decoration-double` -- Sets `text-decoration-style: double;`.
- `.decoration-dotted` -- Sets `text-decoration-style: dotted;`.
- `.decoration-dashed` -- Sets `text-decoration-style: dashed;`.
- `.decoration-wavy` -- Sets `text-decoration-style: wavy;`.

### Text Decoration Thickness

- `.decoration-auto` -- Sets `text-decoration-thickness: auto;` (browser default).
- `.decoration-from-font` -- Sets `text-decoration-thickness: from-font;` (uses font's suggested thickness).
- `.decoration-0` -- Sets `text-decoration-thickness: 0px;` (effectively hides decoration if line is set).
- `.decoration-1` -- Sets `text-decoration-thickness: 1px;`.
- `.decoration-2` -- Sets `text-decoration-thickness: 2px;`.
- `.decoration-4` -- Sets `text-decoration-thickness: 4px;`.
- `.decoration-8` -- Sets `text-decoration-thickness: 8px;`.

### Text Underline Offset

- `.underline-offset-auto` -- Sets `text-underline-offset: auto;`.
- `.underline-offset-0` -- Sets `text-underline-offset: 0;`.
- `.underline-offset-1` -- Sets `text-underline-offset: 1px;` (or a scaled unit).
- `.underline-offset-2` -- Sets `text-underline-offset: 2px;` (or a scaled unit).
- `.underline-offset-4` -- Sets `text-underline-offset: 4px;` (or a scaled unit).
- `.underline-offset-8` -- Sets `text-underline-offset: 8px;` (or a scaled unit).

### Text Underline Position

- `.underline-pos-auto` -- Sets `text-underline-position: auto;` (default).
- `.underline-pos-under` -- Sets `text-underline-position: under;` (ensures underline is below descenders).
- `.underline-pos-left` -- Sets `text-underline-position: left;` (for vertical writing modes).
- `.underline-pos-right` -- Sets `text-underline-position: right;` (for vertical writing modes).

### Text Transform

- `.uppercase` -- Sets `text-transform: uppercase;`.
- `.lowercase` -- Sets `text-transform: lowercase;`.
- `.capitalize` -- Sets `text-transform: capitalize;`.
- `.normal-case` -- Sets `text-transform: none;` (resets transformation).

### Text Overflow

- `.truncate` -- Applies `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` for single-line truncation.
- `.text-ellipsis` -- Applies `text-overflow: ellipsis;` (needs `overflow: hidden` and non-wrapping `white-space` on the element).
- `.text-clip` -- Applies `text-overflow: clip;` (cuts off text at the container edge).

### Text Indent

- `.indent-0` -- Sets `text-indent: 0;`.
- `.indent-xs` -- Sets `text-indent: 1px;`.
- `.indent-sm` -- Sets `text-indent` to a small scaled unit (e.g., 0.25rem).
- `.indent-base` -- Sets `text-indent` to a medium scaled unit (e.g., 0.5rem).
- `.indent-lg` -- Sets `text-indent` to a larger scaled unit (e.g., 1rem).
- `.indent-xl` -- Sets `text-indent` to an even larger scaled unit (e.g., 2rem).

### Text Orientation (For vertical writing modes)

- `.orientation-mixed` -- Sets `text-orientation: mixed;` (rotates CJK, keeps Latin upright).
- `.orientation-upright` -- Sets `text-orientation: upright;` (keeps all characters upright).
- `.orientation-sideways` -- Sets `text-orientation: sideways;` (rotates all characters).

### Text Shadow (Simple presets)

_Make/Get the text shadow color from the color of the text itself, for example is the text color is blue then intelligentely lighten up the text color's blue by 80% and create a lighter, subtle blue for the text shadow_

- `.text-shadow-none` -- Sets `text-shadow: none;`.
- `.text-shadow-xs` -- Applies a xtra-small, subtle text shadow.
- `.text-shadow-sm` -- Applies a small text shadow.
- `.text-shadow-base` -- Applies a default text shadow.
- `.text-shadow-lg` -- Applies a large text shadow.

### Vertical Alignment (For inline, inline-block, and table-cell elements)

- `.align-baseline` -- Sets `vertical-align: baseline;` (default).
- `.align-top` -- Sets `vertical-align: top;`.
- `.align-middle` -- Sets `vertical-align: middle;`.
- `.align-bottom` -- Sets `vertical-align: bottom;`.
- `.align-text-top` -- Sets `vertical-align: text-top;`.
- `.align-text-bottom` -- Sets `vertical-align: text-bottom;`.
- `.align-sub` -- Sets `vertical-align: sub;`.
- `.align-super` -- Sets `vertical-align: super;`.

### Whitespace

- `.whitespace-normal` -- Sets `white-space: normal;` (default, wraps text).
- `.whitespace-nowrap` -- Sets `white-space: nowrap;` (prevents text wrapping).
- `.whitespace-pre` -- Sets `white-space: pre;` (preserves whitespace, no wrapping).
- `.whitespace-pre-line` -- Sets `white-space: pre-line;` (collapses spaces, preserves newlines, wraps).
- `.whitespace-pre-wrap` -- Sets `white-space: pre-wrap;` (preserves spaces and newlines, wraps).
- `.whitespace-break-spaces` -- Sets `white-space: break-spaces;` (like `pre-wrap` but sequences of spaces also take up space and wrap).

### Word Break

- `.break-normal` -- Sets `word-break: normal; overflow-wrap: normal;` (default breaking rules).
- `.break-words` -- Sets `overflow-wrap: break-word;` (allows unbreakable words to be broken).
- `.break-all` -- Sets `word-break: break-all;` (breaks words at any character to prevent overflow, mainly for CJK).
- `.break-keep` -- Sets `word-break: keep-all;` (prevents breaking for CJK text).

### Writing Mode

- `.writing-mode-horizontal-tb` -- Sets `writing-mode: horizontal-tb;` (default horizontal, top-to-bottom).
- `.writing-mode-vertical-rl` -- Sets `writing-mode: vertical-rl;` (vertical, right-to-left lines).
- `.writing-mode-vertical-lr` -- Sets `writing-mode: vertical-lr;` (vertical, left-to-right lines).

### Hyphens

- `.hyphens-none` -- Sets `hyphens: none;` (no automatic hyphenation).
- `.hyphens-manual` -- Sets `hyphens: manual;` (hyphenates only at `&shy;` or `<wbr>`).
- `.hyphens-auto` -- Sets `hyphens: auto;` (browser automatically hyphenates words where appropriate). Note: Requires `lang` attribute on `<html>` or element for correct hyphenation dictionaries.

### Text Align Last (How the last line of a block or a line right before a forced break is aligned)

- `.text-align-last-auto` -- Sets `text-align-last: auto;` (default, same as `text-align` unless `text-align: justify`).
- `.text-align-last-start` -- Sets `text-align-last: start;`.
- `.text-align-last-end` -- Sets `text-align-last: end;`.
- `.text-align-last-left` -- Sets `text-align-last: left;`.
- `.text-align-last-right` -- Sets `text-align-last: right;`.
- `.text-align-last-center` -- Sets `text-align-last: center;`.
- `.text-align-last-justify` -- Sets `text-align-last: justify;`.

### Text Justify (How justified text should be spaced)

- `.text-justify-auto` -- Sets `text-justify: auto;` (browser determines justification method).
- `.text-justify-inter-word` -- Sets `text-justify: inter-word;` (justification by adjusting space between words).
- `.text-justify-inter-character` -- Sets `text-justify: inter-character;` (justification by adjusting space between characters, mainly for CJK).
- `.text-justify-none` -- Sets `text-justify: none;` (disables justification methods).

### User Select (Controls whether the user can select text)

- `.select-none` -- Sets `user-select: none;` (text cannot be selected).
- `.select-text` -- Sets `user-select: text;` (text can be selected).
- `.select-all` -- Sets `user-select: all;` (clicking selects all content within the element).
- `.select-auto` -- Sets `user-select: auto;` (browser default selection behavior).
  Note: `user-select` often required vendor prefixes in the past (`-webkit-user-select`, `-moz-user-select`, `-ms-user-select`) but is now well-supported unprefixed in modern browsers.

### Add the following

## Text Direction

- `.text-ltr { direction: ltr !important; }`
- `.text-rtl { direction: rtl !important; }`

## Text Stroke Utilities

- `.text-stroke-xs { -webkit-text-stroke-width: 1px; }`
- `.text-stroke-sm { -webkit-text-stroke-width: 2px; }`
- `.text-stroke-base { -webkit-text-stroke-width: 4px; }`

## Hyphenation Utilities

- `.hyphens-auto { hyphens: auto; }`
- `.hyphens-manual { hyphens: manual; }`
- `.hyphens-none { hyphens: none; }`

## Advanced Typography Features

- `.drop-cap::first-letter {
  float: left;
  font-size: 3em;
  line-height: 0.8;
  padding-right: 0.1em;
  padding-top: 0.1em;
}`

- `.text-wrap-balance {
  text-wrap: balance;
}`

- `.text-wrap-pretty {
  text-wrap: pretty;
}`

- `.text-wrap-stable {
  text-wrap: stable;
}`

- `.pretty-quote::before {
  content: open-quote;
}`

- `.pretty-quote::after {
  content: close-quote;
}`

- `.gradient-text {
    background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}`
