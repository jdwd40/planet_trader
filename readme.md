Sorstar Backend Overview
Project Description
The Sorstar backend is a RESTful API service that powers the Sorstar Economic & Political Strategy Game. It manages core game data, player actions, and dynamic galaxy simulations.

Tech Stack
Backend Framework: Node.js (Express)

Database: Supabase (PostgreSQL)

Authentication: JWT (JSON Web Tokens)

Architecture: MVC (Model-View-Controller)

Key Endpoints
Planets
GET /api/planets: Retrieve all planets with attributes.

GET /api/planets/:id: Get details of a specific planet.

PUT /api/planets/:id: Update a planet’s data.

Trade Routes
GET /api/trade-routes: List all trade routes.

POST /api/trade-routes: Create a new trade route.

Resources
GET /api/resources: Get all resource types.

POST /api/resources/allocate: Allocate resources to factories or trade.

Military
GET /api/military/:planetId: Retrieve military stats of a planet.

POST /api/military/deploy: Deploy troops or fleets.

POST /api/military/resolve: Resolve battle outcomes.

Factions & Politics
GET /api/factions: Get all factions data.

POST /api/politics/influence: Influence planetary politics.

Data Structure
Each Planet object includes:

name: Planet name.

type: Planet category (e.g., Industrial, Trade Hub).

resources: Available resource types.

factions: Active factions on the planet.

population: Total population.

militaryStrength: Number of troops/fleet.

factories: List of factory types on the planet.

System Behavior
The backend supports:

Real-time updates via Supabase subscriptions.

Economic simulation (resource production, trade).

Political influence system.

Basic combat resolution (troop/fleet reduction).

Dynamic AI activities and market adjustments.