// apiClient.ts
import { APIRequestContext } from '@playwright/test';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export class ApiClient {
    private readonly baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async createUser(request: APIRequestContext): Promise<User> {
        const response = await request.post(this.baseURL);
        return await response.json();
    }

    async getUserById(request: APIRequestContext, userId: number): Promise<User | null> {
        const response = await request.get(`${this.baseURL}/${userId}`);
        if (response.status() === 404) {
            return null;
        }
        return await response.json();
    }

    async deleteUser(request: APIRequestContext, userId: number): Promise<boolean> {
        const response = await request.delete(`${this.baseURL}/${userId}`);
        return response.status() === 200;
    }

    async deleteAllUsers(request: APIRequestContext): Promise<void> {
        const response = await request.get(this.baseURL);
        const users: User[] = await response.json();
        for (const user of users) {
            await this.deleteUser(request, user.id);
        }
    }
}