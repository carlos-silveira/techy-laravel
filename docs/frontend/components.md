# UI Components & Styling

TechyNews emphasizes a premium, modern aesthetic designed for readability and engagement. Our component architecture relies on React, Tailwind CSS, and Framer Motion.

## Styling with Tailwind CSS

We use Tailwind CSS as our primary styling solution. It provides a utility-first approach that allows for rapid UI development without writing custom CSS.

### Key Principles
- **Utility-First:** Build complex layouts directly in the `className` attribute.
- **Responsive Design:** Use responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) to adapt layouts for different screen sizes. Mobile responsiveness is a critical requirement.
- **Avoid Custom CSS:** Rely on Tailwind utilities whenever possible. If custom CSS is absolutely necessary, add it to `resources/css/app.css` using Tailwind's `@apply` directive.

## Animations with Framer Motion

To create a dynamic and premium feel, we use Framer Motion for hardware-accelerated animations.

### Common Use Cases
- **Page Transitions:** Smooth cross-fades when navigating between Inertia pages.
- **Micro-interactions:** Subtle hover effects on buttons, cards, and links.
- **Scroll Reveals:** Elements fading in and sliding up as they enter the viewport.

### Example
```jsx
import { motion } from 'framer-motion';

export default function AnimatedCard({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
        >
            {children}
        </motion.div>
    );
}
```

## Icons

We use `lucide-react` for clean, consistent, and scalable vector icons across the application.
