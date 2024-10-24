/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      screens: {
        fold: "300px",
        sm: "400px",
        md: "768px",
        ipad: "1080px",
        lg: "1200px",
        xl: "1280px",
        "2xl": "1400px",
        '1.5xl': '1500px',
        '2.5xl': '1900px',
        '3xl': '2500px',
        '4xl': '3000px',
      },
    },
    fontSize: {
      "display-2xl": ["4.5rem", { lineHeight: "5.625rem", tracking: "-2%" }],
      "display-xl": ["3.75rem", { lineHeight: "4.5rem", tracking: "-2%" }],
      "display-lg": ["3rem", { lineHeight: "3.75rem", tracking: "-2%" }],
      "display-md": ["2.25rem", { lineHeight: "2.75rem", tracking: "-2%" }],
      "display-sm": ["1.875rem", { lineHeight: "2.375rem" }],
      "display-xs": ["1.5rem", { lineHeight: "2rem" }],
      xl: ["1.25rem", { lineHeight: "1.875rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      md: ["1rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
      xs: ["0.75rem", { lineHeight: "1.125rem" }],
    },
    colors: {
      text: {
        primary: "rgba(var(--text-primary), <alpha-value>)",
        "primary_on-brand": "rgba(var(--text-primary_on-brand), <alpha-value>)",
        secondary: "rgba(var(--text-secondary), <alpha-value>)",
        secondary_hover: "rgba(var(--text-secondary_hover), <alpha-value>)",
        "secondary_on-brand":
          "rgba(var(--text-secondary_on-brand), <alpha-value>)",
        tertiary: "rgba(var(--text-tertiary), <alpha-value>)",
        tertiary_hover: "rgba(var(--text-tertiary_hover), <alpha-value>)",
        "tertiary_on-brand":
          "rgba(var(--text-tertiary_on-brand), <alpha-value>)",
        quaternary: "rgba(var(--text-quaternary), <alpha-value>)",
        "quaternary_on-brand":
          "rgba(var(--text-quaternary_on-brand), <alpha-value>)",
        disabled: "rgba(var(--text-disabled), <alpha-value>)",
        placeholder: "rgba(var(--text-placeholder), <alpha-value>)",
        placeholder_subtle:
          "rgba(var(--text-placeholder_subtle), <alpha-value>)",
        brand: {
          primary: "rgba(var(--text-brand-primary), <alpha-value>)",
          secondary: "rgba(var(--text-brand-secondary), <alpha-value>)",
          tertiary: "rgba(var(--text-brand-tertiary), <alpha-value>)",
          tertiary_alt: "rgba(var(--text-brand-tertiary_alt), <alpha-value>)",
        },
        success: "rgba(var(--text-success-primary), <alpha-value>)",
        warning: "rgba(var(--text-warning-primary), <alpha-value>)",
        error: "rgba(var(--text-error-primary), <alpha-value>)",
        white: "rgba(var(--text-white), <alpha-value>)",
      },
      border: {
        primary: "rgba(var(--border-primary), <alpha-value>)",
        secondary: "rgba(var(--border-secondary), <alpha-value>)",
        tertiary: "rgba(var(--border-tertiary), <alpha-value>)",
        disabled: "rgba(var(--border-disabled), <alpha-value>)",
        brand: {
          solid: "rgba(var(--border-brand-solid), <alpha-value>)",
          solid_alt: "rgba(var(--border-brand-solid_alt), <alpha-value>)",
          brand: "rgba(var(--border-brand), <alpha-value>)",
        },
        error: "rgba(var(--border-error), <alpha-value>)",
        icon: {
          modern: "rgba(var(--icon-modern-border), <alpha-value>)",
        },
      },
      bg: {
        primary: "rgba(var(--bg-primary), <alpha-value>)",
        "primary-solid": "rgba(var(--bg-primary-solid), <alpha-value>)",

        primary_hover: "rgba(var(--bg-primary_hover), <alpha-value>)",

        secondary: "rgba(var(--bg-secondary), <alpha-value>)",
        secondary_hover: "rgba(var(--bg-secondary_hover), <alpha-value>)",

        tertiary: "rgba(var(--bg-tertiary), <alpha-value>)",

        error: {
          primary: "rgba(var(--bg-error-primary), <alpha-value>)",
          secondary: "rgba(var(--bg-error-secondary), <alpha-value>)",
          solid: "rgba(var(--bg-error-solid), <alpha-value>)",
        },
        success: {
          primary: "rgba(var(--bg-success-primary), <alpha-value>)",
          secondary: "rgba(var(--bg-success-secondary), <alpha-value>)",
          solid: "rgba(var(--bg-success-solid), <alpha-value>)",
        },
        warning: {
          primary: "rgba(var(--bg-warning-primary), <alpha-value>)",
          secondary: "rgba(var(--bg-warning-secondary), <alpha-value>)",
          solid: "rgba(var(--bg-warning-solid), <alpha-value>)",
        },
        brand: {
          secondary: "rgba(var(--bg-brand-secondary), <alpha-value>)",
        },
      },
      fg: {
        brand: {
          primary: "rgba(var(--fg-brand-primary), <alpha-value>)",
          primary_alt: "rgba(var( --fg-brand-primary_alt), <alpha-value>)",
          secondary: "rgba(var( --fg-brand-secondary), <alpha-value>)",
        },
        disabled: "rgba(var( --fg-disabled), <alpha-value>)",
        disabled_subtle: "rgba(var( --fg-disabled_subtle), <alpha-value>)",
        error: {
          primary: "rgba(var( --fg-error-primary), <alpha-value>)",
          secondary: "rgba(var( --fg-error-secondary), <alpha-value>)",
        },
        primary: "rgba(var( --fg-primary), <alpha-value>)",
        quaternary: "rgba(var( --fg-quaternary), <alpha-value>)",
        quaternary_hover: "rgba(var( --fg-quaternary_hover), <alpha-value>)",
        quinary: "rgba(var( --fg-quinary), <alpha-value>)",
        quinary_hover: "rgba(var( --fg-quinary_hover), <alpha-value>)",
        secondary: "rgba(var( --fg-secondary), <alpha-value>)",
        secondary_hover: "rgba(var( --fg-secondary_hover), <alpha-value>)",
        senary: "rgba(var( --fg-senary), <alpha-value>)",
        success: {
          primary: "rgba(var( --fg-success-primary), <alpha-value>)",
          secondary: "rgba(var( --fg-success-secondary), <alpha-value>)",
        },
        tertiary: "rgba(var( --fg-tertiary), <alpha-value>)",
        tertiary_hover: "rgba(var( --fg-tertiary_hover), <alpha-value>)",
        warning: {
          primary: "rgba(var( --fg-warning-primary), <alpha-value>)",
          secondary: "rgba(var( --fg-warning-secondary), <alpha-value>)",
        },
        white: "rgba(var( --fg-white), <alpha-value>)",
      },
      nav: {
        item: {
          button: {
            icon: {
              fg: "rgba(var(--nav-item-button-icon-fg), <alpha-value>)",
              fg_active:
                "rgba(var(--nav-item-button-icon-fg_active), <alpha-value>)",
            },
          },
          icon: {
            fg: "rgba(var(--nav-item-icon-fg), <alpha-value>)",
            fg_active: "rgba(var(--nav-item-icon-fg_active), <alpha-value>)",
          },
        },
      },
      button: {
        primary: {
          bg: "rgba(var(--button-primary-bg), <alpha-value>)",
          bg_hover: "rgba(var(--button-primary-bg_hover), <alpha-value>)",
          border: "rgba(var(--button-primary-border), <alpha-value>)",
          border_hover:
            "rgba(var(--button-primary-border_hover), <alpha-value>)",
          fg: "rgba(var(--button-primary-fg), <alpha-value>)",
          fg_hover: "rgba(var(--button-primary-fg_hover), <alpha-value>)",
          error: {
            bg: "rgba(var(--button-primary-error-bg), <alpha-value>)",
            bg_hover:
              "rgba(var(--button-primary-error-bg_hover), <alpha-value>)",
            border: "rgba(var(--button-primary-error-border), <alpha-value>)",
            border_hover:
              "rgba(var(--button-primary-error-border_hover), <alpha-value>)",
            fg: "rgba(var(--button-primary-error-fg), <alpha-value>)",
            fg_hover:
              "rgba(var(--button-primary-error-fg_hover), <alpha-value>)",
          },
        },
        secondary: {
          bg: "rgba(var(--button-secondary-bg), <alpha-value>)",
          bg_hover: "rgba(var(--button-secondary-bg_hover), <alpha-value>)",
          border: "rgba(var(--button-secondary-border), <alpha-value>)",
          border_hover:
            "rgba(var(--button-secondary-border_hover), <alpha-value>)",
          fg: "rgba(var(--button-secondary-fg), <alpha-value>)",
          fg_hover: "rgba(var(--button-secondary-fg_hover), <alpha-value>)",
          color: {
            bg: "rgba(var(--button-secondary-color-bg), <alpha-value>)",
            bg_hover:
              "rgba(var(--button-secondary-color-bg_hover), <alpha-value>)",
            border: "rgba(var(--button-secondary-color-border), <alpha-value>)",
            border_hover:
              "rgba(var(--button-secondary-color-border_hover), <alpha-value>)",
            fg: "rgba(var(--button-secondary-color-fg), <alpha-value>)",
            fg_hover:
              "rgba(var(--button-secondary-color-fg_hover), <alpha-value>)",
          },
          error: {
            bg: "rgba(var(--button-secondary-error-bg), <alpha-value>)",
            bg_hover:
              "rgba(var(--button-secondary-error-bg_hover), <alpha-value>)",
            border: "rgba(var(--button-secondary-error-border), <alpha-value>)",
            border_hover:
              "rgba(var(--button-secondary-error-border_hover), <alpha-value>)",
            fg: "rgba(var(--button-secondary-error-fg), <alpha-value>)",
            fg_hover:
              "rgba(var(--button-secondary-error-fg_hover), <alpha-value>)",
          },
        },
        tertiary: {
          bg_hover: "rgba(var(--button-tertiary-bg_hover), <alpha-value>)",
          fg: "rgba(var(--button-tertiary-fg), <alpha-value>)",
          fg_hover: "rgba(var(--button-tertiary-fg_hover), <alpha-value>)",
          color: {
            bg_hover:
              "rgba(var(--button-tertiary-color-bg_hover), <alpha-value>)",
            fg: "rgba(var(--button-tertiary-color-fg), <alpha-value>)",
            fg_hover:
              "rgba(var(--button-tertiary-color-fg_hover), <alpha-value>)",
          },
          error: {
            bg_hover:
              "rgba(var(--button-tertiary-error-bg_hover), <alpha-value>)",
            fg: "rgba(var(--button-tertiary-error-fg), <alpha-value>)",
            fg_hover:
              "rgba(var(--button-tertiary-error-fg_hover), <alpha-value>)",
          },
        },
      },
      footer: {
        badge: {
          bg: "rgba(var(--footer-badge-bg), <alpha-value>)",
          border: "rgba(var(--footer-badge-border), <alpha-value>)",
          fg: "rgba(var(--footer-badge-fg), <alpha-value>)",
        },
        button: {
          fg: "rgba(var(--footer-button-fg), <alpha-value>)",
          fg_hover: "rgba(var(--footer-button-fg_hover), <alpha-value>)",
        },
      },
      header: {
        abstract: {
          "100": {
            bg: "rgba(var(--header-abstract-100-bg), <alpha-value>)",
          },
          "200": {
            bg: "rgba(var(--header-abstract-200-bg), <alpha-value>)",
          },
          "300": {
            bg: "rgba(var(--header-abstract-300-bg), <alpha-value>)",
          },
          "50": {
            bg: "rgba(var(--header-abstract-50-bg), <alpha-value>)",
          },
        },
      },
      utility: {
        brand: {
          "100": "rgba(var(--utility-brand-100), <alpha-value>)",
          "100_alt": "rgba(var(--utility-brand-100_alt), <alpha-value>)",
          "50": "rgba(var(--utility-brand-50), <alpha-value>)",
          "200": "rgba(var(--utility-brand-200), <alpha-value>)",
          "200_alt": "rgba(var(--utility-brand-200_alt), <alpha-value>)",
          "300": "rgba(var(--utility-brand-300), <alpha-value>)",
          "300_alt": "rgba(var(--utility-brand-300_alt), <alpha-value>)",
          "400": "rgba(var(--utility-brand-400), <alpha-value>)",
          "400_alt": "rgba(var(--utility-brand-400_alt), <alpha-value>)",
          "500": "rgba(var(--utility-brand-500), <alpha-value>)",
          "500_alt": "rgba(var(--utility-brand-500_alt), <alpha-value>)",
          "50_alt": "rgba(var(--utility-brand-50_alt), <alpha-value>)",
          "600": "rgba(var(--utility-brand-600), <alpha-value>)",
          "600_alt": "rgba(var(--utility-brand-600_alt), <alpha-value>)",
          "700": "rgba(var(--utility-brand-700), <alpha-value>)",
          "700_alt": "rgba(var(--utility-brand-700_alt), <alpha-value>)",
          "800": "rgba(var(--utility-brand-800), <alpha-value>)",
          "800_alt": "rgba(var(--utility-brand-800_alt), <alpha-value>)",
          "900": "rgba(var(--utility-brand-900), <alpha-value>)",
          "900_alt": "rgba(var(--utility-brand-900_alt), <alpha-value>)",
        },
        error: {
          "50": "rgba(var(--utility-error-50), <alpha-value>)",
          "100": "rgba(var(--utility-error-100), <alpha-value>)",
          "200": "rgba(var(--utility-error-200), <alpha-value>)",
          "300": "rgba(var(--utility-error-300), <alpha-value>)",
          "400": "rgba(var(--utility-error-400), <alpha-value>)",
          "500": "rgba(var(--utility-error-500), <alpha-value>)",
          "600": "rgba(var(--utility-error-600), <alpha-value>)",
          "700": "rgba(var(--utility-error-700), <alpha-value>)",
        },
        gray: {
          "50": "rgba(var(--utility-gray-50), <alpha-value>)",
          "100": "rgba(var(--utility-gray-100), <alpha-value>)",
          "200": "rgba(var(--utility-gray-200), <alpha-value>)",
          "300": "rgba(var(--utility-gray-300), <alpha-value>)",
          "400": "rgba(var(--utility-gray-400), <alpha-value>)",
          "500": "rgba(var(--utility-gray-500), <alpha-value>)",
          "600": "rgba(var(--utility-gray-600), <alpha-value>)",
          "700": "rgba(var(--utility-gray-700), <alpha-value>)",
          "800": "rgba(var(--utility-gray-800), <alpha-value>)",
          "900": "rgba(var(--utility-gray-900), <alpha-value>)",
        },
        success: {
          "50": "rgba(var(--utility-success-50), <alpha-value>)",
          "100": "rgba(var(--utility-success-100), <alpha-value>)",
          "200": "rgba(var(--utility-success-200), <alpha-value>)",
          "300": "rgba(var(--utility-success-300), <alpha-value>)",
          "400": "rgba(var(--utility-success-400), <alpha-value>)",
          "500": "rgba(var(--utility-success-500), <alpha-value>)",
          "600": "rgba(var(--utility-success-600), <alpha-value>)",
          "700": "rgba(var(--utility-success-700), <alpha-value>)",
        },
        warning: {
          "50": "rgba(var(--utility-warning-50), <alpha-value>)",
          "100": "rgba(var(--utility-warning-100), <alpha-value>)",
          "200": "rgba(var(--utility-warning-200), <alpha-value>)",
          "300": "rgba(var(--utility-warning-300), <alpha-value>)",
          "400": "rgba(var(--utility-warning-400), <alpha-value>)",
          "500": "rgba(var(--utility-warning-500), <alpha-value>)",
          "600": "rgba(var(--utility-warning-600), <alpha-value>)",
          "700": "rgba(var(--utility-warning-700), <alpha-value>)",
        },
        "blue-light": {
          "50": "rgba(var(--utility-blue-light-50), <alpha-value>)",
          "100": "rgba(var(--utility-blue-light-100), <alpha-value>)",
          "200": "rgba(var(--utility-blue-light-200), <alpha-value>)",
          "300": "rgba(var(--utility-blue-light-300), <alpha-value>)",
          "400": "rgba(var(--utility-blue-light-400), <alpha-value>)",
          "500": "rgba(var(--utility-blue-light-500), <alpha-value>)",
          "600": "rgba(var(--utility-blue-light-600), <alpha-value>)",
          "700": "rgba(var(--utility-blue-light-700), <alpha-value>)",
        },
      },
      featured: {
        icon: {
          light: {
            fg: {
              brand: "rgba(var(--featured-icon-light-fg-brand), <alpha-value>)",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
