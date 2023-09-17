const User = require('../Model/registerModel')
const Location =require('../Model/locationModel')

const register = async (req, res) => {
    try {
        const { firstName,
            lastName,
            email,
            country,
            state,
            city,
            gender,
            dateofBirth,
            age
        } = req.body
        console.log(req.body);

        const user = new User({
            firstName,
            lastName,
            email,
            country,
            state,
            city,
            gender,
            dateofBirth,
            age
        })

        await user.save();

        return res.status(200).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: 'Server error' });
    }
}


const loctions=async (req,res)=>{
    try{
        const location = await Location.find();

    console.log("countries", data);
    res.status(200).json(location);
        
    } catch(error){
        consol.log('Error',error)
        return res.status(500).json({error:'Server error'})
    }
}

const details = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users)
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

module.exports = {
    details,
    register,
    loctions
};
