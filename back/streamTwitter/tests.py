from django.test import TestCase
from django.test import Client
import unittest
from streamTwitter import models as streamTwitter_models
import datetime
import json
# Create your tests here.

#tests de la page annotate tweets
class testAnnotateTweets(unittest.TestCase):
    id_tweet = '1130768621360300032'
    def setUp(self):
        # Every test needs a client.
        self.client = Client()
    def test_getLastTweet(self):
        # test du récupérage du dernier tweet
        response = self.client.post('/getLastTweet', {'user': 'support@sinay.fr'},
        content_type= 'application/json' )
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        print('getLastTweet: Ok')
        # on assigne l'id recupéré
        self.id_tweet = json.loads(response.content.decode('utf8').replace("'", '"'))['tweet_id']
        
    def test_annotateTweet(self):
        #on teste l'annotation du tweet (on la met null pour ne pas vraiment l'annoter)
        response = self.client.post('/annotateTweet', {'id': self.id_tweet, 'interesting': None}, content_type= 'application/json')
         # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        print('annotateTweet: Ok')

    def test_getActiveKeywords(self):
        # test de récupération des mots clés actifs
        response = self.client.post('/getActiveKeywords', {'user': 'support@sinay.fr'},
        content_type= 'application/json' )
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        print('getActiveKeywords: Ok')

    def test_getNbrTweetsAnnoted(self):
        # test de récupération du nbr de tweets annotés
        response = self.client.post('/getNbrTweetsAnnoted', {'user': 'support@sinay.fr'},
        content_type= 'application/json' )
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        print('getNbrTweetsAnnoted: Ok')

    def test_calculateApprentissage(self):
        # test du calcul de l'apprentissage
        response = self.client.post('/calculateApprentissage', {'user': 'support@sinay.fr'},
        content_type= 'application/json' )
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        print('calculateApprentissage: Ok')

    def test_getModels(self):
        # test de la récupération des modéles
        response = self.client.post('/getModels', {'user': 'support@sinay.fr'},
        content_type= 'application/json' )
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        print('getModels: Ok')

    def test_getActifModel(self):
        # test de la récupération du modéle actif
        response = self.client.post('/getActifModel', {'user': 'support@sinay.fr'},
        content_type= 'application/json' )
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        print('getActifModel: Ok')

    def test_changeActifModel(self):
        #test du changement du modéle actif
        response = self.client.post('/changeActifModel', {'user': 'support@sinay.fr', 'nameOfTheModel': 'carandboat'},
        content_type= 'application/json' )
        # Check that the response is 200 OK.
        self.assertEqual(response.status_code, 200)
        print('changeActifModel: Ok')
        
        
        
        


