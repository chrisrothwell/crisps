class ValidationError extends Error {
  constructor(message, validationObject = {}) {
    super(message);
    this.name = "ValidationError";
    this.validationObject = validationObject; 
  }
}

module.exports = ValidationError;