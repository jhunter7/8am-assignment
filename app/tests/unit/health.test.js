const request = require('supertest');
const app = require('../../src/index');

describe('Health Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('memory');
      expect(response.body).toHaveProperty('pid');
    });
  });

  describe('GET /health/liveness', () => {
    it('should return liveness status', async () => {
      const response = await request(app)
        .get('/health/liveness')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'alive');
    });
  });

  describe('GET /health/readiness', () => {
    it('should return readiness status', async () => {
      const response = await request(app)
        .get('/health/readiness')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ready');
      expect(response.body).toHaveProperty('checks');
      expect(response.body.checks).toHaveProperty('database', 'connected');
      expect(response.body.checks).toHaveProperty('cache', 'connected');
      expect(response.body.checks).toHaveProperty('messaging', 'connected');
    });
  });
});
