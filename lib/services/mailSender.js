// Service dedicated to sending emails
// Use the nodemailer library to send emails
'use strict';

const mailer = require('nodemailer');
const { Service } = require('@hapipal/schmervice');
require('dotenv').config();
module.exports = class MailSender extends Service {
    sendMail(to, subject, text, html = '', attachments = []) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: to,
                subject: subject,
                text: text,
                html: html
            };
            attachments.forEach(attachment => {
                if(attachment.filename && attachment.path)
                    mailOptions.attachments.push(attachment);
            });
            const transporter = mailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                }
            });
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        catch (err){
            throw new Error('Error sending email');
        }
    }

    sendGreetingMail(to) {
        const subject = 'Bienvenue sur Filmbrary !';
        const text = 'Bienvenue sur Filmbrary, votre nouvelle plateforme dédiée aux amateurs de cinéma ! Nous sommes ravis de vous compter parmi nous. Filmbrary vous offre un accès illimité à une vaste bibliothèque de films, des classiques intemporels aux dernières sorties. Découvrez, notez et partagez vos avis sur vos films préférés. Commencez dès maintenant votre voyage cinématographique avec nous et plongez dans l\'univers infini du cinéma. Bienvenue dans la famille Filmbrary !';
        this.sendMail(to, subject, text, '');
    }
}
