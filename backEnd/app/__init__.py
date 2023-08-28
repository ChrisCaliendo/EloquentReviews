from flask import Flask
from flask_cors import CORS
#from flask_sqlalchemy import SQLAlchemy


def create_app():

    const config = {
        'ORIGINS': 
        [
            'http://localhost:8080',  # React
            'http://127.0.0.1:8080',  # React
        ]
    }

    app = Flask(__name__)
    CORS(app, resources={ r'/*': {'origins': config['ORIGINS']}}, supports_credentials=True)

    from .views import views

    app.register_blueprint(views, url_prefix='/')

    return app
