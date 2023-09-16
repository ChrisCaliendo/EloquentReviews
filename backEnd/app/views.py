import json
from flask import Blueprint, request, jsonify
#from .reviewScraper import getTSFunnyReview
#import whatever functions you need from review scraper here
from .reviewScraper import getSimilarReview, getRandomReview

views = Blueprint('view', __name__)

@views.route('/scrape', methods=['POST'])
def scrape():
    frontEndData = request.json
    
    if frontEndData['reviewType'] == "random":
        data = getRandomReview()
    elif frontEndData['reviewType'] == "similar":
        data = getSimilarReview(frontEndData['gameUrl'])
    else: 
        data = getRandomReview()
    #print(data['review'])
    return jsonify(data)





