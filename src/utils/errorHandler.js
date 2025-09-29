exports.handleError = (res, error, platform) => {
  console.error(`Error ${platform}:`, error);
/**
 * Utilitário para tratamento de erros customizados
 */
  res.status(500).json({ 
    success: false,
    error: `Erro ao processar requisição do ${platform}`,
    details: error.message 
  });
};