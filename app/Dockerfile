# Multi-stage Dockerfile for 8am Web Application
FROM node:18-alpine AS builder

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    && rm -rf /var/cache/apk/*

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Create logs directory
RUN mkdir -p logs

# Build application (if needed)
RUN npm run build || echo "No build step required"

# Production stage
FROM node:18-alpine AS production

# Install runtime dependencies
RUN apk add --no-cache \
    dumb-init \
    curl \
    && rm -rf /var/cache/apk/*

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S webapp -u 1001 -G nodejs

WORKDIR /app

# Copy built application and dependencies
COPY --from=builder --chown=webapp:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=webapp:nodejs /app/src ./src
COPY --from=builder --chown=webapp:nodejs /app/package*.json ./
COPY --from=builder --chown=webapp:nodejs /app/logs ./logs

# Create necessary directories
RUN mkdir -p logs && chown -R webapp:nodejs logs

# Switch to non-root user
USER webapp

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["npm", "start"]