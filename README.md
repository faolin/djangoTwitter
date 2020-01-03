#application permettant d'avoir une page web faites avec angular et un serveur django qui récupére en temps réel des tweets pour ensuite ou les sotcker dans une base sqlite3 ou les annoter
#grâce a un modéle SVM et les enregistrer sur elasticsearch
#placer les fichier du dist d'angular dans le dossier static files dans /back


#build and run the docker
sudo docker-compose -f docker-compose.prod.yml up -d --build

#just run the docker
sudo docker-compose -f docker-compose.prod.yml up -d

#go to 0.0.0.0:1337 to see the static files(web page) from angular with nginx
#django server is start on 0.0.0.0:8000

#stop the docker
sudo docker-compose -f docker-compose.prod.yml down -v

#voir les logs
sudo docker-compose logs -f

#voir tout les dockers actifs (ainsi que leurs ids)
sudo docker ps

#récupérer le docker grace a son id pour récupérer la base ou les models
sudo docker export 63925e75dfe2 > contents.tar
(aller dans /home/francois/Documents/app_twitter_learning/)

#si vous voulez dupliquer ou changer d'emplacement ce projet, penser a modifier
les paths du nouveau emplacement du projet dans les fichier docker.compose.prod.yml,
nginx.conf et DockerFile.prod

#si sur windows et erreur avec le shared drive et le firewall
https://www.itprotoday.com/powershell/how-force-network-type-windows-using-powershell

#connexion avec : takioo@live.fr mdp: sinay2018
