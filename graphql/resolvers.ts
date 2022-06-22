import { Context } from '../graphql/context';
import bcrypt from 'bcrypt';

export const resolvers = {
  Query: {
    companies: (_, { category, city }, { prisma }: Context) => {
      return prisma.company.findMany({
        where: {
          category: category,
          city: city,
        },
      });
    },
    company: (_, { id }, { prisma }: Context) => {
      return prisma.company.findUnique({
        where: {
          id: id,
        },
      });
    },
  },

  Mutation: {
    createCompany: (_, { input, author }, { prisma }: Context) => {
      return prisma.company.create({
        data: {
          author: {
            connect: { email: author },
          },
          ...input,
        },
      });
    },
    updateCompany: (_, args, { prisma }: Context) => {
      return prisma.company.update({
        where: { id: args.id },
        data: args.input,
      });
    },
    deleteCompany: (_, args, { prisma }: Context) => {
      return prisma.company.delete({
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
