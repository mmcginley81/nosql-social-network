const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        // need to get the username of who created this thought... Through a virtual?
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            
        }
    }

);

ThoughtsSchema.virtual('reactionCount').get(function (){
    return this.reactions.length
})

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;