/* 
 * Authentication helper 
 * 
 * @param {Object} headers - Request headers.
 * @return {Object} { ok:boolean, statusCode:number, body:any}
 */
const isAuthenticated = function (headers = {}) {
    var partedAuthHeader = (headers.authorization || '').split(' ');
    var status = {
        ok: false, 
        statusCode: 403,
        body: {success: false, msg:  'Unauthorized user.'}
    };

    // We can save the option to extend 
    // status codes if necessary in future
    if (partedAuthHeader.length === 2)  {
        status.ok = true;
        status.statusCode = 200;
        status.body =  partedAuthHeader[1];   
    }

    return status;
};

/* 
 * Function helper formatting error response
 * 
 * @param {Object} res - Response.
 * @param {Number} code - Error status code.
 * @param {Any} message - Additional error details.
 * @return {Object} { success:boolean, statusCode:number, message:any}
 */
const sendError = function(res, code, message) {
    return res.json(code).send({ 
        success: 200 <= code < 400, 
        statusCode: code, 
        message: message 
    });
};

module.exports = { isAuthenticated, sendError };