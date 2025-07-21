import {UserService} from "@api/services/userService";

export async function GET() {
    const users = await UserService.getAll();
    return Response.json(users);
}
