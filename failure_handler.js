response = Map();
if(failed_response.get("action").equalsIgnoreCase("forward"))
{
	code = cause.get("code").toNumber();
	if(code == 1001)
	{
		// Outside business hours
		response.put("action","reply");
		response.put("replies",{"We're currently unavailable","Leave us a message and we will get back to you shortly."});
	}
	else if(code == 1002)
	{
		// operators_not_available
		response.put("action","reply");
		response.put("replies",{"All our agents are busy at the moment","Please leave us a message and we will get back to you"});
	}
	else if(code == 1003)
	{
		// invalid_operators - Operators may be disabled or invalid
		response.put("action","reply");
		response.put("replies",{"All our agents are busy at the moment","Leave us a message and we will get back to you"});
	}
}
return response;
