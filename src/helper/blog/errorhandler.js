const errorRes = (err, res, message) => {
    switch (err) {
        case(200):
        res.status(200).json("success ", message)
        break;
        case(401):
            res.status(401).json("Invalid credentials provided")
            break;
        case 403:
            res.status(403).json("Forbidden You do not have access to this resource")
            break;
        case 404:
            res.status(404).json("The requested resource was not found")
            break;
        case 400:
            res.status(400).json("bad request")
            break;
        case 500:
            res.status(500).json("bad request")
            break;
        default:
            res.status(500).json("An internal server error occurredt")
            break;
    }
}
module.exports = errorRes
