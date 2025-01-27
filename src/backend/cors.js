const cors = (options) => {
    return (req, res, next) => {
      const allowedOrigins = options.origin || [];
      const allowedMethods = options.methods || ['GET', 'POST', 'PUT', 'DELETE'];
      const allowedHeaders = options.headers || ['Content-Type', 'Authorization'];
      const credentials = options.credentials || false;
      const maxAge = options.maxAge || 3600; // 1 hour in seconds
  
      res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
      res.header('Access-Control-Allow-Methods', allowedMethods.join(','));
      res.header('Access-Control-Allow-Headers', allowedHeaders.join(','));
  
      if (credentials) {
        res.header('Access-Control-Allow-Credentials', 'true');
      }
  
      if (req.method === 'OPTIONS') {
        res.header('Access-Control-Max-Age', maxAge);
        return res.status(204).send('');
      }
  
      next();
    };
  };
  
  module.exports = cors;
  