from flask import Blueprint, request, jsonify
#import whatever functions you need from review scraper here
#from .reviewScraper import getReviews

views = Blueprint('view', __name__)

@views.route('/scrape')
def scrape():
    return jsonify({'message':'Put your function here'})