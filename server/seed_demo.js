require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const forceSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log("Connected to MongoDB...");
    
    let demoUser = await User.findOne({ email: 'demo@socio.com' });
    if (!demoUser) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('123456', salt);
      demoUser = await User.create({ 
        username: 'DemoUser', 
        email: 'demo@socio.com', 
        password,
        about: 'This is a demo account automatically created for testing.' 
      });
      console.log('Demo user successfully created!');
    } else {
      console.log('Demo user already exists. Updating password to 123456 just in case.');
      const salt = await bcrypt.genSalt(10);
      demoUser.password = await bcrypt.hash('123456', salt);
      await demoUser.save();
      console.log('Demo user password reset to 123456!');
    }
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

forceSeed();
