import {UserModelDto} from "@shared/dto/models/user.model.dto";
import {GetAllUsersUseCase} from "@api/usecases/get-all-users.usecase";
import {GetAllUsersResponseDto} from "@shared/dto/responses/get-all-users.response.dto";

export async function GET() {
    const users: UserModelDto[] = await GetAllUsersUseCase.handle();
    const response: GetAllUsersResponseDto = {users: users};
    return Response.json(response);
}
