import prisma from "@lib/prisma";
import {MasterAccount} from '@prisma/generated';

export class UserService {
    public static async getAll(): Promise<MasterAccount[]> {
        return await prisma.masterAccount.findMany();
    }
}
