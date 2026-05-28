# React Hook Form

## What is React Hook Form?

**React Hook Form** is a performant, flexible library for managing forms in React with minimal re-renders and easy validation.

**Benefits:**
- ✅ Minimal re-renders (better performance)
- ✅ Less boilerplate than manual state management
- ✅ Built-in validation
- ✅ Easy integration with UI libraries
- ✅ TypeScript support

---

## Installation

```bash
npm install react-hook-form
```

---

## Basic Usage

### Simple Form
```jsx
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data); // { email: "...", password: "..." }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        {...register('email')} 
        placeholder="Email"
      />
      
      <input 
        type="password"
        {...register('password')} 
        placeholder="Password"
      />
      
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## Validation

### Built-in Validation Rules
```jsx
function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Required field */}
      <input 
        {...register('username', { 
          required: 'Username is required' 
        })} 
      />
      {errors.username && <span className="error">{errors.username.message}</span>}
      
      {/* Email validation */}
      <input 
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })} 
      />
      {errors.email && <span className="error">{errors.email.message}</span>}
      
      {/* Min/Max length */}
      <input 
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          },
          maxLength: {
            value: 50,
            message: 'Password must be less than 50 characters'
          }
        })} 
      />
      {errors.password && <span className="error">{errors.password.message}</span>}
      
      {/* Min/Max value (for numbers) */}
      <input 
        type="number"
        {...register('age', {
          required: 'Age is required',
          min: {
            value: 18,
            message: 'Must be at least 18 years old'
          },
          max: {
            value: 120,
            message: 'Invalid age'
          }
        })} 
      />
      {errors.age && <span className="error">{errors.age.message}</span>}
      
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### All Validation Rules
```jsx
register('fieldName', {
  required: 'This field is required',
  
  minLength: {
    value: 3,
    message: 'Minimum 3 characters'
  },
  
  maxLength: {
    value: 50,
    message: 'Maximum 50 characters'
  },
  
  min: {
    value: 0,
    message: 'Minimum value is 0'
  },
  
  max: {
    value: 100,
    message: 'Maximum value is 100'
  },
  
  pattern: {
    value: /regex/,
    message: 'Invalid format'
  },
  
  validate: (value) => {
    // Custom validation
    return value !== 'admin' || 'Username already taken';
  }
})
```

---

## Custom Validation

### Single Validation Function
```jsx
<input 
  {...register('username', {
    validate: (value) => {
      if (value.includes(' ')) {
        return 'Username cannot contain spaces';
      }
      return true; // Valid
    }
  })} 
/>
```

### Multiple Validation Functions
```jsx
<input 
  {...register('password', {
    validate: {
      hasUpperCase: (value) => 
        /[A-Z]/.test(value) || 'Must contain uppercase letter',
      
      hasLowerCase: (value) => 
        /[a-z]/.test(value) || 'Must contain lowercase letter',
      
      hasNumber: (value) => 
        /[0-9]/.test(value) || 'Must contain number',
      
      hasSpecialChar: (value) => 
        /[!@#$%^&*]/.test(value) || 'Must contain special character'
    }
  })} 
/>
```

### Async Validation
```jsx
<input 
  {...register('username', {
    validate: async (value) => {
      const response = await fetch(`/api/check-username?username=${value}`);
      const data = await response.json();
      return data.available || 'Username already taken';
    }
  })} 
/>
```

---

## Default Values

```jsx
function EditProfileForm({ user }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      bio: user.bio,
      age: user.age
    }
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <input {...register('email')} />
      <textarea {...register('bio')} />
      <input type="number" {...register('age')} />
      <button type="submit">Update Profile</button>
    </form>
  );
}
```

---

## Watch Values

### Watch Single Field
```jsx
function Form() {
  const { register, watch } = useForm();
  
  const password = watch('password');
  
  return (
    <form>
      <input type="password" {...register('password')} />
      
      <input 
        type="password"
        {...register('confirmPassword', {
          validate: (value) => 
            value === password || 'Passwords do not match'
        })} 
      />
    </form>
  );
}
```

### Watch Multiple Fields
```jsx
function Form() {
  const { register, watch } = useForm();
  
  const [firstName, lastName] = watch(['firstName', 'lastName']);
  
  return (
    <div>
      <p>Full Name: {firstName} {lastName}</p>
      <input {...register('firstName')} />
      <input {...register('lastName')} />
    </div>
  );
}
```

### Watch All Fields
```jsx
function Form() {
  const { register, watch } = useForm();
  
  const formValues = watch(); // Watch all fields
  
  return (
    <div>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
      <input {...register('name')} />
      <input {...register('email')} />
    </div>
  );
}
```

---

## Reset Form

```jsx
function Form() {
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    reset(); // Clear form after submit
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => reset()}>Clear</button>
    </form>
  );
}

// Reset with new values
reset({
  name: 'John',
  email: 'john@example.com'
});
```

---

## Form State

```jsx
function Form() {
  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors,        // Validation errors
      isSubmitting,  // Form is submitting
      isSubmitted,   // Form has been submitted
      isDirty,       // Form has been modified
      isValid,       // Form is valid
      touchedFields, // Fields that have been touched
      dirtyFields    // Fields that have been modified
    } 
  } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: true })} />
      
      <button 
        type="submit" 
        disabled={isSubmitting || !isValid}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      
      {isSubmitted && <p>Form submitted successfully!</p>}
    </form>
  );
}
```

---

## Error Handling

### Display Errors
```jsx
function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input 
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email'
            }
          })} 
        />
        {errors.email && (
          <span className="error">{errors.email.message}</span>
        )}
      </div>
    </form>
  );
}
```

### Set Errors Manually
```jsx
function Form() {
  const { register, handleSubmit, setError } = useForm();
  
  const onSubmit = async (data) => {
    try {
      await api.login(data);
    } catch (err) {
      setError('email', {
        type: 'manual',
        message: 'Invalid credentials'
      });
    }
  };
  
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

---

## Controlled Components

### Using Controller
```jsx
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

function Form() {
  const { control, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="country"
        control={control}
        rules={{ required: 'Country is required' }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <Select
              {...field}
              options={[
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' }
              ]}
            />
            {error && <span>{error.message}</span>}
          </div>
        )}
      />
    </form>
  );
}
```

---

## Dynamic Fields

### Field Array
```jsx
import { useForm, useFieldArray } from 'react-hook-form';

function Form() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      items: [{ name: '', quantity: 1 }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input 
            {...register(`items.${index}.name`, { required: true })} 
            placeholder="Item name"
          />
          <input 
            type="number"
            {...register(`items.${index}.quantity`, { min: 1 })} 
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      
      <button 
        type="button" 
        onClick={() => append({ name: '', quantity: 1 })}
      >
        Add Item
      </button>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Real-World Example: Complete Form

```jsx
import { useForm } from 'react-hook-form';

function ContactForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      subscribe: false
    }
  });
  
  const subscribe = watch('subscribe');
  
  const onSubmit = async (data) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      alert('Message sent successfully!');
      reset();
    } catch (err) {
      alert('Failed to send message');
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name">Name *</label>
        <input 
          id="name"
          {...register('name', { 
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            }
          })} 
          className={errors.name ? 'error' : ''}
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>
      
      {/* Email */}
      <div>
        <label htmlFor="email">Email *</label>
        <input 
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })} 
          className={errors.email ? 'error' : ''}
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>
      
      {/* Subject */}
      <div>
        <label htmlFor="subject">Subject *</label>
        <select 
          id="subject"
          {...register('subject', { required: 'Please select a subject' })}
          className={errors.subject ? 'error' : ''}
        >
          <option value="">Select...</option>
          <option value="general">General Inquiry</option>
          <option value="support">Support</option>
          <option value="feedback">Feedback</option>
        </select>
        {errors.subject && (
          <span className="error-message">{errors.subject.message}</span>
        )}
      </div>
      
      {/* Message */}
      <div>
        <label htmlFor="message">Message *</label>
        <textarea 
          id="message"
          rows={5}
          {...register('message', { 
            required: 'Message is required',
            minLength: {
              value: 10,
              message: 'Message must be at least 10 characters'
            },
            maxLength: {
              value: 500,
              message: 'Message must be less than 500 characters'
            }
          })} 
          className={errors.message ? 'error' : ''}
        />
        {errors.message && (
          <span className="error-message">{errors.message.message}</span>
        )}
      </div>
      
      {/* Subscribe checkbox */}
      <div>
        <label>
          <input 
            type="checkbox"
            {...register('subscribe')} 
          />
          Subscribe to newsletter
        </label>
      </div>
      
      {/* Conditional field */}
      {subscribe && (
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input 
            id="phone"
            {...register('phone', {
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone must be 10 digits'
              }
            })} 
          />
          {errors.phone && (
            <span className="error-message">{errors.phone.message}</span>
          )}
        </div>
      )}
      
      {/* Submit button */}
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="btn-primary"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

---

## Best Practices

### 1. Use Validation Mode
```jsx
const { register } = useForm({
  mode: 'onBlur',     // Validate on blur
  // mode: 'onChange', // Validate on change
  // mode: 'onSubmit', // Validate on submit (default)
  // mode: 'all',      // Validate on blur and change
});
```

### 2. Reusable Form Components
```jsx
function FormInput({ label, name, register, errors, ...props }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} {...register(name)} {...props} />
      {errors[name] && <span>{errors[name].message}</span>}
    </div>
  );
}

// Usage
<FormInput 
  label="Email" 
  name="email" 
  register={register} 
  errors={errors}
  type="email"
/>
```

### 3. Schema Validation (with Yup or Zod)
```bash
npm install @hookform/resolvers yup
```

```jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  age: yup.number().positive().integer().min(18).required()
});

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

---

## Quick Reference

```jsx
// Setup
const { 
  register,           // Register input
  handleSubmit,       // Handle form submit
  formState,          // Form state (errors, isSubmitting, etc.)
  watch,              // Watch field values
  reset,              // Reset form
  setError,           // Set error manually
  clearErrors,        // Clear errors
  setValue,           // Set field value
  getValues,          // Get field values
  control             // For Controller component
} = useForm();

// Register input
<input {...register('fieldName', validationRules)} />

// Validation rules
register('field', {
  required: 'Required',
  minLength: { value: 3, message: 'Min 3 chars' },
  maxLength: { value: 50, message: 'Max 50 chars' },
  min: { value: 0, message: 'Min 0' },
  max: { value: 100, message: 'Max 100' },
  pattern: { value: /regex/, message: 'Invalid' },
  validate: (value) => value !== 'bad' || 'Error message'
})

// Submit
<form onSubmit={handleSubmit(onSubmit)}>

// Display errors
{errors.fieldName && <span>{errors.fieldName.message}</span>}
```
