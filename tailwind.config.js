/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#D2006E", variant: "" },
        "color-tertiary": { variant: "#F9F9F9", DEFAULT: "#F3F3F3" },
        "color-link-variant": "#F2FAFF;",
        "color-bg-informative": "#f3f7fe",
        success: { DEFAULT: "#24A148", variant: "" },
      },
      textColor: {
        link: "#0F62FE",
        tertiary: "#717171",
        success: "#24A148",
      },
      boxShadow: {
        "tail-user": "0px 16px -16px 8px var(--background-color-tertiary)",
        "tail-bot": `before:contents-[''] before:absolute before:bottom-0 before:left-[-4px] before:h-5 before:w-5 before:bg-white before:rounded-br-[16px] after:contents-[''] after:absolute after:bottom-0 after:z-10 after:left-[-8px] after:h-5 after:w-2 after:bg-color-tertiary after:rounded-br-[10px]`,
      },
      fontSize: {
        sm: "12px",
        base: "14px",
        lg: "16px",
      },
      gap: {
        sm: "8px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
      },
    },
  },
  plugins: [],
};
