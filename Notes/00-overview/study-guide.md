# React Study Guide

## 🎯 How to Use This Guide

This study guide helps you navigate your React learning journey effectively. Use it alongside the notes in this folder.

---

## 📅 Weekly Study Plan

### Week 1: JSX & Components
**Goal:** Understand React's building blocks

**Study:**
- `01-fundamentals/jsx.md`
- `01-fundamentals/components-props.md`

**Practice:**
- Create 5 different components
- Pass props between parent and child
- Use the `children` prop

**Mini Project:** Profile card component with props

---

### Week 2: State & Interactivity
**Goal:** Make components interactive

**Study:**
- `01-fundamentals/state-events.md`
- `01-fundamentals/lists-conditionals.md`

**Practice:**
- Build a counter
- Create a todo list
- Handle form inputs

**Mini Project:** Interactive todo app with add/delete

---

### Week 3: useState & useEffect
**Goal:** Master the two most important hooks

**Study:**
- `02-hooks/useState-useEffect.md`

**Practice:**
- Fetch data from an API
- Create a timer/stopwatch
- Build a search filter

**Mini Project:** Weather app fetching from API

---

### Week 4: More Hooks
**Goal:** Learn useRef, useReducer, useContext

**Study:**
- `02-hooks/useRef-useReducer.md`
- `02-hooks/useContext.md`
- `02-hooks/custom-hooks.md`

**Practice:**
- Create a theme switcher with Context
- Build a form with useReducer
- Write 2-3 custom hooks

**Mini Project:** Dark mode toggle with Context

---

### Week 5: Routing & Styling
**Goal:** Build multi-page apps with good design

**Study:**
- `03-routing/react-router.md`
- `04-styling/css-modules.md` OR `04-styling/tailwind.md`

**Practice:**
- Create a 3-page app with navigation
- Style all your previous projects
- Add protected routes

**Mini Project:** Multi-page portfolio site

---

### Week 6: Forms & API
**Goal:** Handle user input and external data

**Study:**
- `05-forms/react-hook-form.md`
- `06-api/fetch-async.md`

**Practice:**
- Build a signup form with validation
- Create a data dashboard
- Handle loading/error states

**Mini Project:** Contact form with API submission

---

### Week 7-8: State Management
**Goal:** Manage complex app-wide state

**Study:**
- `07-state-management/context-reducer.md`

**Practice:**
- Build a shopping cart
- Create an auth system
- Manage global notifications

**Mini Project:** E-commerce cart with Context + useReducer

---

## 📖 Study Techniques

### 1. Active Reading
- Don't just read - type out examples
- Modify examples to see what happens
- Break things intentionally to learn

### 2. Spaced Repetition
- Review previous topics weekly
- Revisit notes when stuck
- Build on previous knowledge

### 3. Project-Based Learning
- Apply concepts immediately
- Build something after each topic
- Combine multiple concepts in projects

### 4. Debug Actively
- Read error messages carefully
- Use console.log strategically
- Use React DevTools

---

## 🎓 Learning Strategies

### For Visual Learners
- Draw component trees
- Sketch data flow diagrams
- Use React DevTools to visualize

### For Hands-On Learners
- Code along with examples
- Modify existing code
- Build variations of projects

### For Conceptual Learners
- Read the "What it is" sections carefully
- Understand the "why" before the "how"
- Connect concepts to previous knowledge

---

## 🔍 When You're Stuck

### 1. Check the Notes
- Read the relevant note file
- Look at the "Common Patterns" section
- Check "Gotchas" for common mistakes

### 2. Debug Systematically
```
1. Read the error message
2. Check the line number
3. console.log the values
4. Verify your assumptions
5. Search the error online
```

### 3. Break It Down
- Simplify the problem
- Test one thing at a time
- Build back up gradually

### 4. Ask for Help
- Describe what you tried
- Share your code
- Explain expected vs actual behavior

---

## 📝 Note-Taking Tips

### Create Your Own Examples
Add to the "My notes / examples" sections:
```markdown
## My notes / examples

### What I learned today:
- [Your insights]

### Code I wrote:
```jsx
// Your code here
```

### Questions I have:
- [Your questions]
```

### Track Your Progress
In each note file, mark what you've mastered:
- ✅ Understood the concept
- ✅ Wrote working code
- ✅ Used in a project
- ⬜ Need more practice

---

## 🎯 Practice Exercises

### Beginner Exercises

**JSX & Components:**
1. Create a Button component with different variants
2. Build a Card component with image, title, description
3. Make a Navbar with multiple links

**State & Events:**
4. Counter with increment/decrement/reset
5. Toggle switch component
6. Form with controlled inputs

**Lists & Conditionals:**
7. Render a list of users from an array
8. Filter list based on search input
9. Show/hide content with conditional rendering

---

### Intermediate Exercises

**Hooks:**
10. Fetch and display data from an API
11. Create a custom useLocalStorage hook
12. Build a timer with start/stop/reset

**Routing:**
13. Multi-page app with navigation
14. Dynamic route with URL parameters
15. Protected route requiring auth

**Forms:**
16. Login form with validation
17. Multi-step form wizard
18. Form with dynamic fields

---

### Advanced Exercises

**State Management:**
19. Shopping cart with Context + useReducer
20. Auth system with login/logout
21. Global notification system

**Real-World:**
22. CRUD app (Create, Read, Update, Delete)
23. Dashboard with multiple data sources
24. Real-time search with debouncing

---

## 🏆 Project Milestones

### Milestone 1: Basic React (Weeks 1-2)
**Build:** Todo List App
- Add/delete todos
- Mark as complete
- Filter (all/active/completed)

### Milestone 2: Hooks & Data (Weeks 3-4)
**Build:** Weather Dashboard
- Fetch weather data
- Search by city
- Display forecast
- Handle loading/errors

### Milestone 3: Full App (Weeks 5-6)
**Build:** Blog Platform
- Multiple pages (home, post, about)
- Fetch posts from API
- Individual post pages
- Styled with CSS Modules or Tailwind

### Milestone 4: Complex State (Weeks 7-8)
**Build:** E-commerce Store
- Product listing
- Shopping cart
- Add/remove items
- Calculate total
- Context for global state

---

## 📊 Self-Assessment Checklist

### Fundamentals ✅
- [ ] I can explain what JSX is
- [ ] I can create functional components
- [ ] I understand props and how to pass them
- [ ] I can manage state with useState
- [ ] I can handle events (onClick, onChange, etc.)
- [ ] I can render lists with .map()
- [ ] I can conditionally render components

### Hooks ✅
- [ ] I understand when to use useState vs useEffect
- [ ] I can fetch data with useEffect
- [ ] I know how to clean up effects
- [ ] I can use useRef for DOM access
- [ ] I understand useReducer for complex state
- [ ] I can use Context to avoid prop drilling
- [ ] I've created at least one custom hook

### Routing & Styling ✅
- [ ] I can set up React Router
- [ ] I can create dynamic routes
- [ ] I can navigate programmatically
- [ ] I can style components (CSS Modules or Tailwind)
- [ ] I understand scoped vs global styles

### Forms & API ✅
- [ ] I can create controlled form inputs
- [ ] I can validate forms
- [ ] I can make GET/POST requests
- [ ] I handle loading and error states
- [ ] I understand async/await

### State Management ✅
- [ ] I can use Context API
- [ ] I understand when to use useReducer
- [ ] I can combine Context + useReducer
- [ ] I know when NOT to use Context

---

## 🎯 Daily Practice Routine

### 15-Minute Quick Practice
- Read one section of notes
- Type out one example
- Modify it slightly

### 30-Minute Practice
- Complete one exercise
- Debug any errors
- Add to your project

### 1-Hour Deep Practice
- Build a mini feature
- Combine multiple concepts
- Refactor and improve

### 2-Hour Project Work
- Work on milestone project
- Implement new features
- Style and polish

---

## 💡 Pro Tips

### 1. Build in Public
- Share your projects
- Get feedback
- Learn from others

### 2. Read Others' Code
- Explore open source React projects
- See different approaches
- Learn best practices

### 3. Teach What You Learn
- Explain concepts to others
- Write blog posts
- Help beginners

### 4. Stay Updated
- Follow React official blog
- Join React communities
- Try new features

---

## 🚀 Next Steps After This Guide

1. **Build a Portfolio Project**
   - Showcase your skills
   - Use multiple concepts
   - Deploy it online

2. **Learn TypeScript**
   - Type safety
   - Better developer experience
   - Industry standard

3. **Explore Next.js**
   - Server-side rendering
   - Static site generation
   - Full-stack capabilities

4. **Master Testing**
   - Jest
   - React Testing Library
   - Write reliable code

5. **Contribute to Open Source**
   - Real-world experience
   - Collaborate with others
   - Build your network

---

## 📚 Additional Resources

### When You Need More Examples
- React official docs: https://react.dev
- React patterns: https://reactpatterns.com

### When You're Stuck
- Stack Overflow
- React Discord
- Reddit r/reactjs

### When You Want to Practice
- Frontend Mentor (projects)
- Codewars (challenges)
- Your own ideas!

---

**Remember:** Everyone learns at their own pace. Don't compare your progress to others. Focus on understanding, not speed. You've got this! 💪
