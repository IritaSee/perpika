'use server';
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.getRegistrations = getRegistrations;
exports.getRegistrationById = getRegistrationById;
exports.updateRegistration = updateRegistration;
exports.updatePaymentStatus = updatePaymentStatus;
exports.deleteRegistration = deleteRegistration;
exports.updatePaperFile = updatePaperFile;
exports.updatePaperReviewedStatus = updatePaperReviewedStatus;
exports.updatePresenterRegistration = updatePresenterRegistration;
exports.updatePresenter = updatePresenter;
exports.deletePresenter = deletePresenter;
exports.updateParticipantRegistration = updateParticipantRegistration;
exports.getRegistrationFees = getRegistrationFees;
exports.updateRegistrationFee = updateRegistrationFee;
exports.getUsers = getUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
var db_1 = require("../../lib/db");
var cache_1 = require("next/cache");
// Registration CRUD
function getRegistrations(filters) {
    return __awaiter(this, void 0, void 0, function () {
        var registrations, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.registration.findMany({
                            where: filters,
                            include: {
                                presenterRegistration: {
                                    include: {
                                        presenters: true
                                    }
                                },
                                participantRegistration: true
                            },
                            orderBy: {
                                id: 'desc'
                            }
                        })];
                case 1:
                    registrations = _a.sent();
                    return [2 /*return*/, { success: true, data: registrations }];
                case 2:
                    error_1 = _a.sent();
                    console.error("Gagal mengambil data registrasi:", error_1);
                    return [2 /*return*/, { success: false, error: error_1.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getRegistrationById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var registration, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.registration.findUnique({
                            where: { id: id },
                            include: {
                                presenterRegistration: {
                                    include: {
                                        presenters: true
                                    }
                                },
                                participantRegistration: true
                            }
                        })];
                case 1:
                    registration = _a.sent();
                    return [2 /*return*/, { success: true, data: registration }];
                case 2:
                    error_2 = _a.sent();
                    console.error("Gagal mengambil detail registrasi:", error_2);
                    return [2 /*return*/, { success: false, error: error_2.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateRegistration(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var registration, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.registration.update({
                            where: { id: id },
                            data: data,
                        })];
                case 1:
                    registration = _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true, data: registration }];
                case 2:
                    error_3 = _a.sent();
                    console.error("Gagal memperbarui registrasi:", error_3);
                    return [2 /*return*/, { success: false, error: error_3.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updatePaymentStatus(id, paymentStatus) {
    return __awaiter(this, void 0, void 0, function () {
        var registration, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.registration.update({
                            where: { id: id },
                            data: { paymentStatus: paymentStatus },
                        })];
                case 1:
                    registration = _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true, data: registration }];
                case 2:
                    error_4 = _a.sent();
                    console.error("Gagal memperbarui status pembayaran:", error_4);
                    return [2 /*return*/, { success: false, error: error_4.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deleteRegistration(id) {
    return __awaiter(this, void 0, void 0, function () {
        var registration_1, error_5;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!id || typeof id !== 'number') {
                        return [2 /*return*/, {
                                success: false,
                                error: "ID registrasi tidak valid"
                            }];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, db_1.db.registration.findUnique({
                            where: { id: id },
                            include: {
                                presenterRegistration: true,
                                participantRegistration: true
                            }
                        })];
                case 2:
                    registration_1 = _a.sent();
                    if (!registration_1) {
                        return [2 /*return*/, {
                                success: false,
                                error: "Registrasi tidak ditemukan"
                            }];
                    }
                    return [4 /*yield*/, db_1.db.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!registration_1.presenterRegistration) return [3 /*break*/, 2];
                                        return [4 /*yield*/, tx.presenterRegistration.delete({
                                                where: { id: registration_1.presenterRegistration.id }
                                            })];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        if (!registration_1.participantRegistration) return [3 /*break*/, 4];
                                        return [4 /*yield*/, tx.participantRegistration.delete({
                                                where: { id: registration_1.participantRegistration.id }
                                            })];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [4 /*yield*/, tx.registration.delete({
                                            where: { id: id }
                                        })];
                                    case 5:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3:
                    _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true }];
                case 4:
                    error_5 = _a.sent();
                    console.error("Gagal menghapus registrasi:", error_5);
                    return [2 /*return*/, {
                            success: false,
                            error: error_5.message || "Gagal menghapus registrasi"
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function updatePaperFile(id, PaperSubmission) {
    return __awaiter(this, void 0, void 0, function () {
        var presenterReg, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.presenterRegistration.update({
                            where: { id: id },
                            data: { PaperSubmission: PaperSubmission }
                        })];
                case 1:
                    presenterReg = _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true, data: presenterReg }];
                case 2:
                    error_6 = _a.sent();
                    console.error("Failed to update Paper file:", error_6);
                    return [2 /*return*/, { success: false, error: error_6.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updatePaperReviewedStatus(id, isPaperReviewed) {
    return __awaiter(this, void 0, void 0, function () {
        var presenterReg, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.presenterRegistration.update({
                            where: { id: id },
                            data: { isPaperReviewed: isPaperReviewed }
                        })];
                case 1:
                    presenterReg = _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true, data: presenterReg }];
                case 2:
                    error_7 = _a.sent();
                    console.error("Failed to update Paper reviewed status:", error_7);
                    return [2 /*return*/, { success: false, error: error_7.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Presenter Registration CRUD
function updatePresenterRegistration(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var presenterReg, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.presenterRegistration.update({
                            where: { id: id },
                            data: data
                        })];
                case 1:
                    presenterReg = _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true, data: presenterReg }];
                case 2:
                    error_8 = _a.sent();
                    console.error("Gagal memperbarui registrasi presenter:", error_8);
                    return [2 /*return*/, { success: false, error: error_8.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Presenter CRUD
function updatePresenter(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var presenter, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.presenter.update({
                            where: { id: id },
                            data: data
                        })];
                case 1:
                    presenter = _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true, data: presenter }];
                case 2:
                    error_9 = _a.sent();
                    console.error("Gagal memperbarui presenter:", error_9);
                    return [2 /*return*/, { success: false, error: error_9.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deletePresenter(id) {
    return __awaiter(this, void 0, void 0, function () {
        var error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.presenter.delete({
                            where: { id: id }
                        })];
                case 1:
                    _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true }];
                case 2:
                    error_10 = _a.sent();
                    console.error("Gagal menghapus presenter:", error_10);
                    return [2 /*return*/, { success: false, error: error_10.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Participant Registration CRUD
function updateParticipantRegistration(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var participantReg, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.participantRegistration.update({
                            where: { id: id },
                            data: data
                        })];
                case 1:
                    participantReg = _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true, data: participantReg }];
                case 2:
                    error_11 = _a.sent();
                    console.error("Gagal memperbarui registrasi peserta:", error_11);
                    return [2 /*return*/, { success: false, error: error_11.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Registration Fee CRUD
function getRegistrationFees() {
    return __awaiter(this, void 0, void 0, function () {
        var fees, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.registrationFee.findMany({
                            orderBy: {
                                id: 'asc'
                            }
                        })];
                case 1:
                    fees = _a.sent();
                    return [2 /*return*/, { success: true, data: fees }];
                case 2:
                    error_12 = _a.sent();
                    console.error("Gagal mengambil data biaya registrasi:", error_12);
                    return [2 /*return*/, { success: false, error: error_12.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateRegistrationFee(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var fee, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.registrationFee.update({
                            where: { id: id },
                            data: data
                        })];
                case 1:
                    fee = _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true, data: fee }];
                case 2:
                    error_13 = _a.sent();
                    console.error("Gagal memperbarui biaya registrasi:", error_13);
                    return [2 /*return*/, { success: false, error: error_13.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// User CRUD (for admin management)
function getUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var users, error_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.user.findMany({
                            orderBy: {
                                createdAt: 'desc'
                            }
                        })];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, { success: true, data: users }];
                case 2:
                    error_14 = _a.sent();
                    console.error("Gagal mengambil data pengguna:", error_14);
                    return [2 /*return*/, { success: false, error: error_14.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.user.update({
                            where: { id: id },
                            data: data
                        })];
                case 1:
                    user = _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true, data: user }];
                case 2:
                    error_15 = _a.sent();
                    console.error("Gagal memperbarui pengguna:", error_15);
                    return [2 /*return*/, { success: false, error: error_15.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function () {
        var error_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db.user.delete({
                            where: { id: id }
                        })];
                case 1:
                    _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard");
                    return [2 /*return*/, { success: true }];
                case 2:
                    error_16 = _a.sent();
                    console.error("Gagal menghapus pengguna:", error_16);
                    return [2 /*return*/, { success: false, error: error_16.message }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
