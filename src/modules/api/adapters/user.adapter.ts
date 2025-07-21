import {MasterAccount} from '@prisma/generated';
import {UserDto} from "@shared/dto/user.dto";


export class UserAdapter {
    public static getUsers(masterAccounts: MasterAccount[]): UserDto[] {
        return masterAccounts.map((account) => ({
            id: account.id,
            email: account.email,
            password: account.password,
            createdAt: account.createdAt,
        }))
    }
}
