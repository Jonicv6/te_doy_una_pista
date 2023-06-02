const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const rutaLog = "/home/pi/Desktop/app_TeDoyUnaPista/src/routes/log.txt";
//Enviar un correo

router.post("/email/",  (req, res) => {
    const { from, to, subject, text, html } = req.body;
    //main().catch(console.error);
    //res.send('Correo electrónico enviado con éxito');
    try {
        sendMail(from, to, subject, text, html);
        res.status(200).json({ code: '200', message: 'Email enviado' });
    } catch (error) {
        res.status(500).json({ code: '500', message: 'Error al enviar email' });
        res.status(0).json({ code: '0', message: 'Error desconocido al enviar email' });
    }

});


async function sendMail(from, to, subject, text, html) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'margendesigndigital@gmail.com', // generated gmail user
                pass: 'mjkudrzchfovgcqn', // generated gmail password
            }
        });

        // Configurar el mensaje de correo electrónico
        const mailOptions = {
            from: from + "<margendesigndigital@gmail.com>", // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html, // html body
        };

        transporter.verify(function (error, success) {
            if (error) {
                console.log("ERROR VERIFY: " + error);
                throw error;
            } else {
                console.log("Server is ready to take our messages");
            }
        });

        // Enviar el correo electrónico
        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("ERROR SERVER: " + error);

                throw error;
            } else {
                return;
            }
        });

        return;

    } catch (error) {
        throw error;
    }
    /*
        await transporter.sendMail(mailOptions).then(info => {
            fs.appendFile(rutaLog, 'Correo electrónico enviado: ' + info.response + '\n');
            console.log('Correo electrónico enviado: ' + info.response);
            return res.status(201).json({
                msg: "you should receive an email"
            })
        }).catch(error => {
            fs.appendFile(rutaLog, error + '\n');
            console.error(error);
            return res.status(500).json({ error })
        });
        }*/
};

/*async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'casey12@ethereal.email', // generated ethereal user
            pass: 'X5KPwpWQQCzDrxKth3', // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hellooooo ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.json({ status: 'Email send - "Preview URL: %s"' + nodemailer.getTestMessageUrl(info), error: err });
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    // Configurar el transporte de correo electrónico
    /*const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "margendesigndigital@gmail.com", // generated ethereal user
            pass: "ypocubiutgfdedrm", // generated ethereal password
        },
    });*/

/*const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // true for 465, false for other ports
    auth: {
        user: emailFrom, // generated ethereal user
        pass: passFrom, // generated ethereal password
    },
    debug: true, // show debug output
    logger: true // log information in console
});*/


// DATOS DE ENVIO EMAIL ETHEREAL
/*const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'casey12@ethereal.email', // generated ethereal user
        pass: 'X5KPwpWQQCzDrxKth3', // generated ethereal password
    }
});
}*/

module.exports = router;