if (typeof require !== "undefined") {
    MockData = require("./MockData.js");
  }
let EmailUserData = (function () {
    const _userData = [
      [
        "Name",
        "email",
        "System",
        "Project",
        "Is create user email sent",
        "is user assigned to a project",
        "Are tickets assigned",
        "Is Get Started Email Sent",
        "Id	Slack Channel (Comma separated)",
        "Google Meetings Id(Comma separated)",
      ],
      [
        "Aarti Thakur",
        "aarti22@navgurukul.org",
        "JIRA",
        "OnBoardingOne",
        "",
        "",
        "yes",
        "",
        "63cfb5e316dfc2b1fbca0efc",
        "",
        "",
      ],
      [
        "Honey Ray",
        "honey22@navgurukul.org",
        "JIRA",
        "OnBoardingTwo",
        "",
        "",
        "",
        "63cfb9e169f341de3f3c4a3c",
        "",
        "",
      ],
    ];
    const _systemData = {
        Key: "Value",
        Admin: "aarti22@navgurukul.org",
        "Admin Name" :	"Aarti Thakur",
        "Zoho PortalId": "134438000000025725",
        "Zoho Devops Training": "134438000000027045",
        "Zoho Data Engineering Training": "134438000000028015",
        "Slack Host": "",
        "Slack Token":"Bearer xoxb-5046153974372-5049535193555-yU7JZpmXfsGKN9jR7hvSAwAF",
        "Slack Channel": "C051C5RUD8C",
        "Start Date of weekly meeting": "2023-03-09",
        "End Date of weekly meeting": "2023-06-01",
    };
  
    const _email_Template= [
      ["Template Name", "Subject", "Body"],
      [
        "On Boarding",
        "<Name> : Offer Letter from Madgical Techdom (OPC) Pvt Ltd",
        "Hi <Name>,\n\nWelcome <Name>! We're proud to have you become part of our team. We look forward to learning and growing alongside you for the years to come. You shall be a part of DevOps training and the training duration is ~ 12 weeks.\n\nWe shall be assigning DevOps training tickets to you and you should start working on them whenever you start working with us.\n\nYou should read our document(https://docs.google.com/document/d/1r6aUr47w5uvC7NLU4dJrBgPlWu4YSom6/edit) for the onboarding process and watch the videos to get familiar with the system. We shall invite you to the slack channel and our weekly meetings.\n\nLet me know if you have any questions.\n\nBest Regards,\n<Admin Name>",
      ],
      [
        "New User",
        "Please create a user with <name> <email>",
        "This guy has joined us so please create a user in <System>",
      ],
    ];
  
    let mockData;
    if (typeof SpreadsheetApp === "undefined") {
      mockData = new MockData().addData("userData", _userData);
      mockData.addData("systemData", _systemData);
      mockData.addData("_email_Template", _email_Template);
    }
  
    let _EmailData = new WeakMap();
    class EmailUserData {
      constructor() {
        if (mockData) {
          _EmailData.set(this, mockData);
          return this;
        }
      }
  
      user_email_content() {
        let UserData;
        let emailTemplate;
        let system_data;
        if (mockData) {
          UserData = _EmailData.get(this).getData("userData");
          emailTemplate = _EmailData.get(this).getData("_email_Template");
          system_data = _EmailData.get(this).getData("systemData");
        } else {
          UserData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("user_configuration")
            .getDataRange()
            .getValues();
          emailTemplate = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("email_templates")
            .getDataRange()
            .getValues();
          system_data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("System_configuration").getDataRange().getValues();
        }

        for (let i = 1; i < UserData.length; i++) {
          let user_email = UserData[i][1];
          let newUserName = UserData[i][0];
          let are_tickets_assigned = UserData[i][6];
          let get_started_email = UserData[i][7];
  
          if (get_started_email !== "yes" && are_tickets_assigned == "yes") {            
            let email_body = emailTemplate[1][2];
            email_body = email_body.replace(/<Name>/g, newUserName).replace(/<Admin Name>/g, "Aarti Thakur");
            let email_subject = emailTemplate[1][1];
            email_subject = email_subject.replace(/<Name>/g, newUserName);
            return { user_email, email_subject, email_body };
          }
        }
      }
  
      print() {
        console.log(JSON.stringify(this.get(row)));
        return true;
      }
    }
    return EmailUserData;
  })();
  if (typeof module !== "undefined") module.exports = EmailUserData;