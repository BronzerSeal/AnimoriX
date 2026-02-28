type NavTopicWithGenres = {
  title: string;
  type: "with-genres";
  genres: { title: string; href: string }[];
};

type NavTopicLink = {
  title: string;
  type: "link";
  href: string;
};

export type NavTopic = NavTopicWithGenres | NavTopicLink;

export const navTopics: NavTopic[] = [
  {
    title: "GENRES",
    type: "with-genres",
    genres: [
      { title: "Action", href: "/genres/action" },
      { title: "Adventure", href: "/genres/adventure" },
      { title: "Avant Garde", href: "/genres/avant-garde" },
      { title: "Boys Love", href: "/genres/boys-love" },

      { title: "Comedy", href: "/genres/comedy" },
      { title: "Demons", href: "/genres/demons" },
      { title: "Drama", href: "/genres/drama" },
      { title: "Ecchi", href: "/genres/ecchi" },

      { title: "Fantasy", href: "/genres/fantasy" },
      { title: "Girls Love", href: "/genres/girls-love" },
      { title: "Gourmet", href: "/genres/gourmet" },
      { title: "Harem", href: "/genres/harem" },

      { title: "Horror", href: "/genres/horror" },
      { title: "Isekai", href: "/genres/isekai" },
      { title: "Iyashikei", href: "/genres/iyashikei" },
      { title: "Josei", href: "/genres/josei" },

      { title: "Kids", href: "/genres/kids" },
      { title: "Magic", href: "/genres/magic" },
      { title: "Mahou Shoujo", href: "/genres/mahou-shoujo" },
      { title: "Martial Arts", href: "/genres/martial-arts" },

      { title: "Mecha", href: "/genres/mecha" },
      { title: "Military", href: "/genres/military" },
      { title: "Music", href: "/genres/music" },
      { title: "Mystery", href: "/genres/mystery" },

      { title: "Parody", href: "/genres/parody" },
      { title: "Psychological", href: "/genres/psychological" },
      { title: "Reverse Harem", href: "/genres/reverse-harem" },
      { title: "Romance", href: "/genres/romance" },

      { title: "School", href: "/genres/school" },
      { title: "Sci-Fi", href: "/genres/sci-fi" },
      { title: "Seinen", href: "/genres/seinen" },
      { title: "Shoujo", href: "/genres/shoujo" },

      { title: "Shounen", href: "/genres/shounen" },
      { title: "Slice of Life", href: "/genres/slice-of-life" },
      { title: "Space", href: "/genres/space" },
      { title: "Sports", href: "/genres/sports" },

      { title: "Super Power", href: "/genres/super-power" },
      { title: "Supernatural", href: "/genres/supernatural" },
      { title: "Suspense", href: "/genres/suspense" },
      { title: "Thriller", href: "/genres/thriller" },

      { title: "Vampire", href: "/genres/vampire" },
    ],
  },
  {
    title: "TYPES",
    type: "with-genres",
    genres: [
      { title: "Movies", href: "/movie" },
      { title: "TV Series", href: "/tv" },
      { title: "OVAs", href: "/ova" },
      { title: "ONAs", href: "/ona" },
      { title: "Specials", href: "/special" },
    ],
  },
  {
    title: "NEW RELEASES",
    type: "link",
    href: "/new-releases",
  },
  {
    title: "UPDATES",
    type: "link",
    href: "/updates",
  },
  {
    title: "ONGOING",
    type: "link",
    href: "/ongoing",
  },
  {
    title: "RECENT",
    type: "link",
    href: "/recent",
  },
];
