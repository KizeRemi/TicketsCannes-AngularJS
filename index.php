<!DOCTYPE html>
<html lang="en" ng-app="ticketApp">
<head>
  <meta charset="UTF-8">
  <title>Réservations tickets Cannes</title>
  <script src="bower_components/angular/angular.js"></script>
  <script src="bower_components/angular-foundation-6/dist/angular-foundation.min.js"></script>
  <script src="bower_components/angular-route/angular-route.min.js"></script>
  <script src="js/app.js"></script></script>
  <link rel="stylesheet" href="css/bootstrap.min.css" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>

<div class="container" ng-controller="MainCtrl as ctrl">
   <div class="well">
      <div class="row header">
         <h1><img class="logo" src="images/logo-festival-de-cannes.png"> Réservation de ticket au festival aux Cannes</h1>
      </div>
      <div class="row">
         <div class="col day-header"></div>
         <div class="col salle-header" ng-repeat="salle in ctrl.sallesHeader">
            {{ salle }}
         </div>
      </div>
      <div class="row">
         <div class="col">
            <div class="bloc_day" ng-repeat="date in ctrl.dates">
               <img src="images/background-calendrier.png">
               <span class="date">{{date.date | date : "EEEE d" }}</span>
            </div>
         </div>
         <div class="col">
            <div ng-repeat="value in ctrl.dates">
               <div class="col" ng-repeat="salle in value.salles">
                  <div class="col bloc_seance" ng-repeat="data in salle.seances">
                     <div class="col no-movie bloc" ng-if="data.titre == null">
                     </div>
                     <div ng-switch="togglePicto(salle.nom,data)">
                        <div class="movie bloc" ng-class="{'reserve':togglePicto(salle.nom,data) == 1, 'impossible':togglePicto(salle.nom,data) == 2,'en-attente':togglePicto(salle.nom,data) == 3}" ng-click="ctrl.reservation(salle.nom,value.date, data)" ng-if="data.titre != null" >
                           <h2>{{data.titre}}</h2>
                           <p>{{data.realisateur}}</p>
                           <div class="col">
                              <img src="images/picto-horaire.png">
                              {{ data.heure }}
                           </div>
                           <div class="col" ng-switch-when="1">
                             <img src="images/picto-pas-de-demande.png">
                             Reserver.
                           </div>
                           <div class="col" ng-switch-when="2">
                             <img src="images/picto-pas-de-demande.png">
                             Impossible.
                           </div>
                           <div class="col" ng-switch-when="3">
                             <img src="images/picto-demande-en-attente.png">
                             En attente.
                           </div>
                           <div class="red-dot" ng-if="data.demande == true">
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <br>
            </div>
         </div>
      </div>
   </div>
   <div class="bloc-credit" ng-class="{'full': ctrl.user.credits == 7}" >
      Crédits: {{ctrl.user.credits}}/7
   </div>
</div>

</body>
</html>