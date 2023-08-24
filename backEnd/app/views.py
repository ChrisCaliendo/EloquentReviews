from flask import Blueprint, request, jsonify
#from .reviewScraper import getTSFunnyReview
#import whatever functions you need from review scraper here
from .reviewScraper import getSimilarReview, getRandomReview

views = Blueprint('view', __name__)

@views.route('/scrape', methods=['POST'])
def scrape():
    frontEndData = request.get_json()
    if frontEndData[reviewType] == "random":
        data = getRandomReview()
    elif frontEndData[reviewType] == "similar":
        data = getSimilarReview()
    else: data = getRandomReview()
    return jsonify(data)





