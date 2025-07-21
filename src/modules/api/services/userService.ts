import prisma from "@lib/prisma";
import {MasterAccount} from '@prisma/generated';
import {UserDto} from "@shared/dto/user.dto";

export class UserService {
    public static async getAll(): Promise<UserDto[]> {
        const masterAccounts: MasterAccount[] = await prisma.masterAccount.findMany();
        return masterAccounts.map((account) => ({
            id: account.id,
            email: account.email,
            password: account.password,
            createdAt: account.createdAt,
        }))
    }
}
