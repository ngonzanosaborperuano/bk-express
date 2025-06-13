// genkit.config.js

import { googleAI } from '@genkit-ai/googleai';
import dotenv from 'dotenv';
import { genkit } from 'genkit';

dotenv.config();

const googleApiKey = process.env.GOOGLE_API_KEY;

if (!googleApiKey) {
    throw new Error('GOOGLE_API_KEY is required for Genkit to function.');
}

export async function configureGenkit() {
   /*const ai =*/ genkit({
    plugins: [
        googleAI({
            apiKey: googleApiKey,
        }),
    ],
    model: googleAI.model('gemini-2.0-flash'),
});
    // const { text } = await ai.generate('Hello, Gemini!');
    // console.log(text);
    // console.log('✅ Genkit configured with Google AI plugin.');
}
