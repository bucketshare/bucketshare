import config from './../src/config/config'
import { body } from 'express-validator'

describe("config testing", () => {
    it("should have the correct port", () => {
        expect(config.port).toBe(1500);
    });

    it("should have a valid email", () => {
        expect(config.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it("app_pass should not be empty", () => {
        expect(config.app_pass).not.toBe("")
    })
});