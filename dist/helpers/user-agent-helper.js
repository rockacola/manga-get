"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAgentHelper = void 0;
const constants_1 = require("../constants");
class userAgentHelper {
    static getRandom() {
        const randomIndex = Math.floor(Math.random() * constants_1.userAgents.length);
        return constants_1.userAgents[randomIndex].ua;
    }
}
exports.userAgentHelper = userAgentHelper;
//# sourceMappingURL=user-agent-helper.js.map