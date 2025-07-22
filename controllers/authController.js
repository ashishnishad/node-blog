const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User Created!' });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if(!user) res.status(400).json({ message: 'Invalid credentails' });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) res.status(400).json({ message: 'Invalid credentails' });

        const token = jwt.sign(
                                { id: user._id, role: user.role},
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: '1d'
                                }
                            );
       
        res.json({ 
            token,
            role: user.role,
            user: {id: user._id, name: user.name, email: user.email}
         });
    }catch(err){
        res.status(400).json({ error: err.message });
    }
}