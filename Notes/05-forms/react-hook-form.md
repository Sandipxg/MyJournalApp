# Forms & React Hook Form

## What it is
React Hook Form is a library for managing form state and validation with minimal re-renders. Much cleaner than manual controlled form state.

## Syntax / Usage
```jsx
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // { email: "...", password: "..." }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Min 6 characters" },
        })}
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Login</button>
    </form>
  );
}
```

## Validation rules
```js
register("field", {
  required: "message",
  min: { value: 1, message: "..." },
  max: { value: 100, message: "..." },
  minLength: { value: 3, message: "..." },
  maxLength: { value: 50, message: "..." },
  pattern: { value: /regex/, message: "..." },
  validate: (value) => value !== "bad" || "Custom error message",
})
```

## When to use
- Any form with validation requirements
- Prefer over manual `useState` for forms — less boilerplate, better performance

## Gotchas
- `register` spreads ref + event handlers — don't override `onChange`/`ref` manually
- Use `Controller` wrapper for custom/third-party inputs that don't expose a native ref
- `watch()` lets you observe field values in real time

## My notes / examples

