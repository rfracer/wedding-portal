import { Context } from '../graphql/context';
import bcrypt from 'bcrypt';

export const resolvers = {
  Query: {
    services: (_, { category, city }, { prisma }: Context) => {
      return prisma.service.findMany({
        where: {
          category: category,
          city: city,
        },
      });
    },
    service: (_, { id }, { prisma }: Context) => {
      return prisma.service.findUnique({
        where: {
          id: id,
        },
      });
    },
    user: (_, { email }, { prisma }: Context) => {
      return prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          services: true,
        },
      });
    },
  },

  Mutation: {
    createService: (_, { input, author }, { prisma }: Context) => {
      return prisma.service.create({
        data: {
          author: {
            connect: { email: author },
          },
          ...input,
        },
      });
    },
    updateService: (_, args, { prisma }: Context) => {
      return prisma.service.update({
        where: { id: args.id },
        data: args.input,
      });
    },
    deleteService: (_, args, { prisma }: Context) => {
      return prisma.service.delete({
        where: { id: args.id },
      });
    },
    signup: async (_, args, { prisma }: Context) => {
      const hashedPass = await bcrypt.hash(args.password, 10);
      const { password, ...user } = await prisma.user.create({
        data: {
          ...args,
          password: hashedPass,
        },
      });

      return {
        user,
      };
    },
  },
};
