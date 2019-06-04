import datetime as dt
import json
import requests

url_server_elasticsearch = 'http://elasticsearch:9500/twitter-learning-'

'''récupére la date d'aujourd'hui et la formatte pour elasticsearch'''
def formattage_date():
    today_date = dt.datetime.today()
    split = str(today_date).split(' ')

    annee_mois_jour = split[0]
    heure_min_sec = split[1]
    split_heure_min_sec = heure_min_sec.split(':')
    sec = split_heure_min_sec[-1]
    sec = sec.split('.')
    sec = sec[0]
    heure_min_sec = '%s'%split_heure_min_sec[-3] + ':' + '%s'%split_heure_min_sec[-2] +':'+ str(sec)
    date = annee_mois_jour +"T"+ heure_min_sec
    return date

'''envoie les tweets à elasticsearch dans l'index précisé'''
def post_tweet_elasticsearch(tweet, prediction, data, nameOfTheModel):
    url = url_server_elasticsearch + nameOfTheModel + '/tweet/'
    print(url)
    data = {'tweet': '%s'%tweet, 'categorie': '%d'%prediction, 'date': '%s'%formattage_date(), 'source': '%s'%json.dumps(data)} #.strftime("%Y_%m_%d_%H") }
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    r = requests.post(url, data=json.dumps(data), headers=headers)
    print(r.text)