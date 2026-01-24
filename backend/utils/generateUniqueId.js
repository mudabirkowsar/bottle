import crypto from "crypto";

export const generateOrderId = () => {
    return crypto.randomBytes(6).toString("hex").toUpperCase();
};
