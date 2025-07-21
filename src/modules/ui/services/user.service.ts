import {UserDto} from "@shared/dto/user.dto";
import {RequestService} from "@shared/services/requestService";

export class UserService {
    public static async getAll(): Promise<UserDto[]> {
        return await RequestService.get<UserDto[]>('/api/users')
    }
}
