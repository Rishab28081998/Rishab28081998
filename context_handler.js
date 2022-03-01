response = Map();
crm = Map();
empty = Map();
iname = "";
response.put("action","context");
response.put("context_id",context_id);
if(context_id.equals("browsing"))
{
	browsing = answers.get("browsing").get("text");
	if(browsing.equalsIgnoreCase("Thanks"))
	{
		response.put("action","end");
		response.put("replies",{"Have a great day"});
	}
	else
	{
		response.put("action","reply");
		response.put("replies",{"What else can I help you with?"});
		response.put("input",{"type":"select","options":{"I'm new here","just browsing","I'm an existing customer and need help","I want a product demo"}});
	}
}
else if(context_id.equals("talkopr"))
{
	if(!answers.containsKey("email"))
	{
		question = {"name":"email","replies":{{"text":"Please enter your work email","field_name":"siq_email"}}};
		response.put("questions",{question});
	}
	else
	{
		email = answers.get("email").get("text");
		crm.put("Email",email);
		if(!answers.containsKey("name"))
		{
			question = {"name":"name","replies":{{"text":"Please enter your first name and last name","field_name":"siq_name"}}};
			response.put("questions",{question});
		}
		else
		{
			name = answers.get("name").get("text");
			crm.put("Last_Name",name);
			info name;
			response.put("action","forward");
			response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
		}
	}
}
else if(context_id.equals("More"))
{
	app1 = answers.get("More").get("text");
	info app1;
	//iname = "Sync Simpro and " + more;
	if(!answers.containsKey("appname"))
	{
		question = {"name":"appname","replies":{{"text":"Please enter the second custom app name you want to integrate with " + app1}}};
		response.put("questions",{question});
	}
	else
	{
		simproZohoCRM = answers.get("appname").get("text");
		iname = "Sync " + app1 + " and " + simproZohoCRM;
		if(!answers.containsKey("email"))
		{
			question = {"name":"email","replies":{{"text":"Thanks for letting us know. Add your contact details and we'll be in touch to discuss about this integration from  " + app1 + " to " + simproZohoCRM + "\n\nPlease enter your work email","field_name":"siq_email"}}};
			response.put("questions",{question});
		}
		else
		{
			email = answers.get("email").get("text");
			crm.put("Email",email);
			if(!answers.containsKey("name"))
			{
				question = {"name":"name","replies":{{"text":"Please enter your first name and last name","field_name":"siq_name"}}};
				response.put("questions",{question});
			}
			else
			{
				name = answers.get("name").get("text");
				crm.put("Last_Name",name);
				info name;
				if(!answers.containsKey("phone"))
				{
					question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
					response.put("questions",{question});
				}
				else
				{
					phones = answers.get("phone").get("text");
					info phones;
					crm.put("Phone",phones);
					if(!answers.containsKey("companyname"))
					{
						question = {"name":"companyname","replies":{{"text":"Please enter company name"}}};
						response.put("questions",{question});
					}
					else
					{
						companyname = answers.get("companyname").get("text");
						crm.put("Company",companyname);
						if(!answers.containsKey("benifit"))
						{
							question = {"name":"benifit","replies":{{"text":"What's the main benefit you'd like to see after integrating these apps?"}}};
							response.put("questions",{question});
						}
						else
						{
							benifit = answers.get("benifit").get("text");
							iname = iname + " benefit is : " + benifit;
							crm.put("Description",iname);
							info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
							if(!answers.containsKey("human"))
							{
								question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
								response.put("questions",{question});
							}
							else
							{
								human = answers.get("human").get("text");
								info human;
								response.put("action","forward");
								response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
							}
						}
					}
				}
			}
		}
	}
}
else if(context_id.equals("Zoho"))
{
	info answers.get("Zoho").get("text");
	zohos = answers.get("Zoho").get("text");
	if(zohos.equalsIgnoreCase("simPRO") || zohos.equalsIgnoreCase("Google Sheets"))
	{
		iname = "Sync Zoho and " + zohos;
		if(!answers.containsKey("Zohocrm"))
		{
			question = {"name":"Zohocrm","replies":{{"text":"Great, We have the Zoho to " + zohos + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Email me Pricing","Book an Appointment with our team"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("Zohocrm").get("text");
			if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
			{
				crm = Map();
				empty = Map();
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								if(!answers.containsKey("num_of_emp"))
								{
									question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
									response.put("questions",{question});
								}
								else
								{
									num_of_emp = answers.get("num_of_emp").get("text");
									crm.put("Number_of_Employees",num_of_emp);
									if(!answers.containsKey("paid_user"))
									{
										question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
										response.put("questions",{question});
									}
									else
									{
										paid_user = answers.get("paid_user").get("text");
										info paid_user;
										crm.put("paid_user",paid_user);
										if(paid_user.equalsIgnoreCase("yes"))
										{
											if(!answers.containsKey("benifit"))
											{
												info "log";
												question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit").get("text");
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","Yes");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
										else
										{
											if(!answers.containsKey("benifit1"))
											{
												question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit1").get("text");
												info benifit;
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","No");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			//---------------->
			else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								crm.put("SalesIQ_Option_Selected","Appointment Booked");
								crm.put("Description",iname);
								crm.put("Lead_Source","Website Chat");
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
	else if(zohos.equalsIgnoreCase("more"))
	{
		//iname = "Sync Simpro and " + more;
		if(!answers.containsKey("appname"))
		{
			question = {"name":"appname","replies":{{"text":"Please Enter the Custom app name you want to integrate with Zoho"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("appname").get("text");
			iname = "Sync Zoho and " + simproZohoCRM;
			if(!answers.containsKey("email"))
			{
				question = {"name":"email","replies":{{"text":"Thanks for letting us know. Add your contact details and we'll be in touch to discuss about this integration from Zoho to " + simproZohoCRM + "\n\nPlease enter your work email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
				response.put("questions",{question});
			}
			else
			{
				email = answers.get("email").get("text");
				crm.put("Email",email);
				if(!answers.containsKey("name"))
				{
					question = {"name":"name","replies":{{"text":"Please Enter your first name and last name","field_name":"siq_name"}}};
					response.put("questions",{question});
				}
				else
				{
					name = answers.get("name").get("text");
					crm.put("Last_Name",name);
					if(!answers.containsKey("phone"))
					{
						question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
						response.put("questions",{question});
					}
					else
					{
						phones = answers.get("phone").get("text");
						info phones;
						crm.put("Phone",phones);
						if(!answers.containsKey("companyname"))
						{
							question = {"name":"companyname","replies":{{"text":"Please enter company name"}}};
							response.put("questions",{question});
						}
						else
						{
							companyname = answers.get("companyname").get("text");
							crm.put("Company",companyname);
							if(!answers.containsKey("benifit"))
							{
								question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
								response.put("questions",{question});
							}
							else
							{
								benifit = answers.get("benifit").get("text");
								iname = iname + " benifit is : " + benifit;
								crm.put("Description",iname);
								crm.put("Lead_Source","Website Chat");
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
}
else if(context_id.equals("Procore"))
{
	info answers.get("Procore").get("text");
	proc = answers.get("Procore").get("text");
	if(proc.equalsIgnoreCase("Onedrive") || proc.equalsIgnoreCase("Sharepoint") || proc.equalsIgnoreCase("Google Drive") || proc.equalsIgnoreCase("Dropbox"))
	{
		iname = "Sync Procore and " + proc;
		if(!answers.containsKey("QuickDrop"))
		{
			question = {"name":"QuickDrop","replies":{{"text":"Great, We have the Procore to " + proc + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Sign up Online Now","Email me Pricing","Book an Appointment with our team"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("QuickDrop").get("text");
			if(simproZohoCRM.equalsIgnoreCase("Sign up Online Now"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please enter your work email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("companyname"))
					{
						question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
						response.put("questions",{question});
					}
					else
					{
						company_name = answers.get("companyname").get("text");
						crm.put("Company",company_name);
						if(!answers.containsKey("name"))
						{
							question = {"name":"name","replies":{{"text":"Please enter your first name and last name","field_name":"siq_name"}}};
							response.put("questions",{question});
						}
						else
						{
							//Thank you for submitting your details. Please proceed by clicking the link below to get started with your integration right
							//"text":"let's get you started"
							//"https://integrations.syncezy.com/pages/register?email=" + crm.getJSON("Email") + "&name=" + answers.get("name").get("text") + ""
							name = answers.get("name").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
								response.put("questions",{question});
							}
							else
							{
								phones = answers.get("phone").get("text");
								info phones;
								crm.put("Phone",phones);
								crm.put("Last_Name",name);
								crm.put("Description",iname);
								crm.put("SalesIQ_Option_Selected","Sign Up");
								crm.put("Lead_Source","Website Chat");
								info crm;
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for submitting your details. Please proceed by clicking the link below to get started with your integration right away! ","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fmaxresdefault.jpg?alt=media&token=01634202-f08f-48c1-8eeb-13ab53958d6b","type":"links","links":{{"url":"https://integrations.syncezy.com/pages/register?email=" + crm.getJSON("Email") + "&name=" + answers.get("name").get("text") + "","text":"let's get you started"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
			else if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
			{
				crm = Map();
				empty = Map();
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								if(!answers.containsKey("num_of_emp"))
								{
									question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
									response.put("questions",{question});
								}
								else
								{
									num_of_emp = answers.get("num_of_emp").get("text");
									crm.put("Number_of_Employees",num_of_emp);
									if(!answers.containsKey("paid_user"))
									{
										question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
										response.put("questions",{question});
									}
									else
									{
										paid_user = answers.get("paid_user").get("text");
										info paid_user;
										crm.put("paid_user",paid_user);
										if(paid_user.equalsIgnoreCase("yes"))
										{
											if(!answers.containsKey("benifit"))
											{
												info "log";
												question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit").get("text");
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","Yes");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
										else
										{
											if(!answers.containsKey("benifit1"))
											{
												question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit1").get("text");
												info benifit;
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","No");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			//write here
			else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								crm.put("SalesIQ_Option_Selected","Appointment Booked");
								crm.put("Description",iname);
								crm.put("Lead_Source","Website Chat");
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
	else if(proc.equalsIgnoreCase("QuickBooks Time(Tsheets)"))
	{
		iname = "Sync Procore and " + proc;
		if(!answers.containsKey("SimproGreen"))
		{
			question = {"name":"SimproGreen","replies":{{"text":"Great, We have the Procore to " + proc + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Email me Pricing","Book an Appointment with our team"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("SimproGreen").get("text");
			if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
			{
				crm = Map();
				empty = Map();
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								if(!answers.containsKey("num_of_emp"))
								{
									question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
									response.put("questions",{question});
								}
								else
								{
									num_of_emp = answers.get("num_of_emp").get("text");
									crm.put("Number_of_Employees",num_of_emp);
									if(!answers.containsKey("paid_user"))
									{
										question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
										response.put("questions",{question});
									}
									else
									{
										paid_user = answers.get("paid_user").get("text");
										info paid_user;
										crm.put("paid_user",paid_user);
										if(paid_user.equalsIgnoreCase("yes"))
										{
											if(!answers.containsKey("benifit"))
											{
												info "log";
												question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit").get("text");
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","Yes");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
										else
										{
											if(!answers.containsKey("benifit1"))
											{
												question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit1").get("text");
												info benifit;
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","No");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			//---------------->
			else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								crm.put("SalesIQ_Option_Selected","Appointment Booked");
								crm.put("Description",iname);
								crm.put("Lead_Source","Website Chat");
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
	else if(proc.equalsIgnoreCase("more"))
	{
		//iname = "Sync Simpro and " + more;
		if(!answers.containsKey("appname"))
		{
			question = {"name":"appname","replies":{{"text":"Please Enter the Procore app name you want to integrate with Procore"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("appname").get("text");
			iname = "Sync Procore and " + simproZohoCRM;
			if(!answers.containsKey("email"))
			{
				question = {"name":"email","replies":{{"text":"Thanks for letting us know. Add your contact details and we'll be in touch to discuss about this integration from  Procore to " + simproZohoCRM + "\n\nPlease enter your work email"}}};
				response.put("questions",{question});
			}
			else
			{
				email = answers.get("email").get("text");
				crm.put("Email",email);
				if(!answers.containsKey("name"))
				{
					question = {"name":"name","replies":{{"text":"Please Enter your first name and last name","field_name":"siq_name"}}};
					response.put("questions",{question});
				}
				else
				{
					name = answers.get("name").get("text");
					crm.put("Last_Name",name);
					if(!answers.containsKey("phone"))
					{
						question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
						response.put("questions",{question});
					}
					else
					{
						phones = answers.get("phone").get("text");
						info phones;
						crm.put("Phone",phones);
						if(!answers.containsKey("companyname"))
						{
							question = {"name":"companyname","replies":{{"text":"Please enter company name"}}};
							response.put("questions",{question});
						}
						else
						{
							companyname = answers.get("companyname").get("text");
							crm.put("Company",companyname);
							if(!answers.containsKey("benifit"))
							{
								question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
								response.put("questions",{question});
							}
							else
							{
								benifit = answers.get("benifit").get("text");
								iname = iname + " benifit is : " + benifit;
								crm.put("Description",iname);
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
}
else if(context_id.equals("PropertyMe"))
{
	info answers.get("PropertyMe").get("text");
	prop = answers.get("PropertyMe").get("text");
	if(prop.equalsIgnoreCase("Mailchimp"))
	{
		iname = "Sync PropertyMe and " + prop;
		if(!answers.containsKey("QuickDrop"))
		{
			question = {"name":"QuickDrop","replies":{{"text":"Great, We have the PropertyMe to " + prop + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Sign up Online Now","Email me Pricing","Book an Appointment with our team"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("QuickDrop").get("text");
			if(simproZohoCRM.equalsIgnoreCase("Sign up Online Now"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please enter your work email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("companyname"))
					{
						question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
						response.put("questions",{question});
					}
					else
					{
						company_name = answers.get("companyname").get("text");
						crm.put("Company",company_name);
						if(!answers.containsKey("name"))
						{
							question = {"name":"name","replies":{{"text":"Please enter your first name and last name","field_name":"siq_name"}}};
							response.put("questions",{question});
						}
						else
						{
							//Thank you for submitting your details. Please proceed by clicking the link below to get started with your integration right
							//"text":"let's get you started"
							//"https://integrations.syncezy.com/pages/register?email=" + crm.getJSON("Email") + "&name=" + answers.get("name").get("text") + ""
							name = answers.get("name").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
								response.put("questions",{question});
							}
							else
							{
								phones = answers.get("phone").get("text");
								info phones;
								crm.put("Phone",phones);
								crm.put("Last_Name",name);
								crm.put("Description",iname);
								crm.put("SalesIQ_Option_Selected","Sign Up");
								crm.put("Lead_Source","Website Chat");
								info crm;
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for submitting your details. Please proceed by clicking the link below to get started with your integration right away! ","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fmaxresdefault.jpg?alt=media&token=01634202-f08f-48c1-8eeb-13ab53958d6b","type":"links","links":{{"url":"https://integrations.syncezy.com/pages/register?email=" + crm.getJSON("Email") + "&name=" + answers.get("name").get("text") + "","text":"let's get you started"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
			else if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
			{
				crm = Map();
				empty = Map();
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								if(!answers.containsKey("num_of_emp"))
								{
									question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
									response.put("questions",{question});
								}
								else
								{
									num_of_emp = answers.get("num_of_emp").get("text");
									crm.put("Number_of_Employees",num_of_emp);
									if(!answers.containsKey("paid_user"))
									{
										question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
										response.put("questions",{question});
									}
									else
									{
										paid_user = answers.get("paid_user").get("text");
										info paid_user;
										crm.put("paid_user",paid_user);
										if(paid_user.equalsIgnoreCase("yes"))
										{
											if(!answers.containsKey("benifit"))
											{
												info "log";
												question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit").get("text");
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","Yes");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
										else
										{
											if(!answers.containsKey("benifit1"))
											{
												question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit1").get("text");
												info benifit;
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","No");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								crm.put("SalesIQ_Option_Selected","Appointment Booked");
								crm.put("Description",iname);
								crm.put("Lead_Source","Website Chat");
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
	else if(prop.equalsIgnoreCase("PowerBI") || prop.equalsIgnoreCase("FieldMagic") || prop.equalsIgnoreCase("simPRO") || prop.equalsIgnoreCase("Servicem8"))
	{
		iname = "Sync Property Me and " + prop;
		if(!answers.containsKey("SimproGreen"))
		{
			question = {"name":"SimproGreen","replies":{{"text":"Great, We have the Property Me to " + prop + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Email me Pricing","Book an Appointment with our team"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("SimproGreen").get("text");
			if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
			{
				crm = Map();
				empty = Map();
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								if(!answers.containsKey("num_of_emp"))
								{
									question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
									response.put("questions",{question});
								}
								else
								{
									num_of_emp = answers.get("num_of_emp").get("text");
									crm.put("Number_of_Employees",num_of_emp);
									if(!answers.containsKey("paid_user"))
									{
										question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
										response.put("questions",{question});
									}
									else
									{
										paid_user = answers.get("paid_user").get("text");
										info paid_user;
										crm.put("paid_user",paid_user);
										if(paid_user.equalsIgnoreCase("yes"))
										{
											if(!answers.containsKey("benifit"))
											{
												info "log";
												question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit").get("text");
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","Yes");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
										else
										{
											if(!answers.containsKey("benifit1"))
											{
												question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit1").get("text");
												info benifit;
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","No");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			//---------------->
			else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								crm.put("SalesIQ_Option_Selected","Appointment Booked");
								crm.put("Description",iname);
								crm.put("Lead_Source","Website Chat");
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
	else if(prop.equalsIgnoreCase("more"))
	{
		//iname = "Sync Simpro and " + more;
		if(!answers.containsKey("appname"))
		{
			question = {"name":"appname","replies":{{"text":"Please Enter the Custom app name you want to integrate with PropertyMe"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("appname").get("text");
			iname = "Sync PropertyMe and " + simproZohoCRM;
			if(!answers.containsKey("email"))
			{
				question = {"name":"email","replies":{{"text":"Thanks for letting us know. Add your contact details and we'll be in touch to discuss about this integration from  PropertyMe to " + simproZohoCRM + "\n\nPlease enter your work email"}}};
				response.put("questions",{question});
			}
			else
			{
				email = answers.get("email").get("text");
				crm.put("Email",email);
				if(!answers.containsKey("name"))
				{
					question = {"name":"name","replies":{{"text":"Please Enter your first name and last name","field_name":"siq_name"}}};
					response.put("questions",{question});
				}
				else
				{
					name = answers.get("name").get("text");
					crm.put("Last_Name",name);
					if(!answers.containsKey("companyname"))
					{
						question = {"name":"companyname","replies":{{"text":"Please enter company name"}}};
						response.put("questions",{question});
					}
					else
					{
						companyname = answers.get("companyname").get("text");
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							crm.put("Company",companyname);
							if(!answers.containsKey("benifit"))
							{
								question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
								response.put("questions",{question});
							}
							else
							{
								benifit = answers.get("benifit").get("text");
								iname = iname + " benifit is : " + benifit;
								crm.put("Description",iname);
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
}
else if(context_id.equals("QuickBooks"))
{
	info answers.get("QuickBooks").get("text");
	quick = answers.get("QuickBooks").get("text");
	if(quick.equalsIgnoreCase("Dropbox") || quick.equalsIgnoreCase("Google Drive"))
	{
		iname = "Sync QuickBooks Time and " + quick;
		if(!answers.containsKey("QuickDrop"))
		{
			question = {"name":"QuickDrop","replies":{{"text":"Great, We have the QuickBooks Time to " + quick + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Sign up Online Now","Email me Pricing","Book an Appointment with our team"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("QuickDrop").get("text");
			if(simproZohoCRM.equalsIgnoreCase("Sign up Online Now"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please enter your work email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("companyname"))
					{
						question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
						response.put("questions",{question});
					}
					else
					{
						company_name = answers.get("companyname").get("text");
						crm.put("Company",company_name);
						if(!answers.containsKey("name"))
						{
							question = {"name":"name","replies":{{"text":"Please enter your first name and last name","field_name":"siq_name"}}};
							response.put("questions",{question});
						}
						else
						{
							//Thank you for submitting your details. Please proceed by clicking the link below to get started with your integration right
							//"text":"let's get you started"
							//"https://integrations.syncezy.com/pages/register?email=" + crm.getJSON("Email") + "&name=" + answers.get("name").get("text") + ""
							name = answers.get("name").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
								response.put("questions",{question});
							}
							else
							{
								phones = answers.get("phone").get("text");
								info phones;
								crm.put("Phone",phones);
								crm.put("Last_Name",name);
								crm.put("Description",iname);
								crm.put("SalesIQ_Option_Selected","Sign Up");
								crm.put("Lead_Source","Website Chat");
								info crm;
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for submitting your details. Please proceed by clicking the link below to get started with your integration right away! ","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fmaxresdefault.jpg?alt=media&token=01634202-f08f-48c1-8eeb-13ab53958d6b","type":"links","links":{{"url":"https://integrations.syncezy.com/pages/register?email=" + crm.getJSON("Email") + "&name=" + answers.get("name").get("text") + "","text":"let's get you started"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
			else if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
			{
				crm = Map();
				empty = Map();
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								if(!answers.containsKey("num_of_emp"))
								{
									question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
									response.put("questions",{question});
								}
								else
								{
									num_of_emp = answers.get("num_of_emp").get("text");
									crm.put("Number_of_Employees",num_of_emp);
									if(!answers.containsKey("paid_user"))
									{
										question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
										response.put("questions",{question});
									}
									else
									{
										paid_user = answers.get("paid_user").get("text");
										info paid_user;
										crm.put("paid_user",paid_user);
										if(paid_user.equalsIgnoreCase("yes"))
										{
											if(!answers.containsKey("benifit"))
											{
												info "log";
												question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit").get("text");
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","Yes");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
										else
										{
											if(!answers.containsKey("benifit1"))
											{
												question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit1").get("text");
												info benifit;
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","No");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								crm.put("SalesIQ_Option_Selected","Appointment Booked");
								crm.put("Description",iname);
								crm.put("Lead_Source","Website Chat");
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
			//yaha tak
		}
	}
	else if(quick.equalsIgnoreCase("SalesForce"))
	{
		iname = "Sync QuickBooks Time and " + quick;
		if(!answers.containsKey("QuickDrop"))
		{
			question = {"name":"QuickDrop","replies":{{"text":"Great, We have the QuickBooks Time to " + quick + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Email me Pricing","Book an Appointment with our team"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("QuickDrop").get("text");
			if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
			{
				crm = Map();
				empty = Map();
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								if(!answers.containsKey("num_of_emp"))
								{
									question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
									response.put("questions",{question});
								}
								else
								{
									num_of_emp = answers.get("num_of_emp").get("text");
									crm.put("Number_of_Employees",num_of_emp);
									if(!answers.containsKey("paid_user"))
									{
										question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
										response.put("questions",{question});
									}
									else
									{
										paid_user = answers.get("paid_user").get("text");
										info paid_user;
										crm.put("paid_user",paid_user);
										if(paid_user.equalsIgnoreCase("yes"))
										{
											if(!answers.containsKey("benifit"))
											{
												info "log";
												question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit").get("text");
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","Yes");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
										else
										{
											if(!answers.containsKey("benifit1"))
											{
												question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit1").get("text");
												info benifit;
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","No");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								crm.put("SalesIQ_Option_Selected","Appointment Booked");
								crm.put("Description",iname);
								crm.put("Lead_Source","Website Chat");
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
	else if(quick.equalsIgnoreCase("more"))
	{
		//iname = "Sync Simpro and " + more;
		if(!answers.containsKey("appname"))
		{
			question = {"name":"appname","replies":{{"text":"Please Enter the Custom app name you want to integrate with QuickBooks Time"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("appname").get("text");
			iname = "Sync QuickBooks and " + simproZohoCRM;
			if(!answers.containsKey("email"))
			{
				question = {"name":"email","replies":{{"text":"Thanks for letting us know. Add your contact details and we'll be in touch to discuss about this integration from QuickBooks to " + simproZohoCRM + "\n\nPlease enter your work email"}}};
				response.put("questions",{question});
			}
			else
			{
				email = answers.get("email").get("text");
				crm.put("Email",email);
				if(!answers.containsKey("name"))
				{
					question = {"name":"name","replies":{{"text":"Please Enter your first name and last name","field_name":"siq_name"}}};
					response.put("questions",{question});
				}
				else
				{
					name = answers.get("name").get("text");
					crm.put("Last_Name",name);
					if(!answers.containsKey("phone"))
					{
						question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
						response.put("questions",{question});
					}
					else
					{
						phones = answers.get("phone").get("text");
						info phones;
						crm.put("Phone",phones);
						if(!answers.containsKey("companyname"))
						{
							question = {"name":"companyname","replies":{{"text":"Please enter company name"}}};
							response.put("questions",{question});
						}
						else
						{
							companyname = answers.get("companyname").get("text");
							crm.put("Company",companyname);
							if(!answers.containsKey("benifit"))
							{
								question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
								response.put("questions",{question});
							}
							else
							{
								benifit = answers.get("benifit").get("text");
								iname = iname + " benifit is : " + benifit;
								crm.put("Description",iname);
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
}
else if(context_id.equals("simPRO"))
{
	info answers.get("simPRO").get("text");
	run = answers.get("simPRO").get("text");
	if(run.equalsIgnoreCase("Zoho CRM") || run.equals("XERO Payroll") || run.equals("DropBox") || run.equals("Quickbooks Time"))
	{
		iname = "Sync Simpro and " + run;
		if(!answers.containsKey("SimproZohoCRM"))
		{
			question = {"name":"SimproZohoCRM","replies":{{"text":"Great, We have the Simpro to " + run + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Sign up Online Now","Email me Pricing","Book an Appointment with our team"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("SimproZohoCRM").get("text");
			if(simproZohoCRM.equalsIgnoreCase("Sign up Online Now"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please enter your work email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("companyname"))
					{
						question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
						response.put("questions",{question});
					}
					else
					{
						company_name = answers.get("companyname").get("text");
						crm.put("Company",company_name);
						if(!answers.containsKey("name"))
						{
							question = {"name":"name","replies":{{"text":"Please enter your first name and last name","field_name":"siq_name"}}};
							response.put("questions",{question});
						}
						else
						{
							//Thank you for submitting your details. Please proceed by clicking the link below to get started with your integration right
							//"text":"let's get you started"
							//"https://integrations.syncezy.com/pages/register?email=" + crm.getJSON("Email") + "&name=" + answers.get("name").get("text") + ""
							name = answers.get("name").get("text");
							if(!answers.containsKey("phone"))
							{
								question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
								response.put("questions",{question});
							}
							else
							{
								phones = answers.get("phone").get("text");
								info phones;
								crm.put("Phone",phones);
								crm.put("Last_Name",name);
								crm.put("Description",iname);
								crm.put("SalesIQ_Option_Selected","Sign Up");
								crm.put("Lead_Source","Website Chat");
								info crm;
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for submitting your details. Please proceed by clicking the link below to get started with your integration right away! ","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fmaxresdefault.jpg?alt=media&token=01634202-f08f-48c1-8eeb-13ab53958d6b","type":"links","links":{{"url":"https://integrations.syncezy.com/pages/register?email=" + crm.getJSON("Email") + "&name=" + answers.get("name").get("text") + "","text":"let's get you started"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
			else if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
			{
				crm = Map();
				empty = Map();
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								if(!answers.containsKey("num_of_emp"))
								{
									question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
									response.put("questions",{question});
								}
								else
								{
									num_of_emp = answers.get("num_of_emp").get("text");
									crm.put("Number_of_Employees",num_of_emp);
									if(!answers.containsKey("paid_user"))
									{
										question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
										response.put("questions",{question});
									}
									else
									{
										paid_user = answers.get("paid_user").get("text");
										info paid_user;
										crm.put("paid_user",paid_user);
										if(paid_user.equalsIgnoreCase("yes"))
										{
											if(!answers.containsKey("benifit"))
											{
												info "log";
												question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit").get("text");
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","Yes");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
										else
										{
											if(!answers.containsKey("benifit1"))
											{
												question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit1").get("text");
												info benifit;
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","No");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								crm.put("SalesIQ_Option_Selected","Appointment Booked");
								crm.put("Description",iname);
								crm.put("Lead_Source","Website Chat");
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
			//till her
		}
	}
	else if(run.equalsIgnoreCase("PowerBI"))
	{
		iname = "Sync Simpro and " + run;
		if(!answers.containsKey("SimproGreen"))
		{
			question = {"name":"SimproGreen","replies":{{"text":"Great, We have the Simpro to " + run + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Email me Pricing","Book an Appointment with our team"}}};
			response.put("questions",{question});
		}
		else
		{
			simproZohoCRM = answers.get("SimproGreen").get("text");
			if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
			{
				crm = Map();
				empty = Map();
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								if(!answers.containsKey("num_of_emp"))
								{
									question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
									response.put("questions",{question});
								}
								else
								{
									num_of_emp = answers.get("num_of_emp").get("text");
									crm.put("Number_of_Employees",num_of_emp);
									if(!answers.containsKey("paid_user"))
									{
										question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
										response.put("questions",{question});
									}
									else
									{
										paid_user = answers.get("paid_user").get("text");
										info paid_user;
										crm.put("paid_user",paid_user);
										if(paid_user.equalsIgnoreCase("yes"))
										{
											if(!answers.containsKey("benifit"))
											{
												info "log";
												question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit").get("text");
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","Yes");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
										else
										{
											if(!answers.containsKey("benifit1"))
											{
												question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
												response.put("questions",{question});
											}
											else
											{
												benifit = answers.get("benifit1").get("text");
												info benifit;
												crm.put("benifit",benifit);
												iname = iname + " benifit is : " + benifit;
												crm.put("Description",iname);
												crm.put("SalesIQ_Option_Selected","Email Pricing");
												crm.put("Paid_user_of_both_apps","No");
												crm.put("Lead_Source","Website Chat");
												info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
												if(!answers.containsKey("human"))
												{
													question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
													response.put("questions",{question});
												}
												else
												{
													human = answers.get("human").get("text");
													info human;
													response.put("action","forward");
													response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			//---------------->
			else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					crm.put("Email",email);
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						crm.put("Last_Name",name);
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phones = answers.get("phone").get("text");
							info phones;
							crm.put("Phone",phones);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								crm.put("SalesIQ_Option_Selected","Appointment Booked");
								crm.put("Description",iname);
								crm.put("Lead_Source","Website Chat");
								info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
								if(!answers.containsKey("human"))
								{
									//response.put("action","reply");
									question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
									response.put("questions",{question});
								}
								else
								{
									human = answers.get("human").get("text");
									info human;
									response.put("action","forward");
									response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
								}
							}
						}
					}
				}
			}
		}
	}
	///
	else if(run.equalsIgnoreCase("More"))
	{
		if(!answers.containsKey("simPROmore"))
		{
			question = {"name":"simPROmore","replies":{"Hello, which app would you like to connect with simPRO ?"},"input":{"type":"select","options":{"Google Drive","Asana","hiPages","Salesforce","Encircle","Pipedrive","Infusionsoft","Mailchimp","OneDrive","iAuditor","Sharepoint","custom"}}};
			response.put("questions",{question});
		}
		else
		{
			more = answers.get("simPROmore").get("text");
			if(more.equalsIgnoreCase("Google Drive") || more.equals("Asana") || more.equals("Mailchimp") || more.equals("OneDrive") || more.equalsIgnoreCase("Sharepoint"))
			{
				iname = "Sync Simpro and " + more;
				if(!answers.containsKey("Simprother"))
				{
					question = {"name":"Simprother","replies":{{"text":"Great, We have the Simpro to " + more + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Sign up Online Now","Email me Pricing","Book an Appointment with our team"}}};
					response.put("questions",{question});
				}
				else
				{
					simproZohoCRM = answers.get("Simprother").get("text");
					if(simproZohoCRM.equalsIgnoreCase("Sign up Online Now"))
					{
						if(!answers.containsKey("email"))
						{
							question = {"name":"email","replies":{{"text":"Please enter your work email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							email = answers.get("email").get("text");
							crm.put("Email",email);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
								response.put("questions",{question});
							}
							else
							{
								company_name = answers.get("companyname").get("text");
								crm.put("Company",company_name);
								if(!answers.containsKey("name"))
								{
									question = {"name":"name","replies":{{"text":"Please enter your first name and last name","field_name":"siq_name"}}};
									response.put("questions",{question});
								}
								else
								{
									//Thank you for submitting your details. Please proceed by clicking the link below to get started with your integration right
									//"text":"let's get you started"
									//"https://integrations.syncezy.com/pages/register?email=" + crm.getJSON("Email") + "&name=" + answers.get("name").get("text") + ""
									name = answers.get("name").get("text");
									if(!answers.containsKey("phone"))
									{
										question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
										response.put("questions",{question});
									}
									else
									{
										phones = answers.get("phone").get("text");
										info phones;
										crm.put("Phone",phones);
										crm.put("Last_Name",name);
										crm.put("Description",iname);
										crm.put("SalesIQ_Option_Selected","Sign Up");
										crm.put("Lead_Source","Website Chat");
										info crm;
										info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
										if(!answers.containsKey("human"))
										{
											//response.put("action","reply");
											question = {"name":"human","replies":{{"text":"Thank you for submitting your details. Please proceed by clicking the link below to get started with your integration right away! ","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fmaxresdefault.jpg?alt=media&token=01634202-f08f-48c1-8eeb-13ab53958d6b","type":"links","links":{{"url":"https://integrations.syncezy.com/pages/register?email=" + crm.getJSON("Email") + "&name=" + answers.get("name").get("text") + "","text":"let's get you started"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
											response.put("questions",{question});
										}
										else
										{
											human = answers.get("human").get("text");
											info human;
											response.put("action","forward");
											response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
										}
									}
								}
							}
						}
					}
					else if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
					{
						crm = Map();
						empty = Map();
						if(!answers.containsKey("email"))
						{
							question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							email = answers.get("email").get("text");
							crm.put("Email",email);
							if(!answers.containsKey("name"))
							{
								question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
								response.put("questions",{question});
							}
							else
							{
								name = answers.get("name").get("text");
								crm.put("Last_Name",name);
								if(!answers.containsKey("phone"))
								{
									question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
									response.put("questions",{question});
								}
								else
								{
									phones = answers.get("phone").get("text");
									info phones;
									crm.put("Phone",phones);
									if(!answers.containsKey("companyname"))
									{
										question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
										response.put("questions",{question});
									}
									else
									{
										company_name = answers.get("companyname").get("text");
										crm.put("Company",company_name);
										if(!answers.containsKey("num_of_emp"))
										{
											question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
											response.put("questions",{question});
										}
										else
										{
											num_of_emp = answers.get("num_of_emp").get("text");
											crm.put("Number_of_Employees",num_of_emp);
											if(!answers.containsKey("paid_user"))
											{
												question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
												response.put("questions",{question});
											}
											else
											{
												paid_user = answers.get("paid_user").get("text");
												info paid_user;
												crm.put("paid_user",paid_user);
												if(paid_user.equalsIgnoreCase("yes"))
												{
													if(!answers.containsKey("benifit"))
													{
														info "log";
														question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
														response.put("questions",{question});
													}
													else
													{
														benifit = answers.get("benifit").get("text");
														crm.put("benifit",benifit);
														iname = iname + " benifit is : " + benifit;
														crm.put("Description",iname);
														crm.put("SalesIQ_Option_Selected","Email Pricing");
														crm.put("Paid_user_of_both_apps","Yes");
														crm.put("Lead_Source","Website Chat");
														info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
														if(!answers.containsKey("human"))
														{
															question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
															response.put("questions",{question});
														}
														else
														{
															human = answers.get("human").get("text");
															info human;
															response.put("action","forward");
															response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
														}
													}
												}
												else
												{
													if(!answers.containsKey("benifit1"))
													{
														question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
														response.put("questions",{question});
													}
													else
													{
														benifit = answers.get("benifit1").get("text");
														info benifit;
														crm.put("benifit",benifit);
														iname = iname + " benifit is : " + benifit;
														crm.put("Description",iname);
														crm.put("SalesIQ_Option_Selected","Email Pricing");
														crm.put("Paid_user_of_both_apps","No");
														crm.put("Lead_Source","Website Chat");
														info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
														if(!answers.containsKey("human"))
														{
															question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
															response.put("questions",{question});
														}
														else
														{
															human = answers.get("human").get("text");
															info human;
															response.put("action","forward");
															response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
					{
						if(!answers.containsKey("email"))
						{
							question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							email = answers.get("email").get("text");
							crm.put("Email",email);
							if(!answers.containsKey("name"))
							{
								question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
								response.put("questions",{question});
							}
							else
							{
								name = answers.get("name").get("text");
								crm.put("Last_Name",name);
								if(!answers.containsKey("phone"))
								{
									question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
									response.put("questions",{question});
								}
								else
								{
									phones = answers.get("phone").get("text");
									info phones;
									crm.put("Phone",phones);
									if(!answers.containsKey("companyname"))
									{
										question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
										response.put("questions",{question});
									}
									else
									{
										company_name = answers.get("companyname").get("text");
										crm.put("Company",company_name);
										crm.put("SalesIQ_Option_Selected","Appointment Booked");
										crm.put("Description",iname);
										crm.put("Lead_Source","Website Chat");
										info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
										if(!answers.containsKey("human"))
										{
											//response.put("action","reply");
											question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
											response.put("questions",{question});
										}
										else
										{
											human = answers.get("human").get("text");
											info human;
											response.put("action","forward");
											response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
										}
									}
								}
							}
						}
					}
				}
			}
			//iAuditor
			else if(more.equalsIgnoreCase("hiPages") || more.equalsIgnoreCase("Salesforce") || more.equalsIgnoreCase("Encircle") || more.equalsIgnoreCase("Pipedrive") || more.equalsIgnoreCase("Infusionsoft") || more.equalsIgnoreCase("iAuditor"))
			{
				iname = "Sync Simpro and " + more;
				if(!answers.containsKey("Simprother"))
				{
					question = {"name":"Simprother","replies":{{"text":"Great, We have the Simpro to " + more + " integration available for signup, How would you like to proceed ?"}},"input":{"type":"select","options":{"Email me Pricing","Book an Appointment with our team"}}};
					response.put("questions",{question});
				}
				else
				{
					simproZohoCRM = answers.get("Simprother").get("text");
					if(simproZohoCRM.equalsIgnoreCase("Email me Pricing"))
					{
						crm = Map();
						empty = Map();
						if(!answers.containsKey("email"))
						{
							question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							email = answers.get("email").get("text");
							crm.put("Email",email);
							if(!answers.containsKey("name"))
							{
								question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
								response.put("questions",{question});
							}
							else
							{
								name = answers.get("name").get("text");
								crm.put("Last_Name",name);
								if(!answers.containsKey("phone"))
								{
									question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
									response.put("questions",{question});
								}
								else
								{
									phones = answers.get("phone").get("text");
									info phones;
									crm.put("Phone",phones);
									if(!answers.containsKey("companyname"))
									{
										question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
										response.put("questions",{question});
									}
									else
									{
										company_name = answers.get("companyname").get("text");
										crm.put("Company",company_name);
										if(!answers.containsKey("num_of_emp"))
										{
											question = {"name":"num_of_emp","replies":{{"text":"Select Number of Employees"}},"input":{"type":"select","options":{"0-10","10-100","100-500","500-1000","1000-10000"}}};
											response.put("questions",{question});
										}
										else
										{
											num_of_emp = answers.get("num_of_emp").get("text");
											crm.put("Number_of_Employees",num_of_emp);
											if(!answers.containsKey("paid_user"))
											{
												question = {"name":"paid_user","replies":{{"text":"Are you currently a paid user of both these apps ?"}},"input":{"type":"select","options":{"yes","no"}}};
												response.put("questions",{question});
											}
											else
											{
												paid_user = answers.get("paid_user").get("text");
												info paid_user;
												crm.put("paid_user",paid_user);
												if(paid_user.equalsIgnoreCase("yes"))
												{
													if(!answers.containsKey("benifit"))
													{
														info "log";
														question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
														response.put("questions",{question});
													}
													else
													{
														benifit = answers.get("benifit").get("text");
														crm.put("benifit",benifit);
														iname = iname + " benifit is : " + benifit;
														crm.put("Description",iname);
														crm.put("SalesIQ_Option_Selected","Email Pricing");
														crm.put("Paid_user_of_both_apps","Yes");
														crm.put("Lead_Source","Website Chat");
														info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
														if(!answers.containsKey("human"))
														{
															question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
															response.put("questions",{question});
														}
														else
														{
															human = answers.get("human").get("text");
															info human;
															response.put("action","forward");
															response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
														}
													}
												}
												else
												{
													if(!answers.containsKey("benifit1"))
													{
														question = {"name":"benifit1","replies":{{"text":"you will require a paid subscription to both the apps you've selected in order for us to proceed with the integration.\n\nwhat's the main benefit you'd like to see after integrating these apps?"}}};
														response.put("questions",{question});
													}
													else
													{
														benifit = answers.get("benifit1").get("text");
														info benifit;
														crm.put("benifit",benifit);
														iname = iname + " benifit is : " + benifit;
														crm.put("Description",iname);
														crm.put("SalesIQ_Option_Selected","Email Pricing");
														crm.put("Paid_user_of_both_apps","No");
														crm.put("Lead_Source","Website Chat");
														info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
														if(!answers.containsKey("human"))
														{
															question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
															response.put("questions",{question});
														}
														else
														{
															human = answers.get("human").get("text");
															info human;
															response.put("action","forward");
															response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					else if(simproZohoCRM.equalsIgnoreCase("Book an Appointment with our team"))
					{
						if(!answers.containsKey("email"))
						{
							question = {"name":"email","replies":{{"text":"Please Enter your work Email","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
							response.put("questions",{question});
						}
						else
						{
							email = answers.get("email").get("text");
							crm.put("Email",email);
							if(!answers.containsKey("name"))
							{
								question = {"name":"name","replies":{{"text":"Please Enter your first name and last Name","field_name":"siq_name"}}};
								response.put("questions",{question});
							}
							else
							{
								name = answers.get("name").get("text");
								crm.put("Last_Name",name);
								if(!answers.containsKey("phone"))
								{
									question = {"name":"phone","replies":{{"text":"Please enter phone number","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
									response.put("questions",{question});
								}
								else
								{
									phones = answers.get("phone").get("text");
									info phones;
									crm.put("Phone",phones);
									if(!answers.containsKey("companyname"))
									{
										question = {"name":"companyname","replies":{{"text":"Please Enter your Company Name"}}};
										response.put("questions",{question});
									}
									else
									{
										company_name = answers.get("companyname").get("text");
										crm.put("Company",company_name);
										crm.put("SalesIQ_Option_Selected","Appointment Booked");
										crm.put("Description",iname);
										crm.put("Lead_Source","Website Chat");
										info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
										if(!answers.containsKey("human"))
										{
											//response.put("action","reply");
											question = {"name":"human","replies":{{"text":"Thank you for chatting with us, please schedule a meeting to proceed further","image":"https://firebasestorage.googleapis.com/v0/b/viacom18-2dbfd.appspot.com/o/chat%2Fshake-up-sales-meeting-og.jpg?alt=media&token=4ad06d72-6ded-4610-8471-3bed0b7d3610","type":"links","links":{{"url":"https://book.syncezy.com/","text":"Schedule a meeting"}}}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
											response.put("questions",{question});
										}
										else
										{
											human = answers.get("human").get("text");
											info human;
											response.put("action","forward");
											response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
										}
									}
								}
							}
						}
					}
				}
			}
			else if(more.equalsIgnoreCase("custom"))
			{
				//iname = "Sync Simpro and " + more;
				if(!answers.containsKey("appname"))
				{
					question = {"name":"appname","replies":{{"text":"Please Enter the Custom app name you want to integrate with Simpro"}}};
					response.put("questions",{question});
				}
				else
				{
					simproZohoCRM = answers.get("appname").get("text");
					iname = "Sync Simpro and " + simproZohoCRM;
					if(!answers.containsKey("email"))
					{
						question = {"name":"email","replies":{{"text":"Thanks for letting us know. Add your contact details and we'll be in touch to discuss about this integration from Simpro to " + simproZohoCRM + "\n\nPlease enter your work email"}}};
						response.put("questions",{question});
					}
					else
					{
						email = answers.get("email").get("text");
						crm.put("Email",email);
						if(!answers.containsKey("name"))
						{
							question = {"name":"name","replies":{{"text":"Please Enter your first name and last name","field_name":"siq_name"}}};
							response.put("questions",{question});
						}
						else
						{
							name = answers.get("name").get("text");
							crm.put("Last_Name",name);
							if(!answers.containsKey("companyname"))
							{
								question = {"name":"companyname","replies":{{"text":"Please enter company name"}}};
								response.put("questions",{question});
							}
							else
							{
								companyname = answers.get("companyname").get("text");
								crm.put("Company",companyname);
								if(!answers.containsKey("benifit"))
								{
									question = {"name":"benifit","replies":{{"text":"what's the main benefit you'd like to see after integrating these apps?"}}};
									response.put("questions",{question});
								}
								else
								{
									benifit = answers.get("benifit").get("text");
									iname = iname + " benifit is : " + benifit;
									crm.put("Description",iname);
									info zoho.crm.createRecord("Leads",crm,{"trigger":{"workflow"},"lar_id":"2848693000034048077"},"zohocrm");
									if(!answers.containsKey("human"))
									{
										question = {"name":"human","replies":{{"text":"Thank you for submitting your details. We will follow up with you shortly with a proposal.If you wish to connect with us you can reach us on any of the following numbers:\n\nAU  +61 2 9136 9448\nUSA : +1 720 500 9302\nUK: +44 203 670 1109\nNZ:  +64 9 303 2999"}},"input":{"type":"select","options":{"Speak with one of our integration gurus"}}};
										response.put("questions",{question});
									}
									else
									{
										human = answers.get("human").get("text");
										info human;
										response.put("action","forward");
										response.put("replies",{"Thanks for contacting us today, You will be connected to our operator shortly"});
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
else if(context_id.equals("help"))
{
	help = answers.get("help").get("text");
	info help;
	if(help.equalsIgnoreCase("Questions about the product"))
	{
		if(!answers.containsKey("elsepart"))
		{
			question = {"name":"elsepart","replies":{"Sure! You might want to check out the [Resources page](https://www.zoho.com/social/help/) . It has a product guide, answers to frequently asked questions, and more.","Is there any thing else that I can assist you with?"},"input":{"type":"select","options":{"Yes, I need help","No, Thank you"}}};
			response.put("questions",{question});
		}
		else
		{
			elsepart = answers.get("elsepart").get("text");
			if(elsepart.equalsIgnoreCase("Yes, I need help"))
			{
				if(!answers.containsKey("email"))
				{
					question = {"name":"email","replies":{{"text":"Can I have your email address so that we can reach you in case the chat gets disconnected","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
					response.put("questions",{question});
				}
				else
				{
					email = answers.get("email").get("text");
					if(!answers.containsKey("name"))
					{
						question = {"name":"name","replies":{{"text":"Can I have your name please?","field_name":"siq_name"}}};
						response.put("questions",{question});
					}
					else
					{
						name = answers.get("name").get("text");
						if(!answers.containsKey("phone"))
						{
							question = {"name":"phone","replies":{{"text":"Can I have your phone number in case we need to reach out to you for further follow up","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
							response.put("questions",{question});
						}
						else
						{
							phone = answers.get("phone").get("text");
							response.put("action","forward");
							response.put("replies",{"Please wait while I forward the chat to agents"});
						}
					}
				}
			}
			else if(elsepart.equalsIgnoreCase("No, Thank you"))
			{
				if(!answers.containsKey("anythingelse"))
				{
					question = {"name":"anythingelse","replies":{"Is there any thing else that I can assist you with?"},"input":{"type":"select","options":{"Yes","No"}}};
					response.put("questions",{question});
				}
				else
				{
					anythingelse = answers.get("anythingelse").get("text");
					if(anythingelse.equalsIgnoreCase("Yes"))
					{
						response = Map();
						response.put("action","reply");
						response.put("replies",{"Hello there! 👋 Looking for anything specific?"});
						response.put("suggestions",{"I'm looking for support / Existing Customer","I' m looking for an integration / Sales Enquiry","Accounts / Billing Query"});
						return response;
					}
					else
					{
						response.put("action","end");
						response.put("replies",{"Bye"});
					}
				}
			}
		}
	}
	else if(help.equalsIgnoreCase("Sales Enquiry"))
	{
		if(!answers.containsKey("email"))
		{
			question = {"name":"email","replies":{{"text":"Can I have your email address so that we can reach you in case the chat gets disconnected","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
			response.put("questions",{question});
		}
		else
		{
			email = answers.get("email").get("text");
			if(!answers.containsKey("name"))
			{
				question = {"name":"name","replies":{{"text":"Can I have your name please?","field_name":"siq_name"}}};
				response.put("questions",{question});
			}
			else
			{
				name = answers.get("name").get("text");
				if(!answers.containsKey("phone"))
				{
					question = {"name":"phone","replies":{{"text":"Can I have your phone number in case we need to reach out to you for further follow up","validate":{"format":"phoneno","error":{"Enter a valid phone number"}},"field_name":"siq_phone"}}};
					response.put("questions",{question});
				}
				else
				{
					phone = answers.get("phone").get("text");
					response.put("action","forward");
					response.put("replies",{"Please wait while I forward the chat to agents"});
				}
			}
		}
	}
	else if(help.equalsIgnoreCase("Can't find what I'm looking for"))
	{
		if(!answers.containsKey("email"))
		{
			question = {"name":"email","replies":{"Uh-oh! Sorry about that.",{"text":"Do you have an email address where we can reach you?","validate":{"format":"email","error":{"Please enter a valid email"}},"field_name":"siq_email"}}};
			response.put("questions",{question});
		}
		else
		{
			email = answers.get("email").get("text");
			if(!answers.containsKey("name"))
			{
				question = {"name":"name","replies":{{"text":"What's your name?","field_name":"siq_name"}}};
				response.put("questions",{question});
			}
			else
			{
				// handle failure
				name = answers.get("name").get("text");
				response.put("action","forward");
				response.put("replies",{"Please wait while I transfer your chat to the agents"});
			}
		}
	}
	else
	{
		question = {"name":"help","replies":{"Welcome back! What do you need help with?"},"input":{"type":"select","options":{"Questions about the product","Sales Enquiry","Can't find what I'm looking for"}}};
		response.put("questions",{question});
	}
}
else if(context_id.equals("demo"))
{
	time = answers.get("time").get("text");
	if(!answers.containsKey("email"))
	{
		question = {"name":"email","replies":{{"text":"Do you have an email address where we can reach you?","field_name":"siq_email","validate":{"format":"email","error":{"Enter a valid email"}}}}};
		response.put("questions",{question});
	}
	else
	{
		email = answers.get("email").get("text");
		response.put("action","end");
		response.put("replies",{"Thanks! One of our product specialists will reach out to you soon."});
	}
}
return response;
