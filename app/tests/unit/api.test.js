const request = require('supertest');
const app = require('../../src/index');

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return application info', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body).toHaveProperty('message', '8am Infrastructure Web Application');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('GET /api/status', () => {
    it('should return service status', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(response.body).toHaveProperty('service', 'webapp');
      expect(response.body).toHaveProperty('status', 'operational');
      expect(response.body).toHaveProperty('dependencies');
      expect(response.body).toHaveProperty('features');
    });
  });

  describe('GET /api/version', () => {
    it('should return version info', async () => {
      const response = await request(app)
        .get('/api/version')
        .expect(200);

      expect(response.body).toHaveProperty('name', '8am-webapp');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('build');
      expect(response.body).toHaveProperty('commit');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/v1/users', () => {
    it('should return empty users list', async () => {
      const response = await request(app)
        .get('/api/v1/users')
        .expect(200);

      expect(response.body).toHaveProperty('users');
      expect(response.body).toHaveProperty('total', 0);
      expect(response.body).toHaveProperty('page', 1);
      expect(response.body).toHaveProperty('limit', 10);
      expect(Array.isArray(response.body.users)).toBe(true);
    });
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user with valid data', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      const response = await request(app)
        .post('/api/v1/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', userData.name);
      expect(response.body).toHaveProperty('email', userData.email);
      expect(response.body).toHaveProperty('createdAt');
    });

    it('should return 400 for missing name', async () => {
      const userData = {
        email: 'test@example.com',
      };

      const response = await request(app)
        .post('/api/v1/users')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad Request');
      expect(response.body).toHaveProperty('message', 'Name and email are required');
    });

    it('should return 400 for missing email', async () => {
      const userData = {
        name: 'Test User',
      };

      const response = await request(app)
        .post('/api/v1/users')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Bad Request');
      expect(response.body).toHaveProperty('message', 'Name and email are required');
    });
  });
});
