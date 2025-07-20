import {UserService} from "@/services/userService";

export async function GET() {
    const users = await UserService.getAll();
    return Response.json(users);
}
