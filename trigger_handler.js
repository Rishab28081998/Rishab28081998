response = Map();
response.put("action","reply");
response.put("type","Select");
response.put("replies",{"Hello integration seeker👋 How can we help you today?"});
// response.put("suggestions",{"I'm looking for support","I'm looking for an integration / Sales Enquiry / Get a Quote","Accounts / Billing Query"}); 
response.put("input",{"type":"select","options":{"I'm looking for support","I'm looking for an integration / Sales Enquiry / Get a Quote","Accounts / Billing Query"}});
// info response ;
return response;
