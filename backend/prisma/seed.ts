import prisma from '../src/config/db'

// ensure indempotence
await prisma.product.deleteMany({})

async function main() {
  await prisma.product.createMany({
    data: [{
      id: 1,
      title: 'Brown Furry Coat',
      desc: 'Stay cozy in this luxurious brown furry coat, perfect for winter walks.',
      price: 229,
      img: '/images/coat01.webp',
      img2: '/images/coat02.webp',
      inStock: true,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      features: ['Faux fur', 'Adjustable fit', 'Hidden pockets'],
      care: ['Dry clean only'],
      shipping: ['Free shipping over $100'],
      returns: ['30-day return policy']
    },
    {
      id: 2,
      title: 'Black Suit',
      price: 349,
      desc: 'A sleek and elegant black suit perfect for formal occasions and business meetings.',
      img: '/images/suit01.webp',
      img2: '/images/suit02.webp',
      inStock: false,
      sizes: ['S', 'M', 'L', 'XL'],
      features: ['Slim fit', 'Breathable fabric', 'Hidden inner pocket'],
      care: ['Dry clean only'],
      shipping: ['Free shipping for members'],
      returns: ['14-day return policy for suits']
    },
    {
      id: 3,
      title: 'Furry Scarf',
      price: 59,
      desc: 'Soft and warm furry scarf to keep you cozy during chilly days.',
      img: '/images/scarf01.webp',
      img2: '/images/scarf02.webp',
      inStock: true,
      sizes: ['One Size'],
      features: ['Vegan fur', 'Lightweight', 'Double-layered for extra warmth'],
      care: ['Hand wash only'],
      shipping: ['Standard shipping 3–5 days'],
      returns: ['Free return within 30 days']
    }]
  })
}

main()
  .catch((e) => {
    console.error(e.message)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })