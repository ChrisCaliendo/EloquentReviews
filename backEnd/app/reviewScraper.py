import requests
import random
from bs4 import BeautifulSoup

mostPlayedURL = "https://store.steampowered.com/charts/mostplayed/"
topSellingURL = "https://store.steampowered.com/charts/topselling/US"
gameUrl = "https://store.steampowered.com/app/your_game_id/reviews/"

def getTSFunnyReview():
    gameUrl = findGame(topSellingURL)
    getReviews(gameUrl)
    return

def geMPFunnyReview():
    gameUrl = findGame(mostPlayedURL)
    getReviews(gameUrl)
    return

def getSameGameReview():
    getReviews(gameUrl)
    return

def findGame(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    #note: thios code literally only works with top selling
    games = soup.find_all("a", class_="weeklytopsellers_TopChartItem_2C5PJ")
    randomNumber =  random.randrange(0, len(games)-1)
    parent = games[randomNumber].parent
    gameUrl = parent.find("href")
    return gameUrl

def getReviews(url):
    response = requests.get(gameUrl)
    soup = BeautifulSoup(response.content, "html.parser")

    reviews = soup.find_all("div", class_="review_box")

    for review in reviews:
        review_text = review.find("div", class_="review_text").get_text()
        rating = review.find("div", class_="review_score").get_text()
        username = review.find("div", class_="username").get_text()
        # Extract and store the data as needed


