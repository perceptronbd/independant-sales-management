/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: { max: "640px" },
      },
      colors: {
        "orange-red": "#FF4500",
        accent: {
          primary: "#3D5AFE",
          secondary: "#7D0C78",
        },
        alert: {
          highLight: "#00E2EE",
          ok: "#12b886",
          warning: "#FAC425",
          danger: "#F12940",
        },
        backgroundColor: {
          primary: "#FFFFFF",
          secondary: "#F6FAFF",
          tertiary: "#DDE2F9",
        },
        textColor: {
          primary: "#1c1c1c",
          secondary: "#484b5c",
          tertiary: "#95A2B2",
        },
      },
    },
    fontFamily: {
      title: ["Montserrat", ""],
      special: ["Lato", ""],
      body: ["Open Sans", ""],
    },
  },
  plugins: [],
};
