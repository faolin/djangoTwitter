"""twitterStream URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from streamTwitter import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('startStream', views.startStream, name='stream'),
    path('stopStream', views.stopStream, name='stop stream'),
    path('getLastTweet', views.getLatestTweet, name='last tweet'),
    path('annotateTweet', views.annotateTweet, name='annotate tweet'),
    path('deleteTweets', views.deleteTweets, name='delete all the tweets'),
    path('getActiveKeywords', views.getKeywordsActive, name='get all the active keywords'),
    path('getNbrTweetsAnnoted', views.getNbrTweetsAnnoted, name='get the number of annotated tweets'),
    path('calculateApprentissage', views.apprentissage, name='get the number of annotated tweets'),
    path('saveModel', views.saveModel, name='save the model'),
    path('getModels', views.getModels, name='get all the model of a user'),
    path('getActifModel', views.getActifModel, name='get the active model of a user'),
    path('changeActifModel', views.changeActifModel, name='change the active model of a user')
]

