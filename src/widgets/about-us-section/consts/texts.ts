type paragraph = {
  type: "text" | "feature" | "end";
  text: string;
  title?: string;
};

type text = {
  title?: string;
  paragraphs: paragraph[];
};

export const texts: text[] = [
  {
    paragraphs: [
      {
        type: "text",
        text: `Anime is not just about stories drawn with pen strokes; it’s a gateway
to worlds full of emotions and creativity. From intense battles to
unforgettable romantic moments, anime has become an essential part of
entertainment for millions of people. With its growing popularity, the
number of free anime streaming platforms continues to rise.`,
      },
      {
        type: "text",
        text: `However, not every site can truly satisfy fans. Some stand out as
guiding lights in the vast ocean. That’s why AnimoriX.to was created —
a global home for anime enthusiasts, with the mission to become one of
the top free anime streaming sites! 🌟`,
      },
    ],
  },

  {
    title: "1. What is AnimoriX.to?",
    paragraphs: [
      {
        type: "text",
        text: `AnimoriX.to is a free anime streaming site where you can watch anime
in HD quality with both subbed and dubbed options, all without the
hassle of registration or payment. And the best part? There are
absolutely no ads! We’re dedicated to making it the safest and most
enjoyable place for anime lovers to watch anime for free.`,
      },
    ],
  },

  {
    title: "2. What make AnimoriX.to the best site to watch anime free online?",
    paragraphs: [
      {
        type: "text",
        text: `Before creating AnimoriX.to, we thoroughly explored numerous other
free anime sites and learned from their strengths and weaknesses. We
kept only the best features and eliminated all the drawbacks,
combining them into our AnimoriX platform. That’s why we’re so
confident in claiming to be the best site for anime streaming.
Experience it yourself and see the difference!`,
      },
      {
        type: "feature",
        title: "Safety",
        text: "No ads, no redirects, and absolutely no viruses. Your safety and enjoyment are our top priorities.",
      },
      {
        type: "feature",
        title: "Content Library",
        text: `We offer an extensive collection of anime, spanning from 1980s classics
to the latest releases. Each title includes English subtitles, with many
also available in dubbed versions for your convenience.`,
      },
      {
        type: "feature",
        title: "Quality / Resolution",
        text: `All anime on AnimoriX.to is available in the best possible resolution.
With our quality setting feature, you can adjust the resolution to match
your Internet speed.`,
      },
      {
        type: "feature",
        title: "Streaming experience",
        text: "Faster loading speeds and a completely buffer-free experience compared to many other sites.",
      },
      {
        type: "feature",
        title: "Updates",
        text: "Our library is updated daily, even hourly, to ensure the latest episodes are available.",
      },
      {
        type: "feature",
        title: "User Interface",
        text: "A clean and user-friendly UI/UX that makes navigation simple for everyone.",
      },
      {
        type: "feature",
        title: "Device Compatibility",
        text: "AnimoriX.to works seamlessly on both mobile and desktop devices.",
      },
    ],
  },

  {
    title:
      "3. How does AnimeKAI compare to 9Anime, Aniwave, HiAnime, and GogoAnime?",
    paragraphs: [
      {
        type: "text",
        text: `We are a new website, so our library can't match Aniwave yet, but we
have a larger library than HiAnime and Gogo, and we are still adding
new titles daily.`,
      },
      {
        type: "text",
        text: `With access to multiple private trackers, we are confident that we
will surpass Aniwave's library and even KissAnime in the future.`,
      },
      {
        type: "text",
        text: `At the moment, we have 10k titles, Aniwave had around 12k before it
closed, HiAnime has about 7k and Gogo has around 9k.`,
      },
      {
        type: "text",
        text: `We have a more modern layout and better UI/UX than Gogo and 9Anime,
making navigation on our site easy and convenient.`,
      },
      {
        type: "text",
        text: `Additionally, we offer many advanced features such as bookmark
saving, watch history, synchronization with AniList, auto-next episode,
autoplay, and notifications.`,
      },
      {
        type: "text",
        text: `If you're searching for a reliable and safe site for anime streaming,
give AnimeKAI.to a try.`,
      },
      {
        type: "end",
        title: "Thank you",
        text: "Thank you",
      },
    ],
  },
];
