import nodemailer from "nodemailer";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, email, message} = req.body;

    // Validate fields
    if (!name || !email || !message) {
        return res.status(400).json({ message: "All required fields must be filled." });
    }

    // Create transporter using your Gmail App Password
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    try {
        // Email structure
        const mailOptions = {
            from: `"My Portfolio Contact Form" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_TO,
            subject: `Portfolio Message from ${name}`,
            html: `
                <h2>New Contact Form Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br>${message}</p>
            `
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error("Email sending error:", error);
        return res.status(500).json({ message: "Failed to send message." });
    }
}
