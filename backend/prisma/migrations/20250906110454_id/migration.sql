-- AlterTable
ALTER TABLE "public"."Product" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Product_id_seq";
