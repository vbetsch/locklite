export class RequestService {
    public static async get<T>(url: string): Promise<T> {
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    }

    public static async post<T>(url: string, body: unknown): Promise<T> {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    }

    public static async put<T>(url: string, body: unknown): Promise<T> {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    }

    public static async delete<T>(url: string): Promise<T> {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    }
}
