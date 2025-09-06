-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    "img2" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL,
    "sizes" TEXT[],
    "features" TEXT[],
    "care" TEXT[],
    "shipping" TEXT[],
    "returns" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
