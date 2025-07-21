import {UserModelDto} from "@shared/dto/models/user.model.dto";
import {UserAdapter} from "@api/adapters/user.adapter";
import {UserRepository} from "@api/repositories/user.repository";
import {MasterAccount} from '@prisma/generated';

export class GetAllUsersUseCase {
    public static async handle(): Promise<UserModelDto[]> {
        let masterAccounts: MasterAccount[] | undefined;
        try {
            masterAccounts = await UserRepository.getAll();
        } catch (error) {
            console.error(error);
        }
        if (!masterAccounts) {
            // TODO: Raise error
            throw new Error("Master accounts not found");
        }
        return UserAdapter.getUsers(masterAccounts);
    }
}
