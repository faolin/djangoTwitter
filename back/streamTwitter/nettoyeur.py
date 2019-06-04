import re
import string
import os 
import nltk
nltk.download('stopwords')
from nltk.tokenize import TweetTokenizer
from nltk.corpus import stopwords
from nltk.stem.snowball import FrenchStemmer
from nltk.stem.snowball import SnowballStemmer

dir_path = os.path.dirname(os.path.realpath(__file__))
#fichier contenant toutes les émoticones
fichier_emoticone = dir_path + '/all_emoji.txt'
#tokenizer qui permet de transformer une phrase en une liste de mots
tokenizer = TweetTokenizer(reduce_len=True, strip_handles=True, preserve_case=False) 
#liste de mots inutiles
stopWords_fr = set(stopwords.words('french'))
stopWords_en = set(stopwords.words('english'))
#stemmatisation (on garde seulement la racine du mot)
stemmer = FrenchStemmer()
stemmer_english = SnowballStemmer("english")

# regroupement de toutes les fonctions pour nettoyer le texte, grace au texte du tweet et a ses métadonnées
def nettoyer_le_texte(texte , json_load, language):  
    no_url = remove_url(texte)
    no_emoji = remove_emoji(fichier_emoticone, no_url)
    '''no_hashtags = remove_hashtags(no_emoji)
    if no_hashtags == no_emoji:
        print("pas de hashtags détécté")
    else:
        print("remove hashtags : ", no_hashtags)'''
    remove_username = remove_username_twitter(no_emoji, json_load)
    '''if remove_username == no_emoji:
        print("pas de username détécté.")
    else:
        print("remove username :", remove_username)'''
    no_punctuation = remove_punctuation(remove_username)
    texte_tokenize = tokenizer.tokenize(no_punctuation)
    #print("tokenisation : ", texte_tokenize)
    words_stopped = remove_stopswords(language, texte_tokenize)
    #print('words stop: ', words_stopped)
    texte_stemmatiser = stemmatisation(language, words_stopped)
    #print('texte stemmatiser: ', texte_stemmatiser)
    return texte_stemmatiser

 # toutes les fonctions de nettoyage du tweet

#supprime les mots inutiles  etc..
def remove_stopswords(language, texte_tokenize):
    wordsFiltered = []
    if (language == 'fr'):
        for w in texte_tokenize:
            if w not in stopWords_fr:
                wordsFiltered.append(w)
        #print("remove stopwords", wordsFiltered)
        return wordsFiltered
    if (language == 'en'):
        for w in texte_tokenize:
            if w not in stopWords_en:
                wordsFiltered.append(w)
        #print("remove stopwords", wordsFiltered)
        return wordsFiltered

# garde seulement la racine des mots pour que l'IA n'ait pas a comprendre les conjugaisons des verbes etc...
def stemmatisation(language, texte):
    liste_mots_stem = ""
    if (language == 'fr'):
        for i in range(len(texte)):
            liste_mots_stem = liste_mots_stem + " " + stemmer.stem(texte[i])
    if (language == 'en'):
        for i in range(len(texte)):
            liste_mots_stem = liste_mots_stem + " " + stemmer_english.stem(texte[i])
    #print("stemmatisaton: ", liste_mots_stem)
    return liste_mots_stem
#remove les emoji présentes dans un fichier d'un texte
def remove_emoji(fichier_emoticone, texte):
    pas_emoticon = ""
    compteur_emote = 0
    with open(fichier_emoticone, "r") as fichier_emoticone:
        fichier_emoticone_to_rawtext = fichier_emoticone.read()
        all_emoticone = fichier_emoticone_to_rawtext.split("\n")
        for y in range(len(all_emoticone)):
            if all_emoticone[y] in texte:
                compteur_emote += 1
                if pas_emoticon == "":
                    pas_emoticon = texte.replace(all_emoticone[y], ' ')
                else:
                    pas_emoticon = pas_emoticon.replace(all_emoticone[y], ' ')
        if compteur_emote == 0:
            return texte
        else:
            return pas_emoticon

#remove la ponctuation d'un texte
def remove_punctuation(texte):
    no_punctuation = texte.translate(str.maketrans({a: " " for a in string.punctuation}))
    no_punctuation = no_punctuation.replace('’', ' ')
    no_punctuation = no_punctuation.replace('«', ' ')
    no_punctuation = no_punctuation.replace('»', ' ')
    no_punctuation = no_punctuation.replace('➡', ' ')
    no_punctuation = no_punctuation.replace('•', ' ')
    no_punctuation = no_punctuation.replace('°', ' ')
    no_punctuation = no_punctuation.replace('×', ' ')
    #print("remove punctuation: ", no_punctuation)
    return no_punctuation

#remove l'url d'un texte
def remove_url(texte):
    resultat = re.sub(r"http\S+", "", texte)
    if resultat == texte:
        #print("pas d'url detéctée")
        return texte
    else:
        #print("remove url:", resultat)
        return resultat

# enléve les user mention et les username d'un tweet
def remove_username_twitter(texte, json_load):  
    texte_sans_username = ""
    texte_sans_user_mention = ""

    def all_user_mention_path(texte_sans_user_mention, structurejson1, structurejson2, structurejson3,
                                structurejson4):
        if structurejson3 == None and structurejson4 == None:
            nbr_user_mention = len(json_load[structurejson1][structurejson2])
            struct_user_mention = json_load[structurejson1][structurejson2]
        if structurejson4 == None and structurejson3 != None:
            nbr_user_mention = len(json_load[structurejson1][structurejson2][structurejson3])
            struct_user_mention = json_load[structurejson1][structurejson2][structurejson3]
        if structurejson1 != None and structurejson2 != None and structurejson3 != None and structurejson4 != None:
            nbr_user_mention = len(json_load[structurejson1][structurejson2][structurejson3][structurejson4])
            struct_user_mention = json_load[structurejson1][structurejson2][structurejson3][structurejson4]

        for i in range(nbr_user_mention):
            user_mention = "@" + struct_user_mention[i]['screen_name']
            if texte_sans_user_mention == "":
                elem2 = [x for x in texte.split()]
            else:
                elem2 = [x for x in texte_sans_user_mention.split()]
            for item in elem2:
                index = item.lower().find(user_mention.lower())
                if index != -1:
                    if texte_sans_user_mention == "":
                        texte_sans_user_mention = texte.replace(item, "")
                        texte_sans_user_mention = texte_sans_user_mention.replace(item.lower(), "")
                    else:
                        texte_sans_user_mention = texte_sans_user_mention.replace(item, "")
                        texte_sans_user_mention = texte_sans_user_mention.replace(item.lower(), "")
        return texte_sans_user_mention

    try:
        texte_sans_user_mention = all_user_mention_path(texte_sans_user_mention, 'quoted_status',
                                                        'extended_tweet', 'entities', 'user_mentions')
    except KeyError:
        result = "pas de user mention pour la structure json ci-dessus"
    try:
        texte_sans_user_mention = all_user_mention_path(texte_sans_user_mention, 'quoted_status', 'entities',
                                                        'user_mentions', None)
    except KeyError:
        result = "pas de user mention pour la structure json ci-dessus"
    try:
        texte_sans_user_mention = all_user_mention_path(texte_sans_user_mention, 'extended_tweet', 'entities',
                                                        'user_mentions', None)
    except KeyError:
        result = "pas de user mention pour la structure json ci-dessus"
    try:
        texte_sans_user_mention = all_user_mention_path(texte_sans_user_mention, 'retweeted_status',
                                                        'extended_tweet', 'entities', 'user_mentions')
    except KeyError:
        result = "pas de user mention pour la structure json ci-dessus"
    try:
        texte_sans_user_mention = all_user_mention_path(texte_sans_user_mention, 'retweeted_status', 'entities',
                                                        'user_mentions', None)
    except KeyError:
        result = "pas de user mention pour la structure json ci-dessus"
    try:
        texte_sans_user_mention = all_user_mention_path(texte_sans_user_mention, 'entities', 'user_mentions',
                                                        None, None)
    except KeyError:
        result = "pas de user mention pour la structure json ci-dessus"

    def all_username_path(texte_sans_username, texte_sans_user_mention, structurejson1, structurejson2,
                            structurejson3):
        if structurejson3 == None and structurejson2 == None:
            struct_user_mention = json_load[structurejson1]
        else:
            struct_user_mention = json_load[structurejson1][structurejson2][structurejson3]
        user_mention = "@" + struct_user_mention
        if texte_sans_user_mention == "":
            elem3 = [x for x in texte.split()]
        else:
            elem3 = [x for x in texte_sans_user_mention.split()]
        for item in elem3:
            index = item.lower().find(user_mention.lower())
            if index != -1:
                if texte_sans_user_mention == "":
                    texte_sans_username = texte.replace(item, "")
                    texte_sans_username = texte_sans_username.replace(item.lower(), "")
                else:
                    texte_sans_username = texte_sans_user_mention.replace(item, "")
                    texte_sans_username = texte_sans_username.replace(item.lower(), "")
            else:
                if texte_sans_user_mention == "":
                    texte_sans_username = texte
                else:
                    texte_sans_username = texte_sans_user_mention
        return texte_sans_username

    try:
        texte_sans_username = all_username_path(texte_sans_username, texte_sans_user_mention,
                                                'retweeted_status', 'user', 'screen_name')
        return texte_sans_username
    except KeyError:
        result = "pas de user mention pour la structure json ci-dessus"
    try:
        texte_sans_username = all_username_path(texte_sans_username, texte_sans_user_mention,
                                                'in_reply_to_screen_name', None, None)
        return texte_sans_username
    except TypeError:
        if texte_sans_user_mention == "":
            return texte
        else:
            return texte_sans_user_mention