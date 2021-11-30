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
(10, 'CPU Coolers'), 

INSERT INTO `aji`.`products` (`name`, `description`, `price`, `weight`, `category_id`) VALUES
('Razer Deathadder Chroma', 'For gamers by gamers', 55.3, 122.5, 9),
('Zowie FK1', 'Good mouse', 299.99, 74, 9),
('QPad MK-50', 'Very good keyboard', 254.99, 598.55, 8),
('Samsung EVO 970 PRO', 'Super fast drive', 699.99, 71.25, 6),