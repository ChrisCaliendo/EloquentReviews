import requests
import random
from bs4 import BeautifulSoup

mostPlayedURL = "https://store.steampowered.com/charts/mostplayed/"
topSellingURL = "https://store.steampowered.com/charts/topselling/US"
gameUrl = "none"

def getTSFunnyReview():
    gameUrl = findGame(topSellingURL)
    getReviews(gameUrl)
    return "help"

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
    randomNumber =  random.randrange(0, len(games)-1)
    reviews[randomNumber]
    for review in reviews:
        review_text = review.find("div", class_="review_text").get_text()
        rating = review.find("div", class_="review_score").get_text()
        username = review.find("div", class_="username").get_text()
        # Extract and store the data as needed

def search_and_scrape(game_name):
    base_url = "https://store.steampowered.com/search/?term="
    search_url = base_url + game_name

    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, "html.parser")

    # Find game links from search results
    game_links = soup.find_all("a", class_="search_result_row")

    for link in game_links:
        game_title = link.find("span", class_="title").get_text()
        game_url = link["href"]
        
        # Send request to individual game page
        game_response = requests.get(game_url)
        game_soup = BeautifulSoup(game_response.content, "html.parser")
        
        # Extract and print information from the game page
        # Modify this part to scrape the specific information you need
        print("Game Title:", game_title)
        print("Game URL:", game_url)
        # Extract other information from game_soup


