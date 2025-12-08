# E-Commerce_coreModule

This is a RESTful API for an e-commerce system, including user authentication, category & product management, and a shopping cart system.

### 1. User (Authentication)
- **User Registration** – With validation
- **User Login** – JWT-based authentication
  - **Update Profile**
  - **Change Password**
  - **Forget Password** – With OTP/Token validation

### 2. Category Management
- **CRUD** operations for categories

### 3. Product Management
- **Create Product**
- **View Products**
  - Supports pagination, sorting, and filtering
- **Update Product**
- **Delete Product**

### 4. Cart System
- **Add Product to Cart**
  - If product exists, increase quantity (for logged-in users)
- **View Cart**
  - Includes total bill (for logged-in users)
- **Update Quantity**
- **Remove Product & Discard Cart**

- ### 4. Order Management
-  **Create order**
-  **Cancel order**


## Technologies Used
- Node.js
- Express.js
- MongoDB
- JWT for authentication

---
**Divyam Lathiya**
