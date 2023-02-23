CREATE SCHEMA `shop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
-- Bảng user
CREATE TABLE `shop`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NULL DEFAULT NULL,
  `last_name` VARCHAR(50) NULL DEFAULT NULL,
  `mobile` VARCHAR(15) NULL,
  `email` VARCHAR(50) NULL,
  `password` VARCHAR(32) NOT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT 0,
  `vendor` TINYINT(1) NOT NULL DEFAULT 0,
  `registered_at` DATETIME NOT NULL,
  `last_login` DATETIME NULL DEFAULT NULL,
  `intro` TINYTEXT NULL DEFAULT NULL,
  `profile` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_mobile` (`mobile` ASC),
  UNIQUE INDEX `uq_email` (`email` ASC) );
  
-- Bảng product
CREATE TABLE `shop`.`product` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `title` VARCHAR(75) NOT NULL,
 --  `meta_title` VARCHAR(100) NULL, 
  `slug` VARCHAR(100) NOT NULL,
  `summary` TINYTEXT NULL,
--   `type` SMALLINT(6) NOT NULL DEFAULT 0,
--   `sku` VARCHAR(100) NOT NULL,
  `price` FLOAT NOT NULL DEFAULT 0,
  `discount` FLOAT NOT NULL DEFAULT 0,
  `quantity` SMALLINT(6) NOT NULL DEFAULT 0,
  `shop` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `published_at` DATETIME NULL DEFAULT NULL,
  `starts_at` DATETIME NULL DEFAULT NULL,
  `ends_at` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_slug` (`slug` ASC),
  CONSTRAINT `fk_product_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `shop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
-- Bảng category
CREATE TABLE `shop`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(75) NOT NULL,
  `meta_title` VARCHAR(100) NULL DEFAULT NULL,
  `slug` VARCHAR(100) NOT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`));
  
-- Bảng product_category
CREATE TABLE `shop`.`product_category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT NOT NULL,
  `category_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_pc_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `shop`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `shop`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
-- bảng cart
CREATE TABLE `shop`.`cart` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NULL DEFAULT NULL,
  `session_id` VARCHAR(100) NOT NULL,
  `token` VARCHAR(100) NOT NULL,
  `status` SMALLINT(6) NOT NULL DEFAULT 0,
  `first_name` VARCHAR(50) NULL DEFAULT NULL,
  `last_name` VARCHAR(50) NULL DEFAULT NULL,
  `mobile` VARCHAR(15) NULL,
  `email` VARCHAR(50) NULL,
  `line1` VARCHAR(50) NULL DEFAULT NULL,
  `line2` VARCHAR(50) NULL DEFAULT NULL,
  `ward` VARCHAR(50) NULL DEFAULT NULL,
  `district` VARCHAR(50) NULL DEFAULT NULL,
  `city` VARCHAR(50) NULL DEFAULT NULL,
  `country` VARCHAR(50) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_cart_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `shop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
-- Bảng cart_item
CREATE TABLE `shop`.`cart_item` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT NOT NULL,
  `cart_id` BIGINT NOT NULL,
  `sku` VARCHAR(100) NOT NULL,
  `price` FLOAT NOT NULL DEFAULT 0,
  `discount` FLOAT NOT NULL DEFAULT 0,
  `quantity` SMALLINT(6) NOT NULL DEFAULT 0,
  `active` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_cart_item_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `shop`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
ALTER TABLE `shop`.`cart_item` 
ADD CONSTRAINT `fk_cart_item_cart`
  FOREIGN KEY (`cart_id`)
  REFERENCES `shop`.`cart` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
-- Bảng order
CREATE TABLE `shop`.`order` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NULL DEFAULT NULL,
  `session_id` VARCHAR(100) NOT NULL,
  `token` VARCHAR(100) NOT NULL,
  `status` SMALLINT(6) NOT NULL DEFAULT 0,
  `sub_total` FLOAT NOT NULL DEFAULT 0,
  `item_discount` FLOAT NOT NULL DEFAULT 0,
  `tax` FLOAT NOT NULL DEFAULT 0,
  `shipping` FLOAT NOT NULL DEFAULT 0,
  `total` FLOAT NOT NULL DEFAULT 0,
  `promo` VARCHAR(50) NULL DEFAULT NULL,
  `discount` FLOAT NOT NULL DEFAULT 0,
  `grand_total` FLOAT NOT NULL DEFAULT 0,
  `first_name` VARCHAR(50) NULL DEFAULT NULL,
  `last_name` VARCHAR(50) NULL DEFAULT NULL,
  `mobile` VARCHAR(15) NULL,
  `email` VARCHAR(50) NULL,
  `line1` VARCHAR(50) NULL DEFAULT NULL,
  `line2` VARCHAR(50) NULL DEFAULT NULL,
  `ward` VARCHAR(50) NULL DEFAULT NULL,
  `district` VARCHAR(50) NULL DEFAULT NULL,
  `city` VARCHAR(50) NULL DEFAULT NULL,
  `country` VARCHAR(50) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_order_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `shop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
-- Bảng order_item
CREATE TABLE `shop`.`order_item` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `product_id` BIGINT NOT NULL,
  `order_id` BIGINT NOT NULL,
  `sku` VARCHAR(100) NOT NULL,
  `price` FLOAT NOT NULL DEFAULT 0,
  `discount` FLOAT NOT NULL DEFAULT 0,
  `quantity` SMALLINT(6) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_order_item_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `shop`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
ALTER TABLE `shop`.`order_item` 
ADD CONSTRAINT `fk_order_item_order`
  FOREIGN KEY (`order_id`)
  REFERENCES `shop`.`order` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
-- Bảng transaction
CREATE TABLE `shop`.`transaction` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `order_id` BIGINT NOT NULL,
  `code` VARCHAR(100) NOT NULL,
  `type` SMALLINT(6) NOT NULL DEFAULT 0,
  `mode` SMALLINT(6) NOT NULL DEFAULT 0,
  `status` SMALLINT(6) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NULL DEFAULT NULL,
  `content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_transaction_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `shop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
ALTER TABLE `shop`.`transaction` 
ADD CONSTRAINT `fk_transaction_order`
  FOREIGN KEY (`order_id`)
  REFERENCES `shop`.`order` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;