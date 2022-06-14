import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: '1',
      name: 'Kinga',
    },
  });

  await prisma.company.create({
    data: {
      id: '1',
      name: 'AleKadry',
      category: 'Photography',
      city: 'Kalisz',
      phone: 502554054,
      email: 'augustbiadala@gmail.com',
      photoURL:
        'https://www.onedo.pl/wp-content/uploads/2021/04/registration-orders.jpg',
      about: 'To jest opis firmy',
      website: 'https://www.alekadry.pl',
      offer: 'To jest oferta',
      price: '4000-5000',
      authorId: '1',
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
