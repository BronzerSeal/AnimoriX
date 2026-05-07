import { useTranslations } from "next-intl";

type Paragraph = {
  type: "text" | "feature" | "end";
  text: string;
  title?: string;
};

type TextSection = {
  title?: string;
  paragraphs: Paragraph[];
};

const AboutSections = () => {
  const t = useTranslations("landing-page");
  const about = t.raw("about") as TextSection[];
  return (
    <div className="flex flex-col gap-3">
      {about.map((section, i) => (
        <section className="flex flex-col gap-3" key={i}>
          {section.title && (
            <h2 className="text-orange-500">{section.title}</h2>
          )}

          {section.paragraphs.map((p, i) => {
            if (p.type === "text") {
              return <p key={i}>{p.text}</p>;
            }

            if (p.type === "end") {
              return (
                <p key={i}>
                  <b>{p.text}</b>
                </p>
              );
            }

            if (p.type === "feature") {
              return (
                <p key={i}>
                  -<b> {p.title}:</b> {p.text}
                </p>
              );
            }
          })}
        </section>
      ))}
    </div>
  );
};

export default AboutSections;
