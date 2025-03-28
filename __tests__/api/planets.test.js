const { makeRequest, createTestPlanet, truncateTables } = require('../utils/test-helpers');
const { v4: uuidv4 } = require('uuid');
const { Planet } = require('../../models');

describe('Planets API', () => {
  beforeEach(async () => {
    await truncateTables(['Planet']);
  });
  
  describe('GET /api/planets', () => {
    it('should return all planets', async () => {
      // Arrange
      await createTestPlanet({ name: 'Test Planet 1' });
      await createTestPlanet({ name: 'Test Planet 2' });
      
      // Act
      const response = await makeRequest({
        method: 'get',
        endpoint: '/api/planets'
      });
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[1]).toHaveProperty('name');
    });
    
    it('should filter planets by type', async () => {
      // Arrange
      await createTestPlanet({ name: 'Industrial Planet', type: 'Industrial' });
      await createTestPlanet({ name: 'Agricultural Planet', type: 'Agricultural' });
      
      // Act
      const response = await makeRequest({
        method: 'get',
        endpoint: '/api/planets',
        query: { type: 'Industrial' }
      });
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('Industrial Planet');
    });
    
    it('should sort planets by name in descending order', async () => {
      // Arrange
      await createTestPlanet({ name: 'Zephyr' });
      await createTestPlanet({ name: 'Argon' });
      await createTestPlanet({ name: 'Boreas' });
      
      // Act
      const response = await makeRequest({
        method: 'get',
        endpoint: '/api/planets',
        query: { sortBy: 'name', order: 'DESC' }
      });
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(3); 
      expect(response.body[0].name).toBe('Zephyr'); 
      expect(response.body[1].name).toBe('Boreas');
      expect(response.body[2].name).toBe('Argon');
    });

    it('should return 500 if there is a server error', async () => {
      // Arrange: Mock Planet.findAll to throw an error
      const findAllMock = jest.spyOn(Planet, 'findAll').mockImplementation(async () => {
        throw new Error('Simulated database failure');
      });

      // Act: Make the request
      const response = await makeRequest({ method: 'get', endpoint: '/api/planets' });

      // Assert: Check for 500 status and generic error message
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'An unexpected error occurred.' });

      // Clean up the mock
      findAllMock.mockRestore();
    });
  });
  
  describe('GET /api/planets/:id', () => {
    it('should return a planet by id', async () => {
      // Arrange
      const planet = await createTestPlanet({ name: 'Single Planet' });
      
      // Act
      const response = await makeRequest({
        method: 'get',
        endpoint: `/api/planets/${planet.id}`
      });
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', planet.id);
      expect(response.body).toHaveProperty('name', 'Single Planet');
    });
    
    it('should return 404 if planet is not found', async () => {
      // Arrange
      const nonExistentId = uuidv4();
      
      // Act
      const response = await makeRequest({
        method: 'get',
        endpoint: `/api/planets/${nonExistentId}`
      });
      
      // Assert
      expect(response.status).toBe(404);
    });
  });
  
  describe('POST /api/planets', () => {
    it('should create a new planet', async () => {
      // Arrange
      const newPlanetData = {
        name: 'New Planet',
        type: 'Technological',
        resources: ['Crystals', 'Rare Minerals'],
        factions: ['Tech Guilds'],
        population: 3000000,
        militaryStrength: 4500,
        factories: ['Research Center', 'Shipyard']
      };
      
      // Act
      const response = await makeRequest({
        method: 'post',
        endpoint: '/api/planets',
        body: newPlanetData
      });
      
      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', 'New Planet');
      
      // Verify it was saved to the database
      const getResponse = await makeRequest({
        method: 'get',
        endpoint: `/api/planets/${response.body.id}`
      });
      
      expect(getResponse.status).toBe(200);
      expect(getResponse.body.name).toBe('New Planet');
    });
    
    it('should return 400 if required fields are missing', async () => {
      // Arrange
      const invalidPlanetData = {
        // Missing name, which is required
        type: 'Technological',
        resources: ['Crystals'],
        population: 1000000
      };
      
      // Act
      const response = await makeRequest({
        method: 'post',
        endpoint: '/api/planets',
        body: invalidPlanetData
      });
      
      // Assert
      expect(response.status).toBe(400);
    });
  });
  
  describe('PUT /api/planets/:id', () => {
    let testPlanet;

    beforeEach(async () => {
      testPlanet = await createTestPlanet({ name: 'Updatable', population: 500 });
    });

    it('should update an existing planet', async () => {
      const updates = { population: 600 }; 
      const response = await makeRequest({
        method: 'put',
        endpoint: `/api/planets/${testPlanet.id}`,
        body: updates 
      });
      expect(response.status).toBe(200);
      expect(response.body.population).toBe(600);
    });

    it('should return 404 if planet to update is not found', async () => {
      const nonExistentId = uuidv4(); 
      const response = await makeRequest({
        method: 'put',
        endpoint: `/api/planets/${nonExistentId}`,
        body: { name: 'Ghost' } 
      });
      expect(response.status).toBe(404);
    });

    it('should return 400 if planet ID format is invalid', async () => {
      const invalidId = 'not-a-valid-uuid';
      const response = await makeRequest({
        method: 'put',
        endpoint: `/api/planets/${invalidId}`,
        body: { name: 'Invalid Update' } 
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Invalid planet ID format');
    });
  });

  describe('DELETE /api/planets/:id', () => {
    it('should delete a planet', async () => {
      // Arrange
      const planet = await createTestPlanet({ name: 'Planet to Delete' });
      
      // Act
      const deleteResponse = await makeRequest({
        method: 'delete',
        endpoint: `/api/planets/${planet.id}`
      });
      
      // Assert
      expect(deleteResponse.status).toBe(204);
      
      // Verify it was deleted
      const getResponse = await makeRequest({
        method: 'get',
        endpoint: `/api/planets/${planet.id}`
      });
      
      expect(getResponse.status).toBe(404);
    });
    
    it('should return 404 if planet to delete is not found', async () => {
      // Arrange
      const nonExistentId = uuidv4();
      
      // Act
      const response = await makeRequest({
        method: 'delete',
        endpoint: `/api/planets/${nonExistentId}`
      });
      
      // Assert
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/planets/all', () => {
    it('should delete all planets', async () => {
      // Arrange: Create a couple of planets
      await createTestPlanet({ name: 'PlanetToDelete1' });
      await createTestPlanet({ name: 'PlanetToDelete2' });

      // Act: Delete all planets
      const deleteResponse = await makeRequest({
        method: 'delete',
        endpoint: '/api/planets/all'
      });

      // Assert: Check delete response
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toEqual({ message: 'All planets deleted' });

      // Assert: Verify no planets are left
      const getResponse = await makeRequest({ method: 'get', endpoint: '/api/planets' });
      expect(getResponse.status).toBe(200);
      expect(getResponse.body).toEqual([]);
    });

    it('should return 500 if there is a server error during delete all', async () => {
      // Arrange: Mock Planet.destroy to throw an error
      const destroyMock = jest.spyOn(Planet, 'destroy').mockImplementation(async () => {
        throw new Error('Simulated bulk delete failure');
      });

      // Act: Attempt to delete all planets
      const response = await makeRequest({ method: 'delete', endpoint: '/api/planets/all' });

      // Assert: Check for 500 status and generic error message
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'An unexpected error occurred.' });

      // Clean up the mock
      destroyMock.mockRestore();
    });
  });
});
