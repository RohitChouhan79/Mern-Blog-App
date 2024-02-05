class Errorhandler extends Error{
    constructor(message,statuscode) {
        super(message)
        this.statuscode=statuscode;
        Error.captureStackTrace(this,this.constructor)
    }
}

export default Errorhandler;


// export const Errorhandler = (statusCode, message) => {
//     const error = new Error();
//     error.statusCode = statusCode;
//     error.message = message;
//     return error;
//   };