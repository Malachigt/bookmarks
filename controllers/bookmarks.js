const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Bookmarks = require("../models/bookmarks");
const getall = async (req, res) => {
    try {
        const allBookmarks = await Bookmarks.find({});
        res.status(200).json(allBookmarks);
    } catch (error) {
        res.status(500).json(error);
    }
};
const create = async (req, res) => {
    try {
        const bookmark = await Bookmarks.create(req.body);
        console.log(req.body);
        res.status(201).send();
    } catch (error) {
        res.status(400).json(error);
    }
};
const deleteBookmark = async (req, res) =>{
    try {
        const deleted = await Bookmarks.deleteOne({ _id: req.body._id });
        if (deleted.deletedCount < 1) {
            res.status(404).json(deleted);
        }
        res.status(200).json(deleted);
    } catch (error) {
        res.status(400).json(error);
    }
}
const update = async (req, res) => {
    try {
        const update = await Bookmarks.updateOne({ _id: req.body._id }, req.body);
        if (update.matchedCount < 1) {
            res.status(404).json(update);
        }
        res.status(200).json(update)
    } catch (error) {
        res.status(400).json(error);

    }
};
const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "username or email already exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error in user signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}
const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'your_secret_key_here', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error in user login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = { create, getall, update, deleteBookmark,login, signUp };
