require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = require("../src/config/db");
const User = require("../src/models/user.model");

const seedAuthor = async () => {
    try {
        const displayName = process.env.AUTHOR_NAME;
        const email = process.env.AUTHOR_EMAIL;
        const password = process.env.AUTHOR_PASSWORD;

        if (!displayName || !email || !password) {
            throw new Error("Author credentials are missing");
        }

        if (
            password.length < 8 ||
            Buffer.byteLength(password, "utf8") > 72
        ) {
            throw new Error("Invalid Author password length");
        }

        await connectDB();

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            if (existingUser.role !== "author") {
                throw new Error(
                    "Email already belongs to a Reader"
                );
            }

            console.log("Author account already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const author = await User.create({
            displayName,
            email: normalizedEmail,
            password: hashedPassword,
            role: "author"
        });

        console.log("Author account created successfully");
        console.log("Email:", author.email);
        console.log("Role:", author.role);

    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exitCode = 1;

    } finally {
        await mongoose.disconnect();
    }
};

seedAuthor();