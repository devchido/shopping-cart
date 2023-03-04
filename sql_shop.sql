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
