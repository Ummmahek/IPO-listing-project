import snscrape.modules.twitter as sntwitter
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def get_ipo_sentiment(ipo_name, max_tweets=30):
    analyzer = SentimentIntensityAnalyzer()
    tweets = []
    for i, tweet in enumerate(sntwitter.TwitterSearchScraper(f"{ipo_name} IPO").get_items()):
        if i >= max_tweets:
            break
        tweets.append(tweet.content)
    sentiments = [analyzer.polarity_scores(t)['compound'] for t in tweets]
    avg_sentiment = sum(sentiments) / len(sentiments) if sentiments else 0
    return {"avg_sentiment": avg_sentiment, "sample_tweets": tweets[:5]}