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
-- Table structure for table `component_type`
--

DROP TABLE IF EXISTS `component_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `component_type` (
  `component_type_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) NOT NULL,
  `quantity` int DEFAULT '0',
  `description` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `model_number` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `image_url` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `part_category_id` int DEFAULT NULL,
  `weight` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`component_type_id`),
  KEY `part_category_id_idx` (`part_category_id`),
  CONSTRAINT `part_category_id` FOREIGN KEY (`part_category_id`) REFERENCES `part_category` (`part_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `component_type`
--

LOCK TABLES `component_type` WRITE;
/*!40000 ALTER TABLE `component_type` DISABLE KEYS */;
INSERT INTO `component_type` VALUES (1,' Drop Handlebars',109,'Lightweight carbon or alloy drop handlebars for road bikes, designed for aerodynamic riding.','DH-1001','https://www.statebicycle.com/cdn/shop/products/JMO_5652.jpg?v=1684441907',1,'0'),(2,'Flat Handlebars',101,'Sturdy aluminum flat handlebars ideal for mountain and hybrid bikes, offering more upright posture.','FH-2202','https://bikesupplies.ca/cdn/shop/products/Box_One_Chromoly_OS_8.0in_front_bk_v007_2048x2048_e14d868d-09dc-4f1e-84e2-d05e8e67e9ac.jpg?v=1677479634',1,'1.5'),(3,'Rim Brakes',21,'Versatile braking system compatible with both rim and disc brakes, ensuring smooth stopping power.','BR-3040','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBoNUhm8kRfSbaeohNulDOUqNAk40cCAa-cQ&s',2,'2'),(4,'Disc Brakes',4,'High-performance hydraulic disc brakes offering precise stopping power, even in wet conditions.','DB-4550','https://www.shutterstock.com/image-photo/mountain-bike-disk-brake-on-600nw-1787349278.jpg',2,'2.5'),(5,'Trigger Shifters',11,'Integrated trigger shifters offering smooth and rapid gear shifting for mountain and hybrid bikes.',' TS-1090','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR677U7IYYwoFf-9Z4rxAunCH9jC4B7EnvFg&s',3,'0.5'),(6,'Lightweight Carbon Fork',9,'Ultra-light carbon frame designed for racing and long-distance cycling, offering excellent stiffness.','CF-7840','https://m.media-amazon.com/images/I/51CHMm6bUsL._AC_SL1100_.jpg',4,'1.8'),(7,'Suspension Fork',11,'High-performance suspension fork built for rugged off-road trails, absorbing shocks and bumps.','SF-3030','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV0z_NtPT64wcD2eNwemF85gJyVW4b2HBuFA&s',4,'1.1'),(8,'Rigid Fork',20,'Durable steel rigid fork designed for city and road bikes, providing excellent control and strength for smooth rides.\n',' RF-5021','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvfd7mXdtdPnfIUTlpPB85_Rx09RfS2S1ljg&s',4,'1.2'),(9,'Gears',8,'High-performance 11-speed drivetrain offering smooth and efficient gear shifting, ideal for both road and mountain bikes.','DT-1140','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFFk2cH84zo3Z41-74tf07WBFVE2YdPifJPQ&s',5,'3'),(10,'Lightweight saddle',8,'Lightweight, narrow profile saddle designed for high-speed road cycling with minimal drag.','SD-2035','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtWFMzGBU0WsnJFffUl6Kl6A7fmusdtVoeuQ&s',6,'0.45'),(11,'padded saddle',3,'A padded saddle with gel cushioning, designed for enhanced comfort during long rides. Suitable for both road and mountain bikes.','SD-3050','https://www.mokwheel.com/cdn/shop/files/EF0A1710_035da781-d1c7-4c05-b10e-c6acbbd8ce0e.jpg?v=1695660396&width=640',6,'1'),(12,'Dual SPD Platform Pedals',15,' Versatile dual-sided pedals, offering 2-bolt SPD system on one side and a flat platform on the other, suitable for various cycling styles.','PD-4500','https://www.statebicycle.com/cdn/shop/products/JMO_3208.jpg?v=1684443349',7,'0.35'),(13,'Platform Pedals',16,' Durable alloy platform pedals with a wide surface area, providing excellent grip and stability for off-road and city cycling. Ideal for riders who prefer not to clip in.','PD-5000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7DEaxcl7obcz_Ytf_Sw6burz1Lr8n3uVWGA&s',7,'0.55'),(14,'High-Diameter Wheels',9,'Large high-diameter wheels providing excellent speed and stability for long-distance road cycling.','WH-2930','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUzn_YkxnDkgMSdiUH7YyRbIkrWBEFXO6e8Q&s',8,'1.6'),(15,'Medium-Diameter Wheels',0,'Versatile 27.5\" wheels, offering a balance of agility and stability. Suitable for both mountain and hybrid bikes, providing enhanced control on varied terrains.','WM-2930','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrps5QD71GXuR8esXijgGA5G9voh7Vmu9Hng&s',8,'1.2'),(16,' Small Diameter BMX Wheels',10,'Compact 20\" wheels designed for BMX and freestyle bikes, offering quick acceleration and excellent maneuverability for tricks and stunts.','WH-2000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg5u1DqhZdhzVdRlBoWDh70gyYK2axyH3p7Q&s',8,'0.8'),(17,'High-Pressure Road Tires',0,' High-pressure, narrow-width tires optimized for fast road cycling and excellent grip on pavement.','TR-1200','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5gScxnLR47OxeGpOUv-ob_sju4u3KUa0IGw&s',9,'0.9'),(18,'All-Terrain Tires',3,'Medium-diameter 27.5\" tires designed for mountain and hybrid bikes. These tires provide a balanced grip and stability on both off-road trails and urban roads.','TR-2750','https://www.wtb.com/cdn/shop/products/20160330_All_Terrain_Straight_adjsuted_1024x1024.png?v=1534965971',9,'1.5'),(19,'BMX Freestyle Tires',5,'Small-diameter 20\" tires specifically made for BMX bikes, providing superior traction and control for stunts and tricks in skateparks and urban environments.','TR-2000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOpf98soSJ2yORu9Hfppu5YsRMSAv24LU_dA&s',9,'0.7');
/*!40000 ALTER TABLE `component_type` ENABLE KEYS */;
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
