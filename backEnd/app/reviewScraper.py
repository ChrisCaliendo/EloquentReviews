import requests
import random
from bs4 import BeautifulSoup
from flask import Blueprint, request, jsonify

searchTerm = ""
gameUrl = "none"

def getFunnyReview():
    #gameUrl = findGame(topSellingURL)
    ex = search_and_scrape(searchTerm)
    data = getReviews(ex)
    
    return data

def changeSearchTerm(newTerm):
    searchTerm = newTerm
    return

def getSameGameReview():
    getReviews(gameUrl)
    return

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
    for x in range(1, 99):
        offset = (x*10) - 10

        payload = {
        'userreviewsoffset': offset,
        'p': x,
        'workshopitemspage': x,
        'readytouseitemspage': x,
        'mtxitemspage': x,
        'itemspage': x,
        'screenshotspage': x,
        'videospage': x,
        'artpage': x,
        'allguidepage': x,
        'webguidepage': x,
        'integratedguidepage': x,
        'discussionspage': x,
        'numperpage': '10',
        'browsefilter': 'toprated',
        'browsefilter': 'toprated',
        'l': 'english',
        'appHubSubSection': '10',
        'filterLanguage': 'default',
        'searchText': '',
        'forceanon': '1'}
    cookies = {'birthtime': '568022401'}
    response = requests.get(url, cookies=cookies, params=payload)
    soup = BeautifulSoup(response.content, "html.parser")
    gameTitle = soup.find("div", class_="apphub_AppName").text
    gameImage = soup.find("img", class_="game_header_image_full")['src']
    cards = soup.find_all('div',{'class':'review_box'})
    #reviews = soup.find_all("div", class_="review_box")
    #randomNumber =  random.randrange(0, len(reviews)-1)
    #reviews[randomNumber]

    return jsonify(
    {
        'title': gameTitle,
        'picture': gameImage,
        'review': len(cards),
        'gameUrl': url
    })
    

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
        return game_url
        # Extract other information from game_soup


