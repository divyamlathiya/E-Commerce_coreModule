const constant = ({
    DB_NAME: process.env.DB_NAME,
    MODELS: {
        user: 'users',
        product: 'products',
        cart: 'carts',
        category: 'categories',
        order: 'orders',
        orderItem: 'orderItems',
        payment: 'payments',
        admin: 'admins'
    }
});

module.exports = constant;
