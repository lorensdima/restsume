/**
 * Single source of truth for portfolio content rendered on the page.
 * Both the designed view and the `{ }` JSON view read from here.
 *
 * Optional fields (year, kind) are intentionally left undefined when
 * not known — they simply don't render. Fill them in as needed.
 */

export type ProjectEntry = {
  slug: string;
  title: string;
  short: string;
  year?: string;
  kind?: "Thesis" | "Client" | "Coursework" | "Experiment";
  stack: string[];
  description: string;
  image: string;
  links: { repo: string; doc?: string; site?: string };
};

export const projects: ProjectEntry[] = [
  {
    slug: "agiss",
    title: "AG Florendo Inventory and Sales Monitoring System (AGISS)",
    short: "AGISS: Inventory & Sales",
    kind: "Client",
    stack: ["Vue.js", "PHP", "MySQL", "Bootstrap"],
    description:
      "A web-based inventory and sales monitoring system developed for AG Florendo Inc. The front end was built with HTML, CSS, Bootstrap, Material Design Bootstrap, and Vue.js, while PHP, MySQL, phpMyAdmin, and Apache Server power the back-end processes.",
    image: "/projects/project1.png",
    links: {
      repo: "https://gitlab.com/emiliau/ag-inventory-and-sales-system",
      doc: "https://drive.google.com/file/d/14b3IdXOtrCZjrMtyAuwr3Bfb2pHyOEV8/view?usp=share_link",
    },
  },
  {
    slug: "typhoon",
    title:
      "Determining Disaster Location and Severity Through Sentiment Analysis of Philippine Typhoon Related Tweets",
    short: "Typhoon Sentiment Mapping",
    stack: ["Machine Learning", "Sentiment Analysis", "Twitter", "Web App"],
    description:
      "Determines how severely typhoons impact different cities and regions in the Philippines using machine learning and Twitter. The model was integrated into a simple web application that locates affected areas across the Philippine Archipelago.",
    image: "/projects/disaster.png",
    links: {
      repo: "https://gitlab.com/emiliau/typhoon-application",
      doc: "https://drive.google.com/file/d/1CcAhNqbpOjRo5U9qq8ma5w9sEBmNDlLH/view?usp=share_link",
    },
  },
  {
    slug: "crime-mapping",
    title: "Mapping and Predicting Crime Prone Regions in the Philippines",
    short: "Crime-Prone Region Mapping",
    stack: ["Data Mining", "TWINT", "APIFY", "Prediction"],
    description:
      "Predicts the likelihood of crime in a region and maps crime-prone areas in the Philippines. The team scraped data from the Twitter accounts of the PNP and the Manila Bulletin using TWINT and APIFY.",
    image: "/projects/crime_mapping.png",
    links: {
      repo: "https://gitlab.com/emiliau/data-mining",
      doc: "https://drive.google.com/file/d/1TrpD9rFB-lNrMqsJLHQezyuetg-PMA-Z/view?usp=share_link",
    },
  },
  {
    slug: "todo",
    title: "Todo Application",
    short: "Todo App + API",
    kind: "Experiment",
    stack: ["Node", "JWT", "Docker", "REST API"],
    description:
      "A simple to-do app where users can create an account, log in, add tasks, mark them complete, and delete them. Sessions use JSON Web Tokens. Built to experiment with Docker.",
    image: "/projects/todo.png",
    links: { repo: "https://github.com/lorensdima/todo-app-api/" },
  },
  {
    slug: "radquiz",
    title: "RadQuiz",
    short: "RadQuiz",
    kind: "Experiment",
    stack: ["JavaScript", "GitHub Pages"],
    description:
      "A simple quiz application with questions related to Rad Tech, deployed using GitHub Pages.",
    image: "/projects/radquiz.png",
    links: {
      repo: "https://github.com/lorensdima/radquiz",
      site: "https://lorensdima.github.io/radquiz/",
    },
  },
  {
    slug: "paste-it",
    title: "Paste.It",
    short: "Paste.It",
    kind: "Experiment",
    stack: ["JavaScript", "GitHub Pages"],
    description:
      "A very simple web application for removing formatting from copied text. Built to try out GitHub Pages.",
    image: "/projects/pasteit.png",
    links: {
      repo: "https://github.com/lorensdima/paste.it",
      site: "https://lorensdima.github.io/paste.it/",
    },
  },
];

export type SkillIcon =
  | { type: "img"; src: string; invert?: boolean }
  | { type: "svg"; key: "react" | "express" };

export type SkillGroup = {
  label: string;
  items: { name: string; icon: SkillIcon }[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "languages",
    items: [
      { name: "JavaScript", icon: { type: "img", src: "/java-script-logo.svg", invert: true } },
      { name: "Python", icon: { type: "img", src: "/python.svg" } },
    ],
  },
  {
    label: "runtime & frameworks",
    items: [
      { name: "Node", icon: { type: "img", src: "/node-js.svg", invert: true } },
      { name: "React", icon: { type: "svg", key: "react" } },
      { name: "Express", icon: { type: "svg", key: "express" } },
    ],
  },
  {
    label: "data",
    items: [
      { name: "Oracle", icon: { type: "img", src: "/oracle.svg", invert: true } },
      { name: "MySQL", icon: { type: "img", src: "/mysql.svg", invert: true } },
    ],
  },
  {
    label: "tools",
    items: [{ name: "Git", icon: { type: "img", src: "/git.svg", invert: true } }],
  },
];

export const socials = {
  name: "Emilio Laurence Dimalanta",
  fullName: "Emilio Laurence B. Dimalanta",
  title: "Information Technology Graduate",
  email: "laurencedimalanta@gmail.com",
  linkedin: "http://www.linkedin.com/in/emilio-laurence/",
  source: "https://github.com/lorensdima/restsume",
};

export const endpoints = [
  { route: "/api/basic", note: "who I am" },
  { route: "/api/projects", note: "things I built" },
  { route: "/api/experience", note: "where I worked" },
  { route: "/api/education", note: "where I studied" },
];
