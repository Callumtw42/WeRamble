import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {

    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.transporter({

        host: 'smtp.gmail.com',
        port: 587,
        secure: true, // use SSL
        auth: {
         user: 'account.user',
         pass: 'account.pass'
        }   
    });

    const mailOptions = {

        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: `<a href="${url}">${url}</a>` // html body
    }

    const info = await transporter.sendEmail(mailOptions);
}
