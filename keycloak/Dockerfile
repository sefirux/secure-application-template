FROM quay.io/keycloak/keycloak:latest as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres
ENV KC_DB_DRIVER=org.postgresql.Driver

# Configure features
ENV KC_FEATURES=token-exchange

WORKDIR /opt/keycloak

# Build optimized version
RUN /opt/keycloak/bin/kc.sh build

# Create optimized image
FROM quay.io/keycloak/keycloak:latest

COPY --from=builder /opt/keycloak/ /opt/keycloak/

# Expose all available commands
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]