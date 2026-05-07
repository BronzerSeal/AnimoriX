import { useTranslations } from "next-intl";
import AboutSections from "./about-sections";

const AboutUsSection = () => {
  const t = useTranslations("landing-page");
  return (
    <main>
      <h1 className="text-3xl font-extrabold">{t("subtitle")}</h1>

      <AboutSections />
    </main>
  );
};

export default AboutUsSection;
