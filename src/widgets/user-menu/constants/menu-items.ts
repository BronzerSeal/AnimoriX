import { Pencil } from "lucide-react";

export const menuItems = [
  { label: "Edit Profile", icon: Pencil, href: "/user/profile" },
  //возможные улушения
  // { label: "Continue Watching", icon: History, href: "/user/watching" },
  // { label: "Bookmarks", icon: Heart, href: "/user/bookmarks" },
  // { label: "Notifications", icon: Bell, href: "/user/notifications" },
  // { label: "Import/Export", icon: Import, href: "/import" },
  // { label: "Settings", icon: Settings, href: "/user/settings" },
] as const;
