
import prisma from '@/lib/prisma';

export async function getAllForumPosts() {
  return await prisma.forumPost.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true
        }
      },
      _count: {
        select: {
          comments: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getForumPostsByCategory(category: string) {
  return await prisma.forumPost.findMany({
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
      },
      _count: {
        select: {
          comments: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getForumPostById(postId: string) {
  // Increment view count
  await prisma.forumPost.update({
    where: { id: postId },
    data: { views: { increment: 1 } }
  });
  
  return await prisma.forumPost.findUnique({
    where: {
      id: postId
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
      },
      comments: {
        where: {
          parentId: null
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
          },
          replies: {
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
              createdAt: 'asc'
            }
          }
        },
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  });
}

export async function createForumPost(data: any, authorId: string) {
  return await prisma.forumPost.create({
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

export async function createForumComment(postId: string, content: string, authorId: string, parentId?: string) {
  return await prisma.forumComment.create({
    data: {
      content,
      post: {
        connect: {
          id: postId
        }
      },
      author: {
        connect: {
          id: authorId
        }
      },
      parent: parentId ? {
        connect: {
          id: parentId
        }
      } : undefined
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

export async function voteForumPost(postId: string, voteType: 'upvote' | 'downvote') {
  return await prisma.forumPost.update({
    where: {
      id: postId
    },
    data: {
      [voteType === 'upvote' ? 'upvotes' : 'downvotes']: {
        increment: 1
      }
    }
  });
}
