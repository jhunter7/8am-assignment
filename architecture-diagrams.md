# Architecture Diagrams

This document contains visual representations of the 8am infrastructure design using Mermaid diagrams.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Internet"
        Users[Users]
        DevOps[DevOps Team]
    end
    
    subgraph "DMZ Tier"
        WAF[Web Application Firewall]
        LB[Load Balancer]
    end
    
    subgraph "Application Tier"
        WebApp[Web Application<br/>Spring Boot + React]
        Admin[Admin Tool<br/>Spring Boot + Angular]
    end
    
    subgraph "Service Tier"
        BS1[Backend Service 1<br/>Node.js]
        BS2[Backend Service 2<br/>Node.js]
        MQ[Message Queue<br/>Apache Kafka]
    end
    
    subgraph "Data Tier"
        DB[(PostgreSQL<br/>Primary + Replicas)]
        Redis[(Redis<br/>Cache)]
        ES[(Elasticsearch<br/>Search & Logs)]
    end
    
    subgraph "Service Mesh"
        Linkerd[Linkerd<br/>mTLS + Traffic Management]
    end
    
    subgraph "Monitoring"
        Prometheus[Prometheus<br/>Metrics]
        Grafana[Grafana<br/>Dashboards]
        Jaeger[Jaeger<br/>Tracing]
    end
    
    Users --> WAF
    WAF --> LB
    LB --> WebApp
    
    DevOps --> Boundary[Boundary Gateway]
    Boundary --> Admin
    
    WebApp --> Linkerd
    Admin --> Linkerd
    BS1 --> Linkerd
    BS2 --> Linkerd
    
    Linkerd --> BS1
    Linkerd --> BS2
    BS1 --> MQ
    BS2 --> MQ
    MQ --> BS1
    MQ --> BS2
    
    BS1 --> DB
    BS1 --> Redis
    BS2 --> DB
    BS2 --> ES
    
    Prometheus --> WebApp
    Prometheus --> BS1
    Prometheus --> BS2
    Grafana --> Prometheus
    Jaeger --> WebApp
    Jaeger --> BS1
    Jaeger --> BS2
```

## Network Architecture

```mermaid
graph TB
    subgraph "Internet"
        Internet[Internet Traffic]
    end
    
    subgraph "DMZ Network"
        WAF[WAF]
        SSL[SSL Termination]
        DDoS[DDoS Protection]
    end
    
    subgraph "Application Network"
        LB[Load Balancer]
        WebApp[Web Application]
        Admin[Admin Tool]
    end
    
    subgraph "Service Network"
        BS1[Backend Service 1]
        BS2[Backend Service 2]
        MQ[Message Queue]
    end
    
    subgraph "Data Network"
        DB[(Database)]
        Cache[(Cache)]
        Search[(Search)]
    end
    
    subgraph "Management Network"
        Boundary[Boundary Gateway]
        Bastion[Bastion Host]
        Monitoring[Monitoring]
    end
    
    Internet --> WAF
    DevOps --> Boundary
    Boundary --> Workers
    Bastion --> Admin
    Bastion --> InternalAPI
    
    WAF --> SSL
    SSL --> LB
    
    LB --> WebApp
    LB --> Admin
    
    WebApp --> BS1
    WebApp --> BS2
    BS1 --> MQ
    BS2 --> MQ
    MQ --> BS1
    MQ --> BS2
    
    BS1 --> DB
    BS1 --> Cache
    BS2 --> DB
    BS2 --> Search
```

## Security Architecture

```mermaid
graph TB
    subgraph "External Security"
        Internet[Internet]
        WAF[Web Application Firewall]
        DDoS[DDoS Protection]
        SSL[SSL/TLS 1.3]
    end
    
    subgraph "Network Security"
        Firewall[Network Firewall]
        NetworkPolicies[K8s Network Policies]
        ServiceMesh[Service Mesh mTLS]
    end
    
    subgraph "Application Security"
        Auth[Authentication]
        Authz[Authorization]
        RBAC[Role-Based Access Control]
    end
    
    subgraph "Data Security"
        Encryption[Encryption at Rest]
        Vault[HashiCorp Vault]
        Secrets[Secret Management]
    end
    
    subgraph "Monitoring Security"
        Audit[Audit Logging]
        Monitoring[Security Monitoring]
    end
    
    Internet --> WAF
    WAF --> DDoS
    DDoS --> SSL
    SSL --> Firewall
    
    Firewall --> NetworkPolicies
    NetworkPolicies --> ServiceMesh
    
    ServiceMesh --> Auth
    Auth --> Authz
    Authz --> RBAC
    
    RBAC --> Encryption
    Encryption --> Vault
    Vault --> Secrets
    
    Secrets --> Audit
    Audit --> Monitoring
```

## CI/CD Pipeline Flow

```mermaid
graph LR
    subgraph "Source Control"
        Dev[Developer]
        Git[Git Repository]
        PR[Pull Request]
    end
    
    subgraph "CI Pipeline"
        Build[Build & Test]
        Security[Security Scan]
        Quality[Quality Gates]
    end
    
    subgraph "CD Pipeline"
        Staging[Deploy to Staging]
        Validation[Validation Tests]
        Production[Deploy to Production]
    end
    
    subgraph "Deployment Strategy"
        Canary[Canary Deployment]
        Rollout[Argo Rollouts]
        Monitor[Monitor & Validate]
    end
    
    Dev --> Git
    Git --> PR
    PR --> Build
    Build --> Security
    Security --> Quality
    Quality --> Staging
    Staging --> Validation
    Validation --> Production
    Production --> Canary
    Canary --> Rollout
    Rollout --> Monitor
```

## Data Flow Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Web[Web Browser]
        Mobile[Mobile App]
        API[API Client]
    end
    
    subgraph "Application Layer"
        WebApp[Web Application]
        Admin[Admin Tool]
        Services[Backend Services]
    end
    
    subgraph "Processing Layer"
        MQ[Message Queue]
        Workers[Background Workers]
        Events[Event Processing]
    end
    
    subgraph "Storage Layer"
        DB[(Primary Database)]
        Cache[(Redis Cache)]
        Search[(Elasticsearch)]
        Files[File Storage]
    end
    
    subgraph "External Services"
        Auth[Authentication Service]
        Payment[Payment Gateway]
        Email[Email Service]
    end
    
    Web --> WebApp
    Mobile --> WebApp
    API --> Services
    
    WebApp --> Services
    Admin --> Services
    Services --> MQ
    
    MQ --> Workers
    Workers --> Events
    Events --> Services
    
    Services --> DB
    Services --> Cache
    Services --> Search
    Services --> Files
    
    Services --> Auth
    Services --> Payment
    Services --> Email
```

## Monitoring and Observability

```mermaid
graph TB
    subgraph "Applications"
        App1[Web Application]
        App2[Backend Service 1]
        App3[Backend Service 2]
        App4[Admin Tool]
    end
    
    subgraph "Infrastructure"
        K8s[Kubernetes Cluster]
        Nodes[Worker Nodes]
        Pods[Application Pods]
    end
    
    subgraph "Data Collection"
        Prometheus[Prometheus<br/>Metrics]
        Fluentd[Fluentd<br/>Logs]
        Jaeger[Jaeger<br/>Traces]
    end
    
    subgraph "Storage"
        TSDB[Time Series DB]
        Elasticsearch[Elasticsearch<br/>Logs]
        TraceDB[Trace Storage]
    end
    
    subgraph "Visualization"
        Grafana[Grafana<br/>Dashboards]
        Kibana[Kibana<br/>Log Analysis]
        JaegerUI[Jaeger UI<br/>Trace Analysis]
    end
    
    subgraph "Alerting"
        AlertManager[Alert Manager]
        Slack[Slack Notifications]
        Email[Email Alerts]
    end
    
    App1 --> Prometheus
    App2 --> Prometheus
    App3 --> Prometheus
    App4 --> Prometheus
    
    App1 --> Fluentd
    App2 --> Fluentd
    App3 --> Fluentd
    App4 --> Fluentd
    
    App1 --> Jaeger
    App2 --> Jaeger
    App3 --> Jaeger
    App4 --> Jaeger
    
    K8s --> Prometheus
    Nodes --> Prometheus
    Pods --> Prometheus
    
    Prometheus --> TSDB
    Fluentd --> Elasticsearch
    Jaeger --> TraceDB
    
    TSDB --> Grafana
    Elasticsearch --> Kibana
    TraceDB --> JaegerUI
    
    Prometheus --> AlertManager
    AlertManager --> Slack
    AlertManager --> Email
```

## Service Mesh Architecture

```mermaid
graph TB
    subgraph "Service Mesh Layer"
        Linkerd[Linkerd Control Plane]
        Proxy1[Linkerd Proxy]
        Proxy2[Linkerd Proxy]
        Proxy3[Linkerd Proxy]
    end
    
    subgraph "Application Services"
        WebApp[Web Application]
        Service1[Backend Service 1]
        Service2[Backend Service 2]
    end
    
    subgraph "Traffic Management"
        Traffic[Traffic Splitting]
        LoadBalancing[Load Balancing]
        Retry[Retry Logic]
        CircuitBreaker[Circuit Breaker]
    end
    
    subgraph "Security"
        mTLS[mTLS Encryption]
        Identity[Service Identity]
        Policy[Traffic Policy]
    end
    
    subgraph "Observability"
        Metrics[Metrics Collection]
        Tracing[Distributed Tracing]
        Logging[Access Logs]
    end
    
    Linkerd --> Proxy1
    Linkerd --> Proxy2
    Linkerd --> Proxy3
    
    Proxy1 --> WebApp
    Proxy2 --> Service1
    Proxy3 --> Service2
    
    WebApp --> Traffic
    Service1 --> LoadBalancing
    Service2 --> Retry
    
    Traffic --> CircuitBreaker
    LoadBalancing --> mTLS
    Retry --> Identity
    
    mTLS --> Policy
    Identity --> Metrics
    Policy --> Tracing
    
    Metrics --> Logging
```

## Deployment Architecture

```mermaid
graph TB
    subgraph "Development"
        Dev[Developer]
        Local[Local Development]
        DevEnv[Development Environment]
    end
    
    subgraph "CI/CD Pipeline"
        Build[Build & Test]
        Security[Security Scan]
        Quality[Quality Gates]
    end
    
    subgraph "Staging"
        StagingEnv[Staging Environment]
        StagingTests[Integration Tests]
        StagingValidation[Validation Tests]
    end
    
    subgraph "Production"
        ProdEnv[Production Environment]
        Canary[Canary Deployment]
        Rollout[Argo Rollouts]
    end
    
    subgraph "Monitoring"
        HealthChecks[Health Checks]
        Metrics[Metrics Validation]
        Alerts[Alerting]
    end
    
    Dev --> Local
    Local --> DevEnv
    DevEnv --> Build
    
    Build --> Security
    Security --> Quality
    Quality --> StagingEnv
    
    StagingEnv --> StagingTests
    StagingTests --> StagingValidation
    StagingValidation --> ProdEnv
    
    ProdEnv --> Canary
    Canary --> Rollout
    Rollout --> HealthChecks
    
    HealthChecks --> Metrics
    Metrics --> Alerts
```

## Access Management Architecture

```mermaid
graph TB
    subgraph "External Users"
        DevOps[DevOps Team]
        Admin[Admin Users]
        Support[Support Team]
    end
    
    subgraph "Access Gateway"
        Boundary[Boundary Controller]
        Workers[Boundary Workers]
    end
    
    subgraph "Authentication"
        MFA[Multi-Factor Auth]
        RBAC[Role-Based Access]
        Identity[Identity Provider]
    end
    
    subgraph "Target Resources"
        K8s[Kubernetes API]
        Database[Database Access]
        Monitoring[Monitoring Systems]
        AdminTool[Admin Tool]
    end
    
    subgraph "Audit & Monitoring"
        Audit[Audit Logs]
        Session[Session Recording]
        Alerts[Access Alerts]
    end
    
    DevOps --> Boundary
    Admin --> Boundary
    Support --> Boundary
    
    Boundary --> Workers
    Workers --> MFA
    MFA --> RBAC
    RBAC --> Identity
    
    Identity --> K8s
    Identity --> Database
    Identity --> Monitoring
    Identity --> AdminTool
    
    K8s --> Audit
    Database --> Session
    Monitoring --> Alerts
    AdminTool --> Audit
```

## Disaster Recovery Architecture

```mermaid
graph TB
    subgraph "Primary Region"
        PrimaryK8s[Primary K8s Cluster]
        PrimaryDB[Primary Database]
        PrimaryCache[Primary Cache]
    end
    
    subgraph "Secondary Region"
        SecondaryK8s[Secondary K8s Cluster]
        SecondaryDB[Secondary Database]
        SecondaryCache[Secondary Cache]
    end
    
    subgraph "Backup Systems"
        BackupDB[Database Backups]
        BackupConfig[Config Backups]
        BackupSecrets[Secret Backups]
    end
    
    subgraph "Recovery Process"
        Failover[Automated Failover]
        Recovery[Recovery Procedures]
        Validation[Recovery Validation]
    end
    
    subgraph "Monitoring"
        HealthMonitoring[Health Monitoring]
        FailoverAlerts[Failover Alerts]
        RecoveryStatus[Recovery Status]
    end
    
    PrimaryK8s --> SecondaryK8s
    PrimaryDB --> SecondaryDB
    PrimaryCache --> SecondaryCache
    
    PrimaryDB --> BackupDB
    PrimaryK8s --> BackupConfig
    PrimaryK8s --> BackupSecrets
    
    SecondaryK8s --> Failover
    SecondaryDB --> Recovery
    SecondaryCache --> Validation
    
    Failover --> HealthMonitoring
    Recovery --> FailoverAlerts
    Validation --> RecoveryStatus
```