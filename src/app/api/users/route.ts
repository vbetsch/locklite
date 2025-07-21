import {UserService} from "@api/services/userService";
import {UserDto} from "@shared/dto/user.dto";

export async function GET() {
    const users: UserDto[] = await UserService.getAll();
    return Response.json(users);
}
