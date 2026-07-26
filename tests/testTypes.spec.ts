import { test } from '@playwright/test'

const testData = [
    1, 2, 3, 4, 5
];
for (const test_data of testData) {
    test(`${test_data} Test one`, async ({ }) => {
        console.log('test one')
        if (test_data == 2) {
            test.abort()
        }
    })
}

test('second test ', async ({ }) => {
    console.log('second test after aboart')
    
})