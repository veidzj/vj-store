# Sign Up

> ## Success case:
1. ⛔️ Receives a **POST** type request in the **/api/signup** route
2. ⛔️ Validates required data **name**, **email**, **password** and **passwordConfirmation**
3. ⛔️ Validate that the **name** field is a valid name
4. ⛔️ Validate that the **email** field is a valid email
5. ⛔️ Validate that the **password** field is a valid password
6. ⛔️ Validates that **password** and **passwordConfirmation** are the same
7. ⛔️ Validates if there is already a user with the provided email
8. ⛔️ Generates an encrypted password (this password cannot be decrypted)
9. ⛔️ Creates an account for the user with the data provided, replacing the password with the encrypted password
10. ⛔️ Generate an access token from the user ID
11. ⛔️ Update user data with generated access token
12. ⛔️ Returns 200 with access token

> ## Exceptions:
1. ⛔️ Returns 404 error if the API does not exist
2. ⛔️ Returns error 400 if **name**, **email**, **password** or **passwordConfirmation** are not provided
3. ⛔️ Returns error 400 if the **name** field is an invalid name
4. ⛔️ Returns error 400 if the **email** field is an invalid email
5. ⛔️ Returns error 400 if the **password** field is an invalid password
6. ⛔️ Returns error 400 if **password** and **passwordConfirmation** are not equal
7. ⛔️ Returns 403 error if provided email is already in use
8. ⛔️ Returns error 500 if there is an error when trying to generate an encrypted password
9. ⛔️ Returns error 500 if there is an error when trying to create the user account
10. ⛔️ Returns error 500 if there is an error when trying to generate the access token
11 ⛔️ Returns error 500 if there is an error when trying to update the user with the generated access token
