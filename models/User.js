const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');

/* needs the following items
String
Unique
Required
Trimmed
*/

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            match: /.+\@.+\..+/,
            unique: true,
        },
        
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
        
    },
    {
        toJSON: {
            virtuals: true,
            //getters: true
        }
        //unsure if friendCount code is right here

    }
);

UserSchema.virtual('friendCount').get(function (){
    return this.friends.length
})
//Create a virtual property that's computed from the front part of 'email' before the @ symbol
/*UserSchema.virtual('username').get(function(){
    return this.email.slice(0, this.email.indexOf('@'))
})
*/

const User = model('User', UserSchema);

module.exports = User;