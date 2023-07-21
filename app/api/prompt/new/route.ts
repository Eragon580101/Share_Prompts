import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@utils/database";
import Prompt from '@models/prompt'
import { getUserId } from "@utils/getUserInfo";
import { read } from "fs";
import { log } from "console";

export const POST = async (req: Request, res: NextApiResponse) => {
    const req_ =  await req.json()
    const { userId, prompt, tag } = req_;
    const user_id = await getUserId(userId)
    try {
        await connectToDatabase("createPrompt");
        const newPrompt = await Prompt.create({
            creator: user_id,
            prompt,
            tag
        })

        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {
            status: 200
        });

    } catch (e) {
        console.log(e)
        return new Response('Failed to create an prompt',{
            status: 500
        })
    }
}