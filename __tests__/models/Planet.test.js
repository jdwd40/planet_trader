const db = require('../../models');

describe('Planet Model', () => {
  // Get the Planet model from db object
  const { Planet } = db;
  
  beforeEach(async () => {
    // Clear the Planet table before each test
    await Planet.destroy({ truncate: { cascade: true }, force: true });
  });
  
  it('should create a planet with valid data', async () => {
    // Arrange
    const planetData = {
      name: 'Test Planet',
      type: 'Industrial',
      resources: JSON.stringify(['Metals', 'Gas']),
      factions: JSON.stringify(['Test Faction']),
      population: 1000000,
      military_strength: 5000,
      factories: JSON.stringify(['Weapons Factory'])
    };
    
    // Act
    const planet = await Planet.create(planetData);
    
    // Assert
    expect(planet).toBeDefined();
    expect(planet.id).toBeDefined();
    expect(planet.name).toBe('Test Planet');
    expect(JSON.parse(planet.resources)).toContain('Metals');
    expect(planet.population).toBe(1000000);
  });
  
  it('should not create a planet without a name', async () => {
    // Arrange
    const invalidPlanetData = {
      type: 'Industrial',
      resources: JSON.stringify(['Metals']),
      factions: JSON.stringify(['Test Faction']),
      population: 1000000,
      military_strength: 5000,
      factories: JSON.stringify(['Weapons Factory'])
    };
    
    // Act & Assert
    await expect(Planet.create(invalidPlanetData)).rejects.toThrow();
  });
  
  it('should retrieve a planet by id', async () => {
    // Arrange
    const planetData = {
      name: 'Test Planet 2',
      type: 'Agricultural',
      resources: JSON.stringify(['Food', 'Water']),
      factions: JSON.stringify(['Eco Movements']),
      population: 2000000,
      military_strength: 3000,
      factories: JSON.stringify(['Eco Farm'])
    };

    const createdPlanet = await Planet.create(planetData);
    
    // Act
    const foundPlanet = await Planet.findByPk(createdPlanet.id);
    
    // Assert
    expect(foundPlanet).toBeDefined();
    expect(foundPlanet.name).toBe('Test Planet 2');
    expect(JSON.parse(foundPlanet.resources)).toContain('Food');
  });

  it('should retrieve all planets', async () => {
    // Arrange
    const planetData1 = {
      name: 'Test Planet 1',
      type: 'Mining',
      resources: JSON.stringify(['Ore']),
      factions: JSON.stringify(['Corp']),
      population: 50000,
      military_strength: 1000,
      factories: JSON.stringify(['Refinery'])
    };
    const planetData2 = {
      name: 'Test Planet 2',
      type: 'Garden',
      resources: JSON.stringify(['Food', 'Water']),
      factions: JSON.stringify(['Agri']),
      population: 150000,
      military_strength: 500,
      factories: JSON.stringify(['Farm'])
    };
    await Planet.create(planetData1);
    await Planet.create(planetData2);
    
    // Act
    const planets = await Planet.findAll();
    
    // Assert
    expect(planets).toHaveLength(2);
    expect(planets[0].name).toBe('Test Planet 1');
    expect(planets[1].name).toBe('Test Planet 2');
  });
  
  it('should update a planet', async () => {
    // Arrange
    const planetData = {
      name: 'Original Name',
      type: 'Mining Colony',
      resources: JSON.stringify(['Metals']),
      factions: JSON.stringify(['Miner\'s Alliance']),
      population: 1500000,
      military_strength: 4000,
      factories: JSON.stringify(['Mining Facility'])
    };
    
    const planet = await Planet.create(planetData);
    
    // Act
    await planet.update({ name: 'Updated Name', population: 2000000 });
    
    // Assert
    expect(planet.name).toBe('Updated Name');
    expect(planet.population).toBe(2000000);
    // Check that other fields weren't modified
    expect(planet.type).toBe('Mining Colony');
  });
  
  it('should delete a planet', async () => {
    // Arrange
    const planetData = {
      name: 'Planet to Delete',
      type: 'Research',
      resources: JSON.stringify(['Dark Matter']),
      factions: JSON.stringify(['Tech Guilds']),
      population: 1000000,
      military_strength: 2000,
      factories: JSON.stringify(['Research Facility'])
    };
    
    const planet = await Planet.create(planetData);
    
    // Act
    await planet.destroy();
    
    // Assert
    const foundPlanet = await Planet.findByPk(planet.id);
    expect(foundPlanet).toBeNull();
  });
});
