import {Schema, model, models} from 'mongoose';

const VideoDetailsSchema = new Schema(
    {
        videoLink: {type: 'string', required: false, unique: false},
        videoTitle: {type: 'string', required: false, unique: false},
    }
)

const VideoDetails = models.VideoDetails || model('VideoDetails', VideoDetailsSchema)

export default VideoDetails