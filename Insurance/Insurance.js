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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
function calculatePremium(user, vehicle) {
    var basePremium = 500;
    var ageFactor = 1;
    if (user.age < 25) {
        ageFactor = 1.5;
    }
    else if (user.age > 60) {
        ageFactor = 1.2;
    }
    var vehicleTypeFactor = 1;
    if (vehicle.type === 'motorcycle') {
        vehicleTypeFactor = 1.3;
    }
    var vehicleAgeFactor = 1;
    if (vehicle.age < 2) {
        vehicleAgeFactor = 0.9;
    }
    else if (vehicle.age > 10) {
        vehicleAgeFactor = 1.2;
    }
    var drivingHistoryFactor = 1;
    if (user.drivingHistory > 0) {
        drivingHistoryFactor = 1.5;
    }
    var locationFactor = 1;
    if (user.location === 'urban') {
        locationFactor = 1.2;
    }
    var totalPremium = basePremium * ageFactor * vehicleTypeFactor * vehicleAgeFactor * drivingHistoryFactor * locationFactor;
    return totalPremium;
}
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function askQuestion(question) {
    return new Promise(function (resolve) { return rl.question(question, resolve); });
}
function getInsuranceDetails() {
    return __awaiter(this, void 0, void 0, function () {
        var age, _a, location, drivingHistory, _b, vehicleType, vehicleAge, _c, user, vehicle, premium;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = parseInt;
                    return [4 /*yield*/, askQuestion('Enter your age: ')];
                case 1:
                    age = _a.apply(void 0, [_d.sent(), 10]);
                    return [4 /*yield*/, askQuestion('Enter your location (urban/rural): ')];
                case 2:
                    location = _d.sent();
                    _b = parseInt;
                    return [4 /*yield*/, askQuestion('Enter the number of traffic violations/accidents you have had: ')];
                case 3:
                    drivingHistory = _b.apply(void 0, [_d.sent(), 10]);
                    return [4 /*yield*/, askQuestion('Enter your vehicle type (car/motorcycle): ')];
                case 4:
                    vehicleType = _d.sent();
                    _c = parseInt;
                    return [4 /*yield*/, askQuestion('Enter the age of your vehicle (in years): ')];
                case 5:
                    vehicleAge = _c.apply(void 0, [_d.sent(), 10]);
                    user = { age: age, location: location, drivingHistory: drivingHistory };
                    vehicle = { type: vehicleType, age: vehicleAge };
                    premium = calculatePremium(user, vehicle);
                    console.log("Your estimated insurance premium is: $".concat(premium.toFixed(2)));
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
getInsuranceDetails();
