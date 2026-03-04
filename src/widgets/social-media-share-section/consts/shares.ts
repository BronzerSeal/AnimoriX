import { Bot, Facebook, Phone, Send, X } from "lucide-react";
import {
  FacebookShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export const shares = [
  {
    Button: FacebookShareButton,
    icon: Facebook,
    color: "bg-blue-600 hover:bg-blue-500",
    count: "35.6k",
  },
  {
    Button: TwitterShareButton,
    icon: X,
    color: "bg-black hover:bg-black/70",
    count: "31.8k",
  },
  {
    Button: RedditShareButton,
    icon: Bot,
    color: "bg-orange-600 hover:bg-orange-500",
    count: "63.9k",
  },
  {
    Button: WhatsappShareButton,
    icon: Phone,
    color: "bg-green-600 hover:bg-green-400",
    count: "3.7k",
  },
  {
    Button: TelegramShareButton,
    icon: Send,
    color: "bg-blue-400 hover:bg-blue-300",
    count: "22.5k",
  },
];
