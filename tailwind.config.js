/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                colors: {
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        },
                        rose: {
                                50: '#FFF0F3',
                                100: '#FEE2E2',
                                200: '#FECDD3',
                                300: '#FFD1DC',
                                400: '#FB7185',
                                500: '#E11D48',
                                600: '#BE123C',
                                700: '#9F1239'
                        },
                        champagne: '#FDE68A',
                        gold: '#D97706',
                        'paper-white': '#FFFCF9',
                        'warm-gray': '#F5F5F4',
                        'text-dark': '#4A0404',
                        'text-muted': '#881337'
                },
                fontFamily: {
                        serif: ['Playfair Display', 'serif'],
                        sans: ['Quicksand', 'sans-serif'],
                        handwriting: ['Caveat', 'cursive']
                },
                keyframes: {
                        'accordion-down': {
                                from: {
                                        height: '0'
                                },
                                to: {
                                        height: 'var(--radix-accordion-content-height)'
                                }
                        },
                        'accordion-up': {
                                from: {
                                        height: 'var(--radix-accordion-content-height)'
                                },
                                to: {
                                        height: '0'
                                }
                        },
                        'float': {
                                '0%, 100%': { transform: 'translateY(0) translateX(0)' },
                                '50%': { transform: 'translateY(-20px) translateX(10px)' }
                        },
                        'float-slow': {
                                '0%, 100%': { transform: 'translateY(0)' },
                                '50%': { transform: 'translateY(-30px)' }
                        },
                        'petal-fall': {
                                '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '1' },
                                '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'float': 'float 6s ease-in-out infinite',
                        'float-slow': 'float-slow 8s ease-in-out infinite',
                        'petal-fall': 'petal-fall 10s linear infinite'
                },
                boxShadow: {
                        'soft': '0 10px 40px -10px rgba(225, 29, 72, 0.1)',
                        'floating': '0 20px 50px -12px rgba(225, 29, 72, 0.25)',
                        'glow': '0 0 20px rgba(255, 182, 193, 0.5)'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};