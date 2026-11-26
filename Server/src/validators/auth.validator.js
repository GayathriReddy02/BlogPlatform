const validateRegister = (req, res, next) => {
    const { displayName, email, password } = req.body || {};

    if (
        typeof displayName !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        !displayName.trim() ||
        !email.trim() ||
        !password
    ) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
            message: "Invalid email address"
        });
    }

    if (password.length < 8 ||
        Buffer.byteLength(password, "utf8") > 72) {
        return res.status(400).json({
            message: "Password must have at least 8 characters and at most 72 bytes"
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body || {};

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() ||
        !password
    ) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
            message: "Invalid email address"
        });
    }

    next();
};

module.exports = { validateRegister, validateLogin };