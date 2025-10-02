// Jest setup file
// This file runs before all tests

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'error'; // Reduce log noise during tests
process.env.PORT = '0'; // Use random available port for tests

// Global test timeout
jest.setTimeout(10000);

// Global teardown to close any open handles
afterAll(async () => {
  // Force close any open handles
  if (global.gc) {
    global.gc();
  }
  
  // Wait a bit for cleanup
  await new Promise(resolve => setTimeout(resolve, 100));
});
