// SHARED · DOMINIO · Errores de negocio comunes a todos los módulos.
// Hablan el idioma del negocio; cada adaptador decide cómo mostrarlos (HTTP 4xx, mensaje en React...).
export class DomainError extends Error {
  constructor(message) {
    super(message);
    this.name = new.target.name;
  }
}

export class ValidationError extends DomainError {}   // datos mal formados
export class NotFoundError extends DomainError {}     // no existe
export class ConflictError extends DomainError {}     // ya existe / duplicado
export class UnauthorizedError extends DomainError {} // credenciales incorrectas
export class BusinessRuleError extends DomainError {} // se incumple una regla de negocio
