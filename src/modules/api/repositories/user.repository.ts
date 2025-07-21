import prisma from "@lib/prisma";
import {MasterAccount} from '@prisma/generated';

export class UserRepository {
    public static async getAll(): Promise<MasterAccount[]> {
        return await prisma.masterAccount.findMany();
    }
}
