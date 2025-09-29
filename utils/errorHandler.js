/**
 * Utilitário para tratamento padronizado de erros
 */

exports.handleError = (res, error, platform) => {
  console.error(`Error ${platform}:`, error);
  res.status(500).json({ 
    success: false,
    error: `Erro ao processar requisição do ${platform}`,
    details: error.message 
  });
};