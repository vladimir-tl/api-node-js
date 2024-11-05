import { test, expect } from '@playwright/test';
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API with loop', () => {

    test.beforeEach(async ({ request }) => {
        // get all users
        const response = await request.get(`${baseURL}`);
        const responseBody = await response.json()
        // get the number of objects in the array returned
        const numberOfObjects = responseBody.length;

        // create an empty array to store all user ID
        let userIDs = [];

        // loop through all users and store their ID in an array
        for (let i = 0; i < numberOfObjects; i++) {
            // get user ID from the response
            let userID = responseBody[i].id;
            // push is used to add elements to the end of an array
            userIDs.push(userID);
        }

        // delete all users in a loop using previously created array
        for (let i = 0; i < numberOfObjects; i++) {
            // delete user by id
            let response = await request.delete(`${baseURL}/${userIDs[i]}`);
            // validate the response status code
            expect.soft(response.status()).toBe(200);
        }

        // verify that all users are deleted
        const responseAfterDelete = await request.get(`${baseURL}`);
        expect(responseAfterDelete.status()).toBe(200);
        const responseBodyEmpty = await responseAfterDelete.text()
        // validate that the response is an empty array
        expect(responseBodyEmpty).toBe('[]');
    })


    test('GET / - should return empty when no users', async ({ request }) => {
        const response = await request.get(`${baseURL}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.text()
        expect(responseBody).toBe('[]');
    });

    test('Create few users and verify total number', async ({ request }) => {

    });

    test('Delete all users and verify empty response', async ({ request }) => {

    });

    // deleting one user does not affect the other users
    test('Delete one user and verify other users', async ({ request }) => {

    });

});
