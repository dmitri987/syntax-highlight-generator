/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const flatten = require('tailwindcss/lib/util/flattenColorPalette').default;


module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    // preflight: false,
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    plugin(({ matchUtilities, theme }) => {
      /* Customization of scrollbar
       *
       * Classes:
       *   scrollbar   // default width
       *   scrollbar-hidden  // hidden scrollbar, but scrollable content
       *   scrollbar-thin    // same as scrollbar-8
       *   scrollbar-{0..15} // width of x/y scrollbars in 'px'
       *
       *   scrollbar-rounded-{radius}  // same values as for 'rounded'
       *
       *   scrollbar{-x|-y}-{thumb|track}{-active}-{color}
       *   scrollbar-corner-{color}
       *
       * Examples:
       *   scrollbar-4 scrollbar-thumb-green-200
       *   scrollbar-x-thumb-active-green-400
       *
       *   scrollbar-hidden hover:scrollbar-thin
       *
       *
       */
      const parseSize = (size) =>
        size === "hidden"
          ? 0
          : typeof size === "number"
          ? `${size}px`
          : size;

      matchUtilities(
        {
          scrollbar: (value) => ({
            "scrollbar-width":
              value === "hidden" ? "none" : value < 9 ? "thin" : "auto",
            'scrollbar-width': 'var(--scrollbar-color-thumb) var(--scrollbar-color-track)',
            "&::-webkit-scrollbar": {
              display: value === "hidden" ? "none" : "block",
              width: parseSize(value),
              height: parseSize(value),
            },
            "&::-webkit-scrollbar-thumb": {
              "background-color":
                "var(--scrollbar-color-thumb, rgb(100 100 100 / 0.2))",
            },
            "&::-webkit-scrollbar-track, &::-webkit-scrollbar-corner": {
              "background-color":
                "var(--scrollbar-color-track, rgb(100 100 100 / 0.1))",
            },
          }),
        },
        {
          values: {
            hidden: "hidden",
            thin: 8,
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10,
            11: 11,
            12: 12,
            13: 13,
            14: 14,
            15: 15,
            DEFAULT: 'auto',
          },
        }
      );

      matchUtilities({
        'scrollbar-thumb': (color) => ({
          '&::-webkit-scrollbar-thumb': {
            'background-color': color
          }
        }),

        'scrollbar-x-thumb': (color) => ({
          '&::-webkit-scrollbar-thumb:horizontal': {
            'background-color': color
          }
        }),
        'scrollbar-x-thumb-active': (color) => ({
          '&::-webkit-scrollbar-thumb:horizontal:active': {
            'background-color': color
          }
        }),

        'scrollbar-y-thumb': (color) => ({
          '&::-webkit-scrollbar-thumb:vertical': {
            'background-color': color
          }
        }),
        'scrollbar-y-thumb-active': (color) => ({
          '&::-webkit-scrollbar-thumb:vertical:active': {
            'background-color': color
          }
        }),

        'scrollbar-track': (color) => ({
          '&::-webkit-scrollbar-track, &::-webkit-scrollbar-corner': {
            'background-color': color,
          }
        }),
        'scrollbar-x-track': (color) => ({
          '&::-webkit-scrollbar-track:horizontal': {
            'background-color': color
          }
        }),
        'scrollbar-x-track-active': (color) => ({
          '&::-webkit-scrollbar-track:horizontal:active': {
            'background-color': color
          }
        }),

        'scrollbar-y-track': (color) => ({
          '&::-webkit-scrollbar-track:vertical': {
            'background-color': color
          }
        }),
        'scrollbar-y-track-active': (color) => ({
          '&::-webkit-scrollbar-track:vertical:active': {
            'background-color': color
          }
        }),

        'scrollbar-corner': (color) => ({
          '&::-webkit-scrollbar-corner': {
            'background-color': color
          }
        }),
      }, {
        values: flatten( theme('colors') ),
      })

      matchUtilities({
        'scrollbar-rounded': (radius) => ({
          '&::-webkit-scrollbar-thumb': {
            'border-radius': radius
          }
        })
      }, {
        values: theme('borderRadius')
      })
    }),
      
  ],
};
