
class projectError extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
        this.error="error";
    }
}

module.exports = projectError