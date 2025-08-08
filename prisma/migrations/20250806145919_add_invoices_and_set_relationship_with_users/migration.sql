-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('Paid', 'Pending');

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "due_date" TEXT NOT NULL,
    "payment_details" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
