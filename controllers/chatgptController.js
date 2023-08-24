import { config } from "dotenv";
import OpenAI from "openai";
config();

//TODO: Initialise or configure OpenAI-ChatGPT
//TODO: Create new instances of ChatGPT
const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY, // This is also the default, can be omitted
});

//TODO: Helper function for the createChat
const createChatCompletion = async (messages) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
      temperature: 1,
      max_tokens: 469,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createChat = async (messages) => {
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Invalid input");
    }

    return await createChatCompletion(messages);
  } catch (error) {
    throw new Error(error.message);
  }
};

export default createChat;
