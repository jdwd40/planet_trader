
# Sorstar Database Schema

This document outlines the core database schema for the Sorstar backend application.

---

## Tables

### 1. Planets

| Column            | Type        | Description                                  |
|-------------------|------------|----------------------------------------------|
| id                | UUID       | Primary key, unique identifier for each planet |
| name              | VARCHAR    | Name of the planet                          |
| type              | VARCHAR    | Planet category (Industrial, Agricultural, etc.) |
| resources         | JSONB      | List of available resources                 |
| factions          | JSONB      | List of active factions on the planet        |
| population        | INTEGER    | Total population of the planet               |
| military_strength | INTEGER    | Total troop/fleet strength                  |
| factories         | JSONB      | List of factories present on the planet      |

---

### 2. Trade Routes

| Column         | Type    | Description                                      |
|---------------|--------|--------------------------------------------------|
| id            | UUID   | Primary key, unique identifier for each route    |
| origin_id     | UUID   | Foreign key - references Planets(id)             |
| destination_id| UUID   | Foreign key - references Planets(id)             |
| resources     | JSONB  | Resources being traded on this route             |
| status        | VARCHAR| Current status of the trade route (active, blocked, etc.) |

---

### 3. Resources

| Column      | Type    | Description                                |
|------------|--------|--------------------------------------------|
| id         | UUID   | Primary key, unique identifier for each resource |
| name       | VARCHAR| Name of the resource                        |
| category   | VARCHAR| Resource category (Minerals, Food, Energy, etc.) |

---

### 4. Military

| Column      | Type    | Description                                  |
|------------|--------|----------------------------------------------|
| id         | UUID   | Primary key, unique identifier for each military unit |
| planet_id  | UUID   | Foreign key - references Planets(id)         |
| troops     | INTEGER| Number of troops stationed                   |
| fleets     | INTEGER| Number of fleets stationed                   |

---

### 5. Factions

| Column      | Type    | Description                          |
|------------|--------|--------------------------------------|
| id         | UUID   | Primary key, unique identifier for each faction |
| name       | VARCHAR| Name of the faction                  |
| ideology   | VARCHAR| Ideological leaning (Tech, Eco, Industrial, etc.) |

---

### 6. Politics

| Column      | Type    | Description                          |
|------------|--------|--------------------------------------|
| id         | UUID   | Primary key, unique identifier for each political event |
| planet_id  | UUID   | Foreign key - references Planets(id) |
| faction_id | UUID   | Foreign key - references Factions(id) |
| influence  | INTEGER| Influence percentage or score        |

---

## Notes
- JSONB fields store lists and nested data for flexibility.
- UUIDs used for all primary keys.
- Foreign key relations ensure data integrity.
