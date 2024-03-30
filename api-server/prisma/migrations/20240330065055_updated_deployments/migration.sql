/*
  Warnings:

  - You are about to drop the column `gitUrl` on the `Deployments` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Deployments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Deployments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Deployments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Deployments_gitUrl_key";

-- AlterTable
ALTER TABLE "Deployments" DROP COLUMN "gitUrl",
DROP COLUMN "status",
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Deployments_url_key" ON "Deployments"("url");
