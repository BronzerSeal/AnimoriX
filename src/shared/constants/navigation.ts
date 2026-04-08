type NavTopicWithGenres = {
  title: string;
  type: "with-genres";
  genres: { title: string; href: string; id?: string }[];
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
      { title: "Action", href: "/genres/action", id: "1" },
      { title: "Adventure", href: "/genres/adventure", id: "2" },
      { title: "Avant Garde", href: "/genres/avant-garde", id: "5" },
      { title: "Boys Love", href: "/genres/boys-love", id: "28" },

      { title: "Comedy", href: "/genres/comedy", id: "4" },
      { title: "Educational", href: "/genres/educational", id: "56" },
      { title: "Drama", href: "/genres/drama", id: "8" },
      { title: "Ecchi", href: "/genres/ecchi", id: "9" },

      { title: "Fantasy", href: "/genres/fantasy", id: "10" },
      { title: "Girls Love", href: "/genres/girls-love", id: "26" },
      { title: "Gourmet", href: "/genres/gourmet", id: "47" },
      { title: "Harem", href: "/genres/harem", id: "35" },

      { title: "Horror", href: "/genres/horror", id: "14" },
      { title: "Isekai", href: "/genres/isekai", id: "62" },
      { title: "Iyashikei", href: "/genres/iyashikei", id: "63" },
      { title: "Josei", href: "/genres/josei", id: "43" },

      { title: "Kids", href: "/genres/kids", id: "15" },
      { title: "Racing", href: "/genres/racing", id: "3" },
      { title: "Mahou Shoujo", href: "/genres/mahou-shoujo", id: "66" },
      { title: "Martial Arts", href: "/genres/martial-arts", id: "17" },

      { title: "Mecha", href: "/genres/mecha", id: "18" },
      { title: "Military", href: "/genres/military", id: "38" },
      { title: "Music", href: "/genres/music", id: "19" },
      { title: "Mystery", href: "/genres/mystery", id: "7" },

      { title: "Parody", href: "/genres/parody", id: "20" },
      { title: "Psychological", href: "/genres/psychological", id: "40" },
      { title: "Reverse Harem", href: "/genres/reverse-harem", id: "73" },
      { title: "Romance", href: "/genres/romance", id: "22" },

      { title: "School", href: "/genres/school", id: "23" },
      { title: "Sci-Fi", href: "/genres/sci-fi", id: "24" },
      { title: "Seinen", href: "/genres/seinen", id: "42" },
      { title: "Shoujo", href: "/genres/shoujo", id: "25" },

      { title: "Shounen", href: "/genres/shounen", id: "27" },
      { title: "Slice of Life", href: "/genres/slice-of-life", id: "36" },
      { title: "Space", href: "/genres/space", id: "29" },
      { title: "Sports", href: "/genres/sports", id: "30" },

      { title: "Super Power", href: "/genres/super-power", id: "31" },
      { title: "Supernatural", href: "/genres/supernatural", id: "37" },
      { title: "Suspense", href: "/genres/suspense", id: "41" },
      { title: "Samurai", href: "/genres/samurai", id: "21" },

      { title: "Vampire", href: "/genres/vampire", id: "32" },
    ],
  },
  {
    title: "TYPES",
    type: "with-genres",
    genres: [
      { title: "Movies", href: "/types/movie" },
      { title: "TV Series", href: "/types/tv" },
      { title: "OVAs", href: "/types/ova" },
      { title: "ONAs", href: "/types/ona" },
      { title: "Specials", href: "/types/special" },
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
