# Inverso Design System

**Inverso** is a dashboard/product UI system built on top of the *SnowUI* / *ByeWind* design foundation. This design system captures Inverso's brand mark and extends the SnowUI foundation with Inverso-specific brand guidance so agents can generate well-branded interfaces, prototypes, slides, and marketing assets.

## Source

- **Figma file:** "INVERSO DESIGN SYSTEM.fig" (attached as a virtual filesystem). Notable pages used here: `/Design-system`, `/Dashboard---Light-mode`, `/Button`, `/Card`, `/Input-Form`, `/Table`, `/Chart`, `/Tag-Badge`, `/Notification`, `/Search`, `/Tooltip`, `/Icon`.
- **Uploaded brand files:**
  - `uploads/InversoLogoPNG.png` — black wordmark + mint icon (primary lockup)
  - `uploads/InversoIconPNG.png` — mint starburst mark alone
  - `uploads/InversoLogoWhiteSVG.png` — mint mark + white wordmark (for dark surfaces)

## Product context

The Figma contains dashboards for: eCommerce, Projects, Overview, Orders, Users, Mail, Chat, Contacts, Invoicing, Charts, Authentication flows, Account settings, and Error/Maintenance pages. All mocks are laid out for a classic three-column SaaS admin shell: left sidebar (nav + favorites), center canvas (stat cards, charts, tables), optional right rail (notifications / activities / contacts).

## Index (root files)

| File                           | Purpose |
|--------------------------------|---------|
| `README.md`                    | This document. |
| `SKILL.md`                     | Agent-Skill entry point — read first if this system is loaded as a skill. |
| `colors_and_type.css`          | Single-source-of-truth CSS custom properties + semantic type classes. |
| `assets/`                      | Logos and brand marks (PNG). |
| `preview/`                     | Cards rendered in the Design System review tab. |
| `ui_kits/dashboard/`           | Dashboard UI kit — click-through admin shell. |

## CONTENT FUNDAMENTALS

Inverso's copy is **dashboard-professional**: short, declarative, data-forward. It sounds like a control panel, not a marketing page.

- **Voice:** neutral, third-person about the user (`ByeWind`, `Andi Lane subscribed to you`). App-level copy favors *sentence fragments* over full sentences.
- **Casing:**
  - Section titles: **Title Case** (`Top Selling Products`, `Revenue by Location`, `Projections vs Actuals`).
  - Nav items: **Title Case** (`Overview`, `Projects`, `Campaigns`, `Followers`).
  - Button labels: **Title Case**, verb-first (`Add Data`, `Sign In`, `Reset Password`).
  - Tags/badges: **Title Case** single words (`In Progress`, `Complete`, `Pending`, `Approved`, `Rejected`).
  - Metrics/values: numerals with abbreviations (`72K`, `39K`, `$695`, `+15.03%`).
- **Notifications** are past-tense, agent-anonymous fragments: `You fixed a bug`, `Released a new version`, `Submitted a bug`, `Modified A data in Page X`, `Deleted a page in Project X`. Timestamps sit underneath as `Just now`, `59 minutes ago`, `12 hours ago`, `Today, 11:59 AM`, `Feb 2, 2024`.
- **Activity rows** mirror notification grammar — no subject, no period.
- **Empty / error states** are plain: `No data`, `Something went wrong`, `Coming Soon`, `Under Maintenance`.
- **Pronouns:** avoid *I/you* where possible. Use *you* only on auth screens and confirmations (`Welcome back`, `Forgot your password?`).
- **Tone toggle:** the system itself is neutral and dense; marketing surfaces (`Pricing`, `Coming Soon`) can add warmer, slightly longer copy — but still sentence-fragment-forward.
- **No emoji** in product chrome. Emoji may appear inside user-generated content only (chat messages, comments).
- **Icons replace words** wherever a 16/20px icon would do: sidebar, toolbars, table actions.

### Examples pulled from the system
- Stat card: `Views / 3,781 / +11.01%`
- Section title: `Projections vs Actuals`
- Activity: `Changed the style. / Just now`
- Table header: `Name · Price · Quantity · Amount`
- Auth: `Sign In`, `Forgot Password`, `Setup New Password`, `Two Step Verification`, `Choose Account Type`

## VISUAL FOUNDATIONS

Inverso reads as a **quiet, monochrome, data-dense admin system** with a single living accent (mint, from the logo mark) and a pastel chart palette.

### Color
- **Dominant:** black (`rgb(28,28,28)`) and white; together they account for ~90% of the pixels. Text, icons, charts and primary buttons all use the black scale.
- **Brand accent:** mint (`rgb(170,225,201)`) — reserved for the logo mark, brand callouts, hero moments, success glyphs. Never used as a primary CTA fill.
- **Secondary palette (soft):** pastel purple / indigo / blue / cyan / mint / green / yellow / orange / red — used as tag backgrounds, chart fills, illustration tints. Low chroma.
- **Vivid palette (iOS/macOS theme):** same hues saturated; used on the iOS/macOS dashboard variant and as status colors (success green, warning orange, danger red).
- **Backgrounds:** 5-step neutral ramp from pure white (`#FFFFFF`) → canvas (`#F7F9FB`) → recessed (`#F6F6F6`) → tinted strip (`#E5ECF6`) → info (`#E3F5FF`).

### Type
- **Single family: Inter.** Weights in use are 400 Regular and 600 Semibold. A handful of decorative headlines use Plus Jakarta Sans ExtraBold.
- **Scale:** 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64 — powers-of-∼1.4 ladder. Body defaults to 14/20. Table/side-nav text is 14 Regular. Metric values are 24–32 Semibold. Display headlines go to 48–64 Semibold.
- **Tracking:** headings tighten to ~-0.02em; body is neutral.

### Spacing & radii
- All spacing and radius values are **multiples of 4** (0, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 80). Target ≤16 values total.
- **Radii** lean small: cards and buttons commonly use 8; stat tiles use 16; full pills use `9999px`.
- **Icon sizes:** 16, 20, 24 dominate; 28/32/40/80 appear in hero illustrations and avatars.

### Backgrounds & imagery
- **Flat, not photographic.** The dashboard uses flat surfaces, thin hairlines, and subtle tints — never full-bleed photography in product chrome.
- **Illustrations:** when present (empty states, onboarding), use flat geometric illustrations with the pastel secondary palette, never gradients or hand-drawn texture.
- **No repeating patterns, no textures, no grain.**
- **Gradients** appear only as chart area-fills (solid → transparent of the same hue).

### Motion
- **Subtle and short.** 120–320ms. Ease-out or "standard" cubic-bezier (0.2, 0.8, 0.2, 1).
- **No bounce, no spring.** Panel transitions are fades + 4–8px translates. Sidebars slide.
- Chart entrances: bars grow up, lines draw left-to-right over ~600ms.

### Interaction states
- **Hover:** on text/icon buttons, background tints to `rgba(0,0,0,0.05)`; on filled buttons, fill darkens by ~6%.
- **Press:** no shrink. Fill darkens another ~4%.
- **Focus:** 3px outer ring in `rgba(28,28,28,0.15)` (neutral) or mint for brand moments. Ring is outside the shape; never inner-stroke.
- **Disabled:** 40% opacity on content; background stays.

### Borders, shadows, elevation
- **Borders** are 1px, `rgba(0,0,0,0.1)`. Strong borders bump to `rgba(0,0,0,0.2)`.
- **Shadows:**
  - Drop 1 (hairline): `0 1px 2px rgba(0,0,0,0.05)` — inputs, resting cards.
  - Drop 2 (popover/card hover): `0 4px 12px rgba(0,0,0,0.08)`.
  - Inner: `inset 0 0 0 1px rgba(0,0,0,0.05)` — subtle tile treatment.
  - Focus ring as above.
- **Cards:** white fill, 1px hairline border **or** 16-radius tinted tile with no border. Tables live inside cards with hairline row dividers.

### Transparency & blur
- Right-rail/panel scrims over charts use `rgba(255,255,255,0.4)` + `backdrop-filter: blur(40px)`.
- Backdrop blur otherwise reserved for iOS/macOS variants.

### Layout rules
- **Fixed chrome:** 212px left sidebar (collapsible to 56px), optional 280px right rail. Top bar is 52px.
- **Canvas:** 24px outer padding, 24px gap between cards.
- **Tables** flush to card edges; row height 44px; 16px horizontal cell padding.
- **Grid:** desktop 12-col, 24px gutter. Mobile single-column, 16px outer padding.

### Card anatomy
- **Background:** white or `--bg-2` tile.
- **Radius:** 8 for standard cards; 16 for "highlight" tiles (stat tiles, side modules).
- **Border:** 1px hairline black-10, OR no border + tinted fill.
- **Shadow:** none at rest. Elevated variants pick up `--shadow-drop-1`.
- **Padding:** 16 (dense) or 24 (comfortable).

## ICONOGRAPHY

The Figma's `/Icon` page uses **Phosphor Icons** as the primary icon system, with a custom "SnowUI Icons" extension for app-specific glyphs.

- **Style:** Phosphor **Regular** weight is the default. **Duotone** variants appear for sidebar nav and emphasis moments. All icons are monochrome and inherit `currentColor`.
- **Size tokens:** 16 (in-text, tags), 20 (default — buttons, table actions), 24 (sidebar, stat header), 28–32 (empty-state, illustration hero).
- **Usage:**
  - Sidebar nav: 20px duotone, left-aligned, 12px gap to label.
  - Inline/table actions: 20px regular, no label (use tooltip for semantics).
  - Buttons: 16px regular, right-aligned for forward actions, left-aligned for start-of-label glyphs.
- **No emoji** in chrome. **No unicode-character icons** (`→`, `⌘`, `↑↓`) except inside keyboard-shortcut pills.
- **No PNG icons** anywhere — SVG only.
- **No hand-drawn SVGs** — pull from Phosphor or the provided sprite.

### Access
- At runtime, use the **Phosphor web CDN**: `<script src="https://unpkg.com/@phosphor-icons/web"></script>` and render `<i class="ph ph-house"></i>`. This is flagged as a substitution for the Figma's Phosphor library license — swap to licensed files if producing shippable code.
- **Brand mark:** `assets/inverso-icon.png` (mint starburst) for favicons/app icons; `assets/inverso-logo.png` for the primary black lockup; `assets/inverso-logo-white.png` for dark surfaces.

## Substitution flags

Items below are **best-effort matches**, not the original licensed files:

- **Inter font:** loaded from Google Fonts rather than the Figma's private copy. Weights 400/500/600/700.
- **Plus Jakarta Sans** (used for one or two display moments): also Google Fonts.
- **Phosphor Icons:** CDN-hosted web font vs. the Figma's Phosphor component library.

If you have the originals, drop them into `fonts/` and `assets/icons/` and update `colors_and_type.css` and any icon imports accordingly.

## Components

Exposed on `window.InversoDesignSystem_fbeb27` and previewed as cards in the **UI Kit — Dashboard** group:

- **Sidebar** — left navigation (Favorites, Dashboards, Pages).
- **TopBar** — breadcrumb + global search + action icons.
- **StatTile** — KPI tile with value, delta, and click highlight.
- **DataTable** — top-selling-products table pattern.
- **RightRail** — notifications + activities + contacts panel.
