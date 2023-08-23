from flask import Blueprint, request, jsonify
#from .reviewScraper import getTSFunnyReview
#import whatever functions you need from review scraper here
from .reviewScraper import getReviews, getFunnyReview

views = Blueprint('view', __name__)

@views.route('/scrape')
def scrape():
    data = getFunnyReview()
    return jsonify(data)



