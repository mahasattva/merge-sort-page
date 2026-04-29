# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A standalone, single-file merge sort visualizer (`index.html`). No build tools, dependencies, or package manager — open directly in a browser.

## Running

```
open index.html        # macOS
# or open with any browser
```

## Architecture

Everything lives in `index.html` as a single-page app:

- **CSS** (lines 7–289): Styling for input grid, animated bars (`.array-bar`, states: `.sorted`, `.comparing`, `.merging`), stats, and speed control.
- **HTML** (lines 291–332): Layout with `#inputGrid`, `#arrayContainer`, stat boxes, and speed slider.
- **JavaScript** (lines 334–562): All logic inline.
  - `initializeInputs()` — builds 10 number inputs with random defaults.
  - `displayArray(arr, highlighting)` — re-renders bars with optional highlight states.
  - `mergeSort(arr, start, end, sorted)` — async recursive divide step with `await sleep()` for animation.
  - `merge(arr, start, mid, end, sorted)` — async merge step; increments `comparisons` and `swaps` counters.
  - Animation speed is controlled by `speedSlider` (1–100); `getSpeed()` inverts it so higher = faster.

## Key Patterns

- The `sorted` array tracks which indices are fully sorted and is passed through recursion to maintain persistent green highlighting.
- `isAnimating` flag prevents re-entry during animation; both buttons are disabled while sorting runs.
- Bar heights are proportional: `(value / maxValue) * 100%`.
