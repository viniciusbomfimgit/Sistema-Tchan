-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: projeto_tchan
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `projeto_tchan`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `projeto_tchan` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `projeto_tchan`;

--
-- Table structure for table `agendamentos`
--

DROP TABLE IF EXISTS `agendamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agendamentos` (
  `id_agendamento` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_colab` int NOT NULL,
  `id_array` int NOT NULL,
  `data_agendamento` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_termino` time NOT NULL,
  `preco_total` float NOT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_agendamento`),
  KEY `fk_agendamentos_array` (`id_array`),
  KEY `fk_agendamentos_clientes` (`id_cliente`),
  KEY `fk_agendamentos_colaboradores` (`id_colab`),
  CONSTRAINT `fk_agendamentos_array` FOREIGN KEY (`id_array`) REFERENCES `tabela_array` (`id_array`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_agendamentos_clientes` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_agendamentos_colaboradores` FOREIGN KEY (`id_colab`) REFERENCES `colaboradores` (`id_colab`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agendamentos`
--

LOCK TABLES `agendamentos` WRITE;
/*!40000 ALTER TABLE `agendamentos` DISABLE KEYS */;
INSERT INTO `agendamentos` VALUES 
(1,4,1,1,'2020-06-11','14:00:00','15:30:00',75,'Pode chegar 10 minutos atrasado'),
(2,1,2,2,'2020-06-11','14:00:00','17:00:00',90,NULL),
(3,5,1,3,'2020-06-11','15:30:00','16:00:00',25,NULL),
(4,2,3,4,'2020-06-11','10:00:00','12:30:00',45,'Deixou o serviço pago'),
(5,3,1,5,'2020-06-13','09:00:00','10:00:00',45,NULL),
(6,30,2,6,'2020-06-12','10:30:00','11:00:00',25,NULL),
(7,28,1,7,'2020-06-13','13:00:00','15:00:00',105,'Chegará 10 minutos atrasado'),
(8,26,3,8,'2020-06-12','09:00:00','11:00:00',15,NULL),
(9,24,1,9,'2020-06-14','13:00:00','14:30:00',75,NULL),
(10,22,2,10,'2020-06-14','13:00:00','16:00:00',60,'Trará a própria tinta'),
(11,20,1,11,'2020-06-15','15:00:00','16:00:00',45,NULL),
(12,18,3,12,'2020-06-14','13:00:00','14:00:00',45,NULL),
(13,16,1,13,'2020-06-15','09:00:00','09:30:00',25,'Cliente problemático'),
(14,14,2,14,'2020-06-15','10:00:00','11:00:00',50,NULL),
(15,12,1,15,'2020-06-16','09:00:00','11:30:00',95,NULL),
(16,10,3,16,'2020-06-15','15:00:00','16:00:00',45,NULL),
(17,8,3,17,'2020-06-17','09:00:00','10:30:00',75,'Está trazendo o próprio produto para as luzes'),
(18,6,2,18,'2020-06-17','09:00:00','10:30:00',75,NULL),
(19,7,1,19,'2020-06-17','13:00:00','13:30:00',25,NULL),
(20,9,1,20,'2020-06-17','14:00:00','15:30:00',75,'Cliente tem preferência por sentar próximo da porta'),
(21,11,2,21,'2020-06-17','13:00:00','15:00:00',95,NULL),
(22,13,2,22,'2020-06-17','15:30:00','16:00:00',45,NULL),
(23,15,3,23,'2020-06-17','13:00:00','14:00:00',45,'Fazer propaganda dos novos serviços'),
(24,17,1,24,'2020-06-16','09:00:00','10:00:00',45,NULL),
(25,19,2,25,'2020-06-16','09:00:00','09:30:00',25,NULL),
(26,21,1,26,'2020-06-16','13:00:00','16:00:00',60,NULL),
(27,23,2,27,'2020-06-16','13:00:00','13:30:00',25,NULL),
(28,25,1,28,'2020-06-18','09:00:00','09:30:00',25,'Tem 10% de desconto'),
(29,27,3,29,'2020-06-18','09:00:00','10:00:00',50,NULL),
(30,29,3,30,'2020-06-18','13:00:00','14:00:00',50,'Pagou na visita anterior');
/*!40000 ALTER TABLE `agendamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(100) NOT NULL,
  `cpf_cliente` varchar(20) NOT NULL,
  `telefone_cliente` varchar(20) NOT NULL,
  `email_cliente` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES 
(1,'Jennifer Sônia Catarina Bernardes','230.316.658-64','(11) 99286-9102','jennifersoniacatarinabernardes@gasparalmeida.com'),
(2,'Alícia Marli Aparecida Nunes','152.611.888-22','(11) 98946-2196','helenaoliviadamata@mrv.com.br'),
(3,'Emily Analu Cecília Castro','714.135.898-63','(11) 99490-9583','kamillyteresinhaviana@lonza.com'),
(4,'Ian Geraldo Osvaldo Pires','150.666.048-71','(11) 98422-2326','isaacrodrigonascimento_@costaporto.com.br'),
(5,'Isaac Rodrigo Nascimento','853.600.558-04','(11) 99404-5408','ttheooliverjesus@engenharia.ufjf.br'),
(6,'Igor Jorge Moura','914.239.439-29','(11) 98905-0551','igorjorgemoura@camilapassos.com.br'),
(7,'Cauã Benício Brito','862.763.055-02','(11) 99108-5881','leonardoroberto@dafitex.com.br'),
(8,'Nicolas Guilherme Araújo','748.540.723-69','(11) 99916-2113','mmarceloeduardo@live.com.pt'),
(9,'Levi Diogo Souza','902.741.149-25','(11) 98148-3983','noahleandroalves@googlemail.com'),
(10,'Cristiane Corte Real','488.060.257-40','(11) 99392-1207','cristianemarianacortereal@gmail.com.br'),
(11,'Lívia Stella Porto','234.694.125-53','(11) 98399-7203','liviastellaporto@futureteeth.com.br'),
(12,'Julia Clarice Nogueira','335.233.536-29','(11) 99645-5164','juliaclarice@cheryamur.com.br'),
(13,'Lavínia Liz da Cunha','435.981.156-01','(11) 99461-0565','llaviniavanessalizdacunha@cssmi.com.br'),
(14,'Fabiana Giovanna Barros','132.853.319-09','(11) 99215-2470','fabianabarros@gmail.com'),
(15,'Hadassa Julia Pereira','077.120.600-37','(11) 99397-1951','hadassapereira@gmail.com'),
(16,'Carlos Yago Farias','356.338.290-50','(11) 98324-1899','carlosfelipeyago@galpaoestofados.com.br'),
(17,'Jéssica Rita Nair Vieira','476.717.517-82','(11) 99998-5232','jessicaritanairvieira@vanguarda.tv'),
(18,'Valentina Aline Porto','469.454.797-65','(11) 99279-2639','vvalentinaalineporto@alphacandies.com.br'),
(19,'Thiago Caio Martin Pereira','795.488.028-13','(11) 98766-4408','thiagocaiomartinpereira@aguianet.com.br'),
(20,'Antônia Simone Alves','456.121.529-81','(11) 99848-0513','aantoniasimonealves@bwmtrade.com'),
(21,'Patrícia Silva','219.886.715-07','(11) 99975-9380','ppasilva@midiasim.com.br'),
(22,'Isadora Sandra Santos','987.272.253-64','(11) 98966-6828','isadorasandrasantos@tarp.com.br'),
(23,'Nathan Figueiredo','191.465.045-08','(11) 99329-4981','nathanfigueiredo@ematelecom.com.br'),
(24,'Nathan Daniel Gael Silva','590.473.647-91','(11) 98637-3680','nathandanielgaelsilva-83@kof.com.mx'),
(25,'Thomas Manoel Tomás Drumond','229.897.591-40','(11) 98369-8226','thomasdrumond@redacaofinal.com.br'),
(26,'Aurora Caldeira','212.350.420-30','(11) 98656-8793','aurorateresinhacaldeira@yahoo.ie'),
(27,'Isabella Betina da Conceição','320.327.344-60','(11) 98603-7160','betinadaconceicao_@sgstelecom.com.br'),
(28,'Mateus Leonardo Teixeira','108.085.287-50','(11) 98900-6917','mmateusleonardoteixeira@aquino.com.br'),
(29,'Henry Edson Assis','316.018.614-86','(11) 98897-6192','henryedsonassis@associate.com.br'),
(30,'Ruan Luiz Oliver Jesus','561.064.571-90','(11) 99379-1605','ruanluizoliverjesus@tribunadeindaia.com.br');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colaboradores`
--

DROP TABLE IF EXISTS `colaboradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colaboradores` (
  `id_colab` int NOT NULL AUTO_INCREMENT,
  `nome_colab` varchar(100) NOT NULL,
  `cpf_colab` varchar(20) NOT NULL,
  `telefone_colab` varchar(20) NOT NULL,
  `rua_colab` varchar(100) DEFAULT NULL,
  `numero_casa_colab` int DEFAULT NULL,
  `complemento_colab` varchar(20) DEFAULT NULL,
  `cep_colab` varchar(20) NOT NULL,
  `cidade_colab` varchar(100) NOT NULL,
  `estado_colab` varchar(100) NOT NULL,
  `pin_colab` varchar(8) NOT NULL,
  `isOwner` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_colab`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colaboradores`
--

LOCK TABLES `colaboradores` WRITE;
/*!40000 ALTER TABLE `colaboradores` DISABLE KEYS */;
INSERT INTO `colaboradores` VALUES 
(1,'Isadora Cláudia Rocha','320.607.868-78','(11) 98868-3513','Rua do Alto',135,NULL,'02342-000','São Paulo','São Paulo','123456',0),
(2,'Agatha Fabiana Clarice Drumond','056.630.258-63','(11) 99147-8038','Rua Ministro Alcides Carneiro',1000,NULL,'03938-020','São Paulo','São Paulo','654321',0),
(3,'Otávio Lorenzo Luiz Barros','551.347.698-34','(11) 99406-4737','Travessa Braúna',123,NULL,'4818','São Paulo','São Paulo','souodono',1);
/*!40000 ALTER TABLE `colaboradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicos`
--

DROP TABLE IF EXISTS `servicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicos` (
  `id_servico` int NOT NULL AUTO_INCREMENT,
  `nome_servico` varchar(100) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `duracao` time NOT NULL,
  `valor` float NOT NULL,
  PRIMARY KEY (`id_servico`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicos`
--

LOCK TABLES `servicos` WRITE;
/*!40000 ALTER TABLE `servicos` DISABLE KEYS */;
INSERT INTO `servicos` VALUES 
(1,'Luzes','Luzes serão feitas no cabelo','01:00:00',50),
(2,'Alisamento','O cabelo será alisado','00:45:00',30),
(3,'Corte Masculino','Corte padrão masculino','00:30:00',25),
(4,'Corte Feminino','Corte padrão feminino','01:00:00',45),
(5,'Pintura','Pintura do cabelo','02:00:00',15);
/*!40000 ALTER TABLE `servicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tabela_array`
--

DROP TABLE IF EXISTS `tabela_array`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabela_array` (
  `id_array` int NOT NULL AUTO_INCREMENT,
  `id_servico_01` int NOT NULL,
  `id_servico_02` int DEFAULT NULL,
  `id_servico_03` int DEFAULT NULL,
  `id_servico_04` int DEFAULT NULL,
  `id_servico_05` int DEFAULT NULL,
  PRIMARY KEY (`id_array`),
  KEY `fk_array_01_servicos` (`id_servico_01`),
  KEY `fk_array_02_servicos` (`id_servico_02`),
  KEY `fk_array_03_servicos` (`id_servico_03`),
  KEY `fk_array_04_servicos` (`id_servico_04`),
  KEY `fk_array_05_servicos` (`id_servico_05`),
  CONSTRAINT `fk_array_01_servicos` FOREIGN KEY (`id_servico_01`) REFERENCES `servicos` (`id_servico`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_array_02_servicos` FOREIGN KEY (`id_servico_02`) REFERENCES `servicos` (`id_servico`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_array_03_servicos` FOREIGN KEY (`id_servico_03`) REFERENCES `servicos` (`id_servico`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_array_04_servicos` FOREIGN KEY (`id_servico_04`) REFERENCES `servicos` (`id_servico`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_array_05_servicos` FOREIGN KEY (`id_servico_05`) REFERENCES `servicos` (`id_servico`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabela_array`
--

LOCK TABLES `tabela_array` WRITE;
/*!40000 ALTER TABLE `tabela_array` DISABLE KEYS */;
INSERT INTO `tabela_array` VALUES 
(1,3,1,NULL,NULL,NULL),
(2,4,2,5,NULL,NULL),
(3,3,NULL,NULL,NULL,NULL),
(4,5,2,NULL,NULL,NULL),
(5,1,2,3,4,5),
(6,3,NULL,NULL,NULL,NULL),
(7,1,2,3,NULL,NULL),
(8,5,NULL,NULL,NULL,NULL),
(9,3,1,NULL,NULL,NULL),
(10,5,4,NULL,NULL,NULL),
(11,4,NULL,NULL,NULL,NULL),
(12,4,NULL,NULL,NULL,NULL),
(13,3,NULL,NULL,NULL,NULL),
(14,1,NULL,NULL,NULL,NULL),
(15,1,4,NULL,NULL,NULL),
(16,4,NULL,NULL,NULL,NULL),
(17,1,3,NULL,NULL,NULL),
(18,1,3,NULL,NULL,NULL),
(19,3,NULL,NULL,NULL,NULL),
(20,1,3,NULL,NULL,NULL),
(21,1,4,NULL,NULL,NULL),
(22,4,NULL,NULL,NULL,NULL),
(23,4,NULL,NULL,NULL,NULL),
(24,4,NULL,NULL,NULL,NULL),
(25,3,NULL,NULL,NULL,NULL),
(26,4,5,NULL,NULL,NULL),
(27,3,NULL,NULL,NULL,NULL),
(28,3,NULL,NULL,NULL,NULL),
(29,1,NULL,NULL,NULL,NULL),
(30,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tabela_array` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-10 20:41:00
