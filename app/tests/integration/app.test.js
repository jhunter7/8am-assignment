const request = require('supertest');
const app = require('../../src/index');

describe('Application Integration Tests', () => {
  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not found');
      expect(response.body).toHaveProperty('message', 'The requested resource was not found');
      expect(response.body).toHaveProperty('path', '/non-existent-route');
      expect(response.body).toHaveProperty('method', 'GET');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('API Versioning', () => {
    it('should add API version header for v1 routes', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .expect(200);

      expect(response.headers['x-api-version']).toBe('1.0.0');
    });
  });

  describe('Request Flow', () => {
    it('should handle complete request flow', async () => {
      // Test health check
      await request(app)
        .get('/health')
        .expect(200);

      // Test main endpoint
      await request(app)
        .get('/')
        .expect(200);

      // Test API status
      await request(app)
        .get('/api/status')
        .expect(200);

      // Test metrics
      await request(app)
        .get('/metrics')
        .expect(200);
    });
  });
});
