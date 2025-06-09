import requests
from datetime import datetime, timedelta
import json

def fetch_finnhub_ipos():
    token = "d11tn2pr01qjtpe8vcsgd11tn2pr01qjtpe8vct0"
    today = datetime.now().strftime("%Y-%m-%d")
    next_month = (datetime.now() + timedelta(days=30)).strftime("%Y-%m-%d")

    url = f"https://finnhub.io/api/v1/calendar/ipo?from={today}&to={next_month}&token={token}"
    response = requests.get(url)
    response.raise_for_status()

    data = response.json()
    print("Raw Finnhub API response:", json.dumps(data, indent=2))  # Debug log

    # Get the IPO calendar data
    ipos = data.get("ipoCalendar", [])
    if not isinstance(ipos, list):
        print("Warning: ipoCalendar is not a list:", type(ipos))
        ipos = []

    # Transform the data
    transformed_ipos = []
    for ipo in ipos:
        if not isinstance(ipo, dict):
            continue
            
        # Calculate average price from range
        price_range = str(ipo.get("price", "N/A"))
        avg_price = "N/A"
        if "-" in price_range:
            try:
                low, high = map(float, price_range.split("-"))
                avg_price = str(round((low + high) / 2, 2))
            except:
                pass

        # Calculate issue size in crores (assuming USD to INR conversion)
        total_value = ipo.get("totalSharesValue", 0)
        issue_size_crores = round(total_value * 0.0000001, 2)  # Convert to crores (1 crore = 10 million)

        transformed_ipo = {
            "IPO_Name": str(ipo.get("name", "N/A")),
            "Issue_Price": price_range,
            "Average_Price": avg_price,
            "Date": str(ipo.get("date", "N/A")),
            "Listing_Gains(%)": "N/A",
            "Market_Lot": str(ipo.get("numberOfShares", "N/A")),
            "Exchange": str(ipo.get("exchange", "N/A")),
            "Symbol": str(ipo.get("symbol", "N/A")),
            "Status": str(ipo.get("status", "N/A")),
            "CMP": "N/A",
            "Current_gains": "N/A",
            "Listing_Open": "N/A",
            "Listing_Close": "N/A",
            "QIB": 0,
            "HNI": 0,
            "RII": 0,
            "Issue_Size(crores)": str(issue_size_crores)
        }
        transformed_ipos.append(transformed_ipo)

    result = {
        "listed": [],
        "upcoming": transformed_ipos
    }
    
    print("Transformed IPO data:", json.dumps(result, indent=2))  # Debug log
    return result
