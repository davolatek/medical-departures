"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const accountCountroller_1 = require("../controllers/accountCountroller");
function setupRoutes(app) {
    app.post('/api/signup', accountCountroller_1.signUp);
    app.post('/api/signin', accountCountroller_1.signIn);
    app.get('/api/profile', accountCountroller_1.getUserProfile);
    app.put('/api/profile', accountCountroller_1.updateUserProfile);
}
exports.setupRoutes = setupRoutes;
