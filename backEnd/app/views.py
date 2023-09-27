import json
from flask import Blueprint, request, jsonify
#from .reviewScraper import getTSFunnyReview
#import whatever functions you need from review scraper here
from .reviewScraper import getSimilarReview, getRandomReview, getCustomReview

views = Blueprint('view', __name__)

@views.route('/scrape', methods=['POST'])
def scrape():
    frontEndData = request.json
    rating = frontEndData['reviewRating']
    
    if(rating=="Any"):
        rating = "reviews"
    elif(rating=="Positive"):
        rating = "positivereviews"
    elif(rating=="Negative"):
        rating = "negativereviews"
    else: 
        rating = "reviews"
    
    
    if frontEndData['reviewType'] == "random":
        data = getRandomReview(frontEndData['gameTags'], rating, frontEndData['useConfig'], frontEndData['reviewLength'])
    elif frontEndData['reviewType'] == "similar":
        data = getSimilarReview(frontEndData['gameUrl'], rating, frontEndData['useConfig'], frontEndData['reviewLength'])
    elif frontEndData['reviewType'] == "search":
        data = getCustomReview(frontEndData['searchName'], rating, frontEndData['useConfig'], frontEndData['reviewLength'])
    else: 
        data = getRandomReview([], rating, False, "")
    #print(data['review'])
    return jsonify(data)





