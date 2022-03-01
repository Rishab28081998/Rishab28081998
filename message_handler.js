response = Map();
msg = message.get("text");
if(operation.equals("chat"))
{
	if(!msg.equalsIgnoreCase("I'm looking for support") && !msg.equalsIgnoreCase("I'm looking for an integration / Sales Enquiry / Get a Quote") && !msg.equalsIgnoreCase("Accounts / Billing Query") && !msg.equalsIgnoreCase("Transfer"))
	{
		response = Map();
		response.put("action","reply");
		response.put("replies",{"Hi Integration Seeker, how can we help you today ? "});
		response.put("input",{"type":"select","options":{"I'm looking for support","I'm looking for an integration / Sales Enquiry / Get a Quote","Accounts / Billing Query"}});
		return response;
	}
}
if(msg.equalsIgnoreCase("I'm looking for an integration / Sales Enquiry / Get a Quote"))
{
	response = Map();
	response.put("action","reply");
	response.put("replies",{"Hello, which apps would you like to integrate today?"});
	response.put("input",{"type":"select","options":{"simPRO","Zoho","Procore","QuickBooks Time(TSheets)","Property Me","Others"}});
	return response;
}
else if(msg.equalsIgnoreCase("simPRO"))
{
	response = Map();
	response.put("action","context");
	response.put("context_id","simPRO");
	question = {"name":"simPRO","replies":{"Hello, which app would you like to connect with simPRO ?"},"input":{"type":"select","options":{"Zoho CRM","XERO Payroll","PowerBI","DropBox","Quickbooks Time","More"}}};
	response.put("questions",{question});
	return response;
}
else if(msg.equalsIgnoreCase("Zoho"))
{
	response = Map();
	response.put("action","context");
	response.put("context_id","Zoho");
	question = {"name":"Zoho","replies":{"Which app would you like to connect with Zoho?"},"input":{"type":"select","options":{"Google Sheets","simPRO","More"}}};
	response.put("questions",{question});
	return response;
}
else if(msg.equalsIgnoreCase("QuickBooks Time(TSheets)"))
{
	response = Map();
	response.put("action","context");
	response.put("context_id","QuickBooks");
	question = {"name":"QuickBooks","replies":{" Hello,Which app would you like to connect with Quickbooks Time?"},"input":{"type":"select","options":{"Salesforce","Dropbox","Google Drive","More"}}};
	response.put("questions",{question});
	return response;
}
else if(msg.equalsIgnoreCase("Property Me"))
{
	response = Map();
	response.put("action","context");
	response.put("context_id","PropertyMe");
	question = {"name":"PropertyMe","replies":{"Hello,Which app would you like to connect with PropertyMe?"},"input":{"type":"select","options":{"FieldMagic","PowerBI","ServiceM8","Mailchimp","simPRO","More"}}};
	response.put("questions",{question});
	return response;
}
else if(msg.equalsIgnoreCase("Procore"))
{
	response = Map();
	response.put("action","context");
	response.put("context_id","Procore");
	question = {"name":"Procore","replies":{"Hello,Which app would you like to connect with Procore?"},"input":{"type":"select","options":{"Dropbox","Sharepoint","Google Drive","QuickBooks Time(Tsheets)","Onedrive","More"}}};
	response.put("questions",{question});
	return response;
}
else if(msg.equals("Others"))
{
	response = Map();
	response.put("action","context");
	response.put("context_id","More");
	question = {"name":"More","replies":{"Hello, please enter the app name you'd like to integrate today ?"}};
	response.put("questions",{question});
	return response;
}
else if(msg.equalsIgnoreCase("I'm looking for support"))
{
	response.put("action","context");
	response.put("context_id","talkopr");
	link1 = {"type":"links","text":"How can we help with your support query ?","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fprevie-image.jpg?alt=media&token=bef5c1b3-a570-427b-b7d2-e60f753f05c0","links":{{"url":"https://help.syncezy.com/portal/en/home","text":"Visit Knowledgebase / FAQ","icon":""}}};
	question = {"name":"help","replies":{link1},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
	response.put("questions",{question});
}
else if(msg.equalsIgnoreCase("Accounts / Billing Query"))
{
	response.put("action","context");
	response.put("context_id","demo");
	country_code = visitor.get("country_code");
	info country_code;
	question = {"name":"time","replies":{"The fastest way to reach our accounts team is via email on accounts@syncezy.com. Please send us an email and we will get back to you in one business day.\n\n Or if it is urgent you can reach us on the phone \n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
	response.put("questions",{question});
}
/*else if(msg.equalsIgnoreCase("Transfer"))
{
	response = invokeurl
	[
		url :"https://salesiq.zoho.com/api/v2/sales1.syncezy/operators"
		type :GET
	];
	//response.put("action","forward");
	//response.put("replies",{"Please wait while I forward the chat to agents"});
	info response;
}*/
else
{
	response = Map();
	response.put("action","reply");
	response.put("replies",{"Hi Integration Seeker, How can we help you today ? "});
	response.put("input",{"type":"select","options":{"I'm looking for support","I'm looking for an integration / Sales Enquiry / Get a Quote","Accounts / Billing Query"}});
	return response;
}
return response;
