import { getJikanUserByName } from "@/entities/user";
import { GetUserInfoById } from "@/features/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const userName = req.nextUrl.searchParams.get("userName");

  if (!userId || !userName) {
    return NextResponse.json(
      { status: "error", message: "No userId or userName" },
      { status: 400 },
    );
  }

  try {
    const dbResponse = await GetUserInfoById(userId);

    if (dbResponse.status === "success" && dbResponse.user) {
      return NextResponse.json({
        status: "success",
        type: "db",
        user: dbResponse.user,
      });
    }

    const jikanUser = await getJikanUserByName(userName);

    if (!jikanUser) {
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: "success",
      type: "jikan",
      user: jikanUser,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Server error" },
      { status: 500 },
    );
  }
}
