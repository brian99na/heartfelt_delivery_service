import {Schema, model, models} from 'mongoose';

const AudioDetailsSchema = new Schema(
    {
        audioLink: {type: 'string', required: false, unique: false},
        audioTitle: {type: 'string', required: false, unique: false},
        audioArtist: {type: 'string', required: false, unique: false},
    }
)

const AudioDetails = models.AudioDetails || model('AudioDetails', AudioDetailsSchema)

export default AudioDetails