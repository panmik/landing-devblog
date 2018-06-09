const errorMessages = {
    DATABASE_ERROR: 'database error',
    RESOURCE_NOT_FOUND: 'requested resource was not found',
    INVALID_POST_DATA: 'invalid post data'
};

function sendSuccess(res, msg) {
    res.status(200).send(msg);
}

function sendError(res, msg) {
    res.status(500).send(msg);
}

const responseHandler = (controller) =>
    (req, res, err) => {
        controller({...req.query, ...req.params, ...req.body})
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            console.error("error in router:")
            console.error(error);
            sendError(res, errorMessages.RESOURCE_NOT_FOUND);
        });
    };

 module.exports = {
    responseHandler,
    errorMessages,
    sendSuccess,
    sendError
};   