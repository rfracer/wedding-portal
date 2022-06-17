import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: '4',
      name: 'Augusto',
    },
  });

  await prisma.company.create({
    data: {
      id: '4',
      name: 'Kristoff',
      category: 'hall',
      city: 'poznan',
      phone: 602554788,
      email: 'testhall@gmail.com',
      photoURL: '/images/hall-category.jpg',
      about: 'To jest opis sali',
      website: 'https://www.halla.pl',
      offer: 'To jest oferta sali',
      price: '200',
      authorId: '4',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
