# 8am Web Application

Internet-facing web application for the 8am infrastructure design.

## Features

- Express.js web server with security middleware
- Prometheus metrics collection
- Structured logging with Winston
- Health check endpoints for Kubernetes
- Rate limiting and CORS protection
- Graceful shutdown handling
- Comprehensive error handling

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Local Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

### Docker

```bash
# Build image
docker build -t 8am-webapp .

# Run container
docker run -p 3000:3000 8am-webapp

# Run with environment file
docker run -p 3000:3000 --env-file .env 8am-webapp
```

## API Endpoints

### Health & Monitoring
- `GET /health` - Application health status
- `GET /health/liveness` - Kubernetes liveness probe
- `GET /health/readiness` - Kubernetes readiness probe
- `GET /metrics` - Prometheus metrics

### Application
- `GET /` - Application information
- `GET /api/status` - Service status
- `GET /api/version` - Version information

### API v1
- `GET /api/v1/users` - List users
- `POST /api/v1/users` - Create user

## Environment Variables

Copy `env.example` to `.env` and configure:

### Required
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)

### Database
- `DATABASE_URL` - PostgreSQL connection string
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`

### Cache
- `REDIS_URL` - Redis connection string
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`

### Security
- `JWT_SECRET` - JWT signing secret
- `SESSION_SECRET` - Session secret
- `API_KEY` - API authentication key

### Monitoring
- `LOG_LEVEL` - Logging level (error/warn/info/debug)
- `PROMETHEUS_PORT` - Metrics port

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run all tests
- `npm run test:unit` - Run unit tests
- `npm run test:integration` - Run integration tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Architecture

### Security
- Helmet.js for security headers
- CORS protection
- Rate limiting
- Input validation
- Secure headers

### Monitoring
- Prometheus metrics
- Structured logging
- Health checks
- Request tracking

### Performance
- Compression middleware
- Connection pooling
- Efficient routing
- Memory optimization

## Deployment

### Kubernetes
The application is designed to run in Kubernetes with:
- Health check endpoints
- Prometheus metrics
- Graceful shutdown
- Non-root user
- Resource limits

### Docker
Multi-stage build with:
- Alpine Linux base
- Non-root user
- Health checks
- Signal handling

## Development

### Code Style
- ESLint with Airbnb config
- Prettier formatting
- Consistent naming
- Comprehensive comments

### Testing
- Jest for unit tests
- Supertest for integration tests
- K6 for performance tests
- Coverage reporting

### Logging
- Winston for structured logging
- Multiple transports (console, file)
- Request/response logging
- Error tracking

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   lsof -i :3000
   # Kill the process or use different port
   ```

2. **Database connection failed**
   - Check DATABASE_URL format
   - Verify database is running
   - Check network connectivity

3. **Redis connection failed**
   - Check REDIS_URL format
   - Verify Redis is running
   - Check authentication

### Health Checks

```bash
# Check application health
curl http://localhost:3000/health

# Check metrics
curl http://localhost:3000/metrics

# Check readiness
curl http://localhost:3000/health/readiness
```

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Run linting before committing
5. Ensure all tests pass

## License

MIT License - see LICENSE file for details.