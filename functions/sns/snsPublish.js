const aws =  require("aws-sdk");
const sns = new aws.SNS({
   region:'ap-south-1'
});

exports.handler = async function(event, context, callback) {
   console.log("AWS lambda and SNS trigger ");
   console.log(event);
   const snsmessage = event.message;
   const phone = event.phone;
   console.log(snsmessage);
   sns.publish({
      Message: snsmessage,
      PhoneNumber: phone
   }, function (err, data) {
      if (err) {
         console.log(err);
         callback(err, null);
      } else {
         console.log(data);
         callback(null, data);
      } 
   });
};