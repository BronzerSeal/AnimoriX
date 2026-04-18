import { Button } from "@/shared/ui/button";
import Link from "next/link";

const NotFound = ({
  errCode,
  errMessage,
}: {
  errCode: string;
  errMessage: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center z-10">
      <div className="text-8xl font-bold text-gray-300">{errCode}</div>

      <h1 className="text-3xl font-bold tracking-tight dark:text-white">
        {errMessage}
      </h1>

      <div className="pt-6">
        <Button>
          <Link href={"/home"}>Return to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
