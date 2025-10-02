const request = require('supertest');
const app = require('../../src/index');

describe('Smoke Tests', () => {
  describe('Basic Functionality', () => {
    it('should respond to health check', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('healthy');
    });

    it('should respond to main endpoint', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body.message).toContain('8am Infrastructure');
    });

    it('should respond to API status', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(response.body.service).toBe('webapp');
    });
  });

  describe('Performance', () => {
    it('should respond to health check within reasonable time', async () => {
      const start = Date.now();
      
      await request(app)
        .get('/health')
        .expect(200);

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(1000); // Should respond within 1 second
    });
  });
});
