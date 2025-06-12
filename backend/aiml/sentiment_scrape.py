import requests
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import json

def get_ipo_sentiment(ipo_name):
    """
    Get sentiment analysis for an IPO using news articles
    """
    try:
        # Use NewsAPI to get news articles
        api_key = "9ae9c26a73f844c4b93df2216a0edc44"  
        url = f"https://newsapi.org/v2/everything?q={ipo_name} IPO&language=en&sortBy=publishedAt&apiKey={api_key}"
        
        response = requests.get(url)
        if response.status_code != 200:
            return {
                "sentiment": "Neutral",
                "score": 0,
                "articles_analyzed": 0,
                "error": "Failed to fetch news articles"
            }
            
        articles = response.json().get('articles', [])
        
        # Initialize VADER sentiment analyzer
        analyzer = SentimentIntensityAnalyzer()
        
        # Analyze sentiment for each article
        sentiments = []
        processed_articles = []
        for article in articles[:10]:  # Analyze top 10 articles
            if article.get('description'):
                sentiment = analyzer.polarity_scores(article['description'])
                sentiments.append(sentiment['compound'])
                
                # Add the article to processed articles
                processed_articles.append({
                    'title': article.get('title', 'No title'),
                    'description': article.get('description', 'No description'),
                    'source': article.get('source', {}).get('name', 'Unknown source'),
                    'publishedAt': article.get('publishedAt', ''),
                    'url': article.get('url', '#')
                })
        
        # Calculate average sentiment
        if sentiments:
            avg_sentiment = sum(sentiments) / len(sentiments)
            sentiment_label = "Positive" if avg_sentiment > 0.05 else "Negative" if avg_sentiment < -0.05 else "Neutral"
            
            return {
                "sentiment": sentiment_label,
                "score": round(avg_sentiment, 2),
                "articles_analyzed": len(sentiments),
                "articles": processed_articles
            }
        
        return {
            "sentiment": "Neutral",
            "score": 0,
            "articles_analyzed": 0,
            "error": "No articles found for sentiment analysis",
            "articles": []
        }
        
    except Exception as e:
        print(f"Error in sentiment analysis: {str(e)}")
        return {
            "sentiment": "Neutral",
            "score": 0,
            "articles_analyzed": 0,
            "error": f"Error analyzing sentiment: {str(e)}",
            "articles": []
        }