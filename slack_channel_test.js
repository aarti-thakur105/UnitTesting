if (typeof require !== "undefined") {
    UnitTestingApp = require("./UnitTestingApp.js");
    SlackData = require("./slack_channel_helper.js");
  }
  
  function runTests() {
    const test = new UnitTestingApp();
    test.enable();
    test.clearConsole();
    const slackData = new SlackData();
    test.runInGas(false);
    test.printHeader("LOCAL TESTS");
  
    let slackContent = slackData.slack_content();
    test.assert(
      () =>
        slackContent[0] ===
        "Bearer xoxb-5046153974372-5049535193555-yU7JZpmXfsGKN9jR7hvSAwAF",
      "Multiple rows User Add on Slack Online"
    );

    test.assert(
      () => slackContent[1] === "C051C5RUD8C",
      "Multiple rows  User Add on Slack Online"
    );
  
    test.runInGas(true);
    test.printHeader("ONLINE TESTS");
    test.assert(
      () =>
        slackContent[0] ===
        "Bearer xoxb-5046153974372-5049535193555-yU7JZpmXfsGKN9jR7hvSAwAF",
      "Multiple rows User Add on Slack Online"
    );
    test.assert(
      () => slackContent[1] === "C051C5RUD8C",
      "Multiple rows  User Add on Slack Online"
    );
  }
  
  (function () {
    const IS_GAS_ENV = typeof ScriptApp !== "undefined";
    if (!IS_GAS_ENV) runTests();
  })();