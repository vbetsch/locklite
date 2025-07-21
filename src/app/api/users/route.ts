import {UserDto} from "@shared/dto/user.dto";
import {GetAllUsersUseCase} from "@api/usecases/get-all-users.usecase";

export async function GET() {
    const users: UserDto[] = await GetAllUsersUseCase.handle();
    return Response.json(users);
}
