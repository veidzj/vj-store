# Add Category

> ## Success case:
1. ✅ Receives a **POST** type request in the **/api/category** route
2. ✅ Validates required data **name**
3. ✅ Returns 200 with success message

> ## Exceptions:
1. ✅ Returns error 400 if **name** is not provided
2. ✅ Returns error 401 if request was not made by an **admin**
3. ✅ Returns error 500 if there is an error when trying to add the category
