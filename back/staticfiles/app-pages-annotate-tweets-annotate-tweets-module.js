(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-pages-annotate-tweets-annotate-tweets-module"],{

/***/ "./src/app/pages/annotate-tweets/annotate-tweets.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/pages/annotate-tweets/annotate-tweets.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- partie keyword ou l'utilisateur rentre ses mots clés -->\n<h2 [ngStyle]=\"{ color: '#282658', 'font-size': '20px' }\">Keywords</h2>\n<div class=\"row\" [ngStyle]=\"{ background: 'white' }\">\n  <!-- input ou l'utilisateur rentre le mot clé qu'il veut ajouter-->\n  <div class=\"add-field col-lg-3\">\n    <input\n      class=\"add-input\"\n      type=\"text\"\n      name=\"keywords\"\n      placeholder=\"Add keyword\"\n      [(ngModel)]=\"keywordTyped\"\n      (keyup.enter)=\"addKeyword()\"\n    />\n  </div>\n  <!-- boutton ajouter -->\n  <button id=\"addButton\" (click)=\"addKeyword()\">\n    Add\n  </button>\n  <!-- container de tout les keywords actifs-->\n  <div class=\"active-keyword-container\">\n    <h5\n      _ngcontent-c5=\"\"\n      class=\"fs-title active-keyword-container-title\"\n      *ngIf=\"activeKeywords.length > 0\"\n    >\n      Active keywords:\n    </h5>\n    <div class=\"active-keyword\" *ngFor=\"let keyword of activeKeywords\">\n      <span class=\"active-keyword-label\">{{ keyword }}</span>\n      <span class=\"active-keyword-close\" (click)=\"activeKeywordDelete($event)\"\n        >×</span\n      >\n    </div>\n  </div>\n\n  <!-- boutton confirmer les keywords actifs-->\n  <button\n    class=\"confirmationButton\"\n    *ngIf=\"activeKeywords.length > 0\"\n    (click)=\"showModal = true\"\n  >\n    Confirm these Keywords\n  </button>\n</div>\n<!-- partie machine learning ou l'utilisateur annote les tweets et voit les informations relatives a son apprentissage -->\n<h2 [ngStyle]=\"{ color: '#282658', 'font-size': '20px', 'padding-top': '1em' }\">\n  Setup your machine learning\n</h2>\n<div class=\"row\" [ngStyle]=\"{ background: 'white' }\">\n  <!--partie affichage du tweet et bouttons d'annotations-->\n  <div class=\"col-lg-4\">\n    <div *ngIf=\"noTweetFound === true && refreshingTweet === false\">\n      <div class=\"fa fa-warning texteIndications\">\n        No tweet was found. Wait for people to post tweets with your keywords in\n        it. You can close this page and comeback later, all the tweets posted\n        during your absence will be saved on the database. You can also try to\n        refresh with the button bellow.\n      </div>\n    </div>\n    <ngx-tweet tweetId=\"{{ tweetId }}\" *ngIf=\"tweetId\"></ngx-tweet>\n    <div\n\n      id=\"buttonRefresh\"\n      [ngClass]=\"{ 'fa-spin': refreshingTweet }\"\n      class=\"fa fa-refresh fa-3x\"\n      (click)=\"animateRefreshIcone(); getLastTweet()\"\n      *ngIf=\"noTweetFound === true\"\n    ></div>\n    <button\n      class=\"fa fa-check\"\n      (click)=\"annotateTweet(1)\"\n      id=\"interestingButton\"\n      *ngIf=\"noTweetFound === false\"\n    >\n      interesting\n    </button>\n    <button\n      class=\"fa fa-close\"\n      (click)=\"annotateTweet(0)\"\n      id=\"NoninterestingButton\"\n      *ngIf=\"noTweetFound === false\"\n    >\n      Non interesting\n    </button>\n  </div>\n  <!--partie informations sur l'apprentissage-->\n  <div class=\"col-lg-8\">\n    <p class=\"texteIndications\">\n      you already treat\n      <span id=\"nbrTweetsAnnoted\">{{ nbrTweetsAnnoted }}</span>\n      tweets. To get an idea of how much you have to treat you can check the\n      scores below. for the scores to be relevant you have to annotate at least\n      a thousand tweets. \n    </p>\n    <div class=\"row\">\n      <div class=\"text-center info-box col-lg-4\">\n        <div class=\"card-header indicateurHeader\">\n          <h6 class=\"titleIndicator\">Accuracy</h6>\n        </div>\n        <div class=\"card-body indicateurBody\">\n          <p class=\"numberTweetIndicator\">{{ accuracy }} %</p>\n        </div>\n      </div>\n      <p class=\"col-lg-8 texteIndications\">\n        It is the ratio of number of correct predictions to the total number of\n        input samples. It works well only if there are equal number of samples\n        belonging to each class. In reality you will not get a perfect 50-50\n        repartition between interesting /non-interesting tweets. So you have to\n        combine accuracy with precision and recall for a better comprehension of\n        your model. (Accuracy should be > 90%)\n      </p>\n    </div>\n    <div class=\"row\">\n      <div class=\"text-center info-box col-lg-4\">\n        <div class=\"card-header indicateurHeader\">\n          <h6 class=\"titleIndicator\">Precision</h6>\n        </div>\n        <div class=\"card-body indicateurBody\">\n          <p class=\"numberTweetIndicator\">{{ precision }} %</p>\n        </div>\n      </div>\n      <p class=\"col-lg-8 texteIndications\">\n        It is the number of correct positive results divided by the number of\n        positive results predicted by the classifier. (precision should be >\n        75%)\n      </p>\n    </div>\n    <div class=\"row\">\n      <div class=\"text-center info-box col-lg-4\">\n        <div class=\"card-header indicateurHeader\">\n          <h6 class=\"titleIndicator\">Recall</h6>\n        </div>\n        <div class=\"card-body indicateurBody\">\n          <p class=\"numberTweetIndicator\">{{ recall }} %</p>\n        </div>\n      </div>\n      <p class=\"col-lg-8 texteIndications\">\n        It is the number of correct positive results divided by the number of\n        all relevant samples (all samples that should have been identified as\n        positive). (recall should be > 75%)\n      </p>\n    </div>\n    <!-- boutton calculate scores-->\n    <button class=\"confirmationButton\" (click)=\"calculateScores()\">\n      calculate scores\n    </button>\n    <!-- boutton save model-->\n    <button class=\"confirmationButton\" (click)=\"showModalSaveModel = true\">\n      Save my model\n    </button>\n    <!-- boutton go to dashboard-->\n    <button\n    class=\"confirmationButton\"\n    [routerLink]=\"['/pages/dashboard']\"\n  >\n    Go to dashboard\n  </button>\n  </div>\n\n  <!--fenetre de confirmation pour les keywords -->\n  <div\n    class=\"modal-container\"\n    [hidden]=\"!showModal\"\n    [ngClass]=\"{ animated: showModal, out: !showModal }\"\n  >\n    <div class=\"modal-background\">\n      <div class=\"modal\" id=\"infoModal\">\n        <span class=\"close\" id=\"close\" (click)=\"closeModal()\">&times;</span>\n        <div id=\"toPrint\">\n          <h4 class=\"info-modal-title\">Confirmation</h4>\n          <h5 class=\"info-title\">\n            By clicking on confirm you will delete your existing tweet's\n            database and we will start a new connexion to twitter and gathering\n            tweets filtered by the keywords you choose.\n          </h5>\n        </div>\n\n        <div id=\"modal-button-container\">\n          <input\n            type=\"button\"\n            name=\"cancel\"\n            class=\"action-button\"\n            value=\"Cancel\"\n            id=\"btnClose\"\n            (click)=\"closeModal()\"\n          />\n          <button\n            type=\"submit\"\n            class=\"submit action-button\"\n            (click)=\"stopDeleteDbTweetsStartStreamDjango()\"\n          >\n            Confirm\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!--fenetre de choix de nom pour le modéle -->\n  <div\n    class=\"modal-container\"\n    [hidden]=\"!showModalSaveModel\"\n    [ngClass]=\"{ animated: showModalSaveModel, out: !showModalSaveModel }\"\n  >\n    <div class=\"modal-background\">\n      <div class=\"modal\" id=\"infoModal\">\n        <span class=\"close\" id=\"close\" (click)=\"closeModal()\">&times;</span>\n        <h5 class=\"info-title\">\n          Don't use spaces and any special character. Use this format if you\n          want to specify multiple words : word1-word2\n        </h5>\n        <div id=\"toPrint\">\n          <input\n            type=\"text\"\n            class=\"form-control\"\n            id=\"input-1\"\n            [(ngModel)]=\"nameOfTheModel\"\n            placeholder=\"Choose a name for your model.\"\n          />\n        </div>\n\n        <div id=\"modal-button-container\">\n          <input\n            type=\"button\"\n            name=\"cancel\"\n            class=\"action-button\"\n            value=\"Cancel\"\n            id=\"btnClose\"\n            (click)=\"closeModal()\"\n          />\n          <button\n            type=\"submit\"\n            class=\"submit action-button\"\n            (click)=\"saveModel()\"\n          >\n            Confirm\n          </button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/annotate-tweets/annotate-tweets.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/pages/annotate-tweets/annotate-tweets.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n.texteIndications {\n  color: #282658;\n  font-weight: 700;\n  padding-top: 1em; }\n#nbrTweetsAnnoted {\n  font-weight: 900;\n  color: #ef8e63; }\n.indicateurHeader {\n  background-color: #18154e !important; }\n.indicateurBody {\n  background-color: #282658;\n  padding: 0px; }\n.titleIndicator {\n  font-weight: bold;\n  text-align: left;\n  letter-spacing: 0;\n  color: white;\n  margin-bottom: 0; }\n.numberTweetIndicator {\n  font-weight: bold;\n  text-align: center;\n  font-size: 50px;\n  color: white; }\n#buttonRefresh {\n  color: #ef8e63;\n  margin-left: 50%;\n  cursor: pointer; }\n.add-field {\n  width: 190px;\n  position: relative;\n  top: 4px;\n  padding-left: 1em; }\n.add-field .add-input {\n  border: none;\n  border-bottom: solid 2px #ccc;\n  border-radius: 0;\n  width: 100%;\n  box-sizing: border-box;\n  color: #282658;\n  padding-top: 1em;\n  transition: border-bottom 0.2s linear; }\n.add-field .add-input:focus {\n  border-bottom: solid 2px #282658; }\nbutton {\n  background: #ef8e63;\n  font-weight: 600 !important;\n  color: white;\n  border: 0 none;\n  border-radius: 1px;\n  cursor: pointer;\n  padding: 10px 5px;\n  margin: 10px 0;\n  transition: all 0.3s; }\nbutton:hover {\n  background: #ca783d; }\n.button-container {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  justify-content: center;\n  width: 100%; }\n.cgu-button-container {\n  justify-content: space-evenly; }\n.confirmationButton {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  width: 200px; }\n#addButton {\n  width: 50px; }\n.active-keyword-container {\n  width: 100%;\n  padding: 0 0.7em;\n  align-items: baseline; }\n.active-keyword {\n  display: inline-flex;\n  padding: 0.3rem;\n  background: #ef8e63;\n  color: #fff;\n  align-items: center;\n  margin: 0.3rem; }\n.active-keyword-label {\n  font-weight: 700; }\n.active-keyword-container-title {\n  padding-right: 0.7em; }\n.active-keyword-close {\n  line-height: 1;\n  display: inline-flex;\n  padding-left: 5px;\n  cursor: pointer;\n  font-weight: 600; }\n.action-button-user {\n  width: 100%;\n  background: #282658;\n  font-weight: bold !important;\n  color: white;\n  cursor: pointer;\n  margin-right: 10px;\n  border: none; }\n/*buttons fenetre suppression*/\n.action-button {\n  width: 150px;\n  background: #282658;\n  font-weight: bold !important;\n  color: white;\n  border: 0 none;\n  border-radius: 1px;\n  cursor: pointer;\n  padding: 10px 5px;\n  margin: 10px 5px; }\n#myModal .action-button:hover,\n#myModal .action-button:focus {\n  background: #4845a1; }\n/*boutton interessant*/\n#interestingButton {\n  background: #6eb000;\n  width: 120px;\n  margin-right: 1em; }\n#interestingButton:hover {\n  background: #ef8e63; }\n/* boutton non-intérésant */\n#NoninterestingButton {\n  background-color: #d45d5a;\n  width: 120px; }\n#NoninterestingButton:hover {\n  background: #ef8e63; }\n/* The Close Button */\n.close {\n  color: #aaa;\n  float: right;\n  font-weight: bold; }\n.close:hover,\n.close:focus {\n  color: black;\n  text-decoration: none;\n  cursor: pointer; }\n#modal-button-container {\n  text-align: right; }\n.info-modal-title {\n  text-align: center;\n  font-weight: 700;\n  text-transform: uppercase; }\n.info-title {\n  color: #777777;\n  width: 80%;\n  font-size: 13px;\n  letter-spacing: 1px;\n  margin-left: 2px;\n  margin-top: 2em; }\n.modal-container {\n  position: fixed;\n  display: table;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  z-index: 99999 !important; }\n.modal-container.animated {\n  -webkit-transform: scale(1);\n          transform: scale(1); }\n.modal-container.animated .modal-background {\n  -webkit-animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;\n          animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }\n.modal-container.animated .modal-background #infoModal {\n  -webkit-animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;\n          animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }\n.modal-container.animated + .content {\n  -webkit-animation: scaleBack 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;\n          animation: scaleBack 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }\n.modal-container.animated.out {\n  -webkit-animation: quickScaleDown 0s 0.5s linear forwards;\n          animation: quickScaleDown 0s 0.5s linear forwards; }\n.modal-container.animated.out .modal-background {\n  -webkit-animation: fadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;\n          animation: fadeOut 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }\n.modal-container.animated.out .modal-background #infoModal {\n  -webkit-animation: scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;\n          animation: scaleDown 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }\n.modal-container.animated.out + .content {\n  -webkit-animation: scaleForward 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;\n          animation: scaleForward 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; }\n.modal-container .modal-background {\n  display: table-cell;\n  background: rgba(0, 0, 0, 0.8);\n  text-align: center;\n  vertical-align: middle; }\n.modal-container .modal-background #infoModal {\n  background: white;\n  padding: 20px;\n  display: inline-block;\n  border-radius: 3px;\n  font-weight: 300;\n  position: relative;\n  width: 40%;\n  text-align: left;\n  height: 200px; }\n@media (max-width: 1024px) {\n  .modal-container .modal-background #infoModal {\n    width: 80%; } }\n@media (max-width: 520px) {\n  .modal-container .modal-background #infoModal {\n    height: 320px; } }\n"

/***/ }),

/***/ "./src/app/pages/annotate-tweets/annotate-tweets.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/pages/annotate-tweets/annotate-tweets.component.ts ***!
  \********************************************************************/
/*! exports provided: AnnotateTweetsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotateTweetsComponent", function() { return AnnotateTweetsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_django_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/django.service */ "./src/app/services/django.service.ts");
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _services_visualization_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/visualization.service */ "./src/app/services/visualization.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AnnotateTweetsComponent = /** @class */ (function () {
    function AnnotateTweetsComponent(djangoService, userService, visualizationService) {
        this.djangoService = djangoService;
        this.userService = userService;
        this.visualizationService = visualizationService;
        // id du tweet que l'on affiche
        this.tweetId = null;
        // liste des keywords actifs
        this.activeKeywords = [];
        // text dans l'input d'ajout de keyword
        this.keywordTyped = null;
        // affichage ou non de la fenetre de confirmation d'ajout de keywords
        this.showModal = false;
        // affichage ou non de la fenetre pour rentrer le nom du modéle
        this.showModalSaveModel = false;
        this.nbrTweetsAnnoted = 0;
        // affichage ou non du message indiquant qu'aucun tweets n'a été trouvés pour le moment
        this.noTweetFound = false;
        // permet de savoir quand est ce que l'icone du refresh tourne ou non
        this.refreshingTweet = false;
        this.accuracy = 0;
        this.precision = 0;
        this.recall = 0;
        this.emailUser = this.userService.getUser().email.toString();
    }
    AnnotateTweetsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getLastTweet();
        this.getNumberTweetsAnnoted();
        // on récupére les mots clés actifs de l'utilisateur enregistrés sur la base
        this.djangoService.getAllActiveKeywords(this.emailUser).subscribe(function (data) {
            if (data.keywords.length > 0) {
                _this.activeKeywords = data.keywords;
                // si il y a des mots clés actifs, l'on stoppe au cas ou il ya déja un stream actif et on lance un nouveau stream
                _this.stopAndStartStream();
            }
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * @description appel le service django pour récupérer le nombre de tweets annotés par l'utilisateur
     */
    AnnotateTweetsComponent.prototype.getNumberTweetsAnnoted = function () {
        var _this = this;
        this.djangoService.getNbrTweetsAnnoted(this.emailUser).subscribe(function (data) {
            _this.nbrTweetsAnnoted = data.nbrTweetsAnnoted;
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * @description permet de récupérer les scores de recall, precision et accuracy
     */
    AnnotateTweetsComponent.prototype.calculateScores = function () {
        var _this = this;
        this.djangoService.calculateApprentissage(this.emailUser).subscribe(function (data) {
            console.log(data);
            _this.accuracy = Math.round(data.accuracy);
            _this.precision = Math.round(data.precision * 100);
            _this.recall = Math.round(data.recall * 100);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * @description permet de stopper et de redémarrer le stream (lancer au chargement de la page)
     */
    AnnotateTweetsComponent.prototype.stopAndStartStream = function () {
        this.djangoService
            .stopAndStartStream(this.activeKeywords, this.emailUser, null)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * @description permet de stopper le stream, supprimer la base de tweets et redémarrer un novueau stream
     *  avec des mots clés choisis par l'utilisateur
     */
    AnnotateTweetsComponent.prototype.stopDeleteDbTweetsStartStreamDjango = function () {
        this.tweetId = null;
        this.noTweetFound = true;
        // une fois que l'utilisateur a cliqué sur confirmer on enléve la fenetre de suppression et on démarre le stream
        this.showModal = false;
        this.djangoService
            .stopDeleteDbTweetsAndStartStream(this.activeKeywords, this.emailUser, null)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    /**
     * @description permet d'animer l'icone de rafraichissement du dernier tweet
     */
    AnnotateTweetsComponent.prototype.animateRefreshIcone = function () {
        var _this = this;
        this.refreshingTweet = true;
        setTimeout(function () { return _this.refreshingTweet = false; }, 2000);
    };
    /**
     * @description permet de récupérer le dernier tweet non annotés de la base de données du serveur django
     */
    AnnotateTweetsComponent.prototype.getLastTweet = function () {
        var _this = this;
        this.djangoService.getLastTweet(this.emailUser).subscribe(function (data) {
            _this.noTweetFound = false;
            _this.tweetId = data.tweet_id;
            _this.refreshingTweet = false;
            _this.getNumberTweetsAnnoted();
        }, function (error) {
            console.log(error);
            // si le serveur nous renvoie un 404 on sait que c'est parcequ'il n'a pas trouvé de tweets non annotés
            if (error.status === 404) {
                _this.noTweetFound = true;
                _this.tweetId = null;
            }
        });
    };
    /**
     * @description permet d'annoter un tweet et d'envoyer l'annotation au serveur django qu'il l'enregistre sur la base
     * @param annotation
     */
    AnnotateTweetsComponent.prototype.annotateTweet = function (annotation) {
        var _this = this;
        console.log(this.tweetId);
        this.djangoService.annotateTweet(this.tweetId, annotation).subscribe(function (data) {
            _this.tweetId = null;
            _this.getLastTweet();
            console.log(data);
        }, function (error) {
            console.log(error);
            /*si le serveur nous renvoie un 404 on sait que c'est parceque le stream a redémarré, la base a été supprimé
            et l'utilisateur essaye d'annoter un tweet qui n'existe plus dans la base */
            if (error.status === 404) {
                _this.noTweetFound = true;
                _this.tweetId = null;
            }
        });
    };
    /**
     * @description Fonction lancée lorsque l'on clique sur le bouton "cancel" ou sur la croix en haut du modal
     */
    AnnotateTweetsComponent.prototype.closeModal = function () {
        this.showModal = false;
        this.showModalSaveModel = false;
        document.body.classList.remove('modal-active');
    };
    /**
     * @description permet de rajouter un keyword a la liste des keywords actifs
     */
    AnnotateTweetsComponent.prototype.addKeyword = function () {
        if (this.keywordTyped !== null) {
            // on rajoute le mot clé a la liste des keyword actifs
            this.activeKeywords.push(this.keywordTyped);
            // l'on supprime ce que viens de taper l'utilisateur
            this.keywordTyped = null;
        }
    };
    /**
     * Supprime un Keyword actif de l'affichage
     * @param event Évènement déclenché par le bouton "x" d'un Keyword actif
     */
    AnnotateTweetsComponent.prototype.activeKeywordDelete = function (event) {
        // Récupère le label du Keyword à supprimer dans la vue
        var toDelete = event.target.parentElement.querySelector('.active-keyword-label').innerHTML;
        // Parcourt tous les Keyword actifs et supprime celui dont le label est égal à celui récupéré
        for (var i = 0; i < this.activeKeywords.length; i++) {
            if (this.activeKeywords[i] === toDelete) {
                this.activeKeywords.splice(i, 1);
            }
        }
    };
    /**
     * @description appel au service pour sauvegarder le modéle d'apprentissage de l'utilisateur
     */
    AnnotateTweetsComponent.prototype.saveModel = function () {
        var _this = this;
        this.showModalSaveModel = false;
        this.djangoService.saveModel(this.nameOfTheModel, this.emailUser).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
            if (error.status === 409) {
                _this.visualizationService.openToastr('Name already used', 'Error', 'error');
            }
        });
    };
    AnnotateTweetsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-annotate-tweets',
            template: __webpack_require__(/*! ./annotate-tweets.component.html */ "./src/app/pages/annotate-tweets/annotate-tweets.component.html"),
            styles: [__webpack_require__(/*! ./annotate-tweets.component.scss */ "./src/app/pages/annotate-tweets/annotate-tweets.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_django_service__WEBPACK_IMPORTED_MODULE_1__["DjangoService"],
            _services_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"],
            _services_visualization_service__WEBPACK_IMPORTED_MODULE_3__["VisualizationService"]])
    ], AnnotateTweetsComponent);
    return AnnotateTweetsComponent;
}());



/***/ }),

/***/ "./src/app/pages/annotate-tweets/annotate-tweets.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/annotate-tweets/annotate-tweets.module.ts ***!
  \*****************************************************************/
/*! exports provided: routes, AnnotateTweetModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotateTweetModule", function() { return AnnotateTweetModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _annotate_tweets_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./annotate-tweets.component */ "./src/app/pages/annotate-tweets/annotate-tweets.component.ts");
/* harmony import */ var ngx_tweet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-tweet */ "./node_modules/ngx-tweet/fesm5/ngx-tweet.js");
/* harmony import */ var _theme_components_spinner_spinner_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../theme/components/spinner/spinner.module */ "./src/app/theme/components/spinner/spinner.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: _annotate_tweets_component__WEBPACK_IMPORTED_MODULE_4__["AnnotateTweetsComponent"], data: { breadcrumb: 'Annotate tweets' } },
];
var AnnotateTweetModule = /** @class */ (function () {
    function AnnotateTweetModule() {
    }
    AnnotateTweetModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                ngx_tweet__WEBPACK_IMPORTED_MODULE_5__["NgxTweetModule"],
                _theme_components_spinner_spinner_module__WEBPACK_IMPORTED_MODULE_6__["SpinnerModule"],
            ],
            declarations: [
                _annotate_tweets_component__WEBPACK_IMPORTED_MODULE_4__["AnnotateTweetsComponent"],
            ]
        })
    ], AnnotateTweetModule);
    return AnnotateTweetModule;
}());



/***/ }),

/***/ "./src/app/services/visualization.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/visualization.service.ts ***!
  \***************************************************/
/*! exports provided: VisualizationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VisualizationService", function() { return VisualizationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Service contenant des fonctions d'affichage communes à plusieurs composants
 */
var VisualizationService = /** @class */ (function () {
    /**
     * @constructor
     * @param toastrService Service permettant de créer les messages colorés en haut à droite
     */
    function VisualizationService(toastrService) {
        this.toastrService = toastrService;
        this.options = this.toastrService.toastrConfig;
    }
    /**
     * Fonction executée lors d'un clic en dehors des inputs avec la directive "platformClickOutside",
     * si l'input est vide, retire la classe "active" de tous les labels de ces inputs
     */
    VisualizationService.prototype.platformClickedOutside = function (isClickedOutside) {
        if (!isClickedOutside) {
            var inputs = document.querySelectorAll('.input-material');
            [].forEach.call(inputs, function (input) {
                if (input.value === '') {
                    input.parentElement
                        .querySelector('.label-material')
                        .classList.remove('active');
                }
            });
            return true;
        }
        return false;
    };
    /**
     * Ajoute la class "active" au label de l'input cliqué.
     * @param event Evénement déclenché lors d'un clic sur un des inputs
     */
    VisualizationService.prototype.textInputClick = function (inputEvent) {
        inputEvent.stopPropagation();
        document
            .getElementById(inputEvent.target.id)
            .parentElement.querySelector('.label-material')
            .classList.add('active');
        return false;
    };
    /**
     * Ajoute la class "active" au label de l'input qui a subit un changement.
     * @param event Evénement déclenché lors d'un changement sur un des inputs
     */
    VisualizationService.prototype.textInputChange = function (inputEvent) {
        document
            .getElementById(inputEvent.target.id)
            .parentElement.querySelector('.label-material')
            .classList.add('active');
    };
    /**
     * Vérifie si une case à cocher est coché ou non
     * @param checkboxID Identifiant de la case à vérifier
     * @returns true si coché, false sinon
     */
    VisualizationService.prototype.checkBoxActiveOrNot = function (checkboxID) {
        if (jQuery('#' + checkboxID).prop('checked') === true) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Crée le Toastr (message coloré en haut à droite) après avoir soumis le formulaire de création du client
     * @param message Message qui sera affiché dans le Toastr
     * @param title Titre du Toastr
     * @param type Type du Toastr définissant la couleur; "warning" : orange, "error" : rouge, "success" : vert
     */
    VisualizationService.prototype.openToastr = function (message, title, type) {
        var m = message;
        var t = title;
        var opt = JSON.parse(JSON.stringify(this.options));
        var inserted = this.toastrService[type](m, t, opt);
        return inserted;
    };
    VisualizationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"]])
    ], VisualizationService);
    return VisualizationService;
}());



/***/ })

}]);
//# sourceMappingURL=app-pages-annotate-tweets-annotate-tweets-module.js.map