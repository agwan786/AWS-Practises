exports.handler = function(event, context, callback) {
   console.log("AWS lambda and SNS trigger ");
   console.log(event);
   const sns = event.Records[0].Sns.Message;
   console.log(sns)
   callback(null, sns);
};