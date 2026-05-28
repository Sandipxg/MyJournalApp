# Tailwind CSS

## What is Tailwind CSS?

**Tailwind** is a **utility-first CSS framework**. Instead of writing custom CSS, you compose styles using pre-built utility classes directly in your JSX.

**Benefits:**
- ✅ Rapid development
- ✅ Consistent design system
- ✅ No naming conflicts
- ✅ Responsive design built-in
- ✅ Smaller bundle size (with purging)

---

## Installation

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure `tailwind.config.js`
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add to `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Core Concepts

### Utility Classes
Every class does one thing:

```jsx
// Instead of writing CSS:
<div style={{ padding: '16px', backgroundColor: 'blue', color: 'white' }}>

// Use utility classes:
<div className="p-4 bg-blue-500 text-white">
```

---

## Layout

### Flexbox
```jsx
// Flex container
<div className="flex">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Flex direction
<div className="flex flex-col">       // column
<div className="flex flex-row">       // row (default)
<div className="flex flex-row-reverse"> // reverse

// Justify content
<div className="flex justify-start">    // flex-start
<div className="flex justify-center">   // center
<div className="flex justify-between">  // space-between
<div className="flex justify-around">   // space-around
<div className="flex justify-evenly">   // space-evenly

// Align items
<div className="flex items-start">    // flex-start
<div className="flex items-center">   // center
<div className="flex items-end">      // flex-end
<div className="flex items-stretch">  // stretch

// Gap
<div className="flex gap-4">  // 1rem gap
<div className="flex gap-2">  // 0.5rem gap
```

### Grid
```jsx
// Grid container
<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Grid template columns
<div className="grid grid-cols-2">     // 2 equal columns
<div className="grid grid-cols-3">     // 3 equal columns
<div className="grid grid-cols-[200px_1fr]"> // Fixed + flexible
```

---

## Spacing

### Padding & Margin
```jsx
// Padding
<div className="p-4">      // padding: 1rem (all sides)
<div className="px-4">     // padding-left & padding-right
<div className="py-4">     // padding-top & padding-bottom
<div className="pt-4">     // padding-top
<div className="pr-4">     // padding-right
<div className="pb-4">     // padding-bottom
<div className="pl-4">     // padding-left

// Margin (same pattern)
<div className="m-4">      // margin: 1rem
<div className="mx-auto">  // margin-left & margin-right: auto (center)
<div className="mt-8">     // margin-top: 2rem
<div className="-mt-4">    // negative margin-top

// Spacing scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64
// 4 = 1rem = 16px
```

---

## Typography

```jsx
// Font size
<p className="text-xs">    // 0.75rem
<p className="text-sm">    // 0.875rem
<p className="text-base">  // 1rem (default)
<p className="text-lg">    // 1.125rem
<p className="text-xl">    // 1.25rem
<p className="text-2xl">   // 1.5rem
<p className="text-3xl">   // 1.875rem
<p className="text-4xl">   // 2.25rem

// Font weight
<p className="font-thin">      // 100
<p className="font-light">     // 300
<p className="font-normal">    // 400
<p className="font-medium">    // 500
<p className="font-semibold">  // 600
<p className="font-bold">      // 700
<p className="font-extrabold"> // 800

// Text align
<p className="text-left">
<p className="text-center">
<p className="text-right">
<p className="text-justify">

// Text color
<p className="text-gray-900">
<p className="text-blue-500">
<p className="text-red-600">

// Line height
<p className="leading-none">    // 1
<p className="leading-tight">   // 1.25
<p className="leading-normal">  // 1.5
<p className="leading-relaxed"> // 1.625
<p className="leading-loose">   // 2
```

---

## Colors

```jsx
// Background
<div className="bg-white">
<div className="bg-gray-100">
<div className="bg-blue-500">
<div className="bg-red-600">

// Text
<p className="text-gray-900">
<p className="text-blue-500">

// Border
<div className="border-gray-300">
<div className="border-blue-500">

// Color scale: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900
// 500 is the base color
```

---

## Borders & Shadows

```jsx
// Border
<div className="border">           // 1px border
<div className="border-2">         // 2px border
<div className="border-4">         // 4px border
<div className="border-t">         // top only
<div className="border-r">         // right only
<div className="border-b">         // bottom only
<div className="border-l">         // left only

// Border radius
<div className="rounded">          // 0.25rem
<div className="rounded-md">       // 0.375rem
<div className="rounded-lg">       // 0.5rem
<div className="rounded-xl">       // 0.75rem
<div className="rounded-full">     // 9999px (circle)
<div className="rounded-t-lg">     // top corners only

// Shadow
<div className="shadow-sm">        // small shadow
<div className="shadow">           // default shadow
<div className="shadow-md">        // medium shadow
<div className="shadow-lg">        // large shadow
<div className="shadow-xl">        // extra large shadow
<div className="shadow-none">      // no shadow
```

---

## Responsive Design

Tailwind uses mobile-first breakpoints:

```jsx
// Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

// Mobile first - this is mobile by default, then changes at md
<div className="text-sm md:text-base lg:text-lg">

// Hide on mobile, show on desktop
<div className="hidden md:block">

// Show on mobile, hide on desktop
<div className="block md:hidden">

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

// Responsive padding
<div className="p-4 md:p-8 lg:p-12">
```

---

## Hover, Focus, Active States

```jsx
// Hover
<button className="bg-blue-500 hover:bg-blue-600">

// Focus
<input className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">

// Active
<button className="bg-blue-500 active:bg-blue-700">

// Disabled
<button className="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed">

// Group hover (hover parent affects child)
<div className="group">
  <p className="text-gray-500 group-hover:text-blue-500">Hover me</p>
</div>
```

---

## Dark Mode

```jsx
// Enable dark mode in tailwind.config.js
export default {
  darkMode: 'class', // or 'media'
  // ...
}

// Use dark: prefix
<div className="bg-white dark:bg-gray-900">
<p className="text-gray-900 dark:text-white">

// Toggle dark mode
<html className="dark">
```

---

## Common Patterns

### Button
```jsx
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
  Click me
</button>
```

### Card
```jsx
<div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-bold mb-2">Title</h2>
  <p className="text-gray-600">Content</p>
</div>
```

### Input
```jsx
<input 
  type="text"
  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="Enter text"
/>
```

### Navbar
```jsx
<nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
  <div className="text-xl font-bold">Logo</div>
  <div className="flex gap-4">
    <a href="#" className="text-gray-600 hover:text-blue-500">Home</a>
    <a href="#" className="text-gray-600 hover:text-blue-500">About</a>
    <a href="#" className="text-gray-600 hover:text-blue-500">Contact</a>
  </div>
</nav>
```

---

## Using with clsx

```jsx
import clsx from 'clsx';

function Button({ variant, size, disabled }) {
  return (
    <button className={clsx(
      'px-4 py-2 rounded font-medium transition-colors',
      variant === 'primary' && 'bg-blue-500 text-white hover:bg-blue-600',
      variant === 'secondary' && 'bg-gray-500 text-white hover:bg-gray-600',
      size === 'small' && 'text-sm px-3 py-1',
      size === 'large' && 'text-lg px-6 py-3',
      disabled && 'opacity-50 cursor-not-allowed'
    )}>
      Click me
    </button>
  );
}
```

---

## Real-World Example

```jsx
function ProductCard({ product }) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.onSale && (
          <span className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            SALE
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        
        {/* Button */}
        {product.inStock ? (
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors">
            Add to Cart
          </button>
        ) : (
          <button className="w-full px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed" disabled>
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
```

---

## Quick Reference

```jsx
// Layout
flex, grid, block, inline-block, hidden

// Spacing
p-4, m-4, px-4, py-4, mx-auto, gap-4

// Sizing
w-full, h-screen, max-w-md, min-h-screen

// Typography
text-lg, font-bold, text-center, text-gray-900

// Colors
bg-blue-500, text-white, border-gray-300

// Borders
border, rounded-lg, shadow-md

// States
hover:bg-blue-600, focus:ring-2, disabled:opacity-50

// Responsive
md:text-lg, lg:grid-cols-3, hidden md:block
```

