const mongoose = require('mongoose');
const { encPass } = require('../../utilities/EncDec.js');
const adminRegister = require('../../models/adminRegister.model.js');
const connectDB = require('../../utilities/db.js');
require('dotenv').config();

async function createAdmin() {
    // await connectDB();
    await mongoose.connect("mongodb://localhost:27017/E-commerce");

    // console.log('Password', process.env.adminPassword);
    const adminPassword = "1324"
    console.log('adminpass', adminPassword)
    const encryptedPassword = await encPass(adminPassword);
    
    await adminRegister.create({
        adminEmail: 'admin1@gmail.com',
        password: encryptedPassword,
        adminName: 'Super admin'
    });

    console.log('Admin created');
}

createAdmin();