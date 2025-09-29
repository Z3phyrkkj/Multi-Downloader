/**
 * Funções utilitárias para manipulação de strings
 */
const sanitizeString = (input) => {
  if (!input && input !== 0) return '';
  return input.toString().trim();
};

module.exports = { sanitizeString };
