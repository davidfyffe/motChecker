var fs = require('fs');
var nodeMailer = require('nodemailer');

describe('email tests', function () {

    it('should send email', function () {


        sendemail()

    })

});

function sendemail() {
    let transporter = nodeMailer.createTransport({
        host: 'smtpin.lmig.com',
        port: 25,
        // secure: true,
        // auth: {
        //     user: 'david.fyffe',
        //     pass: ''
        // }
    });
    let mailOptions = {
        from: '"MOT Checker" <me@here.com>', // sender address
        to: ["david.fyffe@abc.com"], // list of receivers
        subject: "MOT Cancellations", // Subject line
        text: "blank", // plain text body
        // html: '<b>NodeJS Email Tutorial</b>', // html body
        html: `<p>
<b>Hello</b> 
<!--to myself <img src="cid:note@example.com"/>-->

</p>
        <p>Here's a screen shot as embedded attachment:<br/><img src="cid:mot@example.com"/></p>`,
        attachments: [
            // {
            //     filename: 'notes.txt',
            //     content: 'Some notes about this e-mail',
            //     contentType: 'text/plain' // optional, would be detected from the filename
            // },

            // Binary Buffer attachment
            // {
            //     filename: 'image.png',
            //     content: Buffer.from(
            //         'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
            //         '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
            //         'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
            //         'base64'
            //     ),
            //
            //     cid: 'note@example.com' // should be as unique as possible
            // },

            // File Stream attachment
            {
                filename: 'foo.png',
                path: __dirname + '/foo.png',
                cid: 'mot@example.com' // should be as unique as possible
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });
}





