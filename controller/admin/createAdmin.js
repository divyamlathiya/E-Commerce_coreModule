const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
});

const { encPass } = require('../../utilities/EncDec.js');
const adminRegister = require('../../models/adminRegister.model.js');
const connectDB = require('../../utilities/db.js');


async function createAdmin() {
    await connectDB();

    const password = process.env.adminPassword;

    const encryptedPassword = await encPass(password);
    
    await adminRegister.create({
        adminEmail: process.env.adminEmail,
        password: encryptedPassword,
        adminName: process.env.adminName,
        role: 'admin'
    });

    console.log('Admin created');
}

createAdmin();
