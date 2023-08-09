import requests
from bs4 import BeautifulSoup

url = "https://store.steampowered.com/app/your_game_id/reviews/"

response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

reviews = soup.find_all("div", class_="review_box")

for review in reviews:
    review_text = review.find("div", class_="review_text").get_text()
    rating = review.find("div", class_="review_score").get_text()
    username = review.find("div", class_="username").get_text()
    # Extract and store the data as needed