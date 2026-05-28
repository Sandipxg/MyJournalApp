# Tailwind CSS

## What it is
Utility-first CSS framework. Instead of writing custom CSS, you compose styles using small utility classes directly in JSX.

## Syntax / Usage
```jsx
// Layout
<div className="flex items-center justify-between gap-4 p-4">

// Typography
<h1 className="text-2xl font-bold text-gray-800">Title</h1>

// Colors & backgrounds
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">

// Spacing
<div className="mt-4 mb-2 px-6 py-3">

// Borders & shadows
<div className="rounded-lg border border-gray-200 shadow-md">

// Responsive
<div className="text-sm md:text-base lg:text-lg">

// Hover / focus states
<button className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2">

// Conditional classes (use clsx or template literals)
import clsx from "clsx";
<div className={clsx("p-4", isActive && "bg-blue-100", error && "border-red-500")}>
```

## When to use
- Rapid UI development without leaving JSX
- Design systems with consistent spacing/color tokens
- Works great with component libraries

## Gotchas
- Install and configure `tailwind.config.js` properly
- Purge/content config must include your JSX files or classes get stripped in production
- Avoid building class names dynamically with string concatenation — Tailwind can't detect them

## My notes / examples

