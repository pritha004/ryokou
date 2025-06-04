"use server";

import { auth } from "@/auth";
import db from "@/lib/prisma";

export const checkUser = async () => {
  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const newUser = await db.user.create({
      data: {
        name: user.name,
        imageUrl: user.image,
        email: user.email,
        nationality: "",
        currency: "",
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export async function getUserProfileCompleteStatus() {
  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    return null;
  }

  try {
    const userFound = await db.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        nationality: true,
      },
    });

    return {
      isProfileComplete: !!userFound?.nationality,
    };
  } catch (error) {
    console.error("Error checking profile complete status:", error);
    throw new Error("Failed to check profile complete status");
  }
}

export async function updateUser(data: {
  nationality: string;
  currency: string;
}) {
  const session = await auth();

  const user = session?.user;

  if (!user || !user.email) {
    throw new Error("Unauthorized");
  }

  const userFound = await db.user.findUnique({
    where: { email: user.email },
  });

  if (!userFound) throw new Error("User not found");

  try {
    const updatedUser = await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        nationality: data.nationality,
        currency: data.currency,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error updating user:", error.message);
    throw new Error("Failed to update profile");
  }
}
