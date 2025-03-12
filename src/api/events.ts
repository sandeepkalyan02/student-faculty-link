
import prisma from '@/lib/prisma';

export async function getAllEvents() {
  return await prisma.event.findMany({
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true
        }
      },
      attachments: true,
      _count: {
        select: {
          rsvps: true
        }
      }
    },
    orderBy: {
      startDate: 'asc'
    }
  });
}

export async function getEventById(eventId: string) {
  return await prisma.event.findUnique({
    where: {
      id: eventId
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true
        }
      },
      attachments: true,
      rsvps: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              avatar: true
            }
          }
        }
      }
    }
  });
}

export async function createEvent(data: any, userId: string) {
  const { attachments, ...eventData } = data;
  
  return await prisma.event.create({
    data: {
      ...eventData,
      createdBy: {
        connect: {
          id: userId
        }
      },
      attachments: {
        create: attachments || []
      }
    },
    include: {
      attachments: true
    }
  });
}

export async function rsvpToEvent(eventId: string, userId: string, status: string) {
  return await prisma.eventRSVP.upsert({
    where: {
      eventId_userId: {
        eventId,
        userId
      }
    },
    update: {
      status
    },
    create: {
      eventId,
      userId,
      status
    }
  });
}
