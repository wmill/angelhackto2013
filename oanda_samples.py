import requests

def get_exchange_rate(instrument):
	""" 
	Gets the current exchange rate for the instrument pair
	ie, USD_EUR, BTC_USD, XAU_USD, WHEAT_USD
	"""
	response = requests.get("http://api-sandbox.oanda.com/v1/instruments/%s/price" % instrument)
	return response.json
	
