import aj from "../config/arcjet.js";

const arcjetMiddleware = async(req, res, next) => {
  try {
    // Protect the route
    const decision = await aj.protect(req, {requested: 1});

    // If the decision is denied, return an error response
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