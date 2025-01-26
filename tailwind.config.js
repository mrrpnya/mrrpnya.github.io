/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        animation: {
          appear: "appear 0.5s ease-in-out",
        }
      },
      boxShadow: {
        'md': '0px 0px 5px 5px',
        'sm': '0px 0px 2px 2px'
      },
      colors: {
        "surface-1": "#222222",
        "surface-2": "#444444",
        "border": "#441196",
        "border-accent": "#ff00f2",
        "primary": "#441196",
        "secondary": "#4d0099",
        "highlight": "#ff00f2",
        "success": "#10B981",
        "danger": "#EF4444",
        "warning": "#F59E0B",
        "info": "#3B82F6",
        "tip": "#6EE7B7",
        "note": "#6B7280",
        "important": "#F87171",
        "dark": "#111827",
        "light": "#F9FAFB",
        "image": "#666666",
        "gray": {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
}

