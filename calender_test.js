if (typeof require !== "undefined") {
    UnitTestingApp = require("./UnitTestingApp.js");
    CalendarData = require("./cal_helper.js");
  }
  
  function runTests() {
    const test = new UnitTestingApp();
    test.enable();
    test.clearConsole();
    const calendarData = new CalendarData();
  
    test.runInGas(false);
    test.printHeader("LOCAL TESTS");
  
    let calendarContent = calendarData.getCalendarContent();
    test.assert(
      () => calendarContent[0] === "aarti.thakur@madgicaltechdom.com",
      "Calender id is correct"
    );

    test.assert(
        ()=> calendarContent[1]==="2023-04-09",
        "start date is correct"
    )

    test.assert(
        ()=> calendarContent[2]==="2023-06-01",
        "end date is correct"
    )
  
    test.runInGas(true);
    test.printHeader("ONLINE TESTS");
  
    test.assert(
      () => calendarContent[0] === "aarti.thakur@madgicaltechdom.com",
      "Multiple rows create calendar on user Online"
    );

    test.assert(
        ()=> calendarContent["newUserEmail"]==="aarti22@navgurukul.org",
        "user id is correct"
    )

    test.assert(
        ()=> calendarContent["Start Date of weekly meeting"]==="2023-03-09",
        "start date is correct"
    )

    test.assert(
        ()=> calendarContent["End Date of weekly meeting"]==="2023-06-01",
        "end date is correct"
    )
  }
  
  (function () {
    const IS_GAS_ENV = typeof ScriptApp !== "undefined";
    if (!IS_GAS_ENV) runTests();
  })();