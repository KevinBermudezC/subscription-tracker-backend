import aj from "../config/arcjet.js";

const arcjetMiddleware = async(req, res, next) => {
  try {
    // Convert IPv6 to IPv4 if needed
    const ipAddress = req.connection.remoteAddress?.replace(/^::ffff:/, '') || '172.19.0.1';
    
    // Only modify the x-forwarded-for header
    req.headers['x-forwarded-for'] = ipAddress;
    
    console.log('Client IP:', {
      remoteAddress: req.connection.remoteAddress,
      xForwardedFor: req.headers['x-forwarded-for'],
      realIP: req.headers['x-real-ip'],
      socketRemoteAddress: req.socket.remoteAddress,
      dockerHost: req.headers['host'],
      convertedIP: ipAddress
    });
    // Pass IP directly to protect method
    const decision = await aj.protect(req, {
      requested: 1,
      clientIp: ipAddress
    });
    if(decision.isDenied()){
      if(decision.reason.isRateLimit()) return res.status(429).json({message: "Rate limit exceeded"});
      if(decision.reason.isBot()) return res.status(403).json({message: "Bot detected"});
      return res.status(403).json({message: "Access denied"});
    }

    next();
  } catch (error) {
    console.log(`Error in arcjetMiddleware: ${error.message}`);
    next(error);      
  }
};

export default arcjetMiddleware;