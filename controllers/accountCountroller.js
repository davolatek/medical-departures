"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.getUserProfile = exports.signIn = exports.signUp = void 0;
const db_1 = require("../db/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../utils/constant");
// Change this to a strong secret key
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, firstname, lastname, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        // check that values are not empty
        if (!username || !email || !firstname || !lastname || !password) {
            return res.status(422).send("All fields are required");
        }
        yield db_1.pool.query("INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)", [username, firstname, lastname, email, hashedPassword]);
        res.status(201).json({ message: "Account successfully created" });
    }
    catch (error) {
        console.log("AccountController >>>> signUp() >>>> ", error);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        if (!username || !password)
            return res.status(422).send("Username/email and password are required");
        const [result] = yield db_1.pool.query("SELECT * FROM users WHERE email OR username = ?", [username]);
        const [rows] = result;
        if (rows.length === 0) {
            return res
                .status(401)
                .json({ message: "Invalid email/username or password" });
        }
        const user = rows[0];
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, constant_1.JWT_KEY, { expiresIn: "24h" });
        res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        console.log("AccountController >>>> signin() >>>> ", error);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.signIn = signIn;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Decode user ID from JWT
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, constant_1.JWT_KEY);
        const userId = decodedToken.userId;
        const [result] = yield db_1.pool.query('SELECT id, username, email FROM users WHERE id = ?', [userId]);
        const [rows] = result;
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = rows[0];
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { username, email, password } = req.body;
    try {
        // Decode user ID from JWT
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, constant_1.JWT_KEY);
        const userId = decodedToken.userId;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield db_1.pool.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, hashedPassword, userId]);
        res.status(200).json({ message: 'Profile updated successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});
exports.updateUserProfile = updateUserProfile;
