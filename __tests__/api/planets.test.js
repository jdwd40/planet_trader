const { makeRequest, createTestPlanet, truncateTables } = require('../utils/test-helpers');
const { v4: uuidv4 } = require('uuid');

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
    it('should update an existing planet', async () => {
      // Arrange
      const planet = await createTestPlanet({ name: 'Planet to Update' });
      const updateData = {
        name: 'Updated Planet Name',
        population: 5000000
      };
      
      // Act
      const response = await makeRequest({
        method: 'put',
        endpoint: `/api/planets/${planet.id}`,
        body: updateData
      });
      
      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'Updated Planet Name');
      expect(response.body).toHaveProperty('population', 5000000);
    });
    
    it('should return 404 if planet to update is not found', async () => {
      // Arrange
      const nonExistentId = uuidv4();
      const updateData = { name: 'Updated Name' };
      
      // Act
      const response = await makeRequest({
        method: 'put',
        endpoint: `/api/planets/${nonExistentId}`,
        body: updateData
      });
      
      // Assert
      expect(response.status).toBe(404);
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
});
