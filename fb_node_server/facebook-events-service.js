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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = __importDefault(require("crypto-js"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var FacebookEventsService = /** @class */ (function () {
    function FacebookEventsService() {
        var _this = this;
        this.appId = '2805966193060065';
        this.appSecret = '989f389770a0819e86216fd9615d781d';
        this.apiVersion = 'v8.0';
        this.pixelId = '3223765234388297';
        this.token = 'EAAn4AuowaOEBADsJXfVqTcZAFoLQR6sfCsqUj8ZCbxVPk8yfzufgJRX9BiXwvZBkGrXngJhgdFsjHPX7zRDwRIqEm8x7qy8vCZClGNGfXnzSjB8IrqFi2dBztylnBR1VUHthQ7IBQfMyjieaMw2Y9CiFT1tKTULeqF3QS6ZAp9wg2yP2F6BmCPgrNZBPDUAkhksZCQHvtoG2FKZCSaZB46dIIOfL7evx4Hra2XHOskmT66QZDZD';
        this.generatedToken = '';
        this.user = {
            firstName: 'David',
            surName: 'Bandemo',
            email: 'david.bandemo@voyado.se'
        };
        var url = "https://graph.facebook.com/oauth/access_token?client_id=" + this.appId + "&client_secret=" + this.appSecret + "&grant_type=client_credentials";
        node_fetch_1.default(url)
            .then(function (response) {
            response.json()
                .then(function (data) {
                _this.generatedToken = data.access_token.split('|')[1];
            });
        });
    }
    FacebookEventsService.prototype.sendFbRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://graph.facebook.com/" + this.apiVersion + "/" + this.pixelId + "/events?access_token=" + this.token;
                        data = [
                            {
                                event_name: 'Purchase',
                                event_time: Math.floor(new Date().getTime() / 1000),
                                user_data: {
                                    em: crypto_js_1.default.SHA256(this.user.email).toString(crypto_js_1.default.enc.Hex)
                                },
                                custom_data: {
                                    content_name: 'Dator',
                                    content_ids: ['62717'],
                                    currency: 'SEK',
                                    value: 5000
                                },
                            }
                        ];
                        return [4 /*yield*/, node_fetch_1.default(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ data: data }) // body data type must match 'Content-Type' header
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    return FacebookEventsService;
}());
exports.default = FacebookEventsService;
