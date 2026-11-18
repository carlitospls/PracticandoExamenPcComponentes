// SHARED · DOMINIO · Errores de negocio comunes a todos los módulos.
// Hablan el idioma del negocio; cada adaptador decide cómo mostrarlos (HTTP 4xx, mensaje en React...).
class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = new.target.name;
  }
}

class ValidationError extends DomainError {}   // datos mal formados
class NotFoundError extends DomainError {}     // no existe
class ConflictError extends DomainError {}     // ya existe / duplicado
class UnauthorizedError extends DomainError {} // credenciales incorrectas
class BusinessRuleError extends DomainError {} // se incumple una regla de negocio

module.exports = {
  DomainError,
  ValidationError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
  BusinessRuleError
};