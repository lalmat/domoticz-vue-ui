/** @type {import('tailwindcss').Config} */
module.exports = {
  content : ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme   : {
    fontFamily: {
      sans  : ["Graphik", "sans-serif"],
      serif : ["Merriweather", "serif"],
    },
  },
  plugins : [],
  purge   : {
    enabled: false
  },
}
