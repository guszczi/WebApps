CREATE TABLE `aji`.`categories`( 
    `category_id` INT NOT NULL AUTO_INCREMENT, 
    `name` TEXT NOT NULL, 

    PRIMARY KEY (`category_id`)
)

CREATE TABLE `aji`.`states`( 
    `state_id` INT NOT NULL AUTO_INCREMENT, 
    `name` TEXT NOT NULL, 

    PRIMARY KEY (`state_id`)
)

CREATE TABLE `aji`.`products`( 
    `product_id` INT NOT NULL AUTO_INCREMENT, 
    `name` TEXT NOT NULL, 
    `description` TEXT NOT NULL, 
    `price` DECIMAL NOT NULL, 
    `weight` DECIMAL NOT NULL, 
    `category` INT NOT NULL,
    
    PRIMARY KEY (`product_id`),
    FOREIGN KEY (`category`) REFERENCES `categories`(`category_id`)
)

CREATE TABLE `aji`.`orders`( 
    `order_id` INT NOT NULL AUTO_INCREMENT, 
    `date` DATE, 
    `state_id` INT NOT NULL, 
    `username` TEXT NOT NULL,
    `email` TEXT NOT NULL,
    `phone` TEXT NOT NULL,
    
    PRIMARY KEY (`order_id`),
    FOREIGN KEY (`state_id`) REFERENCES `states`(`state_id`)
)

CREATE TABLE `aji`.`orders_lists`( 
    `order_id` INT NOT NULL, 
    `product_id` INT NOT NULL, 
    `quantity` INT NOT NULL, 
    
    PRIMARY KEY (`order_id`, `product_id`),
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`),
    FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`)
)

-- Static data

INSERT INTO `aji`.`states` (`state_id`, `name`) VALUES 
(1, 'Not accepted'), 
(2, 'Accepted'), 
(3, 'Canceled'), 
(4, 'Completed');

INSERT INTO `aji`.`categories` (`category_id`, `name`) VALUES 
(1, 'Graphic cards'), 
(2, 'Motherboards'), 
(3, 'CPUs'), 
(4, 'RAM'), 
(5, 'Power supplies'), 
(6, 'Hard drives'), 
(7, 'Monitors'), 
(8, 'Keyboards'), 
(9, 'Mouse'), 
(10, 'Cases'), 
(10, 'CPU Coolers');

INSERT INTO `aji`.`products` (`name`, `description`, `price`, `weight`, `category_id`) VALUES
('Gigabyte GeForce RTX 3060 Ti', 'Imagine if you could afford it', 4399.00, 853.44, 1),
('Gigabyte GeForce RTX 3070 Ti', 'Imagine if you could afford it', 7399.00, 853.44, 1),
('Gigabyte GeForce RTX 3080 Ti', 'Imagine if you could afford it', 11399.00, 853.44, 1),
('Gigabyte GeForce RTX 3090 Ti', 'Imagine if you could afford it', 20399.00, 853.44, 1),
('Gigabyte GeForce RTX 3050 Ti', 'Imagine if you could afford it', 3399.00, 853.44, 1),
('Gigabyte B560M', 'Nice looking Motherboard', 439.00, 532.45, 2),
('Gigabyte B660M', 'Nice looking Motherboard', 639.00, 532.45, 2),
('Gigabyte B760M', 'Nice looking Motherboard', 839.00, 532.45, 2),
('Gigabyte B860M', 'Nice looking Motherboard', 1039.00, 532.45, 2),
('Gigabyte B960M', 'Nice looking Motherboard', 1239.00, 532.45, 2),
('Intel Core i5-10400F', 'Very good CPU', 699.00, 102.55, 3),
('Intel Core i7-10400F', 'Very good CPU', 1299.00, 102.55, 3),
('Intel Core i9-10400F', 'Very good CPU', 2099.00, 102.55, 3),
('Intel Core i3-10400F', 'Very good CPU', 599.00, 102.55, 3),
('Intel Core i5-10600F', 'Very good CPU', 899.00, 102.55, 3),
('G.SKILL 8GB Aegis', 'Fast RAM', 309.00, 258.33, 4),
('G.SKILL 16GB Aegis', 'Fast RAM', 609.00, 258.33, 4),
('G.SKILL 32GB Aegis', 'Fast RAM', 1209.00, 258.33, 4),
('G.SKILL 64GB Aegis', 'Fast RAM', 2009.00, 258.33, 4),
('G.SKILL 128GB Aegis', 'Fast RAM', 5009.00, 258.33, 4),
('SilentiumPC Vero L3 600W', 'Solid choice', 249.00, 845.22, 5),
('SilentiumPC Vero L4 700W', 'Solid choice', 349.00, 945.22, 5),
('SilentiumPC Vero L5 800W', 'Solid choice', 449.00, 1045.22, 5),
('SilentiumPC Vero L6 900W', 'Solid choice', 549.00, 1145.22, 5),
('SilentiumPC Vero L7 1000W', 'Solid choice', 649.00, 1245.22, 5),
('Samsung EVO 970 PRO', 'Super fast drive', 699.99, 71.25, 6),
('Samsung 500GB 980', 'Very fast', 289.00, 59.21, 6),
('Crucial 500GB MX500', 'Not NVME but fast', 265.00, 91.22, 6),
('WD 1TB SN550', 'Fast and cheap', 429.00, 55.99, 6),
('GOODRAM 256GB CX400', 'idk', 129.00, 85.93, 6),
('Acer SB241Y', 'Very good monitor', 549.00, 1192.99, 7),
('Acer SB242Y', 'Very good monitor', 649.00, 1292.99, 7),
('Acer SB243Y', 'Very good monitor', 749.00, 1392.99, 7),
('Acer SB244Y', 'Very good monitor', 849.00, 1492.99, 7),
('Acer SB245Y', 'Very good monitor', 949.00, 1592.99, 7),
('QPad MK-50', 'Very good keyboard', 254.99, 598.55, 8),
('Dell KB216-B', 'Basic keyboard', 43.99, 411, 8),
('Logitech MX Keys', 'No leds and expensive', 399.99, 511.92, 8),
('Steelseries Apex 3', 'Shiny and heavy', 308.99, 759.22, 8),
('Redragon Draconic', '60% with LED', 259.00, 591.65, 8),
('Razer Deathadder Chroma', 'For gamers by gamers', 55.3, 122.5, 9),
('Zowie FK1', 'Good mouse', 299.99, 74, 9),
('Logitech M185', 'Wireless', 59.99, 81.22, 9),
('Razer Basilisk V2', 'Heavy and big', 349.00, 132.55, 9),
('Razer Deathadder Essential', 'Oldschool but still good', 99.00, 81.22, 9),
('Redragon Storm Elite', 'Shiny', 99.99, 81.95, 9),
('SilentiumPC Signum SG1', 'Big and nice looking', 239.00, 891.22, 10),
('SilentiumPC Signum SG2 PRO', 'Big and nice looking', 339.00, 881.22, 10),
('SilentiumPC Signum SG3', 'Big and nice looking', 249.00, 871.22, 10),
('SilentiumPC Signum SG4', 'Big and nice looking', 259.00, 861.22, 10),
('SilentiumPC Signum SG5', 'Big and nice looking', 299.00, 851.22, 10),
('SilentiumPC Fera 5', 'Very good and cheap', 125.00, 351.85, 11),
('SilentiumPC Fera 6', 'Very good and cheap', 155.00, 311.85, 11),
('SilentiumPC Fera 7', 'Very good and cheap', 165.00, 321.85, 11),
('SilentiumPC Fera 8', 'Very good and cheap', 175.00, 361.85, 11),
('SilentiumPC Fera 9', 'Very good and cheap', 195.00, 391.85, 11);



