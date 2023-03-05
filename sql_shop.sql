SELECT * FROM shop.category;
INSERT INTO `shop`.`category` (`id`, `content`, `slug`, `title`) VALUES ('1', 'Áo', 'ao', 'Áo');
INSERT INTO `shop`.`category` (`id`, `content`, `slug`, `title`) VALUES ('2', 'Quần', 'quan', 'Quần');
INSERT INTO `shop`.`category` (`id`, `content`, `slug`, `title`) VALUES ('3', 'Nam', 'nam', 'Nam');
INSERT INTO `shop`.`category` (`id`, `content`, `slug`, `title`) VALUES ('4', 'Nữ', 'nu', 'Nữ');
INSERT INTO `shop`.`category` (`id`, `content`, `slug`, `title`) VALUES ('5', 'Mũ', 'mu', 'Mũ');
INSERT INTO `shop`.`category` (`id`, `content`, `slug`, `title`) VALUES ('6', 'Giày', 'giay', 'Giày');
SELECT * FROM shop.product;
INSERT INTO `shop`.`product` 
	(`user_id`, `title`, `slug`, `summary`, `price`, `discount`, `quantity`, `created_at`, `content`) 
VALUES 
    ('1', 'Áo nam', 'ao-phong-nam', 'Áo phông nam', '200000', '20', '10', '2023-03-05 00:00:00', 'Áo phông dành cho nam');
INSERT INTO `shop`.`product` 
	(`user_id`, `title`, `slug`, `summary`, `price`, `discount`, `quantity`, `created_at`, `content`) 
VALUES 
    ('1', 'Áo nam', 'ao-phong-nu', 'Áo nữ', '200000', '20', '10', '2023-03-04 00:00:00', 'Áo phông dành cho nữ');
INSERT INTO `shop`.`product` 
	(`user_id`, `title`, `slug`, `summary`, `price`, `discount`, `quantity`, `created_at`, `content`) 
VALUES 
    ('1', 'Mũ lưỡi trai', 'mu-luoi-trai', 'Mũ lưỡi trai', '100000', '0', '10', '2023-03-05 00:00:00', 'Mũ Lưỡi trai');
INSERT INTO `shop`.`product` 
	(`user_id`, `title`, `slug`, `summary`, `price`, `discount`, `quantity`, `created_at`, `content`) 
VALUES 
    ('1', 'Quần LEGGING', 'quan-legging', 'Quần-LEGGING', '100000', '30', '100', '2023-03-05 00:00:00', 'Quần-LEGGING');
INSERT INTO `shop`.`product` 
	(`user_id`, `title`, `slug`, `summary`, `price`, `discount`, `quantity`, `created_at`, `content`) 
VALUES 
    ('1', 'Giày Nike Air Max 97 DM0027-001 Nam', 'giay-lifestyle-nam-nike-air-max-97-dm0027-001', 'Giày nam', '5279000', '0', '150', '2023-03-05 00:00:00', 'Giày Nike Air Max 97 DM0027-001 được thiết kế với chất liệu 28% Synthetic, 28% Textile và 44% Leather đáp ứng tốt và đảm bảo được các tiêu chí mềm, bền, mịn và đẹp');
INSERT INTO `shop`.`product` 
	(`user_id`, `title`, `slug`, `summary`, `price`, `discount`, `quantity`, `created_at`, `content`) 
VALUES 
    ('1', 'Ví Card Feasty', 'vi-card-feasty', 'Ví Card Feasty', '260.000', '20', '150', '2023-03-05 13:20:00', 'Một chiếc ví card cánh gập cơ bản, tối giản nhất, mọi chi tiết thêm vào là sự thừa thãi không cần thiết.');
UPDATE `shop`.`product` SET `updated_at` = '2023-03-05 13:30:00' WHERE (`id` = '6');

UPDATE `shop`.`product` SET `photos` = 'https://cdn.shopify.com/s/files/1/1236/1344/products/vi-card-feasty-xanh-reu-wallet-leonardo-24673225474223_600x.png?v=1622167999' WHERE (`id` = '6');
UPDATE `shop`.`product` SET `photos` = 'https://cf.shopee.vn/file/b04924adbab55d4b305d8b15a396a4ef' WHERE (`id` = '1');
UPDATE `shop`.`product` SET `photos` = 'https://cf.shopee.vn/file/fdff609b773f7681a5230b4d11dd7b28' WHERE (`id` = '2');
UPDATE `shop`.`product` SET `photos` = 'https://phuocthinhcorp.com/wp-content/uploads/2021/12/mu-luoi-trai-nu-800x800.jpg' WHERE (`id` = '3');
UPDATE `shop`.`product` SET `photos` = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Qu5dvSEKNQZWY6wD04-az7mufu4UdCqOLA&usqp=CAU' WHERE (`id` = '4');
UPDATE `shop`.`product` SET `photos` = 'https://sneakerdaily.vn/wp-content/uploads/2022/10/giay-nike-air-max-97-panda-dm0027-001.png.webp' WHERE (`id` = '5');
