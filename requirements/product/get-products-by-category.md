# Get Products By Category

> ## Success case:
1. ✅ Receives a **GET** type request in the **/api/product/category/:category** route
2. ✅ Validate required data **category**
2. ✅ Receives optional pagination **page** and **limit** queries
2. ✅ Receives optional sort **sortBy** query
3. ✅ Returns 200 with all products from a given category

> ## Exceptions:
1. ✅ Returns error 400 if category was not found
2. ✅ Returns error 500 if there is an error when trying to get products by category
