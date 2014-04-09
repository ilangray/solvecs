
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


var Mandrill = require('mandrill');
Mandrill.initialize('HYY4iULl5EHZ-q2-0aFjDg');

Parse.Cloud.define("send", function(request, response) {
  Mandrill.sendEmail({
    message: {
      text: request.params.body,
      subject: "Let's Solve CS!",
      from_email: "solve.computer.science@gmail.com",
      from_name: "Solve CS",
      to: [
        {
          email: "Anthony.Monaco@tufts.edu",
          name: "Anthony Monaco",
          type: "to"
        },
        {
          email: request.params.sender,
          name: request.params.name,
          type: "cc"
        },
        {
          email: "David.Harris@tufts.edu",
          name: "David Harris",
          type: "to"
        }
      ]
    },
    async: true
  }, {
    success: function(httpResponse) {
      console.log(httpResponse);
      response.success("Email sent!");
    },
    error: function(httpResponse) {
      console.error(httpResponse);
      response.error("Uh oh, something went wrong!");
    }
  });
});
