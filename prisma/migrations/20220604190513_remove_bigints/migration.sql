/*
  Warnings:

  - The primary key for the `Advertiser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Advertiser` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Campaign` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `spendRate` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `advertiserId` on the `Campaign` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `broadstreet_performance_campaign` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `campaign_id` on the `broadstreet_performance_campaign` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `views` on the `broadstreet_performance_campaign` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `hovers` on the `broadstreet_performance_campaign` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `clicks` on the `broadstreet_performance_campaign` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `broadstreet_performance_creatives` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `campaign_id` on the `broadstreet_performance_creatives` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `creative_id` on the `broadstreet_performance_creatives` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `views` on the `broadstreet_performance_creatives` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `hovers` on the `broadstreet_performance_creatives` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `clicks` on the `broadstreet_performance_creatives` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Campaign` DROP FOREIGN KEY `FK_campaign_advertiser`;

-- AlterTable
ALTER TABLE `Advertiser` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Campaign` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `spendRate` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `advertiserId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `broadstreet_performance_campaign` DROP PRIMARY KEY,
    MODIFY `campaign_id` INTEGER NOT NULL,
    MODIFY `views` INTEGER NULL,
    MODIFY `hovers` INTEGER NULL,
    MODIFY `clicks` INTEGER NULL,
    ADD PRIMARY KEY (`campaign_id`, `date`);

-- AlterTable
ALTER TABLE `broadstreet_performance_creatives` DROP PRIMARY KEY,
    MODIFY `campaign_id` INTEGER NOT NULL,
    MODIFY `creative_id` INTEGER NOT NULL,
    MODIFY `views` INTEGER NULL,
    MODIFY `hovers` INTEGER NULL,
    MODIFY `clicks` INTEGER NULL,
    ADD PRIMARY KEY (`campaign_id`, `date`, `creative_id`);

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `FK_campaign_advertiser` FOREIGN KEY (`advertiserId`) REFERENCES `Advertiser`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
