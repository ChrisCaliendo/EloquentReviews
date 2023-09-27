import requests
import re
import random
import datetime
from collections import Counter
from bs4 import BeautifulSoup
from flask import Blueprint, request, jsonify

gameUrl = "none"

def getRandomReview(gameTags, rating, useConfig, reviewLength):
    #gameUrl = findGame(topSellingURL)
    game_links = getGameLinks("", gameTags)
    if("errorMessage" in game_links):
        return game_links
    indexList = random.sample(range(0, len(game_links)), len(game_links))
    while(len(indexList) != 0 ):
        link = game_links[indexList[0]]
        data = getReviews(link["href"], rating, useConfig, reviewLength)
        if("errorMessage" not in data):
            return data
        else:
            indexList.pop(0)
    return {"errorMessage": "No review with your requirements can be found from any game"}

def getCustomReview(searchTerm, rating, useConfig, reviewLength):
    #gameUrl = findGame(topSellingURL)
    gameUrl = releventSearch(searchTerm, "percise", [])
    
    if("errorMessage" in gameUrl):
        return gameUrl
    else:
        return getReviews(gameUrl, rating, useConfig, reviewLength)
    
    

def getSimilarReview(similarUrl, rating, useConfig, reviewLength):
    data = getReviews(similarUrl, rating, useConfig, reviewLength)
    return data

def findGame(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    #note: thios code literally only works with top selling
    subElement = soup.find("div", attrs={'data-featuretarget':'react-root'})
    games = subElement.find_all("div", attrs={'class':'steamchartsshell_SteamChartsShell_2rArj'})
    
    #randomNumber =  random.randrange(0,len(games),1)
    
    #parent = games[randomNumber].parent
    #gameUrl = parent.find("href")
    newGameUrl = len(games)
    return subElement

def getReviews(url, rating, useConfig, reqLength):
    cookies = {'birthtime': '568022401'}
    response = requests.get(url, cookies=cookies)
    soup = BeautifulSoup(response.content, "html.parser")
    
    gameImage = soup.find("img", class_="game_header_image_full")['src']
    gameTitle = soup.find("div", class_="apphub_AppName").text
    
    temp = url.split('/')
    gameCode = temp[4]
    
    funnyReviewSite = "https://steamcommunity.com/app/"+gameCode+"/"+rating+"/?browsefilter=funny&snr=1_5_100010_&p=1"
    response = requests.get(funnyReviewSite, cookies=cookies)
    soup = BeautifulSoup(response.content, "html.parser")
    allReviews = soup.find_all("div", class_="apphub_Card modalContentLink interactable")
    numOfReviews = len(allReviews)
    if(numOfReviews < 1):
        return {'errorMessage': "Sorry this game has no funny reviews, try a different one!"}
    reviewData = ""
    reviewText = ""
    index = -1
    if(useConfig):
        inputNumbers =range(0,numOfReviews)
        indexes = random.sample(inputNumbers, numOfReviews-1)
        while(index < len(indexes)-1):
            index = index + 1
            
            reviewData = allReviews[indexes[index]]
            review = reviewData.find("div", class_="apphub_CardTextContent")
            reviewText = processText(review).lstrip()
            spaces = reviewText.count(' ')
            tabs = reviewText.count('\t')
            newlines = reviewText.count('\n')
            if(int(reqLength) > spaces+tabs+newlines):
                useConfig = False
                break;
        if(useConfig):
            return {'errorMessage': "No funny review can be found which meets your requirements"}
    else:   
        index =  random.randrange(0, (numOfReviews-1) )
        reviewData = allReviews[index]
        review = reviewData.find("div", class_="apphub_CardTextContent")
        reviewText = processText(review).lstrip()
    

    #Getting review date
    reviewDate = review.find("div", class_="date_posted").text[8:]
    if reviewDate[len(reviewDate)-3] == ' '  or reviewDate[len(reviewDate)-2] == ' ': 
        reviewDate = reviewDate+", "+str(datetime.date.today().year)
    
    #Getting authors name
    try:
        author = reviewData.find("div", class_="apphub_CardContentAuthorName offline ellipsis").text
    except:
        author = "an Anonymous Genius"
    
    
    data = {
        'title': gameTitle,
        'picture': gameImage,
        'numOfReview': numOfReviews,
        'reviewDate' : reviewDate,
        'review': reviewText,
        'author': author,
        'gameUrl': url
    }
    
    return data

def releventSearch(game_name, pick, tags):

    tagExtension = getTagsLinks(tags);
        
    search_url = "https://store.steampowered.com/search/?"+tagExtension+"category1=998&term="+game_name

    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, "html.parser")

    # Find game links from search results
    index = 0
    if(pick == "random"):
        index = random.randrange(0, len(game_links)-1)

    try:
        game_links = soup.find_all("a", class_="search_result_row")
        link = game_links[index]
    except:
        return {'errorMessage': "No game can be found which meets your requirements"}
    game_url = link["href"]
    
    # Send request to individual game page
    game_response = requests.get(game_url)
    game_soup = BeautifulSoup(game_response.content, "html.parser")
    
    # Extract and print information from the game page
    # Modify this part to scrape the specific information you need
    return game_url
    # Extract other information from game_soup

def getGameLinks(game_name, tags):
    tagExtension = getTagsLinks(tags);
    search_url = "https://store.steampowered.com/search/?"+tagExtension+"category1=998&term="+game_name
    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, "html.parser")
    try:
        game_links = soup.find_all("a", class_="search_result_row")
        link = game_links[1]
    except:
        return {'errorMessage': "No game can be found which meets your requirements"}
    return game_links

def processText(review):
    #Getting review text
    reviewText = ""
    for element in review:
        if element.name != "div":
            reviewText += element.text
        elif element.name != "br":
            reviewText += "\n"
    return reviewText

def getTagsLinks(tags):

    if not tags:
        return ""
    elif tags[0] == "none":
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

