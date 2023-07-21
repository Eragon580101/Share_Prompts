import { connectToDatabase } from "@utils/database";
import Prompt from '@models/prompt'
import { NextApiResponse } from "next";
import { Schema } from "mongoose";
import { getUserId } from "@utils/getUserInfo";


export interface Prompt {
    _id: Schema.Types.ObjectId,
    creator: {
        _id: Schema.Types.ObjectId,
        email: string,
        username: string,
        image: string,
    },
    prompt: string,
    tag: string
}

export const GET = async (req: Request, res: NextApiResponse) => {
    try {
        // Hack around to retrieve email from url
        const params = req.url.split('/users')[1].split('/').filter((param) => param !== '')[0]
        await connectToDatabase("getPromptsSingleUser");
        const user_id = await getUserId(params)
        const prompts = await Prompt.find({ creator: user_id }).populate('creator')
        return new Response(JSON.stringify(prompts), {
            status: 200
        });
    } catch (e) {
        console.log("error in GET prompts",e)
        return new Response('Failed to fetch prompts', {
            status: 500
        })
    }
}