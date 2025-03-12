
import prisma from '@/lib/prisma';

export async function getAllStudyMaterials() {
  return await prisma.studyMaterial.findMany({
    include: {
      uploadedBy: {
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
      uploadDate: 'desc'
    }
  });
}

export async function getStudyMaterialsByDepartment(department: string) {
  return await prisma.studyMaterial.findMany({
    where: {
      department: department
    },
    include: {
      uploadedBy: {
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
      uploadDate: 'desc'
    }
  });
}

export async function searchStudyMaterials(query: string) {
  return await prisma.studyMaterial.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { subject: { contains: query, mode: 'insensitive' } }
      ]
    },
    include: {
      uploadedBy: {
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
      uploadDate: 'desc'
    }
  });
}

export async function uploadStudyMaterial(data: any, userId: string) {
  return await prisma.studyMaterial.create({
    data: {
      ...data,
      uploadedBy: {
        connect: {
          id: userId
        }
      }
    }
  });
}

export async function incrementDownloadCount(materialId: string) {
  return await prisma.studyMaterial.update({
    where: {
      id: materialId
    },
    data: {
      downloads: {
        increment: 1
      }
    }
  });
}
