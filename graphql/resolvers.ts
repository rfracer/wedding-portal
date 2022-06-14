import { Context } from '../graphql/context';

export const resolvers = {
  Query: {
    companies: (_, { category, city }, { prisma }: Context) => {
      return prisma.company.findMany({
        where: {
          category: category,
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
    createCompany: (_, args, { prisma }: Context) => {
      return prisma.company.create({ data: args.input });
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
  },
};
