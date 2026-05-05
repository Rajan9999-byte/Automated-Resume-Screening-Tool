CREATE TABLE `candidates` (
	`id` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20),
	`location` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `candidates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `features` (
	`id` varchar(64) NOT NULL,
	`jobId` varchar(64) NOT NULL,
	`candidateId` varchar(64) NOT NULL,
	`tfidfScore` int NOT NULL,
	`semanticScore` int NOT NULL,
	`compositeScore` int NOT NULL,
	`mustHaveHits` int DEFAULT 0,
	`mustHaveTotal` int DEFAULT 0,
	`yearsExperience` int,
	`educationMatch` varchar(50),
	`gapFlags` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `features_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`mustHaveSkills` text NOT NULL,
	`niceToHaveSkills` text NOT NULL,
	`minExperienceYears` int DEFAULT 0,
	`location` varchar(255),
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rankings` (
	`id` varchar(64) NOT NULL,
	`jobId` varchar(64) NOT NULL,
	`candidateId` varchar(64) NOT NULL,
	`rank` int NOT NULL,
	`score` int NOT NULL,
	`decision` enum('shortlisted','rejected','pending') DEFAULT 'pending',
	`reasons` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `rankings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `resumes` (
	`id` varchar(64) NOT NULL,
	`candidateId` varchar(64) NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`fileKey` varchar(255) NOT NULL,
	`fileUrl` text,
	`rawText` text NOT NULL,
	`parsedJson` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `resumes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `features` ADD CONSTRAINT `features_jobId_jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `features` ADD CONSTRAINT `features_candidateId_candidates_id_fk` FOREIGN KEY (`candidateId`) REFERENCES `candidates`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `jobs` ADD CONSTRAINT `jobs_createdBy_users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rankings` ADD CONSTRAINT `rankings_jobId_jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `rankings` ADD CONSTRAINT `rankings_candidateId_candidates_id_fk` FOREIGN KEY (`candidateId`) REFERENCES `candidates`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `resumes` ADD CONSTRAINT `resumes_candidateId_candidates_id_fk` FOREIGN KEY (`candidateId`) REFERENCES `candidates`(`id`) ON DELETE no action ON UPDATE no action;