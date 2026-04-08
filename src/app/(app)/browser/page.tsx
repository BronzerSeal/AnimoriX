import BrowserPage from "@/views/browser/ui/browser-page";
import { Suspense } from "react";

const BrowserRoute = () => {
  return (
    <Suspense>
      <BrowserPage />
    </Suspense>
  );
};

export default BrowserRoute;
