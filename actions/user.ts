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
