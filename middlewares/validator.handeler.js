const boom = require ('@hapi/boom');

function validatorHandler(schema, property){
  return (req, res, next) => {
    //req.body sacar la info de post
    //req.params sacar la info de get
    //req.query sacar la info de patch
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false });
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
