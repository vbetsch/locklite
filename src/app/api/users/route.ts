import {UserModelDto} from "@shared/dto/models/user.model.dto";
import {GetAllUsersUseCase} from "@api/usecases/users/get-all-users.usecase";
import {GetAllUsersResponseDto} from "@shared/dto/responses/get-all-users.response.dto";
import {UsersNotFoundError} from "@api/errors/users-not-found.error";

export async function GET() {
    try {
        const users: UserModelDto[] = await GetAllUsersUseCase.handle()
        const response: GetAllUsersResponseDto = {users}
        return Response.json(response, {status: 200})
    } catch (error) {
        if (error instanceof UsersNotFoundError) {
            return Response.json({error: error.message}, {status: 404})
        }
        return Response.json({error: 'Unknown error'}, {status: 500})
    }
}
