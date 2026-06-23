const twilio = require("twilio");

const client = twilio(

 process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN

  
);

async function sendMessage() {
  try {
    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919894715074",
      body: "✅ WhatsApp notification test successful!"
    });

    console.log(message.sid);
  } catch (err) {
    console.error(err);
  }
}

sendMessage();