import {
  Bebas_Neue,
  Work_Sans,
  Playfair_Display,
} from "next/font/google";

// Display font for large headings - bold and distinctive
export const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

// Alternative display font option
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display-alt",
});

// Body font - refined and readable
export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

// Keep existing fonts for backward compatibility during transition
export const outfit = workSans;
export const jost = workSans;
export const inconsolata = workSans;
export const atkinson = workSans;
export const into_light = bebas;
