const constant = ({
    DB_NAME: process.env.DB_NAME,
    MODELS: {
        user: 'users',
        product: 'products',
        cart: 'carts',
        category: 'categories'
    }
});

module.exports = constant;