"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
const server = (0, express_1.default)();
let cachedApp;
async function bootstrap() {
    if (cachedApp)
        return cachedApp;
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.enableCors({
        origin: '*',
    });
    await app.init();
    cachedApp = server;
    return server;
}
async function handler(req, res) {
    const app = await bootstrap();
    app(req, res);
}
//# sourceMappingURL=index.js.map