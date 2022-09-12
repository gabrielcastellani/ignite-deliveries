import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAunthenticateClient {
    username: string,
    password: string,
}

export class AuthenticateClientUseCase {
    async execute({ username, password } : IAunthenticateClient) {
        const client = await prisma.clients.findFirst({
            where: {
                username
            }
        });

        if(!client) {
            throw new Error("Username or password invalid!");
        }

        const passwordMatch = await compare(password, client.password);

        if(!passwordMatch) {
            throw new Error("Username or password invalid!");
        }

        const token = sign({ username }, "d3aa349c8d932ea71f11aa096ba29f61", {
            subject: client.id,
            expiresIn: "1d"
        });

        return token;
    }
}