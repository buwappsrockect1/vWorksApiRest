// custom DeleteError class that extends Error
class DeleteError extends Error { 
     
    constructor (message,errorCode) {
      super(message);
      this.errorCode = errorCode;

    }
  }
  
  module.exports = DeleteError;
