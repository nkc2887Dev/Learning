"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorException = exports.NotFoundException = exports.UnauthorizedException = exports.BadRequestException = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
class BadRequestException extends HttpException {
    constructor(message = "Bad Request") {
        super(400, message);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends HttpException {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class NotFoundException extends HttpException {
    constructor(message = "Not Found") {
        super(404, message);
    }
}
exports.NotFoundException = NotFoundException;
class InternalServerErrorException extends HttpException {
    constructor(message = "Internal Server Error") {
        super(500, message);
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
