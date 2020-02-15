module.exports = {
    errHandler: (err, req, res, next) => {
        console.error(err);
        res.status(500).send({ success: false, message: err.message })
    }
}