import nodemailer from "nodemailer";

export default async function handler(req, res) {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed",
        });

    }

    const { name, email, message } = req.body;

    try {

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,

            },

        });

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: `Portfolio Message from ${name}`,

            html: `
                <h2>New Portfolio Message</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Message:</strong></p>

                <p>${message}</p>
            `,

        });

        return res.status(200).json({
            success: true,
        });

    } catch (error) {

        return res.status(500).json({
            error: error.message,
        });

    }

}