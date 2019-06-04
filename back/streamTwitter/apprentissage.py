
from streamTwitter import models as streamTwitter_models
import pandas as pd
import numpy as np
import json
import time
from sklearn.metrics import precision_recall_fscore_support
from sklearn.externals import joblib
# permet de récupérer les tweets et leurs anotations afin de séparer la base en 2 une partie pour l'apprentissage =90% et une test = 10%
def retrieve_data(userEmail):
    frac = 0.8
    all_tweets = []
    all_notation = []
    tweetsAnnoted = streamTwitter_models.Tweet.objects.filter(emailUser = userEmail).exclude(interesting = None)
    #print('len tweets annoted:' , len(tweetsAnnoted))
    for i in range(len(tweetsAnnoted)):
        all_tweets.append(tweetsAnnoted[i].text)
        all_notation.append(tweetsAnnoted[i].interesting)
    # si il n'y a pas de tweets annotés l'on retourne des listes vides
    if all_tweets == []:
        return [],  [],  [],  []
    df = pd.DataFrame({'tweet': all_tweets, 'interessant': all_notation})
    df['split'] = np.random.randn(df.shape[0], 1)
    msk = np.random.rand(len(df)) <= frac
    train = df[msk]
    test = df[~msk]
    return train['tweet'], train['interessant'], test['tweet'], test['interessant']

def bigram_process(data):
    from sklearn.feature_extraction.text import CountVectorizer
    vectorizer = CountVectorizer(ngram_range=(1, 2))
    vectorizer = vectorizer.fit(data)
    return vectorizer

def train_and_test(vectorizer, training_function, Xtrain_text, Ytrain, Xtest_text, Ytest):

    #print ("-----------------------TRAINING THE MODEL---------------------------")

    # sans TF-IDF
    Xtrain_uni = vectorizer.transform(Xtrain_text)
    classifier = training_function(Xtrain_uni, Ytrain)
    Ytrain_uni = classifier.predict(Xtrain_uni)


    #print ("Train accuracy: ", accuracy(Ytrain, Ytrain_uni))
    #print ("\n")
    #print ("-----------------------TESTING THE MODEL -----------------------")
    Xtest_uni = vectorizer.transform(Xtest_text)
    Ytest_uni = classifier.predict(Xtest_uni)
    testAccuracy = accuracy(Ytest, Ytest_uni)
    #print ("Test accuracy: ", testAccuracy)
    #print ("\n")
    #print("-----------------precision, recall----------------------")
    scores = precision_recall_fscore_support(Ytest, Ytest_uni)
    # conditions permettant de gérer les erreurs quand il y'a trés peu de données
    #print(scores)
    if len(scores[0]) == 1:
        precision = int(scores[0])
    else :
        precision = (scores[0][0] + scores[0][1]) / 2
    if len(scores[1]) == 1:
        recall = int(scores[1])
    else : 
        recall = (scores[1][0] + scores[1][1]) / 2
    #print("precision: ", precision)
    #print("recall: ", recall)
    #print('\n') 
    return Ytest_uni, classifier, precision, recall, testAccuracy

# classifier
def train_sgd(Xtrain, Ytrain): 
    from sklearn.linear_model import SGDClassifier
    classifier = SGDClassifier(loss="hinge", penalty="elasticnet", max_iter=20)  # 'hinge' loss = linear Support Vector Machine (SVM)
    #print("SGD Fitting")
    classifier.fit(Xtrain, Ytrain)
    return classifier

#mesure de la précision
def accuracy(Ytrain, Ytest):
    assert (len(Ytrain) == len(Ytest))
    num = sum([1 for i, word in enumerate(Ytrain) if Ytest[i] == word])
    n = len(Ytrain)
    return (num * 100) / n
#classifie un tweet a l'aide d'un modéle de prédiction entrainé sur 10 000 tweets annotés'''
def tweet_classifier(tweet, nameOfTheModel):
    model = joblib.load('models/' + nameOfTheModel + '.pkl')
    vectorizer = joblib.load('models/' + nameOfTheModel + '_vectorizer.pkl')
    tweet_vector = vectorizer.transform([tweet])
    tweet_prediction = model.predict(tweet_vector)
    return tweet_prediction