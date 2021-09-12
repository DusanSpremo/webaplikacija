-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.10-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table aplikacija.korisnik
DROP TABLE IF EXISTS `korisnik`;
CREATE TABLE IF NOT EXISTS `korisnik` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `korisnicko_ime` varchar(50) NOT NULL,
  `sifra` varchar(250) NOT NULL,
  `ime` varchar(100) NOT NULL,
  `prezime` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `korisnickoime_unique` (`korisnicko_ime`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table aplikacija.korisnik: ~2 rows (approximately)
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
REPLACE INTO `korisnik` (`id`, `korisnicko_ime`, `sifra`, `ime`, `prezime`, `email`) VALUES
	(1, 'admin', 'admin', 'agawgawg', 'agwgag', 'awgawgawgawg'),
	(2, 'test', 'test', 'awgawg', 'awgawg', 'awgawgawg');
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;

-- Dumping structure for table aplikacija.pesma
DROP TABLE IF EXISTS `pesma`;
CREATE TABLE IF NOT EXISTS `pesma` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `naziv_pesme` varchar(50) NOT NULL,
  `ime_autora` varchar(100) NOT NULL,
  `naziv_izvodjaca` varchar(100) NOT NULL,
  `tekst` text NOT NULL,
  `korisnikId` bigint(20) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_pesma_1` (`korisnikId`),
  CONSTRAINT `fk_pesma_1` FOREIGN KEY (`korisnikId`) REFERENCES `korisnik` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table aplikacija.pesma: ~5 rows (approximately)
/*!40000 ALTER TABLE `pesma` DISABLE KEYS */;
REPLACE INTO `pesma` (`id`, `naziv_pesme`, `ime_autora`, `naziv_izvodjaca`, `tekst`, `korisnikId`) VALUES
	(1, 'lepa Janja', 'Bajaga', 'Bajaga i instruktori', 'awgiajw iohaiowghaw hguaiw hgulaiwh gluawgh auwghl auwhgluawhguawhgawg', 1),
	(2, 'pesma2', '21412a', 'awwag', 'awgawgawg', 1),
	(3, 'pesma3', '125125', '126126', '126126126', 2),
	(4, 'pesma4', '125126', 'shseh', 'sehsehseh', 1),
	(5, 'Lepa Janja', 'Bajaga', 'Bajaga i instruktori', 'awgiajw iohaiowghaw hguaiw hgulaiwh gluawgh auwghl auwhgluawhguawhgawg', 1);
/*!40000 ALTER TABLE `pesma` ENABLE KEYS */;

-- Dumping structure for table aplikacija.rejting_pesme
DROP TABLE IF EXISTS `rejting_pesme`;
CREATE TABLE IF NOT EXISTS `rejting_pesme` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pesmaId` bigint(20) NOT NULL,
  `korisnikId` bigint(20) NOT NULL,
  `rejting` int(11) NOT NULL,
  `datum` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_rejting_pesme_1` (`pesmaId`),
  KEY `fk_rejting_pesme_2` (`korisnikId`),
  CONSTRAINT `fk_rejting_pesme_1` FOREIGN KEY (`pesmaId`) REFERENCES `pesma` (`id`),
  CONSTRAINT `fk_rejting_pesme_2` FOREIGN KEY (`korisnikId`) REFERENCES `korisnik` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table aplikacija.rejting_pesme: ~5 rows (approximately)
/*!40000 ALTER TABLE `rejting_pesme` DISABLE KEYS */;
REPLACE INTO `rejting_pesme` (`id`, `pesmaId`, `korisnikId`, `rejting`, `datum`) VALUES
	(1, 4, 1, 2, '2021-09-10 12:42:28'),
	(2, 4, 2, 4, '2021-09-10 13:07:07'),
	(3, 1, 1, 4, '2021-09-10 13:09:04'),
	(4, 5, 1, 5, '2021-09-10 15:01:22'),
	(5, 3, 1, 1, '2021-09-11 12:09:55');
/*!40000 ALTER TABLE `rejting_pesme` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
