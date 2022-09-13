import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAunthenticateDeliveryman {
    username: string,
    password: string,
}

export class AuthenticateDeliverymanUseCase {
    async execute({ username, password } : IAunthenticateDeliveryman) {
        const deliveryman = await prisma.deliveryman.findFirst({
            where: {
                username
            }
        });

        if(!deliveryman) {
            throw new Error("Username or password invalid!");
        }

        const passwordMatch = await compare(password, deliveryman.password);

        if(!passwordMatch) {
            throw new Error("Username or password invalid!");
        }

        const token = sign({ username }, "d3aa349c8d932ea71f22aa096ba29f61", {
            subject: deliveryman.id,
            expiresIn: "1d"
        });

        return token;
    }
}