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
    
    rating = frontEndData['gameTags']
    if frontEndData['reviewType'] == "random":
        data = getRandomReview(rating)
    elif frontEndData['reviewType'] == "similar":
        data = getSimilarReview(frontEndData['gameUrl'], rating)
    elif frontEndData['reviewType'] == "search":
        data = getCustomReview(frontEndData['gameUrl'], rating)
    else: 
        data = getRandomReview(rating)
    #print(data['review'])
    return jsonify(data)





