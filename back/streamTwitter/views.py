from django.shortcuts import render
from django.http import HttpResponse, StreamingHttpResponse, JsonResponse
from twython import TwythonStreamer
from streamTwitter import models as streamTwitter_models
from streamTwitter import nettoyeur as nettoyeur_function
from streamTwitter import apprentissage as apprentissage_functions
from streamTwitter import elasticsearch as elasticsearch_functions
from streamTwitter import arrayConverter as arrayConverter_functions

from sklearn.externals import joblib
from django.views.decorators.csrf import csrf_exempt
import datetime
import time
import json
from django.core import serializers
from sklearn.metrics import confusion_matrix
import requests
#clé secrétes twitter
APP_KEY = 'cb3FS7iBybOU1I39sZqjPAeXd'
APP_SECRET= '6WT3hiMn4fgV2YuoLfmKjqd6kTH7131vb6Fa95qW2thXA29CRs'
OAUTH_TOKEN = '1348855934-DVfG1V5pfsOtFh7sajBTX4xSpZ9OqITmdVVSyO3'
OAUTH_TOKEN_SECRET = 'NCIz17kuQx17vQtUOJQXcgdYwdVdTdITPAd1Yrhrxs8Hw'


class MyStreamer(TwythonStreamer):
    #keywords actifs pour le stream
    keywordsActive = []
    #email de l'utilisateur sur le stream actif
    emailUser = ''
    #définit si le stream est un stream pour l'apprentissage ou pour l'utilisation d'un model
    nameOfTheModel = None
    #permet de créer une liste qu'on reset toutes les 48h afins d'éviter les doublons quand ce n'est pas un stream d'apprentissage
    liste_tweets_interessants = []
    reset_liste_time = datetime.datetime.now() + datetime.timedelta(hours=48)
    def on_stop(self):
        self.disconnect()
    def on_success(self, data):
        if data['lang'] == 'fr':
            language = 'fr'
        if data['lang'] == 'en':
            language = 'en'
        # les try except ci-dessous serve a parcourir le json du tweet pour récupérer le texte avec les différentes possibilité: quoted/retweeted/extended/text
        try:
            tweet = data['quoted_status']['extended_tweet']['full_text']
            #print('===== tweet is a quoted status extended =====')
        except KeyError:
            try:
                tweet = data['quoted_status']['text']
                #print('==== tweet is a quoted status court ====')
            except KeyError:
                tweet = None
        if tweet == None:
            try:
                tweet = data['retweeted_status']['extended_tweet']['full_text']
                #print('==== tweet is a retweeted status ====')
            except KeyError:
                try:
                    tweet = data['extended_tweet']['full_text']
                    #print('==== tweet is a extended tweet =====')
                except KeyError:
                    tweet = data['text']
                    #print('==== tweet is a short tweet =====')
        # si l'on ne veut pas utiliser de modéle et que c'est un stream pour l'apprentissage
        if self.nameOfTheModel == None:
            #
            if streamTwitter_models.Tweet.objects.filter(text = tweet):
                print('==== tweet already saved ====')
            else:
                print('==== New tweet added to the database ====')
                print('texte non nettoyé: ', tweet)
                texte_nettoye = nettoyeur_function.nettoyer_le_texte(tweet, data, language)
                #print('texte nettoyé:' , texte_nettoye )
                tweet = streamTwitter_models.Tweet(text = tweet, tweet_id = data['id_str'], user_id = data['user']['id'],
                created_at = dateTimeParser(data['created_at']), metaData = json.dumps(data),
                text_nettoye = texte_nettoye, emailUser = self.emailUser)
                tweet.save() 
        else:
            print('===stream non apprentissage=====')
            # si l'on a dépassé les 48h, l'on supprime la liste des tweets sauvegardés en mémoire pour eviter les doublons
            if datetime.datetime.now() > self.reset_liste_time:
                self.liste_tweets_interessants = []
                self.reset_liste_time = self.reset_liste_time + datetime.timedelta(hours =48)
            #on nettoie le tweet
            texte_nettoye = nettoyeur_function.nettoyer_le_texte(tweet, data, language)
            #on utilise le modéle pour qu'il dise si le tweet est intéréssant ou non
            prediction = apprentissage_functions.tweet_classifier(texte_nettoye, self.nameOfTheModel)
            #si il est intéréssant et qu'il n'est pas dans la liste qui se reset toutes les 48h on l'envoie a elasticsearch
            print('====prediction ====', prediction)
            if int(prediction[0]) != 0:
                if texte_nettoye not in self.liste_tweets_interessants:
                    self.liste_tweets_interessants.append(texte_nettoye)
                    print('====new tweet====', tweet)
                    elasticsearch_functions.post_tweet_elasticsearch(tweet, int(prediction[0]), data, self.nameOfTheModel)
            else:
                print('===tweet already saved', tweet)

    def on_error(self, status_code, data):
        print('===== error occured ===== ', status_code)
        # en cas d'erreur on stoppe le stream
        stopStream('stopping')
        #on attends 60s
        time.sleep(60)
        # on le relance
        stream.statuses.filter(track=self.keywordsActive, language=['fr', 'en'], stall_warnings=True) 
        


#mets au format datetime le champs created_at de twitter
def dateTimeParser(date):
    datetime_object = datetime.datetime.strptime(date, '%a %b %d %H:%M:%S +0000 %Y')
    return datetime_object
#on initalise le stream
stream = MyStreamer(APP_KEY, APP_SECRET, OAUTH_TOKEN, OAUTH_TOKEN_SECRET)

#fonctions permettant de récupérer les mesures de recall, précision , et accuracy
@csrf_exempt
def apprentissage(request):
    body_unicode = request.body.decode('utf-8')
    #print(body_unicode)
    body = json.loads(body_unicode)
    emailUser = body['user']
    Xtrain_text, Ytrain, Xtest_text, Ytest = apprentissage_functions.retrieve_data(emailUser)
    # si il n'a pas de tweets annotés l'on retourne une erreur 404
    if len(Xtrain_text) == 0:
        return HttpResponse(status=404)
    #print("========================Bigram + SGD================================")
    start = time.time()
    vectorizer = apprentissage_functions.bigram_process(Xtrain_text)
    y_true, classifier, precision, recall, testAccuracy = apprentissage_functions.train_and_test(vectorizer, apprentissage_functions.train_sgd,
     Xtrain_text, Ytrain, Xtest_text, Ytest)
    #print ("Time taken: ", time.time() - start, " seconds")
    Matrice_confusion=confusion_matrix(Ytest,y_true)
    #print("matrice_confusion_bigram : ", Matrice_confusion)
    data = {
        "accuracy" : testAccuracy,
        "precision" : precision,
        "recall" : recall
    }
    return HttpResponse(json.dumps(data), content_type = 'application/json')




# permet de sauvegarder un model
@csrf_exempt
def saveModel(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    nameOfTheModel = body['name']
    userEmail = body['user']
    Xtrain_text, Ytrain, Xtest_text, Ytest = apprentissage_functions.retrieve_data(userEmail)
    vectorizer = apprentissage_functions.bigram_process(Xtrain_text)
    y_true, classifier, precision, recall, testAccuracy = apprentissage_functions.train_and_test(vectorizer, apprentissage_functions.train_sgd,
     Xtrain_text, Ytrain, Xtest_text, Ytest)
    print ("-----------------------SAVING THE MODEL-----------------------------")
    joblib.dump(classifier, 'models/' + nameOfTheModel.lower() + '.pkl' )
    joblib.dump(vectorizer, 'models/' + nameOfTheModel.lower() + '_vectorizer.pkl')
    #on vérifie que le nom du modéle n'est pas déja pris
    allModels = streamTwitter_models.ModelSaved.objects.filter(nameOfTheModel = nameOfTheModel.lower())
    # si il n'est pas déja pris on sauvegarde le nom du modéle dans la base sinon l'on envoie un message d'erreur
    if len(allModels) == 0:
        #on récupére les mots clés que l'utilisateur a utilisé pour faire son modéle
        keywords = streamTwitter_models.FilterTerm.objects.filter(user = userEmail) 
        allKeywords = []
        for i in range(len(keywords)):
            allKeywords.append(keywords[i].term)
        #on converti l'array de keywords en string
        allKeywordsString = arrayConverter_functions.convertArrayToString(allKeywords)
        print('keywords: ',allKeywords)
        #saving the name of the model to the db
        model = streamTwitter_models.ModelSaved(userMail = userEmail, nameOfTheModel= nameOfTheModel.lower(), keywords = allKeywordsString)
        model.save()
        #on crée un nouvel index dans elasticsearch si il n'existe pas déja
        url = elasticsearch_functions.url_server_elasticsearch + nameOfTheModel.lower()
        r = requests.put(url)
        print(r.text)
        print("model saved")
        return HttpResponse(200)
    else:
        return HttpResponse(status = 409)

#permet a un utilisateur de récupérer sa liste de modéles sauvegardés grâce a son adresse mail
@csrf_exempt
def getModels(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    emailUser = body['user']
    models = streamTwitter_models.ModelSaved.objects.filter(userMail = emailUser)
    allModels = []
    for i in range(len(models)):
        allModels.append(models[i].nameOfTheModel)
    data = {
        "models": allModels
    }
    return HttpResponse(json.dumps(data), content_type = 'application/json')

#permet de récupérer le modéle actif d'un utilisateur grâce a son adresse mail
@csrf_exempt
def getActifModel(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    emailUser = body['user']
    try :
        modelActif = streamTwitter_models.ModelSaved.objects.get(userMail = emailUser, isActive = 1)
        data = {
            "modelActif" : modelActif.nameOfTheModel
        }
        return HttpResponse(json.dumps(data), content_type = 'application/json')
    #si il n'y a pas de model actif l'on renvoie une erreur 404 not found
    except streamTwitter_models.ModelSaved.DoesNotExist:
        return JsonResponse({'message': "No model active"}, status = 404)

@csrf_exempt
def changeActifModel(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    emailUser = body['user']
    nameOfTheModel = body['nameOfTheModel']
    try: 
        modelActif = streamTwitter_models.ModelSaved.objects.get(userMail = emailUser, isActive = 1)
        modelActif.isActive = 0
        modelActif.save()
    except streamTwitter_models.ModelSaved.DoesNotExist:
        print('No model active')
   
    try:
        newModelActif = streamTwitter_models.ModelSaved.objects.get(userMail = emailUser, nameOfTheModel = nameOfTheModel)
        newModelActif.isActive = 1
        newModelActif.save()
    #si le model n'existe pas on renvoie une erreur 404
    except streamTwitter_models.ModelSaved.DoesNotExist:
        return JsonResponse({'message': "No model or usermail corresponding found"}, status = 404)
    return HttpResponse(200)

#permet de démarrer le stream avec les mots clés choisis par l'utilisateur
@csrf_exempt
def startStream(request):
    body_unicode = request.body.decode('utf-8')
    print(body_unicode)
    body = json.loads(body_unicode)
    keywords = body['keywords']
    emailUser = body['user']
    nameOfTheModel = body['nameOfTheModel'] 
    # on assigne l'email de l'utilisateur au stream
    stream.emailUser = emailUser
    
    #si c'est un stream pour l'apprentissage, l'on remplace les mots clés par les nouveaux reçus
    if nameOfTheModel == None:
        #on supprime de la base les mots clés de l'utilisateur
        streamTwitter_models.FilterTerm.objects.filter(user = emailUser).delete()
        #on indique au stream que l'on ne veut pas utiliser de modéle
        stream.nameOfTheModel = None 
        #on attribue au stream les mots clés envoyés par l'utilisateur dans la requête
        stream.keywordsActive = keywords    
        # on rajoute dans la base les nouveaux mots clés de l'utilisateur
        for i in range(len(keywords)):
            keyword = streamTwitter_models.FilterTerm(created_at = datetime.datetime.now(), user = emailUser, term = keywords[i])    
            keyword.save()
        #on lance le stream
        stream.statuses.filter(track=keywords, language=['fr', 'en'], stall_warnings=True) 
    else:
        # si l'utilisateur ne lance pas un stream pour l'apprentissage, cela signifie qu'il en lance un pour utiliser un modéle
        model = streamTwitter_models.ModelSaved.objects.get(nameOfTheModel = nameOfTheModel) 
        #on récupére les mots clés associés au modéle
        allKeywords = arrayConverter_functions.convertStringToArray(model.keywords)
        # on attribue au stream les mots clés liés au modéle choisi par l'utilisateur
        stream.keywordsActive = allKeywords
        print("stream lancé en mode non apprentissage avec les mots clés : " , allKeywords)
        print("et le modéle :" , nameOfTheModel)
        # on indique au stream le nom du modéle qu'il doit utiliser
        stream.nameOfTheModel = nameOfTheModel
        #on lance le stream pour les mots clés choisis par l'utilisateur
        stream.statuses.filter(track=allKeywords, language=['fr', 'en'], stall_warnings=True)     
    return HttpResponse(200)
     

# avec l'email d'un utilisateur lui renvoie sa liste de mots clés actifs
@csrf_exempt
def getKeywordsActive(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    emailUser = body['user']
    keywords = streamTwitter_models.FilterTerm.objects.filter(user = emailUser)
    allKeywords = []
    for i in range(len(keywords)):
        allKeywords.append(keywords[i].term)
    data = {
        "keywords": allKeywords
    }
    return HttpResponse(json.dumps(data), content_type = 'application/json')

#stop the stream
def stopStream(request):
    MyStreamer.on_stop(stream)
    return HttpResponse(200)

#récupére le dernier tweet non annoté (interesting = None) et renvoie son id
@csrf_exempt
def getLatestTweet(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    emailUser = body['user']
    try:
        tweet = streamTwitter_models.Tweet.objects.filter(interesting = None, emailUser = emailUser).latest('created_at')
        data = {
        "tweet_id": str(tweet.tweet_id)
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    except streamTwitter_models.Tweet.DoesNotExist:
        #print('===aucun tweets a annoté====')
        return HttpResponse(status=404)
   
    

#permet de récupérer le nombre de tweets annotés par l'utilisateur
@csrf_exempt
def getNbrTweetsAnnoted(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    emailUser = body['user']
    tweetsAnnoted = streamTwitter_models.Tweet.objects.filter(emailUser = emailUser).exclude(interesting = None)
    data = {
        "nbrTweetsAnnoted": len(tweetsAnnoted)
    }
    return HttpResponse(json.dumps(data), content_type = 'application/json')

#supprime tout les tweets de la base
@csrf_exempt
def deleteTweets(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    emailUser = body['user']
    streamTwitter_models.Tweet.objects.filter(emailUser = emailUser).delete()
    return HttpResponse(200)

#annote un tweet en intéréssant ou non grâce a son id et l'update dans la base
@csrf_exempt
def annotateTweet(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    id = body['id']
    interesting = body['interesting']
    try:
        tweet = streamTwitter_models.Tweet.objects.get(tweet_id = id)
        tweet.interesting = interesting
        tweet.save() 
        return HttpResponse(200)
    # si le tweet n'existe pas on renvoie une erreur 404
    except streamTwitter_models.Tweet.DoesNotExist:
        return HttpResponse(status=404)
    # si il y a plusieurs tweets avec le même id, l'on n'en garde qu'un seul qu'on annote 
    except streamTwitter_models.Tweet.MultipleObjectsReturned:
        while len(streamTwitter_models.Tweet.objects.filter(tweet_id = id)) > 1:
            streamTwitter_models.Tweet.objects.filter(tweet_id = id)[1].delete()
        tweet = streamTwitter_models.Tweet.objects.get(tweet_id = id)
        tweet.interesting = interesting
        tweet.save() 
        return HttpResponse(200)
        


