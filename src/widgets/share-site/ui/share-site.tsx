import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import SocialMediaShareSection from "@/features/social-media-share";

const ShareSite = () => {
  return (
    <div className="w-full p-5 bg-[#EEEEFF] dark:bg-[#11161a] flex justify-between items-center rounded-md flex-col gap-2 md:gap-0 md:flex-row">
      <div className="flex gap-2 items-center justify-center">
        <Avatar size="lg">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>HM</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-black dark:text-green-300 text-xl">
            Love this site?
          </h1>
          <p className="text-gray-500 text-[13px]">
            Share it and let others know!
          </p>
        </div>
      </div>

      <div className="flex gap-2 justify-center items-center">
        <div className="leading-none">
          <h1 className="text-gray-500 m-0">208k</h1>
          <p className="text-gray-500 text-[10px] m-0">shares</p>
        </div>

        <SocialMediaShareSection variant="clear" fourBtns />
      </div>
    </div>
  );
};

export default ShareSite;
