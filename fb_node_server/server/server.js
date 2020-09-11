"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var facebook_events_service_1 = __importDefault(require("../facebook-events-service"));
// Create a new express app instance
var app = express();
app.get('/', function (req, res) {
    var events = new facebook_events_service_1.default();
    events.sendFbRequest().then(function (data) { return res.send(data); });
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
