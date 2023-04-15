
if (typeof require !== "undefined") {
    MockData = require("./MockData.js");
 }

 let SlackData = (function () {
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
       "",
       "yes",
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
       "yes",
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
       "Slack Token":"Bearer xoxb-5046153974372-5049535193555-yU7JZpmXfsGKN9jR7hvSAwAF",
       "Slack Channel": "C051C5RUD8C",
       "Start Date of weekly meeting": "2023-03-09",
       "End Date of weekly meeting": "2023-06-01",

   };

   let mockData;
    if (typeof SpreadsheetApp === "undefined") {
      mockData = new MockData().addData("userData", _userData);
      mockData.addData("systemData", _systemData);
    }
  
    let _slack_data = new WeakMap();
    class SlackData {
      constructor() {
        if (mockData) {
          _slack_data.set(this, mockData);
          return this;
        }
        
      }
      slack_content() {
        let user_data;
        let system_data;
        if (mockData) {
            user_data = _slack_data.get(this).getData("userData");
          system_data = _slack_data.get(this).getData("systemData");
          
          
        }
        else {
            user_data =SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("user_configuration")
            .getDataRange().getValues();
            system_data = SpreadsheetApp.getActiveSpreadsheet()
            .getSheetByName("System_configuration")
            .getDataRange().getValues();

            
        }
        
        function handleSlackInvite() {
            for (let index = 1; index <user_data.length; index++) {
                let newUserEmail = user_data[index][1];
                let get_started_email_send = user_data[index][7];
                let newUserInviteSlack = user_data[index][9];
                let slackToken = system_data["Slack Token"];
                let slack_channel =system_data["Slack Channel"];          
              if (newUserInviteSlack !== "yes" && get_started_email_send === "yes") {
                let GetUserId= {
                    method: "get",
                    headers: {
                      Authorization: slackToken,
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    payload: {
                      email: newUserEmail,
                    },
                  };

                    let userLookupResponse = UrlFetchApp.fetch("https://slack.com/api/users.lookupByEmail", GetUserId);
                    let userLookupJson = JSON.parse(userLookupResponse.getContentText());
                    let userId = userLookupJson.user.id;
                    Logger.log(userId);

                    let AddToChannel = {
                        method: "post",
                        headers: {
                        Authorization: slackToken,
                        "Content-Type": "application/json",
                        },
                        payload: JSON.stringify({
                        channel: slack_channel,
                        users: userId,
                        }),
                    };
                    UrlFetchApp.fetch("https://slack.com/api/conversations.invite", AddToChannel);
            }
            }
            return [
              system_data["Slack Token"],
              system_data["Slack Channel"],
            ];
          }
          return handleSlackInvite;
}
print() {
    console.log(JSON.stringify(this.get(row)));
    return true;
  }
}
return SlackData;
})();
if (typeof module !== "undefined") module.exports = SlackData;


            

