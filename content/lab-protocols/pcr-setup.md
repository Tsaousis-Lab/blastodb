---
layout: layouts/lab-protocol.njk
title: (EXAMPLE) PCR Setup Guide
description: Best practices for setting up polymerase chain reactions with troubleshooting tips
tags: [PCR, Molecular, Amplification]
date: 2024-01-20
short-description: Complete guide for PCR setup and optimization
---

[hero:]
# {{ title }}
[:hero]


## Overview
This guide covers the essentials for successful PCR amplification with troubleshooting strategies.

## Master Mix Components (per 50 µL reaction)
- Template DNA: 1-5 ng
- Forward primer: 0.2 µM
- Reverse primer: 0.2 µM
- dNTPs: 200 µM each
- Taq polymerase: 1.25 units
- Taq buffer: 1x
- MgCl₂: 2 mM
- ddH₂O: to final volume

## Standard PCR Protocol

### Preparation
1. Thaw all reagents on ice
2. Prepare master mix (n+1 reactions)
3. Aliquot into PCR tubes or plates
4. Add template DNA as last step

### Cycling Program
```
Initial Denaturation: 95°C for 5 minutes
[
  Denaturation: 95°C for 30 seconds
  Annealing: Tm ± 5°C for 30 seconds
  Extension: 72°C for 1 min per kb
] × 30-35 cycles
Final Extension: 72°C for 10 minutes
Hold: 4°C until use
```

## Troubleshooting

### No PCR Product
- Check template DNA concentration and quality
- Verify primer design and concentration
- Increase annealing temperature
- Increase polymerase units

### Nonspecific Bands
- Decrease annealing temperature
- Reduce template DNA amount
- Decrease polymerase units
- Add betaine or formamide

### Weak Product
- Check primer efficiency
- Increase template DNA amount
- Increase number of cycles (up to 40)
- Add DMSO (5-10% final)
