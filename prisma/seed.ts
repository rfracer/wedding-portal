import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.create({
  //   data: {
  //     id: '3',
  //     name: 'August',
  //   },
  // });

  await prisma.company.create({
    data: {
      id: '3',
      name: 'Biały dwór',
      category: 'hall',
      city: 'Kalisz',
      phone: 602554788,
      email: 'testhall@gmail.com',
      photoURL:
        '/images/hall-category.jpg',
      about: 'To jest opis sali',
      website: 'https://www.hall.pl',
      offer: 'To jest oferta sali',
      price: '200',
      authorId: '3',
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
