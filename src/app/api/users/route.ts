import {UserService} from "@/services/userService";

export async function GET() {
    const users = await UserService.getAllEntries();
    return Response.json(users);
}
