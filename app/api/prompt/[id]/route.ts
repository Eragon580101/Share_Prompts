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
        await connectToDatabase("getPromptsById");
        const id = req.url.split('/prompt/')[1]
        const prompts = await Prompt.findById(id).populate('creator')
        if (!prompts) return new Response('Prompt not found', {
            status: 404
        })
        return new Response(JSON.stringify(prompts), {
            status: 200
        });
    } catch (e) {
        return new Response('Failed to fetch prompts', {
            status: 500
        })
    }
}


export const PATCH = async (req: Request) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDatabase('GetPromptsUpdate');
        const id = req.url.split('/prompt/')[1]
        const existingPrompt = await Prompt.findById(id);
        if (!existingPrompt) return new Response('No prompt found', {
            status: 404
        })
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new Response('Failed to update the prompt', {
            status: 500
        })
    }
}

export const DELETE = async (req:Response)=>{
    try {
        await connectToDatabase("GetPromptsDELETE");
        const id = req.url.split('/prompt/')[1]
        await Prompt.findByIdAndRemove(id);
        return new Response('Prompt deleted Successfully',{
            status: 200
        })
    } catch (error) {
        console.log(error)
        return new Response('Failed to delete prompt',{
            status:500
        })
    }
}