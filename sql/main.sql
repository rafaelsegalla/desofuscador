-- -----------------------------------------------------
-- Schema crud_usuario
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `crud_usuario` DEFAULT CHARACTER SET utf8 ;
USE `crud_usuario` ;

-- -----------------------------------------------------
-- Table `crud_usuario`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `crud_usuario`.`usuario` ;

CREATE TABLE IF NOT EXISTS `crud_usuario`.`usuario` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome_proprio` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(500) NOT NULL,
  `ativo` TINYINT NOT NULL DEFAULT 1,
  `adm` TINYINT NOT NULL DEFAULT 0,
  `usuario` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;