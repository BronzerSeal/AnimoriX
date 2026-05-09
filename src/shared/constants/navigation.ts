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
    title: "genres",
    type: "with-genres",
    genres: [
      { title: "action", href: "/genres/action", id: "1" },
      { title: "adventure", href: "/genres/adventure", id: "2" },
      { title: "avant-garde", href: "/genres/avant-garde", id: "5" },
      { title: "boys-love", href: "/genres/boys-love", id: "28" },

      { title: "comedy", href: "/genres/comedy", id: "4" },
      { title: "educational", href: "/genres/educational", id: "56" },
      { title: "drama", href: "/genres/drama", id: "8" },
      { title: "ecchi", href: "/genres/ecchi", id: "9" },

      { title: "fantasy", href: "/genres/fantasy", id: "10" },
      { title: "girls-love", href: "/genres/girls-love", id: "26" },
      { title: "gourmet", href: "/genres/gourmet", id: "47" },
      { title: "harem", href: "/genres/harem", id: "35" },

      { title: "horror", href: "/genres/horror", id: "14" },
      { title: "isekai", href: "/genres/isekai", id: "62" },
      { title: "iyashikei", href: "/genres/iyashikei", id: "63" },
      { title: "josei", href: "/genres/josei", id: "43" },

      { title: "kids", href: "/genres/kids", id: "15" },
      { title: "racing", href: "/genres/racing", id: "3" },
      { title: "mahou-shoujo", href: "/genres/mahou-shoujo", id: "66" },
      { title: "martial-arts", href: "/genres/martial-arts", id: "17" },

      { title: "mecha", href: "/genres/mecha", id: "18" },
      { title: "military", href: "/genres/military", id: "38" },
      { title: "music", href: "/genres/music", id: "19" },
      { title: "mystery", href: "/genres/mystery", id: "7" },

      { title: "parody", href: "/genres/parody", id: "20" },
      { title: "psychological", href: "/genres/psychological", id: "40" },
      { title: "reverse-harem", href: "/genres/reverse-harem", id: "73" },
      { title: "romance", href: "/genres/romance", id: "22" },

      { title: "school", href: "/genres/school", id: "23" },
      { title: "sci-fi", href: "/genres/sci-fi", id: "24" },
      { title: "seinen", href: "/genres/seinen", id: "42" },
      { title: "shoujo", href: "/genres/shoujo", id: "25" },

      { title: "shounen", href: "/genres/shounen", id: "27" },
      { title: "slice-of-life", href: "/genres/slice-of-life", id: "36" },
      { title: "space", href: "/genres/space", id: "29" },
      { title: "sports", href: "/genres/sports", id: "30" },

      { title: "super-power", href: "/genres/super-power", id: "31" },
      { title: "supernatural", href: "/genres/supernatural", id: "37" },
      { title: "suspense", href: "/genres/suspense", id: "41" },
      { title: "samurai", href: "/genres/samurai", id: "21" },

      { title: "vampire", href: "/genres/vampire", id: "32" },
    ],
  },
  {
    title: "types",
    type: "with-genres",
    genres: [
      { title: "movies", href: "/types/movie" },
      { title: "tv-series", href: "/types/tv" },
      { title: "ovas", href: "/types/ova" },
      { title: "onas", href: "/types/ona" },
      { title: "specials", href: "/types/special" },
    ],
  },
  {
    title: "new-releases",
    type: "link",
    href: "/new-releases",
  },

  {
    title: "updates",
    type: "link",
    href: "/updates",
  },

  {
    title: "ongoing",
    type: "link",
    href: "/ongoing",
  },

  {
    title: "recent",
    type: "link",
    href: "/recent",
  },
];
