enum ResponseStatus{
    success = 200,
    badRequest = 400,
    unAuthorized = 401,
    forbidden = 403,
    notFound = 404,
    conflict = 409,
    invalidInputs = 422,
    error = 500,
}


export default ResponseStatus;