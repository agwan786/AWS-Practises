var AWS = require('aws-sdk');
var sqs = new AWS.SQS({
    region: 'ap-south-1'
});
exports.handler = function(event, context, callback) {
   var accountId = context.invokedFunctionArn.split(":")[4];
   console.log(accountId);
   var queueUrl = 'https://sqs.ap-south-1.amazonaws.com/' + accountId + '/MyQueue';
// response and status of HTTP endpoint
    console.log(queueUrl);
   var responseBody = {
     message: ''
   };
   var responseCode = 200;
// SQS message parameters
   var params = {
     MessageBody: event.body,
     QueueUrl: queueUrl
   };
   sqs.sendMessage(params, function(err, data) {
     if (err) {
         console.log('error:', "failed to send message" + err);
         var responseCode = 500;
     } else {
         console.log('data:', data.MessageId);
         responseBody.message = 'Sent to ' + queueUrl;
         responseBody.messageId = data.MessageId;
     }
     var response = {
         statusCode: responseCode,
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(responseBody)
     };
      callback(null, response);
   });
}