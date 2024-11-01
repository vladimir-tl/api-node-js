// tests/api.spec.ts
import { test, expect } from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API', () => {

    test('GET / - should return all users', async ({ request }) => {
        const response = await request.get(`${baseURL}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.text()
        expect(responseBody).toBe('[]');
    });

    test('GET /:id - should return a user by ID', async ({ request }) => {

    });

    test('GET /:id - should return 404 if user not found', async ({ request }) => {

    });

    test('POST / - should add a new user', async ({ request }) => {

    });

    test('DELETE /:id - should delete a user by ID', async ({ request }) => {

    });

    test('DELETE /:id - should return 404 if user not found', async ({ request }) => {

    });


});
