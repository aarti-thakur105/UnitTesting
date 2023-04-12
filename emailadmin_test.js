if (typeof require !== "undefined") {
    let UnitTestingApp = require("./UnitTestingApp.js");
    let EmailAdminData = require("./emailadmin_helper.js");
  }
  
  function runTests() {
    let UnitTestingApp = require("./UnitTestingApp.js");
    let EmailAdminData = require("./emailadmin_helper.js");

    const test = new UnitTestingApp();
    test.enable();
    test.clearConsole();
    const emailData = new EmailAdminData();
  
    test.runInGas(false);
    test.printHeader("LOCAL TESTS");
  
    let admilEmailContent = emailData.getAdminEmailContent();
    test.assert(
      () =>
        admilEmailContent["adminEmail"] === "aarti22@navgurukul.org",
      "Multiple rows Send Email to Admin Online"
    );
    test.assert(
      () =>
        admilEmailContent["textSub"] ===
        "Please create a user with Aarti Thakur aarti22@navgurukul.org",
      "Multiple rows Send Email to Admin Online"
    );
    test.assert(
      () =>
        admilEmailContent["textMsg"] ===
        "This guy has joined us so please create a user in JIRA",
      "Multiple rows Send Email to Admin Online"
    );
  
    test.runInGas(true);
    test.printHeader("ONLINE TESTS");
    test.assert(
      () =>
        admilEmailContent["adminEmail"] === "aarti22@navgurukul.org",
      "Multiple rows Send Email to Admin Online"
    );
    test.assert(
      () =>
        admilEmailContent["textSub"] ===
        "Please create a user with Aarti Thakur aarti22@navgurukul.org",
      "Multiple rows Send Email to Admin Online"
    );
    test.assert(
      () =>
        admilEmailContent["textMsg"] ===
        "This guy has joined us so please create a user in JIRA",
      "Multiple rows Send Email to Admin Online"
    );
  }
  
  (function () {
    const IS_GAS_ENV = typeof ScriptApp !== "undefined";
    if (!IS_GAS_ENV) runTests();
  })();