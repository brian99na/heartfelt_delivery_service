import {Schema, model, models} from 'mongoose';

const InboxSchema = new Schema(
    {
        password: {type: 'string', required: false, unique: false},
        hint: {type: 'string', required: false, unique: false},
    },
)

const Inbox = models.Inbox || model('Inbox', InboxSchema)

export default Inbox