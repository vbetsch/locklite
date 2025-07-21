import {MasterAccount} from '@prisma/generated';
import {UserModelDto} from "@shared/dto/models/user.model.dto";


export class UserAdapter {
    public static getUsersFromMasterAccounts(masterAccounts: MasterAccount[]): UserModelDto[] {
        return masterAccounts.map((account) => ({
            id: account.id,
            email: account.email,
            password: account.password,
            createdAt: account.createdAt,
        }))
    }
}
