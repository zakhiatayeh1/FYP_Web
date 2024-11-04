-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: supply_chain
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
-- Table structure for table `model`
--

DROP TABLE IF EXISTS `model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model` (
  `model_id` int NOT NULL AUTO_INCREMENT,
  `price` double NOT NULL,
  `description` varchar(1000) NOT NULL,
  `quantity` int DEFAULT NULL,
  `name` varchar(500) NOT NULL,
  `model_number` varchar(50) NOT NULL,
  `image_url` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `bike_category_id` varchar(3) DEFAULT NULL,
  `production_time` int DEFAULT NULL,
  `percentage` decimal(5,2) DEFAULT NULL,
  `storage_coefficient` decimal(8,3) DEFAULT NULL,
  `bike_type_id` int DEFAULT NULL,
  PRIMARY KEY (`model_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `bike_category_id_idx` (`bike_category_id`),
  KEY `fk_bike_type` (`bike_type_id`),
  CONSTRAINT `fk_bike_category_id` FOREIGN KEY (`bike_category_id`) REFERENCES `bike_category` (`bike_category_id`),
  CONSTRAINT `fk_bike_type` FOREIGN KEY (`bike_type_id`) REFERENCES `bike_type` (`bike_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model`
--

LOCK TABLES `model` WRITE;
/*!40000 ALTER TABLE `model` DISABLE KEYS */;
INSERT INTO `model` VALUES (1,1500,'A durable and robust mountain bike designed for off-road adventures.',NULL,'Mountain Climber XT','MB340','https://www.tritoncycles.co.uk/images/trek-top-fuel-7-full-suspension-cross-country-mountain-bike-2022-p40544-187476_image.jpg','3',2,29.82,2.828,2),(2,1200,'A lightweight road bicycle built for speed and efficiency on paved roads.',NULL,'Roadmaster Pro','RB2024','https://www.cjperformancecycles.com/images/ryb119b.jpg?width=1920&format=webp','3',2,29.82,2.828,1),(3,950,'A versatile hybrid bike perfect for commuting and light off-road rides.',NULL,'Hybrid Explorer','HYX220','https://www.cyclesolutions.co.uk/images/Dual%20Sport%203%20Grey.png?width=1920&format=webp','2',6,41.86,18.000,3),(4,800,'A BMX bike designed for tricks and stunts in urban environments and skateparks.',NULL,'BMX Freestyle Pro','BMX450','https://us.sourcebmx.com/cdn/shop/products/fca27533-ab0d-4dd3-a77f-64b967655103_fb7245cf-0edc-4a39-98e1-32e21d91850d_900x.jpg?v=1687782265','3',1,10.54,1.000,4),(8,5,'5',NULL,'5','5','5','2',5,29.07,12.500,1),(9,9,'9',NULL,'9','9','9','1',9,2.18,145.800,2);
/*!40000 ALTER TABLE `model` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-02 15:19:29
