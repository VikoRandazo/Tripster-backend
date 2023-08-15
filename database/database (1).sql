CREATE DATABASE  IF NOT EXISTS `vacations_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations_db`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations_db
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `follower_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`follower_id`),
  KEY `followers_user_fk_idx` (`user_id`),
  KEY `followers_vacation_fk_idx` (`vacation_id`),
  CONSTRAINT `user_followers_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `vacation_followers_fk` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1979 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (1771,1124,2090),(1807,1124,2100),(1829,1143,2092),(1830,1143,2097),(1938,1147,2089),(1947,1147,2100),(1948,1147,2091),(1950,1147,2098),(1956,1147,2088),(1960,1147,2087),(1976,1147,2097),(1977,1147,2092);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstName` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastName` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isAdmin` tinyint DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1148 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1121,'viktor1120@gmail.com','$2b$10$tUzD4W4C9TFrsD4DpGWNp.X6EsZMKZI5wsixOG6fvnPPzSImyb2.2','Viko','Randazo',1),(1124,'viktor1121@gmail.com','$2b$10$so40HEU19sXZt7kTrLYiCeHP9DHa/5H4pjl0.8Xkf0MMAYspYJTwC','voktir','Rondez',0),(1137,'Vikoran12@gmail.com','$2b$10$IW7TpGpSL8R6RhgT9MtLoOu.7g7dJk/XxDM9IKosvl2CH87Zhebn.','Viko','Randazo',0),(1138,'Test@test.com','$2b$10$8L0kKzPBZPAEHeCuJK2naOWMohYNNlUq9UjF4i4r0MsCCp0gbXpmy','Viktor','randazo',0),(1139,'viktor1122@gmail.com','$2b$10$xZ9FLR3OPYWSpcOr9UbN3.xnFec01hLitA4hGzTm1ekSNDXJa715a','viko','randazo',0),(1140,'example@demo.com','$2b$10$00FtHIqohZy6KgockDUZBuTjpaMw7ZNP/m1TRWiSPVjs3bD9SyZfO','revi','ran',0),(1141,'viktor1123@gmail.com','$2b$10$FofAJk83zm9Y8wNpDPgxGOXY.UnGkPI0hgW6AdUbstH4XPwilQHbS','viko test','test viko',0),(1142,'viktor1124@gmail.com','$2b$10$TfZ4wSR83KoS2q/RVQJt0uiPr4/1N50owKhhqzQaPJWJ75l749mi.','viko test','test test',0),(1143,'viktor1125@gmail.com','$2b$10$sw1tqXVPNQMQtiyy5jodnue7F7pEex70Jvl3LUWtCj44w2E9n1iWC','Viko','Randazo',0),(1144,'viktor1126@gmail.com','$2b$10$8r3VDP02PAC8ifURJhqrjOLvhKI5D/OXR2DDxVCojb/TXGb0Pd.5m','Viko','Randazo',0),(1145,'viktor1127@gmail.com','$2b$10$Ggtsmk2rndmiCm2dxviMJecPItPrdKnvXpKIbNi6VI388r5mTLa0a','Viko','Randazo',0),(1146,'viktor1128@gmail.com','$2b$10$ft8ubfniAujAVMYxFKUJre24TheDEfMGLihF8W9v7KBithCC0J8ee','Viko','Randazo',0),(1147,'viktor1130@gmail.com','$2b$10$spyTjvybRmJ0gJfairOkOOsBV78z7Y7RzSgurb6b60z9IU7RZQGGS','Viko','Randazo',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `price` int NOT NULL,
  `image_path` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2116 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (2087,'Maldives','Enjoy a relaxing beach vacation in the beautiful Maldives.','2023-08-09','2023-08-16',2500,'https://img.freepik.com/free-photo/blue-villa-beautiful-sea-hotel_1203-5316.jpg?w=1060&t=st=1690599117~exp=1690599717~hmac=79406b4eadf822bd5394c91d4d6caabb46daeb6eacbecae50bf94bbe436f78d8'),(2088,'Paris, France','Experience the romance and charm of Paris.','2023-09-28','2023-11-01',1800,'https://img.freepik.com/free-photo/eiffel-tower-view_1101-42.jpg?2&w=740&t=st=1690599144~exp=1690599744~hmac=a891a8313d86bb022142cc69d6859eb4faac7d91daf1d912b5c16b329bc9efd0g'),(2089,'New York City, USA','Explore the vibrant city that never sleeps.','2021-08-09','2022-07-12',2200,'https://img.freepik.com/free-photo/aerial-view-beautiful-central-park-manhattan-new-york_181624-39710.jpg?w=1060&t=st=1690599159~exp=1690599759~hmac=e2b66e9f70c52b383e292653b9851a3c671dcdd769fa0f578afe5c4ba286741b'),(2090,'Tokyo, Japan','Immerse yourself in the unique culture of Tokyo.','2023-10-15','2023-10-22',2100,'https://img.freepik.com/free-photo/tokyo-railway-station-business-district-building-night-japan_335224-158.jpg?w=1060&t=st=1690599185~exp=1690599785~hmac=069a4d1c5a08547d8d4424353ad4511ea521510d9105d97648d63143990e57cb'),(2091,'Cancun, Mexico','Relish the sun, sand, and sea in Cancun.','2023-11-03','2023-11-10',1900,'https://img.freepik.com/free-photo/landscape-tropical-vacation-palm-summer_1203-5352.jpg?w=1060&t=st=1690599203~exp=1690599803~hmac=f7b0995f02fac6062b8a63d10733e0ed421259d1ba365146cf08c0e06be2fe1c'),(2092,'Barcelona, Spain','Experience the vibrant culture of Barcelona.','2023-09-16','2023-09-23',2000,'https://img.freepik.com/free-photo/aerial-view-eixample-district-barcelona-spain_1398-4641.jpg?w=1060&t=st=1690599256~exp=1690599856~hmac=3a1973f00e17b5233b4711ce89a497e9d5c5e3be856b51c0aeacf8125e4ee8fc'),(2093,'Bali, Indonesia','Discover the natural beauty of Bali.','2024-03-18','2024-07-25',2300,'https://img.freepik.com/free-photo/besakih-temple-bali-indonesia_335224-372.jpg?w=1060&t=st=1690599271~exp=1690599871~hmac=15c2f1548c1f885be74ef5de73b2c5ec2ffa5e7366515e0ca8873ba33d3f346c'),(2094,'Rome, Italy','Explore the ancient ruins and art of Rome.','2023-10-08','2023-10-15',1950,'https://img.freepik.com/free-photo/breathtaking-shot-colosseum-amphitheatre-located-rome-italy_181624-41196.jpg?w=1060&t=st=1690599286~exp=1690599886~hmac=097278f45f48c95c6a546f71c9c441cc604bfa11417d050717dba798c2a4ee99'),(2095,'Dubai, UAE','Experience the luxury and modernity of Dubai.','2023-11-25','2023-12-02',2800,'https://img.freepik.com/free-photo/modetn-city-luxury-center-dubai-united-arab-emirates_231208-7596.jpg?w=1060&t=st=1690599305~exp=1690599905~hmac=be09d856608485ad49f7e4555c7e4c9e7aff03e71772d8f62db5aa3b17b05e23'),(2096,'Sydney, Australia','Discover the iconic landmarks and wildlife of Sydney.','2023-12-10','2023-12-17',2400,'https://img.freepik.com/free-photo/beautiful-shot-sydney-harbor-bridge-with-light-pink-blue-sky_181624-16041.jpg?w=1060&t=st=1690599337~exp=1690599937~hmac=6e6d397906b6efb379ff78ff4cbc282c1319448ab8d8f23b956b4320f1b54791'),(2097,'Machu Picchu, Peru','Embark on a journey to the ancient Incan citadel.','2023-09-15','2023-09-22',2150,'https://img.freepik.com/free-photo/beautiful-views-incan-citadel-machu-picchu_181624-16710.jpg?w=1380&t=st=1690599355~exp=1690599955~hmac=198dc0f845e7fd5769bf1bd318e9c2e72a718ab39b0ebc3fe2acdd651ba69680'),(2098,'Amsterdam, Netherlands','Experience the unique atmosphere of Amsterdam.','2023-10-27','2023-11-27',1900,'https://img.freepik.com/free-photo/beautiful-shot-bicycles-leaned-again-fence-bridge-river_181624-3802.jpg?w=1060&t=st=1690599380~exp=1690599980~hmac=3522dc1d94786a4243438c3a720b163c19cccaa24990b88817f6fecc62844bcc'),(2099,'Rio de Janeiro, Brazil','Enjoy the stunning beaches and vibrant culture of Rio.','2023-11-15','2023-11-22',2100,'https://img.freepik.com/free-photo/landscape-rio-de-janeiro-surrounded-by-sea-blue-sky-brazil_181624-14153.jpg?w=1380&t=st=1690599406~exp=1690600006~hmac=af122942234ad792315746010617b996f7ac5ff186a5c81bb1efd07f272c9254'),(2100,'Cairo, Egypt','Explore the ancient wonders of Cairo.','2023-10-01','2023-10-08',2200,'https://img.freepik.com/free-photo/young-man-walking-towards-great-sphinx-giza_181624-51674.jpg?w=1060&t=st=1690599424~exp=1690600024~hmac=5b1ebb76cc6a78b4d6e5f51b360835105e8b5472f907ef28203414315a278a48'),(2101,'Athens, Greece','Immerse yourself in the history and mythology of Athens.','2023-12-05','2023-12-12',2000,'https://img.freepik.com/free-photo/ruins-ancient-city-ai-generated-image_511042-1794.jpg?t=st=1690599447~exp=1690603047~hmac=14353a7049e32f361700d69958f584eac6f8f9741a5bb4177795c2448330ad58&w=1380');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-09 23:06:10
