import { connectToDatabase } from "@utils/database";
import Prompt from '@models/prompt'
import { NextApiResponse } from "next";
import { Schema } from "mongoose";

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
        await connectToDatabase("getPrompts");
        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), {
            status: 200
        });
    } catch (e) {
        return new Response('Failed to fetch prompts', {
            status: 500
        })
    }
}