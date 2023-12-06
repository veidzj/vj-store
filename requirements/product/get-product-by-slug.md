# Get Product By Slug

> ## Success case:
1. ✅ Receives a **GET** type request in the **/api/product/slug/:slug** route
2. ✅ Validate required data **slug**
3. ✅ Returns 200 with product

> ## Exceptions:
1. ✅ Returns error 400 if product was not found
2. ✅ Returns error 500 if there is an error when trying to get product by slug
