# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 194.145.201.29 (MySQL 5.7.24-0ubuntu0.18.04.1)
# Database: the_cee_database
# Generation Time: 2019-02-03 18:15:28 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table blog_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blog_tags`;

CREATE TABLE `blog_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blog_id` int(11) NOT NULL,
  `blogs_tags_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `blog_tags` WRITE;
/*!40000 ALTER TABLE `blog_tags` DISABLE KEYS */;

INSERT INTO `blog_tags` (`id`, `blog_id`, `blogs_tags_id`)
VALUES
	(2,20,1),
	(3,20,2),
	(41,22,3),
	(42,22,2),
	(43,30,1),
	(44,31,1),
	(45,32,2),
	(46,33,3),
	(47,34,4),
	(48,35,2),
	(49,39,2),
	(50,40,5),
	(51,41,5),
	(53,43,5),
	(54,42,5),
	(55,44,3),
	(59,50,4),
	(60,50,5),
	(68,51,3),
	(69,51,4),
	(70,51,5),
	(71,51,2),
	(72,54,5),
	(73,55,3),
	(74,1,2);

/*!40000 ALTER TABLE `blog_tags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table blogs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blogs`;

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `body` longtext NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;

INSERT INTO `blogs` (`id`, `title`, `description`, `picture`, `author`, `body`, `date_created`)
VALUES
	(1,'What Is Growth Marketing?','Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.','test','1','<p>Growth is een veel genoemd begrip binnen het bedrijfsleven. Vooral startups hebben belang bij snelle groei van hun nieuwe bedrijf. Begrippen zoals growth hacking, growth marketing en online marketing worden ingezet om snelle groei (growth) te bereiken.</p><p>\n</p><p><strong>Zoekmachine adverteren.</strong></p>','2019-01-09 23:37:58');

/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table blogs_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `blogs_tags`;

CREATE TABLE `blogs_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `blogs_tags` WRITE;
/*!40000 ALTER TABLE `blogs_tags` DISABLE KEYS */;

INSERT INTO `blogs_tags` (`id`, `description`)
VALUES
	(2,'Lifestyle'),
	(3,'Work'),
	(4,'Science'),
	(5,'Startups'),
	(32,'xvcx');

/*!40000 ALTER TABLE `blogs_tags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table companies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `companies`;

CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  `zipcode` varchar(150) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `country` varchar(150) DEFAULT NULL,
  `company_resource_roles` int(11) DEFAULT '1500',
  `description` text,
  `website` varchar(150) DEFAULT NULL,
  `recoverystring` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;

INSERT INTO `companies` (`id`, `name`, `email`, `phone`, `username`, `password`, `address`, `zipcode`, `city`, `country`, `company_resource_roles`, `description`, `website`, `recoverystring`)
VALUES
	(0,'The CeeSpot','s.klarenbeek@hotmail.com','0611333548',NULL,NULL,NULL,NULL,NULL,NULL,1500,NULL,NULL,NULL),
	(1,'CeeSpot','thaman663@gmail.com','546356343564','ceespot','$2a$10$ianHm8NH6ewjfHcvmFh7H.gW1rhzv.I5XJootvm9cJLBYOM9ylFFW','vretb','bretb','bgtbe','bgrtgertbr',1500,'rtwegertrtgrtgrtvrsv',NULL,NULL),
	(2,'cee','c@w.nlw',NULL,'ceespot2','$2a$10$H2oMXo.LPhZBc4eJy.jDae6PVgQhMuzVqztphQgYmBOAZEpS9vxuK',NULL,NULL,NULL,NULL,1500,NULL,NULL,NULL),
	(3,'Cee','kylianleemkuil@hotmail.com',NULL,'cee','$2a$10$aMoFG7/hdL192yaLYyTFpOz4m4CbTEX8BVY0f53ZrXAkAp.6Ud69W',NULL,NULL,NULL,NULL,1500,'Test',NULL,''),
	(4,'New company','company@me.nl',NULL,'cspot','$2a$10$kz7eG94O27yJzkmOOsn4AO7bdZw3OPVinhT/cX6bjMo/qQ5vDgquG',NULL,NULL,NULL,NULL,1500,NULL,NULL,NULL),
	(5,'','ww@d.nl',NULL,'','$2a$10$QAkw0wb6ztWFah0k4CIs0egdvtca61kTzTKR0uf/2oIvkGU2YefaK',NULL,NULL,NULL,NULL,1500,NULL,NULL,NULL);

/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table companies_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `companies_tags`;

CREATE TABLE `companies_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `companies_tags` WRITE;
/*!40000 ALTER TABLE `companies_tags` DISABLE KEYS */;

INSERT INTO `companies_tags` (`id`, `description`)
VALUES
	(1,'Webdevelopment'),
	(2,'Webdesign'),
	(3,'Automotive'),
	(4,'Healthcare'),
	(5,'Community Hub');

/*!40000 ALTER TABLE `companies_tags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table company_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `company_tags`;

CREATE TABLE `company_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `company_tags` WRITE;
/*!40000 ALTER TABLE `company_tags` DISABLE KEYS */;

INSERT INTO `company_tags` (`id`, `company_id`, `tag_id`)
VALUES
	(1,0,5);

/*!40000 ALTER TABLE `company_tags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table event_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `event_categories`;

CREATE TABLE `event_categories` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(150) DEFAULT NULL,
  `value` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `event_categories` WRITE;
/*!40000 ALTER TABLE `event_categories` DISABLE KEYS */;

INSERT INTO `event_categories` (`ID`, `text`, `value`)
VALUES
	(1,'Network','Network'),
	(2,'Hackathon','Hackathon');

/*!40000 ALTER TABLE `event_categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table events
# ------------------------------------------------------------

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` text,
  `small_description` varchar(255) DEFAULT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `location_name` varchar(255) NOT NULL,
  `show_attendees` tinyint(2) NOT NULL DEFAULT '1',
  `location_address` varchar(255) NOT NULL,
  `location_postalcode` varchar(100) NOT NULL,
  `location_city` varchar(100) NOT NULL,
  `approved` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;

INSERT INTO `events` (`id`, `title`, `category`, `description`, `small_description`, `start`, `end`, `picture`, `location_name`, `show_attendees`, `location_address`, `location_postalcode`, `location_city`, `approved`)
VALUES
	(45,'Fris trendseminar ‘Digital & Retail Revolution in China’',NULL,'Stichting Fris, Trimm, Nextport China en Chinatalk nodigen je uit voor het trendseminar \'Digital & Retail Revolution in China’ op 5 februari aanstaande.\n\nHet kennis evenement voor wie meer wil weten over de mogelijkheden van zaken doen in China en de werking van online marketing. We beginnen de avond met een quick dinner zodat je met gevulde maag aan het seminar kunt deelnemen (en dus meteen vanuit kantoor kunt komen :)\n\nDatum: 5 februari\nLocatie: Trimm, Moutlaan 25, Enschede (route)\nStart quick dinner: 18:00\nStart programma: 18:30\nAfsluiting en borrel: ca. 21:00\nAanmelden: Eventbrite\n\nWist je dat China binnen 10 jaar is uitgegroeid tot de grootste aandeelhouder (40%) in de wereldwijde e-commerce markt? China deskundige Ed Sander neemt je mee in de trends en ontwikkelingen op het gebied van digital en retail.','Stichting Fris, Trimm, Nextport China en Chinatalk nodigen je uit voor het trendseminar \'Digital & Retail Revolution in China’ op 5 februari aanstaande.','2019-01-05 18:00:00','2019-01-05 21:00:00',NULL,'TRIMM',1,'Moutlaan 25','7523MC','Enschede',1),
	(46,'Enschede School of AI',NULL,'5th monthly meetup. See schedule for details.','5th monthly meetup. See schedule for details.','2019-02-07 06:30:00','2019-02-07 08:30:00',NULL,'The CeeSpot',1,'Brouwerijstraat 1','7523 XC','Enschede',1),
	(47,'LightBulb Chats: Designer Babies',NULL,'In the second edition of DesignLab’s LightBulb Chats we explore gene editing in humans: the possibilities, the dangers, the grey areas. All info & registration https://www.utwente.nl/en/designlab/events/!/2019/2/133333/lightbulb-chats-designer-babies\n\nThe world’s first designer babies, babies that have been genetically modified, were (purportedly) born late last year. Is this the beginning of a new medical revolution? Are we a few steps away from becoming superhuman? Or, do designer babies widen the gap between the rich and the poor? Will baby girls become a rarity in countries with a cultural preference for boys?\n\nJoin the conversation!','In the second edition of DesignLab’s LightBulb Chats we explore gene editing in humans: the possibilities, the dangers, the grey areas.','2019-02-12 17:30:00','2019-02-12 19:30:00',NULL,'DesignLab UTwente',1,'Hengelosestraat 500','7521 AN','Enschede',1),
	(48,'Beter presenteren kun je leren',NULL,'Wil jij je collega’s overtuigen van je ideeën? Je verkooppresentatie leuker en sprankelender maken? Spreektips krijgen die jouw presentaties verbeteren?\n\nBij Twente Toastmasters vind je een prettige plek om je presenteren te professionaliseren. Daar sta je voor een publiek dat klaar zit om jóu te helpen een betere presentator te worden. Een publiek dat precies begrijpt hoe je nu voor de groep staat, omdat de mensen in je publiek daar zelf een tijdje geleden precies zo stonden.\n\nOp deze avond kun je kijken hoe je kunt groeien als je onze leren-door-te-doen methode volgt. Zie met eigen ogen hoe je over een jaar zelf zult kunnen spreken. En kom er achter hoe je over een jaar zelf speeches en presentaties van anderen zult kunnen evalueren!\n\nVanaf 19.15 is er een inloop, en om 19.30 beginnen we met het programma, wat tot ongeveer 21.30 duurt. Nieuwsgierig? Kom vrijblijvend langs!','Wil jij je collega’s overtuigen van je ideeën? Je verkooppresentatie leuker en sprankelender maken? Spreektips krijgen die jouw presentaties verbeteren?','2019-02-26 19:15:00','2019-02-26 21:30:00',NULL,'The cee spot',1,'Brouwerijstraat 1','7523 XC','Enschede',1),
	(49,'Multiculinair foodfestival Happie',NULL,'Enschede heeft een nieuw festival, met keukens vanuit de hele wereld, live muziek en ander vermaak. Dit is vast een tipje van de sluier, meer info volgt. Zet de datum maar vast in je agenda !','Enschede heeft een nieuw festival, met keukens vanuit de hele wereld, live muziek en ander vermaak.','2019-06-29 11:00:00','2019-06-30 21:00:00',NULL,'Creatieve Campus',1,'Moutlaan','7523 XC','Enschede',1);

/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table images
# ------------------------------------------------------------

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table resource_roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `resource_roles`;

CREATE TABLE `resource_roles` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `resource_roles` WRITE;
/*!40000 ALTER TABLE `resource_roles` DISABLE KEYS */;

INSERT INTO `resource_roles` (`id`, `name`)
VALUES
	(1000,'guest user'),
	(2000,'fellow'),
	(3000,'partner'),
	(4000,'standard user'),
	(5000,'admin'),
	(1500,'company');

/*!40000 ALTER TABLE `resource_roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table services
# ------------------------------------------------------------

DROP TABLE IF EXISTS `services`;

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `title` varchar(150) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `settings`;

CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `is_on` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;

INSERT INTO `settings` (`id`, `name`, `is_on`)
VALUES
	(1,'Blogs',1);

/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table social_media
# ------------------------------------------------------------

DROP TABLE IF EXISTS `social_media`;

CREATE TABLE `social_media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `site` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `social_media` WRITE;
/*!40000 ALTER TABLE `social_media` DISABLE KEYS */;

INSERT INTO `social_media` (`id`, `site`)
VALUES
	(1,'twitter'),
	(2,'facebook'),
	(3,'instagram'),
	(4,'linkedin'),
	(5,'github'),
	(6,'medium');

/*!40000 ALTER TABLE `social_media` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table social_media_resources
# ------------------------------------------------------------

DROP TABLE IF EXISTS `social_media_resources`;

CREATE TABLE `social_media_resources` (
  `social_media_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `type` int(1) NOT NULL,
  `url` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `social_media_resources` WRITE;
/*!40000 ALTER TABLE `social_media_resources` DISABLE KEYS */;

INSERT INTO `social_media_resources` (`social_media_id`, `resource_id`, `type`, `url`)
VALUES
	(1,5,1,'warobusinessw'),
	(3,5,1,'world_record_eg'),
	(1,20,1,'warobusiness'),
	(1,21,1,'reger'),
	(5,1,2,'fief'),
	(6,1,2,'fief'),
	(4,1,2,'sdafsa'),
	(2,5,1,'yk'),
	(4,5,1,'sdfsdaf'),
	(5,5,1,'sdfsdf'),
	(1,29,1,'test'),
	(1,34,1,'ee');

/*!40000 ALTER TABLE `social_media_resources` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table space_reservations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `space_reservations`;

CREATE TABLE `space_reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `space_id` int(11) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `member_id` int(11) DEFAULT NULL,
  `approved` tinyint(4) DEFAULT NULL,
  `space_title` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `space_reservations` WRITE;
/*!40000 ALTER TABLE `space_reservations` DISABLE KEYS */;

INSERT INTO `space_reservations` (`id`, `date`, `start`, `end`, `name`, `email`, `space_id`, `phone`, `member_id`, `approved`, `space_title`)
VALUES
	(37,'2019-01-31','09:16:00','20:16:00','Albert Einstein','password1@pass.com',19,'0612345678',NULL,1,'Green Room');

/*!40000 ALTER TABLE `space_reservations` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table spaces
# ------------------------------------------------------------

DROP TABLE IF EXISTS `spaces`;

CREATE TABLE `spaces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `short_description` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `costs` varchar(50) NOT NULL,
  `targets` text NOT NULL,
  `facilities` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `spaces` WRITE;
/*!40000 ALTER TABLE `spaces` DISABLE KEYS */;

INSERT INTO `spaces` (`id`, `title`, `description`, `short_description`, `capacity`, `costs`, `targets`, `facilities`)
VALUES
	(17,'Purple Room','The Purple Room is our main event space. Including a stage with beamer, cafesetting including bar area and sports. Also, a giant habitues\' table is present,which is used for communal lunch. We also like to host an occasional party, tocelebrate our or your success! The Purple Room can be rented for presentations,pitches or product launches, as well as networking events, drinks or knowledgesessions. Its flexible setup and different levels of service will make sure the spaceadjusts and suits your needs.','The Purple Room is our main event space.',100,'400 / daily period','Events, networking, drinks, lunch, conferences, meetups, presentations','Kitchen, Bar, Cafe sports, Beamer, PA-set including 2 wirelessmicrophones, chillout area, conference table'),
	(18,'Cee Containers','Our latest addition. At a unique location a (con)temporary structure has risen! Allof the 5 shipping containers can have different functions, whether it will becreative sessions, hosting meetings or as an art gallery or catering. Two terraceswill make sure indoors and outdoors will be connected, both sunny and shadyspots can be provided.','At a unique location a (con)temporary structure has risen!',80,'100 / daily period','The sky is the limit','Catering, terraces, unique sighting, park and parking, option to scale upwith tents'),
	(19,'Green Room','The Green Room has a cinema setup including smartboard and artificial grasscarpet. It has a focus on presentations and meetings through pleasant acousticsand automatic blinders.','The Green Room has a cinema setup including smartboard and artificial grasscarpet.',25,'75 / daily period','Presentations, worksessions, meetups','Great acoustics, beamer with smartboard functionality, different tablesetups, billiards, whiteboards'),
	(20,'Dutch Game Garden','Dutch Game Garden is a spacious office well equipped for game developers,including 2 arcade machines and presentation setup. Can also be booked forhackathons, conference calls or meetings.','Dutch Game Garden is a spacious office well equipped for game developers,including 2 arcade machines and presentation setup.',12,'50 / period','Hackathons, presentations, conference calls, meetings','Arcade machines, internet, television, daylight, heating, airconditioning, pantry nearby'),
	(22,'Twente Room','The Twente Room is our little tribute to our beautiful region. Situated in the midstof our offices it is a semi-open space, offering lots of daylight and a greenery feelbecause of our green and living walls. A huge couch will make you most certainlyrelaxed and re-energized, but also a table with presentation tools is present.  Theheightened floor will give you a nostalgic overview of our rural region.','The Twente Room is our little tribute to our beautiful region. ',12,'25 / period','Meetings, chillout','Presentation monitor, conference table, video games, lounge area'),
	(24,'De Achterhoek','The Achterhoek is one of our biggest offices currently equipped as a classroom or workspace. It comes with 10 desks ready to get your business or training up andrunning in no-time. It is most suited for work sessions, hackathons or meetups.Also included is access to the pantry, lots of daylight and a separate airco unit.','The Achterhoek is one of our biggest offices currently equipped as a classroom or workspace.',12,'50 / daily period','Working sessions, educational purposes','-'),
	(25,'White Room','The white room is our main co-working space. The spacious setup consists of 30workstations and some seating room for a more relaxed atmosphere. It isequipped with a sound system, some cozy carpets and possibilities for abrainstorm session at the whiteboard tables and standing desks. Members canpick one of the hot desks or claim their own dedicated desk with 24/7 access. Canbe used for events if the price is right.','The white room is our main co-working space. ',120,'-','Co-working space for entrepreneurs, small businesses, students','Hot desks or dedicated desks, standing desks, storage, lockers, soundsystem, whiteboard table, bar area, chillout area.'),
	(26,'Offices','We have a number of offices which can be rented by businesses or entrepreneurs. We handle a model that makes it easy to scale up your business orcluster with other entrepreneurs for a lower desk price. All offices can be rentedturn-key or empty if you would like to give your own look and feel to the room.Offices have individual locks and all have windows which can open and airconditioning, as well as heating. The office floor is secured by an electrical accesssystem, has a pantry for small food and beverages, fresh beans coffee and(organic) tea. Both WiFi as well as ethernet can be provided, so you can get yourbusiness over here and up and running in no-time. Prices are all-in.','We have a number of offices which can be rented by businesses or entrepreneurs.',12,'200-1000 / month','Entrepreneurs, small and medium enterprises','Turnkey or furniture yourself, pantry, daylight, AC, heating, internetaccess, 24/7 access, locks on doors');

/*!40000 ALTER TABLE `spaces` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;

INSERT INTO `tags` (`id`, `description`)
VALUES
	(1,'PHP'),
	(2,'JavaScript'),
	(5,'HTML5'),
	(10,'C#');

/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table text
# ------------------------------------------------------------

DROP TABLE IF EXISTS `text`;

CREATE TABLE `text` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(25) NOT NULL,
  `value_nl` longtext NOT NULL,
  `value_en` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `text` WRITE;
/*!40000 ALTER TABLE `text` DISABLE KEYS */;

INSERT INTO `text` (`id`, `key`, `value_nl`, `value_en`)
VALUES
	(1,'about','<p>Over ons</p>','<p>About us</p>'),
	(2,'book_a_tour','<p>Do you want to see if working at the cee spot and being a part of the Creative Community ‘CeeCee’ is something for you? Please feel free to book a tour and try-out the cee spot! Just make an appointment with Bart-Jan for a tour or just drop by during office hours at Brouwerijstraat 1 in Enschede. On Fridays, you can make use of our facilities and services for free!</p>','<p>Do you want to see if working at the cee spot and being a part of the Creative Community ‘CeeCee’ is something for you? Please feel free to book a tour and try-out the cee spot! Just make an appointment with Bart-Jan for a tour or just drop by during office hours at Brouwerijstraat 1 in Enschede. On Fridays, you can make use of our facilities and services for free!</p>'),
	(3,'community','<p>Our members make the CeeCee Community happen. They are the thriving backbone, the dedicated entrepreneurs who work their asses off at the cee spot! And you can meet them. Right here!</p>','<p>Our members make the CeeCee Community happen. They are the thriving backbone, the dedicated entrepreneurs who work their asses off at the cee spot! And you can meet them. Right here!</p>'),
	(4,'contact','<p>Do you want to see if working at the cee spot and being a part of the Creative Community ‘CeeCee’ is something for you? Please feel free to book a tour and try-out the cee spot! Just make an appointment with Bart-Jan for a tour or just drop by during office hours at Brouwerijstraat 1 in Enschede. On Fridays, you can make use of our facilities and services for free!</p>','<p>Do you want to see if working at the cee spot and being a part of the Creative Community ‘CeeCee’ is something for you? Please feel free to book a tour and try-out the cee spot! Just make an appointment with Bart-Jan for a tour or just drop by during office hours at Brouwerijstraat 1 in Enschede. On Fridays, you can make use of our facilities and services for free!</p>'),
	(5,'our_story','<p>The cee spot is the home of young creatives in Enschede. Located in Roombeek and part of CeeCee: the Creative Community. Our building offers flexible workspaces for creative startups, but also full blown office wings for the grown ups. We also love to host groundbreaking events. Our curiosity to create the future is what connects us. And our community keeps on growing. Want to join? We’d love to meet you!</p>','<p>The cee spot is the home of young creatives in Enschede. Located in Roombeek and part of CeeCee: the Creative Community. Our building offers flexible workspaces for creative startups, but also full blown office wings for the grown ups. We also love to host groundbreaking events. Our curiosity to create the future is what connects us. And our community keeps on growing. Want to join? We’d love to meet you!</p>'),
	(6,'partners','Bekijk onze partners hierooo','Meet our partners'),
	(7,'privacy','Hier onze privacy policy','Here\'s our privacy policy'),
	(8,'spaces','<p>As the heart of CeeCee, the cee spot offers you various spaces for rent.&nbsp;Event space, Meeting space, Office rooms Which creative space are you looking for? Our setups for all spaces are flexible and casual.&nbsp;</p><p>The cee spot crews are more than happy to support what you organise.&nbsp;&nbsp;</p><p>For any consultation or inquiry requests,&nbsp; please don’t hesitate to contact our community manager.</p>','<p>As the heart of CeeCee, the cee spot offers you various spaces for rent.&nbsp;Event space, Meeting space, Office rooms Which creative space are you looking for? Our setups for all spaces are flexible and casual.&nbsp;</p><p>The cee spot crews are more than happy to support what you organise.&nbsp;&nbsp;</p><p>For any consultation or inquiry requests,&nbsp; please don’t hesitate to contact our community manager.</p>');

/*!40000 ALTER TABLE `text` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_companies
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_companies`;

CREATE TABLE `user_companies` (
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `role` varchar(50) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_companies` WRITE;
/*!40000 ALTER TABLE `user_companies` DISABLE KEYS */;

INSERT INTO `user_companies` (`user_id`, `company_id`, `role`, `id`)
VALUES
	(6,0,NULL,1),
	(20,0,'Admin',25),
	(23,0,'Wooperdiewoop',34),
	(23,0,'Plopperdeplop',35),
	(5,0,'Programmer',38),
	(24,2,'Developer',39),
	(28,0,'community manager',40),
	(24,0,'Junior dev',41);

/*!40000 ALTER TABLE `user_companies` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_events
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_events`;

CREATE TABLE `user_events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_events` WRITE;
/*!40000 ALTER TABLE `user_events` DISABLE KEYS */;

INSERT INTO `user_events` (`id`, `event_id`, `user_id`)
VALUES
	(215,46,24),
	(216,48,24),
	(217,49,24);

/*!40000 ALTER TABLE `user_events` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_tags`;

CREATE TABLE `user_tags` (
  `user_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_tags` WRITE;
/*!40000 ALTER TABLE `user_tags` DISABLE KEYS */;

INSERT INTO `user_tags` (`user_id`, `tag_id`, `id`)
VALUES
	(6,1,1),
	(6,2,2),
	(8,1,3),
	(5,5,36),
	(31,1,37),
	(24,5,38),
	(24,2,39);

/*!40000 ALTER TABLE `user_tags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_user_roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_user_roles`;

CREATE TABLE `user_user_roles` (
  `user_id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `user_user_roles` WRITE;
/*!40000 ALTER TABLE `user_user_roles` DISABLE KEYS */;

INSERT INTO `user_user_roles` (`user_id`, `user_role_id`)
VALUES
	(2,4000),
	(3,1000),
	(4,1000),
	(5,1000),
	(6,5000),
	(7,1000),
	(8,1000),
	(9,1000),
	(10,1000),
	(11,1000),
	(12,1000),
	(13,1000),
	(14,1000),
	(15,5000),
	(16,1000),
	(17,1000),
	(18,1000),
	(19,1000),
	(21,4000),
	(22,3000),
	(23,2000),
	(24,5000),
	(28,1000),
	(29,1000),
	(30,1000),
	(31,1000),
	(32,1000),
	(33,1000),
	(34,1000);

/*!40000 ALTER TABLE `user_user_roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `prefix` varchar(5) DEFAULT NULL,
  `first_name` varchar(42) NOT NULL,
  `insertions` varchar(30) DEFAULT NULL,
  `last_name` varchar(42) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zipcode` varchar(20) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(125) DEFAULT NULL,
  `active` int(1) NOT NULL DEFAULT '0',
  `phone` int(20) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `mailVis` tinyint(1) DEFAULT NULL,
  `addressVis` int(1) DEFAULT '1',
  `birthdateVis` int(1) DEFAULT '1',
  `recoverystring` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `email`, `username`, `password`, `prefix`, `first_name`, `insertions`, `last_name`, `description`, `address`, `zipcode`, `city`, `country`, `active`, `phone`, `birthdate`, `website`, `mailVis`, `addressVis`, `birthdateVis`, `recoverystring`)
VALUES
	(2,'password@pass.com','waro','$2a$10$PQcm1jXJ/I51nvadw7H8Y.yfp/TEYFtE8ouoZsIdDFZ1jzJe68fr6','Dhr','Albert',NULL,'Einstein','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.','Quicksilverstreet 15','1238 AB','Goor','The Netherlands',0,NULL,NULL,NULL,1,1,1,NULL),
	(3,'123password@pass.com','waro123','$2a$10$m6RxhGxk4696pV3/aw6A1u7H8t9UXKPSTwjhDkT3im.GcVp56dm1K','Dhr','Albert',NULL,'Einstein','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.','Quicksilverstreet 15','1238 AB','Goor','The Netherlands',0,NULL,NULL,NULL,1,1,1,NULL),
	(5,'123password1@pass.com','waro12345','$2a$10$xS8amGUZ.h8NFkEE6uzR7u4ZDqEnHfD0t7YA25hpUdNLJx0ITOJLu','Dhr','Albertwer',NULL,'Einstein','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.','Quicksilverstreet 15','1238 AB','Goor','The Netherlands',0,NULL,NULL,'rthhhdhhg',1,1,1,NULL),
	(7,'123password2@pass.com','waro1234567','$2a$10$nmLBln74F45T1psqhK6R/enpPuP1p39UFSUpp/LsA/be5rK/ZcZrO','Dhr','Albert',NULL,'Einstein','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta rutrum justo, nec molestie orci elementum non.','Quicksilverstreet 15','1238 AB','Goor','The Netherlands',0,NULL,NULL,NULL,1,1,1,NULL),
	(9,'123password3@pass.com','waro12345678','$2a$10$BqaqcAilkMqwojo.Ittnke58hejqHwckiLp7G9hXD4UgXEFoxi5kC','Dhr','Albert',NULL,'Einstein',NULL,'Quicksilverstreet 15','1238 AB','Goor','The Netherlands',0,NULL,NULL,NULL,1,1,1,NULL),
	(12,'123password4@pass.com','waro1234567891','$2a$10$khyA93pS48XjTBWkfvR9xuSzme35GoLoxiInN4l1Kp3aWSMol/lZa','Dhr','Albert',NULL,'Einstein',NULL,'Quicksilverstreet 15','1238 AB','Goor','The Netherlands',0,NULL,NULL,NULL,1,1,1,NULL),
	(13,'123password5@pass.com','waro12345678912','$2a$10$eu9xFqfmzdc994EJgDr1PuWVRWcQWRGsyRZoTFq0Y8tg1beZ3oYWO','Dhr','Albert',NULL,'Einstein',NULL,'Quicksilverstreet 15','1238 AB','Goor','The Netherlands',0,NULL,NULL,NULL,1,1,1,NULL),
	(14,'125555password@pass.com','waro123456789123','$2a$10$vUl4eBH/0G4Yle/a5XrlX.z2XVi/tifQ1lNBT/66tjvTD5YoqXLn6','Dhr','Albert',NULL,'Einstein',NULL,'Quicksilverstreet 15','1238 AB','Goor','The Netherlands',0,NULL,NULL,NULL,1,1,1,NULL),
	(15,'mthebest@bestuh.nl','mthebest','$2a$10$v9kupGyI3kjdyP5A7ntkOOAKika3eBuXpsg24Fg2NI.MvAIq1Nk0a',NULL,'Mikey','d','TheBest',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,1,NULL),
	(16,'atsumi@ceecee.community','atsumi@ceecee.community','$2a$10$RRo3r6/nylZznqYZKGtjzO4rh1MMvTHb5lldC141.I4Ej6uGm5rZ.',NULL,'Atsumi','','Sato',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,1,NULL),
	(17,'hubert@hihiguide.com','hubert','$2a$10$MQzeCc3JUs45Lcp/KF0U8edAHEivaCLMjuqiH8npmM0/seHOqJYpS',NULL,'Hubert','','Nijmeijer',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,1,NULL),
	(18,'bartjan@ceecee.community','Bart-Jan','$2a$10$G9italVXQ912ObKNbYQ6Veoqt7uF7MAUMnYhGwjkMrEbRzJhjGDlO',NULL,'Bart-Jan','','Herweijer',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,1,1,1,NULL),
	(19,'test@gmail.com','frankgr','$2a$10$JQjLMBHJkDsXkbWQEOPXYO9n5hz8uQY3jdw.ruw6OjseMShYpyeUm',NULL,'F','','G',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL),
	(21,'thaman6631@gmail.com','verified','$2a$10$j6foUyOGxVaKwbnE7SZfc.htwmnoDzsRMh7JcB/d6gg0wWXfcMK/m',NULL,'Verified','','Verified',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,'05xy6gcfdlynisfg3np1yg'),
	(22,'thaman6632@gmail.com','partner','$2a$10$C.9Fv/6UjEF4aQj7k0okOu0EzeLNzRMGjADdE4A95sHtKvhqCCRRy',NULL,'Partner','','Partner',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL),
	(23,'thaman6633@gmail.com','fellow','$2a$10$BWkLAFCZKvfkwjeygoj4gew7eaAxWiS.8lwzJMIEVjIMqxAbzQILu',NULL,'Fellow','','Fellow','No description\n','Plopsastreet 75','ABCD 22','IDK','Bulgaria',0,NULL,'2019-01-23 12:02:16',NULL,0,0,0,NULL),
	(24,'password1@pass.com','Admin','$2a$10$/Y9wN9Zcnua4Fzc0TFYFCOG35yHxbTcmyRgV887yO6VIXCX7p9Lwm','Dhr','Albert',NULL,'Einstein','','Quicksilverstreet 15','1238 AB','Goor','The Netherlands',0,NULL,'2019-01-23 01:00:00',NULL,1,1,1,NULL),
	(28,'bartjan1@ceecee.community','brtld','$2a$10$BhQPx0B0SGo7M.cDa/pkPO./C1dvWiV94HtnfGr9qR6V.PLJjiaTm',NULL,'Bart-Jan','','Herweijer',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL),
	(29,'kylianleemkuil@hotmail.com','kylian','$2a$10$EAfPQKq4FOmaLNg5CUtEZuhDTk1gOgU2cA.qjkOiUERWP/3O9i602',NULL,'Kylian1','','Leemkuil1','Test','Kretastraat 5','7559Cn','Hengelo','Nederland',0,650904145,NULL,'',0,1,1,'sab1cj1jlng3gjip8bnlyq'),
	(30,'bartjan2@ceecee.community','bart-jan herweijer','$2a$10$tTvzKs.RRvIcVwoE6kuwxuNYDLo1sUQy2mQ1GpjDFe3LHh1ikl78y',NULL,'Bart-Jan','','Herweijer',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL),
	(31,'niek@nthmedia.nl','niek','$2a$10$2a9UJ6BvWBGbL5Jvwi.GhOQ3K2RJaBhbl/jwLTV12KAfhR142GsQO',NULL,'Niek','','Test',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL),
	(32,'hallo@trendwerk.nl','trendwerk','$2a$10$s7LMjo9RtZehxSISNK66p.rd3R7BfQPrGyxkDd2juj5HuemNKn23C',NULL,'Trend','','Werk',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL),
	(33,'ad@co.nl','ef','$2a$10$7UZSAUhPxBKyEU2JGuyjHediGEdEkn6ADqeHYK9BfFOstlSAWFz2K',NULL,'Admin','','admin',NULL,NULL,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,1,1,NULL),
	(34,'ad1@co.nl','ad','$2a$10$Ohne9nZSRihtnFxmg2CIfOFg8qg/ksAjVqvmUw6ZaWef7XDPSjaWW',NULL,'ad','','ad',NULL,NULL,NULL,NULL,NULL,0,NULL,'2019-01-29 15:43:48','https://www.pexels.com/photo/white-vehicle-near-gray-lamp-post-and-brown-building-structure-174752/',0,0,0,NULL);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
