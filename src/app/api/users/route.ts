import {UserRepository} from "@api/repositories/user.repository";
import {UserDto} from "@shared/dto/user.dto";

export async function GET() {
    const users: UserDto[] = await UserRepository.getAll();
    return Response.json(users);
}
