import asyncHandler from "express-async-handler";
import twilio from "twilio";
import { config } from "dotenv";
config();
import createChat from "./chatgptController.js";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
// FIXME: This auth token always changing when the 24 hours sandbox is ended
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// TODO: Error Handler
const errorHandler = (error) => {
  let errors = { status: "" };
  console.log(error.code);
  // TODO: Check if authToken needs to be changed in Twilio
  // TODO: Check if the number is not registered or missing channel(WhatsApp, SMS)
  if (error.code === 63007) {
    errors.status =
      "Sending a message using a number that is not registered to Twilio";
    if (error.code === 20003) {
      errors.status =
        "The authToken needs to be changed, please refer to the Twilio console";
      return errors;
    }
  }
};

// TODO: Reply to incoming message
const replyMessage = asyncHandler(async (req, res) => {
  try {
    const receiverNumber = req.body.From;
    const senderNumber = req.body.To;
    const getMessage = req.body.Body;

    //TODO: Specify the ChatGPT message role adn message
    const chatMessages = [
        { role: "system", content: "You are a user. Limit the response 200 characters" },
        { role: "user", content: getMessage },
      ];
    
      //TODO : Get the response chat from ChatGPT
      const chatResponse = await createChat(chatMessages);

    const message = await client.messages.create({
      from: senderNumber,
      body:chatResponse,
      to: receiverNumber,
    });
    console.log(message);
    res
      .status(200)
      .json({ message: "Message sent successfully", response: message });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(500).json({ errors });
  }
});

export default replyMessage ;
