import {RequestService} from "@shared/services/requestService";
import {GetAllUsersResponseDto} from "@shared/dto/responses/get-all-users.response.dto";

export class UserService {
    public static async getAll(): Promise<GetAllUsersResponseDto> {
        return await RequestService.get<GetAllUsersResponseDto>('/api/users')
    }
}
