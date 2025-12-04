exports.onSuccess = (res, data, message = "Success", statusCode = 200) => {
    res.status(statusCode).json({
        IsSuccess: true,
        Data: data,
        Message: message
    });
};

exports.onError = (res, data, message = "Error", statusCode = 400) => {
    res.status(statusCode).json({
        IsSuccess: false,
        Data: data,
        Message: message
    });
};