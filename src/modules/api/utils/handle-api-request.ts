import {HttpError} from "@shared/errors/http-error";

export async function handleApiRequest<T>(callback: () => Promise<T>): Promise<Response> {
    try {
        const data: Awaited<T> = await callback()
        return Response.json(data, {status: 200})
    } catch (error) {
        if (error instanceof HttpError) {
            return Response.json({error: error.message}, {status: error.status})
        }
        console.error(error)
        return Response.json({error: 'Internal Server Error'}, {status: 500})
    }
}
