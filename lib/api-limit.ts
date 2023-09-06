import { auth } from "@clerk/nextjs";

import { MAX_FREE_COUNTS } from "@/constants";
import prisma from "@/lib/prisma";

export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    }
  })

  if (userApiLimit) {
    await prisma.userApiLimit.update({
      where: {
        userId,
      },
      data: {
        count: userApiLimit.count + 1,
      }
    })
  } else {
    await prisma.userApiLimit.create({
      data: {
        userId,
        count: 1,
      }
    });
  };
};

export const checkApiLimit = async () => {
  const { userId } = auth();
  
  if (!userId) {
    return false;
  }

  const userApiLimit = await prisma.userApiLimit.findUnique({
    where: {
      userId,
    }
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
}