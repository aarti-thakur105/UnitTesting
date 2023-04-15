if (typeof require !== "undefined") {
     UnitTestingApp = require("./UnitTestingApp.js");
     EmailUserData = require("./emailuser_helper.js");
  }
  
  function runTests() {
    const test = new UnitTestingApp();
    test.enable();
    test.clearConsole();
    
    const emailData = new EmailUserData();
    test.runInGas(false);
    test.printHeader("LOCAL TESTS");
  
    let userEmailContent = emailData.user_email_content();
    test.assert(
      () => userEmailContent["user_email"] === "aarti22@navgurukul.org",
      "user email is checked and it's correct"
    );
    test.assert(
      () =>
        userEmailContent["email_subject"] ===
        "Aarti Thakur : Offer Letter from Madgical Techdom (OPC) Pvt Ltd",
      "email subject is correct"
    );
    test.assert(
      () =>
        userEmailContent["email_body"] ===
        "Hi Aarti Thakur,\n" +
          "\n" +
          "Welcome Aarti Thakur! We're proud to have you become part of our team. We look forward to learning and growing alongside you for the years to come. You shall be a part of DevOps training and the training duration is ~ 12 weeks.\n" +
          "\n" +
          "We shall be assigning DevOps training tickets to you and you should start working on them whenever you start working with us.\n" +
          "\n" +
          "You should read our document(https://docs.google.com/document/d/1r6aUr47w5uvC7NLU4dJrBgPlWu4YSom6/edit) for the onboarding process and watch the videos to get familiar with the system. We shall invite you to the slack channel and our weekly meetings.\n" +
          "\n" +
          "Let me know if you have any questions.\n" +
          "\n" +
          "Best Regards,\n" +
          "Aarti Thakur",
      "email body is checked and it's correct"
    );
  
    test.runInGas(true);
    test.printHeader("ONLINE TESTS");
    test.assert(
      () => userEmailContent["user_email"] === "aarti22@navgurukul.org",
      "user email is checked and it's correct"
    );
    test.assert(
      () =>
        userEmailContent["email_subject"] ===
        "Aarti Thakur : Offer Letter from Madgical Techdom (OPC) Pvt Ltd",
        "email subject is correct"
        );
    test.assert(
      () =>
        userEmailContent["textMsg"] ===
        "Hi Aarti Thakur,\n" +
          "\n" +
          "Welcome Aarti Thakur! We're proud to have you become part of our team. We look forward to learning and growing alongside you for the years to come. You shall be a part of DevOps training and the training duration is ~ 12 weeks.\n" +
          "\n" +
          "We shall be assigning DevOps training tickets to you and you should start working on them whenever you start working with us.\n" +
          "\n" +
          "You should read our document(https://docs.google.com/document/d/1r6aUr47w5uvC7NLU4dJrBgPlWu4YSom6/edit) for the onboarding process and watch the videos to get familiar with the system. We shall invite you to the slack channel and our weekly meetings.\n" +
          "\n" +
          "Let me know if you have any questions.\n" +
          "\n" +
          "Best Regards,\n" +
          "Aarti Thakur",
      "email body is checked and it's correct"
    );
  }
  
  (function () {
    const IS_GAS_ENV = typeof ScriptApp !== "undefined";
  
    if (!IS_GAS_ENV) runTests();
  })();