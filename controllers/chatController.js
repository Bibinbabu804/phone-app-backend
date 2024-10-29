import Message from '../Models/chatSchema.js';

// Send a new message
export const sendMessage = async (req, res) => {
    try {
        const { sender, text } = req.body;
        const newMessage = new Message({ sender, text });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
};

// Get all chat messages
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving messages', error });
    }
};
