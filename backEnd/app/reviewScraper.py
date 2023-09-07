import requests
import re
import random
import datetime
from collections import Counter
from bs4 import BeautifulSoup
from flask import Blueprint, request, jsonify

searchTerm = ""
gameUrl = "none"

def getRandomReview():
    #gameUrl = findGame(topSellingURL)
    gameUrl = releventSearch(searchTerm)
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

def processText(text):
    
    #Tells if text is Green Post
    isGreenText = False
    count = 0
    for i in text:
        if i == '>':
            count = count + 1
    #if count >= 5:
        #isGreenText = True
    
    
    #Sifts through each character for special charaacters to fix grammer issues or preffered formatting
    newText = ""
    
    for index in range(len(text)-1):
        char = text[index]
        match char:
            #if there is a period or sentence ending symbol then a space is checked for and added if needed
            case ".":
                nextChar = text[index+1]
                #accounts for digits
                if nextChar != '.' and nextChar != ' ' and nextChar != ')' and nextChar.isdigit() == False:
                    newText += char + ' '
                    index += 1
                else:
                    newText += char 
            case "?":
                nextChar = text[index+1]
                if nextChar != '?' and nextChar != '!' and nextChar != ' ' and nextChar != ')':
                    newText += char + ' '
                    index += 1
                else:
                    newText += char 
            case "!":
                nextChar = text[index+1]
                if nextChar != '!' and nextChar != '?' and nextChar != ' ' and nextChar != ')':
                    newText += char + ' '
                    index += 1
                else:
                    newText += char 
            case ":":
                nextChar = text[index+1]
                if nextChar != ':' and nextChar != ' ' and nextChar != ')' and nextChar.isdigit() == False:
                    newText += char + ' '
                    index += 1
                else:
                    newText += char 
            case ">":
                #special case for greentext as > represent new line
                if isGreenText:
                    nextChar = text[index+1]
                    newLineAdded == True
                    if(index >= 2):
                        newLineAdded = newText.endswith('\n')
                    if newLineAdded == False:
                        newText += "\n"
                        index += 1
                    if nextChar != '=' and nextChar != ' ':
                        newText += char + " "
                        index += 1
                    else:
                        newText += char 
                else:
                    nextChar = text[index+1]
                    if nextChar != ':' and nextChar != ' ' and nextChar != ')' and nextChar.isdigit() == False:
                        newText += char + ' '
                        index += 1
                    else:
                        newText += char
            case _: newText += char
    
    return newText

def releventSearch(game_name):
    base_url = "https://store.steampowered.com/search/?term="
    search_url = base_url + game_name

    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, "html.parser")

    # Find game links from search results
    game_links = soup.find_all("a", class_="search_result_row")
    randomNumber =  random.randrange(0, len(game_links)-1)
    link = game_links[randomNumber]
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


