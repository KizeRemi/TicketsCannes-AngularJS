
'use strict';

var ticketApp = angular.module('ticketApp', []);

ticketApp.controller('MainCtrl', ['$scope','$http', function ($scope, $http) {
	var ctrl = this;
   var promDates = $http.get("data/dates.json");
  	promDates.then(function(response){
   ctrl.dates = response.data;
   ctrl.user = [];
   ctrl.user.seances = [];
   ctrl.user.credits = 0;
   //Recuperation des salles
   ctrl.sallesHeader = [];
  	angular.forEach(ctrl.dates, function(data) {
		  	angular.forEach(data.salles, function(salle) {
		  		if(ctrl.sallesHeader.indexOf(salle.nom) == -1) ctrl.sallesHeader.push(salle.nom);         
			});
		});
   });

   this.reservation = function(salle,date, seanceChoisi) {
      // On vérifie si l'utilisateur possède assez de crédit
      var cout = 0;
      if(seanceChoisi.demande) cout = 2;
      else cout = 1  
      var tempCredits = ctrl.user.credits + cout;
      if(tempCredits > 7 && ctrl.user.seances.indexOf(seanceChoisi) == -1){
         alert("Vous n'avez pas assez de crédits.");
         return;
      }
      // On vérifie si l'utilisateur a déjà réservé le film
      var alreadyReservMovieThisDay = false;
      angular.forEach(ctrl.user.seances, function(seance) {
         if(seance.date === date && seance.titre == seanceChoisi.titre){
            alreadyReservMovieThisDay = true;
            return;
         }
      }); 



      seanceChoisi.date = date;
      seanceChoisi.salle = salle;
      // Si l'utilisateur a déjà reservé, on annule sinon on l'ajoute
      if(ctrl.user.seances.indexOf(seanceChoisi) >= 0 && confirm("Etes-vous sûr de vouloir supprimer cette réservation?")){
         ;
         var seanceToDelete =  ctrl.user.seances.indexOf(seanceChoisi);
         ctrl.user.seances.splice(seanceToDelete, 1);
         ctrl.user.credits -= cout;
      } else if(ctrl.user.seances.indexOf(seanceChoisi) == -1 && tempCredits <= 7 && alreadyReservMovieThisDay == false){
         ctrl.user.credits += cout;
         ctrl.user.seances.push(seanceChoisi);
      } 
   }

   $scope.togglePicto = function(salle,seanceChoisi){
      var alreadyReservMovieThisDay = false;
      seanceChoisi.salle = salle;
      console.log(ctrl.user.seances);
      // On vérifie si l'utilisateur a déjà réservé sur un autre horaire ou une salle différente
      angular.forEach(ctrl.user.seances, function(seance) {
         if((seance.titre == seanceChoisi.titre && seance.heure != seanceChoisi.heure)||(seance.titre == seanceChoisi.titre && seance.salle != seanceChoisi.salle)){
            alreadyReservMovieThisDay = true;
            return;
         }
      }); 
      // si l'utilisateur ne peut pas réserver le film
      if(alreadyReservMovieThisDay){
         return 2;
      }
      // si l'utilisateur n'a pas reservé le film
      if(ctrl.user.seances.indexOf(seanceChoisi) == -1 ){
         return 1;
      }
      // Si aucun, alors en attente
      return 3;
   };
}]);