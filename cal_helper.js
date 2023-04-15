if (typeof require !== "undefined") {
    MockData = require("./MockData.js");
 }
 
 let CalendarData = (function () {
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
       "Id",
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
       "",
       "63cfb5e316dfc2b1fbca0efc",
       "yes",
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
       "",
       "63cfb9e169f341de3f3c4a3c",
       "yes",
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
       "Start Date of weekly meeting": "2023-04-09",
       "End Date of weekly meeting": "2023-06-01",
       "calenderId":"aarti.thakur@madgicaltechdom.com"
     };
     

   let mockData;
   if (typeof SpreadsheetApp === "undefined") {
     mockData = new MockData().addData("userData", _userData);
     mockData.addData("systemData", _systemData);
   }
 
   let _CalendarData = new WeakMap();
   class CalendarData {
     constructor() {
       if (mockData) {
         _CalendarData.set(this, mockData);
         return this;
       }
     }

     getCalendarContent() {
       let getUserData;
       let getSystemData;
       let lengthUserData;
 
       if (mockData) {
         getSystemData = _CalendarData.get(this).getData("systemData");
         
            
       } else {
         getUserData = SpreadsheetApp.getActiveSpreadsheet()
           .getSheetByName("user_configuration")
           .getDataRange()
           .getValues();
         getSystemData = SpreadsheetApp.getActiveSpreadsheet()
         .getSheetByName("System_configuration")
         .getDataRange()
         .getValues();
         lengthUserData = getUserData.length;
       }

       for (let i = 1; i < lengthUserData; i++) {
        let newUserEmail = getUserData[i][1];
        let is_user_invitedto_slack = getUserData[i][9];
        let newUserAddCalendar = getUserData[i][10];
      
        if (is_user_invitedto_slack === "yes" && newUserAddCalendar !== "yes") {
          let calendarId = getSystemData["calenderId"];
          let start_Date = new Date(getSystemData["Start Date of weekly meeting"]);
          let end_Date = new Date(getSystemData["End Date of weekly meeting"]);
          inviteUserToCalendar(calendarId, newUserEmail, start_Date, end_Date)
        }
      }
            
     return [getSystemData["calenderId"],getSystemData["Start Date of weekly meeting"],getSystemData["End Date of weekly meeting"]];
     
     }

     print() {
       console.log(JSON.stringify(this.get(row)));
       return true;
     }
   }
   return CalendarData;
 })();
 if (typeof module !== "undefined") module.exports = CalendarData;

 function inviteUserToCalendar(calendarId, newUserEmail, start_Date, end_Date) {
  let calendar = CalendarApp.getCalendarById(calendarId);

  if (calendar === null) {
    console.log("Calendar not found", calendarId);
    return;
  }

  let calEvents = calendar.getEvents(start_Date, end_Date);

  for (let element of calEvents) {
    element.addGuest(newUserEmail);
  }
}