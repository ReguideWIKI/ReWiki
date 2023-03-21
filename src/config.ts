import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://www.reguide.wiki/",
  author: "Reguide Editor",
  desc: "Leader in cryptocurrency with analysis updates. Hunting the best gems on crypto ecosystem  ",
  title: "Reguide",
  ogImage: "astro-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/ReguideWIKI",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:contact@reguide.wiki",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/HGLResearcher",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "Discord",
    href: "https://t.me/ReguideWiki",
    linkTitle: `${SITE.title} on Discord`,
    active: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/ReguideWiki",
    linkTitle: `${SITE.title} on Telegram`,
    active: true,
  }
];
