import {Schema, model, models} from 'mongoose';

const UserSchema = new Schema(
    {
        video: {type: Schema.Types.ObjectId, ref: 'VideoDetails'},
        audio: {type: Schema.Types.ObjectId, ref: 'AudioDetails'},        
        mailType: {type: 'string', required: true, unique: false},
        inbox: {type: Schema.Types.ObjectId, ref: 'Inbox'},
        letter: {type: Schema.Types.ObjectId, ref: 'Letter'},
    }
)

const User = models.User || model("User", UserSchema)

export default User