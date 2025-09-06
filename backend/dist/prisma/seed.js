import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    await prisma.product.create({
        data: {
            title: 'Brown Furry Coat',
            desc: 'Stay cozy in this luxurious brown furry coat, perfect for winter walks.',
            price: 229,
            img: '/images/brown-coat-front.webp',
            img2: '/images/brown-coat-back.webp',
            inStock: true,
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            features: ['Faux fur', 'Adjustable fit', 'Hidden pockets'],
            care: ['Dry clean only'],
            shipping: ['Free shipping over $100'],
            returns: ['30-day return policy']
        }
    });
}
main()
    .catch((e) => {
    console.error(e.message);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map