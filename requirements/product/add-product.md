# Add Product

> ## Success case:
1. ✅ Receives a **POST** type request in the **/api/product** route
2. ✅ Validates required data **name**, **description**, **price**, **discountPercentage**, **category**, **ImageUrls** and **quantity**
3. ✅ Add **addedDate** when adding the product
3. ✅ Generate **slug** when adding the product
3. ✅ Returns 200 with success message

> ## Exceptions:
1. ✅ Returns error 400 if **name**, **description**, **price**, **discountPercentage**, **category**, **ImageUrls** or **quantity** are not provided
2. ✅ Returns error 400 if category was not found
3. ✅ Returns error 401 if request was not made by an **admin**
4. ✅ Returns error 500 if there is an error when trying to add the product
