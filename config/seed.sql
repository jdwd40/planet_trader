-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS transactions, inventory, market_prices, ships, players, resources, planets CASCADE;

-- Create tables
CREATE TABLE planets (
    planet_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    resource_type VARCHAR(100),
    resource_abundance INTEGER,
    location_x INTEGER,
    location_y INTEGER
);

CREATE TABLE resources (
    resource_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    base_price NUMERIC
);

CREATE TABLE players (
    player_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    credits NUMERIC
);

CREATE TABLE ships (
    ship_id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES players(player_id),
    current_planet_id INTEGER REFERENCES planets(planet_id),
    health INTEGER,
    cargo_capacity INTEGER,
    weapon_power INTEGER
);

CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    ship_id INTEGER REFERENCES ships(ship_id),
    resource_id INTEGER REFERENCES resources(resource_id),
    quantity INTEGER
);

CREATE TABLE market_prices (
    market_id SERIAL PRIMARY KEY,
    planet_id INTEGER REFERENCES planets(planet_id),
    resource_id INTEGER REFERENCES resources(resource_id),
    current_price NUMERIC
);

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    buyer_id INTEGER REFERENCES players(player_id),
    seller_id INTEGER REFERENCES players(player_id),
    resource_id INTEGER REFERENCES resources(resource_id),
    quantity INTEGER,
    transaction_price NUMERIC,
    transaction_date TIMESTAMP
);

-- Insert initial data into tables
-- Planets
INSERT INTO planets (name, resource_type, resource_abundance, location_x, location_y) VALUES
('Terra', 'Oxygen', 100, 0, 0),
('Mars', 'Iron', 150, 20, 20),
('Jupiter', 'Hydrogen', 200, 50, 50);

-- Resources
INSERT INTO resources (name, base_price) VALUES
('Oxygen', 10),
('Iron', 15),
('Hydrogen', 20);

-- Players
INSERT INTO players (username, email, password_hash, credits) VALUES
('starlord', 'starlord@example.com', 'hashed_password_here', 1000);

-- More initial data can be added similarly for other tables

-- Commit changes (if not auto-committed by your SQL client)
COMMIT;
