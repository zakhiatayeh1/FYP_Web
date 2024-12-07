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
-- Table structure for table `component`
--

DROP TABLE IF EXISTS `component`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `component` (
  `component_id` int NOT NULL AUTO_INCREMENT,
  `component_type_id` int DEFAULT '0',
  `sold` int DEFAULT '0',
  `component_storage_id` int DEFAULT NULL,
  `component_order_id` int DEFAULT NULL,
  PRIMARY KEY (`component_id`),
  KEY `component_type_id` (`component_type_id`),
  KEY `component_storage_id_idx` (`component_storage_id`),
  KEY `component_order_id_idx` (`component_order_id`),
  CONSTRAINT `component_ibfk_1` FOREIGN KEY (`component_type_id`) REFERENCES `component_type` (`component_type_id`),
  CONSTRAINT `component_order_id` FOREIGN KEY (`component_order_id`) REFERENCES `component_supplier_order` (`component_order_id`),
  CONSTRAINT `component_storage_id` FOREIGN KEY (`component_storage_id`) REFERENCES `component_storage` (`component_storage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `component`
--

LOCK TABLES `component` WRITE;
/*!40000 ALTER TABLE `component` DISABLE KEYS */;
INSERT INTO `component` VALUES (14973,3,0,1,47),(14974,1,1,NULL,48),(14975,1,0,4,48),(14976,1,0,4,48),(14977,1,0,4,48),(14978,1,0,4,48),(14979,1,0,4,48),(14980,1,0,4,48),(14981,1,0,4,48),(14982,1,0,4,48),(14983,1,0,4,48),(14984,1,0,4,48),(14985,1,0,4,48),(14986,1,0,4,48),(14987,1,0,4,48),(14988,1,0,4,48),(14989,1,0,4,48),(14990,1,0,4,48),(14991,1,0,4,48),(14992,1,0,4,48),(14993,1,0,4,48),(14994,1,0,4,48),(14995,1,0,4,48),(14996,2,1,NULL,49),(14997,2,1,NULL,49),(14998,2,1,NULL,49),(14999,2,1,NULL,49),(15000,2,0,4,49),(15001,2,0,4,49),(15002,2,0,4,49),(15003,2,0,4,49),(15004,2,0,4,49),(15005,2,0,4,49),(15006,2,0,4,49),(15007,2,0,4,49),(15008,2,0,4,49),(15009,2,0,4,49),(15010,2,0,4,49),(15011,2,0,4,49),(15012,2,0,4,49),(15013,2,0,4,49),(15014,2,0,4,49),(15015,2,0,4,49),(15016,2,0,4,49),(15017,2,0,4,49),(15018,2,0,4,49),(15019,2,0,4,49),(15020,2,0,4,49),(15021,2,0,4,49),(15022,2,0,4,49),(15023,2,0,4,49),(15024,2,0,4,49),(15025,2,0,4,49),(15026,2,0,4,49),(15027,2,0,4,49),(15028,2,0,4,49),(15029,2,0,4,49),(15030,2,0,4,49),(15031,1,0,4,48),(15032,1,0,4,48),(15033,1,0,4,48),(15034,3,0,1,50),(15035,3,0,1,50),(15036,3,0,1,50),(15037,3,0,1,50),(15038,3,0,1,50),(15039,3,0,1,50),(15040,3,0,1,50),(15041,3,0,1,50),(15042,3,0,1,50),(15043,3,0,1,50),(15044,3,0,1,50),(15045,3,0,1,50),(15046,3,0,1,50),(15047,3,0,1,50),(15048,3,0,1,50),(15049,3,0,1,50),(15050,3,0,1,50),(15051,3,0,1,50),(15052,3,0,1,50),(15053,3,0,1,50),(15054,4,1,NULL,51),(15055,4,1,NULL,51),(15056,4,1,NULL,51),(15057,4,1,NULL,51),(15058,4,1,NULL,51),(15059,4,1,NULL,51),(15060,4,0,1,51),(15061,4,0,1,51),(15062,4,0,1,51),(15063,4,0,1,51),(15064,5,1,NULL,52),(15065,5,1,NULL,52),(15066,5,1,NULL,52),(15067,5,1,NULL,52),(15068,5,0,7,52),(15069,5,0,7,52),(15070,5,0,7,52),(15071,5,0,7,52),(15072,5,0,7,52),(15073,5,0,7,52),(15074,5,0,7,52),(15075,5,0,7,52),(15076,5,0,7,52),(15077,5,0,7,52),(15078,5,0,7,52),(15079,6,1,NULL,53),(15080,6,0,3,53),(15081,6,0,3,53),(15082,6,0,3,53),(15083,6,0,3,53),(15084,6,0,3,53),(15085,6,0,3,53),(15086,6,0,3,53),(15087,6,0,3,53),(15088,6,0,3,53),(15089,7,1,NULL,54),(15090,7,1,NULL,54),(15091,7,1,NULL,54),(15092,7,1,NULL,54),(15093,7,0,3,54),(15094,7,0,3,54),(15095,7,0,3,54),(15096,7,0,3,54),(15097,7,0,3,54),(15098,7,0,3,54),(15099,7,0,3,54),(15100,7,0,3,54),(15101,7,0,3,54),(15102,7,0,3,54),(15103,7,0,3,54),(15104,8,0,3,55),(15105,8,0,3,55),(15106,8,0,3,55),(15107,8,0,3,55),(15108,8,0,3,55),(15109,8,0,3,55),(15110,8,0,3,55),(15111,8,0,3,55),(15112,8,0,3,55),(15113,8,0,3,55),(15114,8,0,3,55),(15115,8,0,3,55),(15116,8,0,3,55),(15117,8,0,3,55),(15118,8,0,3,55),(15119,8,0,3,56),(15120,8,0,3,56),(15121,8,0,3,56),(15122,8,0,3,56),(15123,8,0,3,56),(15124,9,1,NULL,58),(15125,9,1,NULL,58),(15126,9,1,NULL,58),(15127,9,1,NULL,58),(15128,9,1,NULL,58),(15129,9,1,NULL,58),(15130,9,0,2,58),(15131,9,0,2,58),(15132,9,0,2,58),(15133,9,0,2,58),(15134,9,0,2,58),(15135,9,0,2,58),(15136,9,0,2,58),(15137,9,0,2,58),(15138,10,0,6,65),(15139,10,0,6,65),(15140,10,0,6,65),(15141,10,0,6,65),(15142,10,0,6,65),(15143,10,0,6,65),(15144,10,0,6,65),(15145,10,0,6,65),(15146,11,1,NULL,66),(15147,11,1,NULL,66),(15148,11,1,NULL,66),(15149,11,1,NULL,66),(15150,11,1,NULL,66),(15151,11,1,NULL,66),(15152,11,0,6,66),(15153,11,0,6,66),(15154,11,0,6,66),(15155,12,1,NULL,64),(15156,12,1,NULL,64),(15157,12,1,NULL,64),(15158,12,0,5,64),(15159,12,0,5,64),(15160,12,0,5,64),(15161,12,0,5,64),(15162,12,0,5,64),(15163,12,0,5,64),(15164,12,0,5,64),(15165,12,0,5,64),(15166,12,0,5,64),(15167,12,0,5,64),(15168,12,0,5,64),(15169,12,0,5,64),(15170,12,0,5,64),(15171,12,0,5,64),(15172,12,0,5,64),(15173,13,1,NULL,67),(15174,13,0,5,67),(15175,13,0,5,67),(15176,13,0,5,67),(15177,13,0,5,67),(15178,13,0,5,67),(15179,13,0,5,67),(15180,13,0,5,67),(15181,13,0,5,67),(15182,13,0,5,67),(15183,13,0,5,67),(15184,13,0,5,67),(15185,13,0,5,67),(15186,13,0,5,67),(15187,13,0,5,67),(15188,13,0,5,67),(15189,13,0,5,67),(15190,14,1,NULL,59),(15191,14,0,9,59),(15192,14,0,9,59),(15193,14,0,9,59),(15194,14,0,9,59),(15195,14,0,9,59),(15196,14,0,9,59),(15197,14,0,9,59),(15198,14,0,9,59),(15199,14,0,9,59),(15200,15,1,NULL,60),(15201,15,1,NULL,60),(15202,15,1,NULL,60),(15203,15,1,NULL,60),(15204,15,1,NULL,60),(15205,16,0,9,61),(15206,16,0,9,61),(15207,16,0,9,61),(15208,16,0,9,61),(15209,16,0,9,61),(15210,16,0,9,61),(15211,16,0,9,61),(15212,16,0,9,61),(15213,16,0,9,61),(15214,16,0,9,61),(15215,18,1,NULL,62),(15216,18,1,NULL,62),(15217,18,1,NULL,62),(15218,18,1,NULL,62),(15219,18,0,8,62),(15220,18,0,8,62),(15221,18,0,8,62),(15222,19,0,8,63),(15223,19,0,8,63),(15224,19,0,8,63),(15225,19,0,8,63),(15226,19,0,8,63);
/*!40000 ALTER TABLE `component` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-02 15:19:28
