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

function sendMail(body, subject) {
    if (!process.env.DEVBLOG_SERVICE_USER
        || !process.env.DEVBLOG_SERVICE_PASSWORD
        || !process.env.DEVBLOG_SERVICE_RECEIVER) {
            return;
        }

    console.log('------------------');
    console.log(body);

    const transporter = require('nodemailer').createTransport({
        service: 'gmail',
        auth: {
            user: process.env.DEVBLOG_SERVICE_USER,
            pass: process.env.DEVBLOG_SERVICE_PASSWORD
        }
    });

    transporter.sendMail({
        from: process.env.DEVBLOG_SERVICE_USER,
        to: process.env.DEVBLOG_SERVICE_RECEIVER,
        subject: subject,
        text: body
    }, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const responseHandler = (controller, callback) =>
    (req, res, err) => {
        controller({...req.query, ...req.params, ...req.body})
        .then(result => {
            res.send(result);
            return result;
        })
        .then(result => {
            if (callback) {
                callback(result);
            }
        })
        .catch(error => {
            console.error("error in router:")
            console.error(error);
            sendError(res, errorMessages.RESOURCE_NOT_FOUND);
        });
    };

 module.exports = {
    responseHandler,
    sendMail,
    errorMessages,
    sendSuccess,
    sendError
};   