const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const registerUser = async (userData) => {
    const { displayName, email, password } = userData;

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
        email: normalizedEmail
    });

    if (existingUser) {
        const error = new Error("Email already registered");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        displayName,
        email: normalizedEmail,
        password: hashedPassword,
        role: "reader"
    });

    return {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        role: user.role
    };
};


const loginUser = async (userData) => {
    const { email, password } = userData;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
        email: normalizedEmail
    }).select("+password");

    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken(user._id);

    return {
        token,
        user: {
            id: user._id,
            displayName: user.displayName,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = { registerUser,loginUser };