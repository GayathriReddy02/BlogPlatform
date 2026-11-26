const authService = require("../services/auth.service");


const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Internal server error"
        });
    }
};


const login = async (req, res) => {
    try {
        const data = await authService.loginUser(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data
        });

    } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}
};


const getMe = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User details retrieved successfully",
        data: {
            id: req.user._id,
            displayName: req.user.displayName,
            email: req.user.email,
            role: req.user.role
        }
    });
};

const authorAccess = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to the Author dashboard",
        data: {
            displayName: req.user.displayName,
            role: req.user.role
        }
    });
};


module.exports = { register,login,getMe,authorAccess  };