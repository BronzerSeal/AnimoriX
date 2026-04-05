import BrowserPage from "@/views/browser/ui/browser-page";
import { Suspense } from "react";

const BrowserRoute = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserPage />
    </Suspense>
  );
};

export default BrowserRoute;
