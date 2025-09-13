import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or use 'smtp.mailtrap.io' for testing
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your app password
  },
});

export async function sendEmail({ to, subject, text, html }) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

    console.log("Email Sent: " + info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// export async function sendEmail() {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Mail Test" <${process.env.EMAIL_USER}>`,
//       to: process.env.EMAIL_USER, // send it to yourself
//       subject: "✅ Gmail App Password Test",
//       text: "If you got this, your Nodemailer + Gmail App Password works!",
//     });

//     console.log("✅ Email sent:", info.response);
//     return info;
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// }
