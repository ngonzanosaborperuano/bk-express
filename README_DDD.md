# Recomendaciones de Arquitectura

## 1. Claridad en los Contextos y Capas (DDD)

Domain: Aquí deben estar las entidades, agregados, value objects, repositorios (interfaces), servicios de dominio y lógica de negocio pura.
Application: Casos de uso (application services), orquestadores de lógica, sin lógica de infraestructura.
Infrastructure: Implementaciones concretas de repositorios, servicios externos, adaptadores, controladores, etc.
Interfaces: Puede ser para controladores, DTOs, mappers, o contratos de entrada/salida.
Shared: Elementos reutilizables entre contextos (ej: utilidades, excepciones, value objects genéricos).

## 2. Modularidad y Desacoplamiento

Divide por Bounded Contexts si tu dominio lo permite (ej: orders/, users/, payments/), cada uno con su propio domain/, application/, infrastructure/.
Usa interfaces para desacoplar dependencias (ej: repositorios, servicios externos).
Aplica inyección de dependencias para facilitar testing y desacoplar implementaciones.

## 3. Principios SOLID

### S: Una clase/un módulo debe tener una sola responsabilidad.

### O: Abierto a extensión, cerrado a modificación (usa interfaces y herencia donde aplique).

### L: Sustitución de Liskov (las implementaciones deben poder sustituir a las abstracciones).

### I: Segregación de interfaces (interfaces pequeñas y específicas).

### D: Inversión de dependencias (depende de abstracciones, no de implementaciones).

## recomendacion de estructura de tablas

```
src/
  modules/
    users/
      domain/
      application/
      infrastructure/
      interfaces/
    payments/
      domain/
      application/
      infrastructure/
      interfaces/
    logger/
      domain/
      application/
      infrastructure/
      interfaces/
    chat/
      domain/
      application/
      infrastructure/
      interfaces/
  shared/
    utils/
    exceptions/
    value-objects/
  config/
  middleware/
  db/
```
