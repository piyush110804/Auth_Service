const AppError=require('./error-handler');
const {StatusCodes}=require('http-status-codes');
class ValidationError extends AppError{
  constructor(error){
    let name=error.name;
    let explanation=[];
    error.errors.forEach((err)=> {
      explanation.push(err.message);
    });
    super(name,
      'Not able to validate the data sent in request',
      explanation,
      StatusCodes.BAD_REQUEST);
  }

}
module.exports=ValidationError;