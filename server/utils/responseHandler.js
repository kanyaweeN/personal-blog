export const success = (res, code, message, data = null) => {
    return res.status(code).json({
        success: true,
        message,
        ...(data && { data }),
    });
};

export const error = (res, code, message) => {
    return res.status(code).json({
        success: false,
        message,
    });
};
