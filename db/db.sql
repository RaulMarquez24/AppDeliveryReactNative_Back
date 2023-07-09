USE udemy_delivery;

CREATE TABLE users(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(180) NOT NULL UNIQUE,
    name VARCHAR(90) NOT NULL,
    lastname VARCHAR(90) NOT NULL,
    phone VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    password VARCHAR(90) NOT NULL,
    create_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(255) NOT NULL,
    create_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles(
	name,
    route,
    create_at,
    update_at
)	
VALUES(
	'ADMIN',
    '/restaurant/orders/list',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO roles(
	name,
    route,
    create_at,
    update_at
)	
VALUES(
	'REPARTIDOR',
    '/delivery/orders/list',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

INSERT INTO roles(
	name,
    route,
    create_at,
    update_at
)	
VALUES(
	'CLIENTE',
    '/client/products/list',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);

CREATE TABLE user_has_roles(
	id_user BIGINT NOT NULL,
    id_rol BIGINT NOT NULL,
    create_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_rol)
);