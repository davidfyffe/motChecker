var fs = require('fs');
var nodeMailer = require('nodemailer');

describe('mot home page', function () {

    beforeEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    });

    it('should open mot homepage', function () {
        browser.waitForAngularEnabled(false);
        browser.get('https://www.dvtaonlineni.gov.uk/public/changeVehicleAppointment_1CollectInfo.aspx');

        element(by.id("slotBookingRef")).sendKeys('9');
        element(by.id('BSP_Vehicle_VRN')).sendKeys('TEZ');
        element(by.id('vehChassisNo4Digits')).sendKeys('4315');
        element(by.id('nextButton')).click();

        element(by.id('vehDetailsConfirmed')).click();
        element(by.id('nextButton')).click();

        element(by.id('slotTestCentre')).click();

        element(by.cssContainingText('option', 'NEWTOWNARDS')).click();

        element(by.id('nextButton')).click();

        function writeScreenShot(data, filename) {
            var stream = fs.createWriteStream(filename);
            stream.write(new Buffer(data, 'base64'));
            stream.end();
        }

        browser.takeScreenshot().then((png) => {
            // writeScreenShot(png, 'test/foo.png');
            sendemail(png)
        });

        browser.sleep(5000);

    })

});

function sendemail(buffer) {
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
        from: '"MOT Cancellation" <me@here.co.uk>', // sender address
        to: ["david.fyffe@abc.com"], // list of receivers
        subject: "MOT Cancellations", // Subject line
        text: "blank", // plain text body
        // html: '<b>NodeJS Email Tutorial</b>', // html body
        html: `<p>
<b>Hello</b> 
<!--to myself <img src="cid:note@example.com"/>-->

</p>
        <p>Here's a screen shot as embedded attachment:<br/><img src="cid:note@example.com"/></p>`,
        attachments: [
            // {
            //     filename: 'notes.txt',
            //     content: 'Some notes about this e-mail',
            //     contentType: 'text/plain' // optional, would be detected from the filename
            // },

            // Binary Buffer attachment
            {
                filename: 'image.png',
                content: Buffer.from(
                    buffer,
                    'base64'
                ),

                cid: 'note@example.com' // should be as unique as possible
            }

            // File Stream attachment
            // {
            //     filename: 'foo.png',
            //     path: __dirname + '/foo.png',
            //     cid: 'nyan@example.com' // should be as unique as possible
            // }
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





