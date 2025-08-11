-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE INDEX "courses_userId_idx" ON "courses"("userId");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
