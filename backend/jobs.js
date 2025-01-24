const User = require('./models/User');
const getUserData =  async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findOne({ userId });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ ststus:true,statusCode:200, responseObject: {totalScore: user.totalScore, prizesWon: user.prizesWon,totalClick:user.clicks}});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const clickUserData = async (req, res) => {
    try {
        const { userId } = req.body;
        let existingUser = await User.findOne({ userId });
        if (!existingUser) {
            existingUser = new User({ userId });
            await existingUser.save();
        } 
        let reward = Math.random();
        if (reward < 0.5)  existingUser.totalScore += 10;
        if (reward < 0.25) existingUser.prizesWon += 1;
        existingUser.clicks +=1
        await existingUser.save();
        return res.json({
            totalScore: existingUser.totalScore, prizesWon: existingUser.prizesWon,totalClick:existingUser.clicks, ststu:true
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error'});
    }
};


module.exports = { clickUserData, getUserData };