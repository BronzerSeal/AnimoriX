import { MessageCirclePlus } from "lucide-react";

const Activities = () => {
  return (
    <section className="rounded-2xl ">
      <h2 className="px-4 text-xl font-black  sm:px-5">ACTIVITIES</h2>
      <div className="space-y-4 px-4 pb-5 pt-6 sm:px-5">
        <div className="flex items-center gap-3 text-[12px] leading-tight dark:text-[#e1f2ff]">
          <MessageCirclePlus size={16} color="#8eeec4" />
          <span className="text-[#8eeec4]">19 minutes ago</span>
          <span className="font-bold ">name</span>
          <span className="dark:text-[#a7bfd4] text-gray-500">
            watched EP 1 of JoJo&apos;s Bizarre Adventure: Golden Wind
          </span>
        </div>
      </div>
    </section>
  );
};

export default Activities;
