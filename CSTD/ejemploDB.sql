create database tienda_gatos;
use tienda_gatos;

-- Crear la tabla de comidas
CREATE TABLE comidas (
    id_comida INT PRIMARY KEY AUTO_INCREMENT,
    nombre_plato VARCHAR(100) NOT NULL,
    categoria VARCHAR(50), -- Ejemplo: 'Entrada', 'Plato Fuerte', 'Postre'
    precio DECIMAL(10, 2) NOT NULL,
    descripcion TEXT
);

-- Insertar datos de ejemplo
INSERT INTO comidas (nombre_plato, categoria, precio, descripcion) VALUES
('Tacos al Pastor', 'Plato Fuerte', 150.00, 'Tacos de carne de cerdo marinada'),
('Ensalada César', 'Entrada', 90.50, 'Lechuga, crutones y aderezo'),
('Flan Napolitano', 'Postre', 60.00, 'Flan casero con caramelo'),
('Coca-Cola', 'Bebida', 35.00, 'Refresco de lata 355ml');
