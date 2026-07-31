# UI & UX Guidelines

## Responsive Breakpoints
- **Mobile**: `< 640px` — Collapsible hamburger drawer, stacked metric cards.
- **Tablet**: `640px - 1024px` — Two-column metric grids, compact sidebar mode.
- **Desktop**: `> 1024px` — Expanded sidebar navigation, multi-column dashboard.

## Micro-Interactions & Animation Rules
- **Framer Motion**: Use `framer-motion` for sidebar expansion, modal open/close, and command palette transitions.
- **Duration**: Keep transitions between `150ms` and `250ms` using `ease: [0.16, 1, 0.3, 1]`.
- **Accessibility**: Ensure keyboard focus rings (`focus-visible:ring-2`) are always visible for keypress users.
