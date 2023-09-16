import requests
import re
import random
import datetime
from collections import Counter
from bs4 import BeautifulSoup
from flask import Blueprint, request, jsonify

gameUrl = "none"

def getRandomReview():
    #gameUrl = findGame(topSellingURL)
    gameUrl = releventSearch("", "random")
    data = getReviews(gameUrl)
    
    return data

def getCustomReview(searchTerm):
    #gameUrl = findGame(topSellingURL)
    gameUrl = releventSearch(searchTerm, "percise")
    data = getReviews(gameUrl)
    
    return data

def changeSearchTerm(newTerm):
    searchTerm = newTerm
    return

def getSimilarReview(similarUrl):
    data = getReviews(similarUrl)
    return data

def findGame(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    #note: thios code literally only works with top selling
    subElement = soup.find("div", attrs={'data-featuretarget':'react-root'})
    games = subElement.find_all("div", attrs={'class':'steamchartsshell_SteamChartsShell_2rArj'})
    
    #randomNumber =  random.randrange(0,len(games),1)
    #print(randomNumber, "but")
    #parent = games[randomNumber].parent
    #gameUrl = parent.find("href")
    newGameUrl = len(games)
    return subElement

def getReviews(url):
    cookies = {'birthtime': '568022401'}
    response = requests.get(url, cookies=cookies)
    soup = BeautifulSoup(response.content, "html.parser")
    gameTitle = soup.find("div", class_="apphub_AppName").text
    gameImage = soup.find("img", class_="game_header_image_full")['src']
    temp = url.split('/')
    gameCode = temp[4]
    funnyReviewSite = "https://steamcommunity.com/app/"+gameCode+"/reviews/?browsefilter=funny&snr=1_5_100010_&p=1"
    response = requests.get(funnyReviewSite, cookies=cookies)
    soup = BeautifulSoup(response.content, "html.parser")
    allReviews = soup.find_all("div", class_="apphub_Card modalContentLink interactable")
    randomNumber =  random.randrange(0, len(allReviews)-1)
    #print(allReviews[randomNumber].find("div", class_="apphub_CardTextContent"))

    #Getting review date
    reviewData = allReviews[randomNumber]
    review = reviewData.find("div", class_="apphub_CardTextContent")
    reviewDate = review.find("div", class_="date_posted").text[8:]
    if reviewDate[len(reviewDate)-3] == ' '  or reviewDate[len(reviewDate)-2] == ' ': 
        reviewDate = reviewDate+", "+str(datetime.date.today().year)

    #Getting review text
    reviewText = ""
    for element in review:
        if element.name != "div":
            reviewText += element.text
        elif element.name != "br":
            reviewText += "\n"
    #reviewText = processText(reviewText)

    #Getting authors name
    try:
        author = reviewData.find("div", class_="apphub_CardContentAuthorName offline ellipsis").text
    except:
        author = "an Anonymous Genius"
    #print(reviewData)
    print(reviewText)
    data = {
        'title': gameTitle,
        'picture': gameImage,
        'numOfReview': len(allReviews),
        'reviewDate' : reviewDate,
        'review': reviewText.lstrip(),
        'author': author,
        'gameUrl': url
    }
    
    return data

def releventSearch(game_name, pick):
    base_url = "https://store.steampowered.com/search/?term="
    search_url = base_url + game_name

    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, "html.parser")

    # Find game links from search results
    game_links = soup.find_all("a", class_="search_result_row")
    if(pick == "random"):
        index =  random.randrange(0, len(game_links)-1)
    else:
        index
    link = game_links[index]
    game_title = link.find("span", class_="title").get_text()
    game_url = link["href"]
    
    # Send request to individual game page
    game_response = requests.get(game_url)
    game_soup = BeautifulSoup(game_response.content, "html.parser")
    
    # Extract and print information from the game page
    # Modify this part to scrape the specific information you need
    return game_url
    # Extract other information from game_soup

def specificSearch(game_name):
    base_url = "https://store.steampowered.com/search/?term="
    search_url = base_url + game_name

    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, "html.parser")

    # Find game links from search results
    game_links = soup.find_all("a", class_="search_result_row")
    #print(len(game_links)+696900000000000)
    for link in game_links:
        game_title = link.find("span", class_="title").get_text()
        game_url = link["href"]
        
        # Send request to individual game page
        game_response = requests.get(game_url)
        game_soup = BeautifulSoup(game_response.content, "html.parser")
        
        # Extract and print information from the game page
        # Modify this part to scrape the specific information you need
        return game_url
        # Extract other information from game_soup

def getTagsLinks(tags):
    if tags[0] == "none":
        return ""
    tagExtension = "tags="
    for i in range(len(tags)):
        if tags[i] == "Indie": 
            tagExtension += "492"
        elif tags[i] == "Adventure":
            tagExtension += "21"
        elif tags[i] == "Singleplayer":
            tagExtension += "4182"
        elif tags[i] == "Multiplayer":
            tagExtension += "3859"
        elif tags[i] == "Action":
            tagExtension += "19"
        elif tags[i] == "Strategy":
            tagExtension += "9"
        elif tags[i] == "Casual":
            tagExtension += "597"
        elif tags[i] == "Rougelike":
            tagExtension += "1716"
        elif tags[i] == "Simulation":
            tagExtension += "599"
        elif tags[i] == "FPS":
            tagExtension += "1663"
        elif tags[i] == "Puzzle":
            tagExtension += "1664"
        elif tags[i] == "Metroidvania":
            tagExtension += "1628"

        if i == len(tags)-1:
            tagExtension += "&"
        else: tagExtension += "%2C"


    
    return tagExtension 

