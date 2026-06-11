---
layout: layouts/guide.njk
title: BlastoDB — Colors
description: Design tokens, colour palette, and shadow values for BlastoDB.
---

[hero: text-align:center]
<h-hero>Colors</h-hero>
[:hero]

All colours are defined as CSS custom properties in `:root` inside `style.css`. Always use the token, never a raw hex value — this keeps future palette changes to one place.

---

## Accent — Teal

The primary brand colour. Teal signals trustworthiness and scientific precision without being clinical.

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:1rem;margin:1.5rem 0;">

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#1b8a7f;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--accent</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#1b8a7f</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Links, interactive elements</span>
</div></div>

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#0d5a53;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--accent-dark</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#0d5a53</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Button fill, hover states, tag text</span>
</div></div>

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#05403c;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--accent-darker</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#05403c</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Deep hover, pressed states</span>
</div></div>

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#c8ebe5;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--accent-pale</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#c8ebe5</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Selection highlight, code background, nav hover</span>
</div></div>

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#d4f0eb;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--tag-bg</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#d4f0eb</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Tag pill fill</span>
</div></div>

</div>

---

## Text

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:1rem;margin:1.5rem 0;">

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#1a1a18;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--text / --ink</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#1a1a18</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Primary body text, headings. `--ink` is used for the dark footer background.</span>
</div></div>

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#6b6860;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--text-muted</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#6b6860</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Secondary labels, dates, captions, muted tag text</span>
</div></div>

</div>

---

## Backgrounds & Surfaces

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:1rem;margin:1.5rem 0;">

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#ffffff;border-bottom:1px solid var(--border);"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--bg / --surface</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#ffffff</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Page background, dropdown panels, nav bar</span>
</div></div>

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#f9f8f6;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--card-bg</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#f9f8f6</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Cards, hero panels, collector items</span>
</div></div>

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#f0e6d2;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--dark-highlight</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#f0e6d2</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Warm highlight, occasional use</span>
</div></div>

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#ece9e2;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">(muted tag)</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#ece9e2</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">Background of `.tag-muted` pills — no token, defined inline in CSS</span>
</div></div>

</div>

---

## Borders

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:1rem;margin:1.5rem 0;">

<div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;">
<div style="height:64px;background:#e2e0da;"></div>
<div style="padding:0.75rem 1rem;">
<code style="background:none;color:var(--text);padding:0;font-size:0.8rem;">--border</code><br>
<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);">#e2e0da</span><br>
<span style="font-size:0.82rem;color:var(--text-muted);">All dividers, card borders, input borders</span>
</div></div>

</div>

---

## Shadows

Shadow tokens are used as `box-shadow` values. No swatch, but each has a distinct role.

| Token | Value | Use |
|---|---|---|
| `--shadow` | `0 1px 4px rgba(0,0,0,0.08)` | Resting card lift |
| `--shadow-hover` | `0 3px 10px rgba(13,90,83,0.2)` | Card on hover — teal-tinted so it matches the palette |
| `--shadow-dropdown` | `0 4px 12px rgba(0,0,0,0.1)` | Floating menus and dropdowns |
