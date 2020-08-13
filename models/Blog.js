const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: String,
        enum: ['public', 'private'],
        default: 'private'
    }
}, { timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;