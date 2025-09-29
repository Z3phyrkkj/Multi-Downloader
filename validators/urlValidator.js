/**
 * Validador de URLs para garantir formatos corretos
 */

exports.validateUrl = (req, res, next) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ 
      success: false,
      error: 'URL obrigatória' 
    });
  }

  try {
    new URL(url);
    next();
  } catch (error) {
    return res.status(400).json({ 
      success: false,
      error: 'URL inválida' 
    });
  }
};