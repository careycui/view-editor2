-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: page
-- ------------------------------------------------------
-- Server version	5.6.38-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `folders`
--

DROP TABLE IF EXISTS `folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `folders` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(10) NOT NULL COMMENT 'type=pro;\ntype=topic;',
  `trash` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='详情页组分类';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders`
--

LOCK TABLES `folders` WRITE;
/*!40000 ALTER TABLE `folders` DISABLE KEYS */;
INSERT INTO `folders` VALUES ('b9d45582-1134-419e-857e-adf5e1ad216d','test','topic',1),('c121ab19-21cf-437b-9c82-2a1e7eaa17bb','测试一','pro',1);
/*!40000 ALTER TABLE `folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folders_page`
--

DROP TABLE IF EXISTS `folders_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `folders_page` (
  `id` varchar(100) NOT NULL,
  `folders_id` varchar(100) NOT NULL,
  `page_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='folder page关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders_page`
--

LOCK TABLES `folders_page` WRITE;
/*!40000 ALTER TABLE `folders_page` DISABLE KEYS */;
/*!40000 ALTER TABLE `folders_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_base`
--

DROP TABLE IF EXISTS `page_base`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page_base` (
  `id` varchar(100) NOT NULL,
  `t_type` varchar(45) DEFAULT 'pro',
  `page_type` int(2) NOT NULL DEFAULT '0' COMMENT '页面类型\r\n0 普通页面\r\n1 海报类页面',
  `pc` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL COMMENT '页面title',
  `desc` varchar(255) DEFAULT NULL COMMENT '页面描述',
  `img_cover` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `trash` int(11) DEFAULT '0',
  `folder_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_base`
--

LOCK TABLES `page_base` WRITE;
/*!40000 ALTER TABLE `page_base` DISABLE KEYS */;
INSERT INTO `page_base` VALUES ('2af71224-a8ea-400a-814e-5ce6fa7d43d1','pro',0,'a38701e1-d1e3-409a-8a38-caa74af97d6c','3bd7ca78-e84e-4731-9ba4-a933b5a43ae4','TESTSDFDS','未添加描述','//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg','2018-07-12 11:19:16','2018-07-12 11:19:16',0,NULL),('4cbae816-c88c-4f7e-a1f2-7cf1805c04eb','pro',0,'a38701e1-d1e3-409a-8a38-caa74af97d6c','3bd7ca78-e84e-4731-9ba4-a933b5a43ae4','TESTSDFDS_副本','未添加描述','//mfs.ys7.com/mall/f262e8517ee1172b3a4de68f82bb36c9.jpg','2018-07-12 11:21:35','2018-07-12 11:21:35',0,'c121ab19-21cf-437b-9c82-2a1e7eaa17bb');
/*!40000 ALTER TABLE `page_base` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page_concat`
--

DROP TABLE IF EXISTS `page_concat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page_concat` (
  `id` varchar(60) NOT NULL,
  `page_id` varchar(60) DEFAULT NULL,
  `concat_id` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page_concat`
--

LOCK TABLES `page_concat` WRITE;
/*!40000 ALTER TABLE `page_concat` DISABLE KEYS */;
/*!40000 ALTER TABLE `page_concat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pro_page`
--

DROP TABLE IF EXISTS `pro_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pro_page` (
  `id` varchar(100) NOT NULL,
  `platform_type` int(2) NOT NULL DEFAULT '0' COMMENT '页面平台类型\r\n0 pc平台 默认值\r\n1 手机端 ',
  `page_data` mediumtext COMMENT '页面结构json数据\r\n',
  `html_data` mediumtext COMMENT '页面HTML字符串',
  `css` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pro_page`
--

LOCK TABLES `pro_page` WRITE;
/*!40000 ALTER TABLE `pro_page` DISABLE KEYS */;
INSERT INTO `pro_page` VALUES ('a38701e1-d1e3-409a-8a38-caa74af97d6c',0,NULL,NULL,NULL),('3bd7ca78-e84e-4731-9ba4-a933b5a43ae4',1,NULL,NULL,NULL),('b08f604c-6021-4f46-a587-6e84bcde6ed3',0,NULL,NULL,NULL),('1a23c81b-ac2f-481c-aa4e-187fe66929ea',1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `pro_page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_page`
--

DROP TABLE IF EXISTS `topic_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic_page` (
  `id` varchar(100) NOT NULL,
  `platform_type` int(2) NOT NULL DEFAULT '0' COMMENT '页面平台类型\r\n0 pc平台 默认值\r\n1 手机端 ',
  `page_data` mediumtext COMMENT '页面结构json数据\r\n',
  `html_data` mediumtext COMMENT '页面HTML字符串',
  `css` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_page`
--

LOCK TABLES `topic_page` WRITE;
/*!40000 ALTER TABLE `topic_page` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic_page` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-13 12:15:52
