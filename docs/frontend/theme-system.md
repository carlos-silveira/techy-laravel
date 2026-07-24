# Theme System

TechyNews supports dynamic Light and Dark modes to provide a premium reading experience regardless of the user's environment.

## Architecture

The theme state is managed globally and persisted in the user's browser.

1. **State Management**: A dedicated React context or hook (e.g., `useTheme`) manages the current theme state (`light` or `dark`).
2. **Persistence**: The selected theme is saved in `localStorage` so the preference is remembered across sessions.
3. **DOM Manipulation**: The theme manager applies the `dark` class to the root `<html>` element based on the active state.

## Tailwind Configuration

We utilize Tailwind's dark mode feature via the `class` strategy.

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enables dark mode toggling via the 'dark' class on the HTML element
  // ...
}
```

## Styling for Dark Mode

When building components, you must define both light and dark mode styles using Tailwind's `dark:` modifier.

**Example:**
```jsx
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
    <h1 className="text-2xl font-bold">Hello World</h1>
</div>
```

**Guidelines:**
- **Backgrounds:** Use subtle off-whites for light mode and deep, rich dark grays/blues for dark mode. Avoid pure `#000000` or `#FFFFFF`.
- **Text:** Ensure high contrast. Use `text-gray-900` for light mode and `text-gray-100` for dark mode.
- **Borders:** Use `border-gray-200` for light mode and `border-gray-700` for dark mode to maintain visual separation without being too stark.
