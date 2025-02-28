import {Schema, model, models} from 'mongoose';

const LetterSchema = new Schema(
    {
        header: {type: 'string', required: true, unique: false},
        paragraph: {type: 'string', required: true, unique: false},
        footer: {type: 'string', required: true, unique: false}
    }
)

const Letter = models.Letter || model('Letter', LetterSchema)

export default Letter