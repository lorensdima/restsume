import {
  Atkinson_Hyperlegible,
  Inconsolata,
  Inter,
  Jost,
  Outfit,
  Shadows_Into_Light,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const outfit = Outfit({ subsets: ["latin"] });

export const jost = Jost({ subsets: ["latin"] });

export const inconsolata = Inconsolata({ subsets: ["latin"] });

export const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400",
});

export const into_light = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
});
