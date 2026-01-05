CREATE TABLE `contactRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyName` varchar(255) NOT NULL,
	`firstName` varchar(100) NOT NULL,
	`lastName` varchar(100) NOT NULL,
	`country` varchar(100) NOT NULL,
	`partnershipType` varchar(100) NOT NULL,
	`message` text NOT NULL,
	`email` varchar(320),
	`phone` varchar(20),
	`status` enum('new','contacted','qualified','archived') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contactRequests_id` PRIMARY KEY(`id`)
);
