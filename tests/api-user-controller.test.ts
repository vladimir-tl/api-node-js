// apiUserControllerTests.test.ts
import { test, expect } from '@playwright/test';
import { ApiClient } from './api/apiClient';


const baseURL: string = 'http://localhost:3000/users';
const apiClient = new ApiClient(baseURL)

test.describe('User management API tests with API client', () => {

    test.beforeEach(async ({ request }) => {
        // Ensure a clean state by deleting all users before each test
        await apiClient.deleteAllUsers(request);
    });

    test('Delete all users and verify all are deleted', async ({ request }) => {
        await apiClient.deleteAllUsers(request);
        const response = await request.get(baseURL);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toEqual([]);
    });

    test('Create users and verify count', async ({ request }) => {
        const numberOfUsers = 4;
        const users = [];

        for (let i = 0; i < numberOfUsers; i++) {
            const user = await apiClient.createUser(request);
            users.push(user);
        }

        const response = await request.get(baseURL);
        const responseBody: Array<any> = await response.json();
        expect(responseBody).toHaveLength(numberOfUsers);
    });

    test('Create and delete a user, verify non-existence', async ({ request }) => {
        const user = await apiClient.createUser(request);
        const isDeleted = await apiClient.deleteUser(request, user.id);
        expect(isDeleted).toBe(true);

        const fetchedUser = await apiClient.getUserById(request, user.id);
        expect(fetchedUser).toBeNull();
    });

    test('Create multiple users, delete one, verify others exist', async ({ request }) => {
        const numberOfUsers = 4;
        const users: Array<{ id: number }> = [];

        for (let i = 0; i < numberOfUsers; i++) {
            const user = await apiClient.createUser(request);
            users.push(user);
        }

        // Delete the first user
        await apiClient.deleteUser(request, users[0].id);

        // Verify the other users still exist
        const response = await request.get(baseURL);
        const remainingUsers: Array<any> = await response.json();
        expect(remainingUsers).toHaveLength(numberOfUsers - 1);
        expect(remainingUsers.find(user => user.id === users[0].id)).toBeUndefined();
    });
});