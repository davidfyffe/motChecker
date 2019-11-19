# motChecker
Totally hacked together protractor test to open dvlni mot cancellations page and email a screen shot of the appointment table. 

Set this up to run every morning and you'll have an email with all appointments listed. 
### Start protractor & web driver locally.

```npm install -g protractor```

`webdriver-manager update`

`webdriver-manager start`

### Add cron job to check every morning. 
Cancellations are released at 8:30am. 

`crontab -l` to check existing jobs for the user

`crontab -e` to edit jobs. 

`30 09 * * 1-5 cd /Users/username/Workspaces/motChecker && /usr/local/bin/npm test` example job to run Mon-Fri at 9:30am. It cd's to the location of the code and just runs npm test to kick of the test.


# troubleshoot:
Problem with chromedriver version.  
`npm uninstall -g protractor`
`npm install -g protractor`
`webdriver-manager update`
`webdriver-manager start`
