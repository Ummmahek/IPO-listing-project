import requests
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import json

def get_ipo_sentiment(ipo_name):
    """
    Get sentiment analysis for an IPO using news articles
    """
    try:
        # Use NewsAPI to get news articles
        api_key = "YOUR_NEWS_API_KEY"  # You'll need to get this from newsapi.org
        url = f"https://newsapi.org/v2/everything?q={ipo_name} IPO&language=en&sortBy=publishedAt&apiKey={api_key}"
        
        response = requests.get(url)
        articles = response.json().get('articles', [])
        
        # Initialize VADER sentiment analyzer
        analyzer = SentimentIntensityAnalyzer()
        
        # Analyze sentiment for each article
        sentiments = []
        for article in articles[:10]:  # Analyze top 10 articles
            if article.get('description'):
                sentiment = analyzer.polarity_scores(article['description'])
                sentiments.append(sentiment['compound'])
        
        # Calculate average sentiment
        if sentiments:
            avg_sentiment = sum(sentiments) / len(sentiments)
            sentiment_label = "Positive" if avg_sentiment > 0.05 else "Negative" if avg_sentiment < -0.05 else "Neutral"
            
            return {
                "sentiment": sentiment_label,
                "score": round(avg_sentiment, 2),
                "articles_analyzed": len(sentiments)
            }
        
        return {
            "sentiment": "Neutral",
            "score": 0,
            "articles_analyzed": 0
        }
        
    except Exception as e:
        print(f"Error in sentiment analysis: {str(e)}")
        return {
            "sentiment": "Neutral",
            "score": 0,
            "articles_analyzed": 0,
            "error": str(e)
        }