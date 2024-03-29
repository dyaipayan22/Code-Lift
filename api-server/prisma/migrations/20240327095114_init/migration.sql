/*
  Warnings:

  - You are about to drop the column `githubUrl` on the `Deployments` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gitUrl]` on the table `Deployments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gitUrl` to the `Deployments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Deployments_githubUrl_key";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Deployments" DROP COLUMN "githubUrl",
ADD COLUMN     "gitUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "image" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "email" DROP NOT NULL;
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Deployments_gitUrl_key" ON "Deployments"("gitUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
