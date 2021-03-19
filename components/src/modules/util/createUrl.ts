import { v4 } from "uuid";
import { redis } from "../../redis";
const { port, ip } = require("../utils.js")

export const createUrl = async (userId: number) => {

    const token = v4();
    await redis.set(token, userId, "ex", 60*60*24); //expires after 1 day

    return `http://${ip}:${port}/api/user/confirm/${token}`;
};

