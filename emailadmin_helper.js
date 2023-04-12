if (typeof require !== "undefined") {
    let MockData = require("./MockData.js");
  }
  
  let EmailAdminData = (function () {
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
        "yes",
        "",
        "63cfb9e169f341de3f3c4a3c",
        "",
        "",
      ],
    ];
    const _systemData = {
      Key: "Value",
      Admin: "aarti22@navgurukul.org",
      "Zoho PortalId": "134438000000025725",
      "Zoho Devops Training": "134438000000027045",
      "Zoho Data Engineering Training": "134438000000028015",
      "Slack Host": "",
      "Slack Token":"Bearer xoxb-5046153974372-5049535193555-yU7JZpmXfsGKN9jR7hvSAwAF",
      "Slack Channel": "C051C5RUD8C",
      "Start Date of weekly meeting": "2023-03-09",
      "End Date of weekly meeting": "2023-06-01",
    };
  
    const _emailTemplateData = [
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
      let MockData = require("./MockData.js");
      mockData = new MockData().addData("userData", _userData);
      mockData.addData("systemData", _systemData);
      mockData.addData("emailTemplateData", _emailTemplateData);
    }
  
    let _EmailData = new WeakMap();
    class EmailAdminData {
      constructor() {
        if (mockData) {
          _EmailData.set(this, mockData);
          return this;
        }
      }
  
      getAdminEmailContent() {
        let getUserData;
        let getSystemData;
        let lengthUserData;
        let emailTemplate;
        if (mockData) {
          getUserData = _EmailData.get(this).getData("userData");
          getSystemData = _EmailData.get(this).getData("systemData");
          emailTemplate = _EmailData.get(this).getData("emailTemplateData");
  
          lengthUserData = getUserData.length;
        } else {
          getUserData = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("UserConfiguration")
            .getDataRange()
            .getValues();
          emailTemplate = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("Email")
            .getDataRange()
            .getValues();
          getSystemData = get_settings();
          lengthUserData = getUserData.length;
        }
  
        for (let index = 1; index < lengthUserData; index++) {
          let newUserEmail = getUserData[index][1];
          let newUserSystem = getUserData[index][2];
          let newUserStatusAdminEmail = getUserData[index][4];
          let newUserName = getUserData[index][0];
          if (newUserStatusAdminEmail !== "yes") {
            let adminEmail = getSystemData["Admin"];
            let textMsg = emailTemplate[2][2];
            textMsg = textMsg.replace(/<System>/g, newUserSystem);
            let textSub = emailTemplate[2][1];
            textSub = textSub
              .replace(/<name>/g, newUserName)
              .replace(/<email>/g, newUserEmail);
            return { adminEmail, textSub, textMsg };
          }
        }
      }
      print() {
        console.log(JSON.stringify(this.get(row)));
        return true;
      }
    }
    return EmailAdminData;
  })();
  if (typeof module !== "undefined") module.exports = EmailAdminData;
