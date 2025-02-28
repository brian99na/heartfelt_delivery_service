import connect from "@/lib/db"
import AudioDetails from "@/lib/modals/audioDetails"
import Inbox from "@/lib/modals/inbox"
import Letter from "@/lib/modals/letter"
import User from "@/lib/modals/user"
import VideoDetails from "@/lib/modals/videoDetails"
import { Types } from "mongoose"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
    try {
        const {searchParams} = new URL(request.url) 
        const userId = searchParams.get('userId')

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({message: 'Invalid User ID'}),
                {status: 400}
            )
        }

        await connect()
        const user = await User.findById(userId)
        const inbox = await Inbox.findById(user.inbox)
        const letter = await Letter.findById(user.letter)
        const video = await VideoDetails.findById(user.video)
        const audio = await AudioDetails.findById(user.audio)
        user['inbox'] = inbox
        user['letter'] = letter
        user['video'] = video
        user['audio'] = audio
        return new NextResponse(JSON.stringify(user), {status: 200})
    } catch (err: unknown) {
        return new NextResponse('Error fetching user: Error - ' + JSON.stringify(err), {status: 500})
    }
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json()
        await connect()
        const newLetter = new Letter(body.letter)
        const newInbox = new Inbox(body.inbox)
        const newVideo = new VideoDetails(body.video)
        const newAudio = new AudioDetails(body.audio)
        const newUser = new User({
            video: newVideo,
            audio: newAudio,
            mailType: body.mailType,
            letter: newLetter,
            inbox: newInbox
        })
        await newLetter.save()
        await newInbox.save()
        await newVideo.save()
        await newAudio.save()
        await newUser.save()
        return new NextResponse(JSON.stringify({message: 'User is created', user: newUser}), {status: 200})
    } catch (err: unknown) {
        return new NextResponse('Error creating users: Error - ' + JSON.stringify(err), {status: 500})
    }
}