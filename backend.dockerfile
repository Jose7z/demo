FROM maven:3-eclipse-temurin-21 AS build

WORKDIR /app

# Copy only pom.xml first
COPY pom.xml .

# Create src directory and copy source files
COPY src ./src/

# Build the application
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-Xmx512m", "-Dspring.profiles.active=docker", "-Dlogging.level.org.springframework=DEBUG", "-jar", "app.jar"]