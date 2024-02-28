import {
  Atkinson_Hyperlegible,
  Inconsolata,
  Inter,
  Jost,
  Outfit,
  Shadows_Into_Light_Two,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const outfit = Outfit({ subsets: ["latin"] });

export const jost = Jost({ subsets: ["latin"] });

export const inconsolata = Inconsolata({ subsets: ["latin"] });

export const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400",
});

export const shadows_font = Shadows_Into_Light_Two({
  subsets: ["latin"],
  weight: "400",
});
