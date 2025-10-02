// Jest setup file
// This file runs before all tests

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error'; // Reduce log noise during tests
process.env.PORT = '0'; // Use random available port for tests

// Global test timeout
jest.setTimeout(10000);
