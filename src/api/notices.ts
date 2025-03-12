
import prisma from '@/lib/prisma';

export async function getAllNotices() {
  return await prisma.notice.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getNoticesByCategory(category: string) {
  return await prisma.notice.findMany({
    where: {
      category
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getNoticeById(noticeId: string) {
  return await prisma.notice.findUnique({
    where: {
      id: noticeId
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true
        }
      }
    }
  });
}

export async function createNotice(data: any, authorId: string) {
  return await prisma.notice.create({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  });
}
