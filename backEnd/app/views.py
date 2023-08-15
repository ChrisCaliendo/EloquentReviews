from flask import Blueprint, request, jsonify
from reviewScraper import getTSFunnyReview
#import whatever functions you need from review scraper here
#from .reviewScraper import getReviews

views = Blueprint('view', __name__)

@views.route('/scrape', methods = ['POST'])
def scrape():
    review = getTSFunnyReview()
    return jsonify({'message': review})



