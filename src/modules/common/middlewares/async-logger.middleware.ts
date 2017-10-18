
function asyncSave(msg) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(msg);
        }, 100);
    });
}

export const AsyncLoggerMiddleware = async (req, res, next) => {
    let msg = `AsyncRequest...`;
    await asyncSave(msg);
    console.log(msg);
    next();
};
