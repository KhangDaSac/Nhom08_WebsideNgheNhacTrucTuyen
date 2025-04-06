// Common response methods
function sendSuccess(res, data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
}

function sendError(res, message = 'Error', statusCode = 500) {
    return res.status(statusCode).json({
        success: false,
        message
    });
}

async function getAll(req, res) {
    try {
        throw new Error('Method not implemented');
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function getById(req, res) {
    try {
        throw new Error('Method not implemented');
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function create(req, res) {
    try {
        throw new Error('Method not implemented');
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function update(req, res) {
    try {
        throw new Error('Method not implemented');
    } catch (error) {
        return sendError(res, error.message);
    }
}

async function remove(req, res) {
    try {
        throw new Error('Method not implemented');
    } catch (error) {
        return sendError(res, error.message);
    }
}

module.exports = {
    sendSuccess,
    sendError,
    getAll,
    getById,
    create,
    update,
    remove
};
