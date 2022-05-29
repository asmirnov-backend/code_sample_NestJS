-- CreateTable
CREATE TABLE `Advertiser` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `originId` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Advertiser_originId_key`(`originId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campaign` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `originId` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `friendlyName` VARCHAR(255) NOT NULL,
    `contractStart` VARCHAR(255) NULL,
    `contractEnd` VARCHAR(255) NULL,
    `spendRate` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `spendType` ENUM('Hide', 'CPM') NOT NULL DEFAULT 'Hide',
    `type` ENUM('AUDIO', 'BROADSTREET', 'DISPLAY', 'OTT', 'PREROLL', 'SOCIAL', 'VIDEO') NOT NULL,
    `advertiserId` BIGINT NOT NULL,

    UNIQUE INDEX `Campaign_originId_key`(`originId`),
    INDEX `FK_campaign_advertiser`(`advertiserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `broadstreet_performance_campaign` (
    `campaign_id` BIGINT NOT NULL,
    `date` DATE NOT NULL,
    `views` BIGINT NULL,
    `hovers` BIGINT NULL,
    `clicks` BIGINT NULL,

    PRIMARY KEY (`campaign_id`, `date`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `broadstreet_performance_creatives` (
    `date` DATE NOT NULL,
    `campaign_id` BIGINT NOT NULL,
    `creative_name` VARCHAR(255) NOT NULL,
    `creative_id` BIGINT NOT NULL,
    `views` BIGINT NULL,
    `hovers` BIGINT NULL,
    `clicks` BIGINT NULL,

    PRIMARY KEY (`campaign_id`, `date`, `creative_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `FK_campaign_advertiser` FOREIGN KEY (`advertiserId`) REFERENCES `Advertiser`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
