/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        fold: "300px",
        '1.5xl': '1500px',
        '2.5xl': '1900px',
        '3xl': '2500px',
        '4xl': '3000px',
      },
    },
    fontSize: {
      xs: ["0.75rem", "1.125rem"],
      sm: ["0.88rem", "1.25rem"],
      md: ["1rem", "1.5rem"],
      lg: ["1.12rem", "1.75rem"],
      xl: ["1.25rem", "1.875rem"],
      "display-xs": ["1.5rem", "2rem"],
      "display-sm": ["1.88rem", "2.25rem"],
      "display-md": ["2.25rem", "2.75rem"],
      "display-lg": ["3rem", "3.75rem"],
      "display-xl": ["3.75rem", "4.5rem"],
      "display-2xl": ["4.5rem", "5rem"],
    },
    colors: {
      white: "#ffffff",
      black: "#000000",
      "status-bar": {
        active: "#50C878",
        inactive: "#a9a9a9",
        "in-progress": "#FFBF00",
        "in-progress-fill": "#fee4e2",
      },
      yellow: {
        '500': '#facc15',
      },
      blue: {
        '500': '#3b82f6',
      },
      green: {
        '500': '#10b981',
      },
      red: {
        '500': '#ef4444',
      },
      orange: {
        500: '#F57F20', // Custom orange color
      },
      black: '#000000',
      white: '#ffffff',
      primary: {
        "25": "#fffbfa",
        "50": "#fef3f2",
        "100": "#fee4e2",
        "200": "#fecdca",
        "300": "#fda29b",
        "400": "#f97066",
        "500": "#f04438",
        "600": "#d92d20",
        "700": "#b42318",
        "800": "#912018",
        "900": "#7a271a",
        "950": "#55160c",
      },
      warning: {
        "25": "#fffcf5",
        "50": "#fffaeb",
        "100": "#fef0c7",
        "200": "#fedf89",
        "300": "#fec84b",
        "400": "#fdb022",
        "500": "#f79009",
        "600": "#dc6803",
        "700": "#b54708",
        "800": "#93370d",
        "900": "#7a2e0e",
        "950": "#4e1d09",
      },
      success: {
        "25": "#f6fef9",
        "50": "#ecfdf3",
        "100": "#dcfae6",
        "200": "#abefc6",
        "300": "#75e0a7",
        "400": "#47cd89",
        "500": "#17b26a",
        "600": "#079455",
        "700": "#067647",
        "800": "#085d3a",
        "900": "#074d31",
        "950": "#053321",
      },
      gray: {
        "25": "#fcfcfd",
        "50": "#f9fafb",
        "100": "#f2f4f7",
        "200": "#eaecf0",
        "300": "#d0d5dd",
        "400": "#98a2b3",
        "500": "#667085",
        "600": "#475467",
        "700": "#344054",
        "800": "#1d2939",
        "900": "#101828",
        "950": "#0c111d",
      },
      "blue-light": {
        "25": "#f5fbff",
        "50": "#f0f9ff",
        "100": "#e0f2fe",
        "200": "#b9e6fe",
        "300": "#7cd4fd",
        "400": "#36bffa",
        "500": "#0ba5ec",
        "600": "#0086c9",
        "700": "#026aa2",
        "800": "#065986",
        "900": "#0b4a6f",
        "950": "#062c41",
      },
    },
  },
  plugins: [],
};
