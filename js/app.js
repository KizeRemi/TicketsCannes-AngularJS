
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
   ctrl.salles = [];
   ctrl.seances = [];

  	angular.forEach(ctrl.dates, function(data) {
		  	angular.forEach(data.salles, function(salle) {
		  		if(ctrl.sallesHeader.indexOf(salle.nom) == -1) ctrl.sallesHeader.push(salle.nom);         
			});
		});
   });

   this.reservation = function(salle,date, seanceChoisi) {
      var cout = 0;
      if(seanceChoisi.demande) cout = 2;
      else cout = 1  
      var tempCredits = ctrl.user.credits + cout;
      if(tempCredits > 7){
         alert("Vous n'avez pas assez de crédits.");
      }

      var alreadyReservMovieThisDay = false;
      angular.forEach(ctrl.user.seances, function(seance) {
         if(seance.date === date && seance.titre == seanceChoisi.titre){
            alreadyReservMovieThisDay = true;
            return;
         }
      }); 

      seanceChoisi.date = date;
      seanceChoisi.salle = salle;
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
      angular.forEach(ctrl.user.seances, function(seance) {
         if(seance.titre == seanceChoisi.titre && seance.heure != seanceChoisi.heure){
            alreadyReservMovieThisDay = true;
            return;
         }
      }); 
      if(alreadyReservMovieThisDay){
         return 2;
      }
      if(ctrl.user.seances.indexOf(seanceChoisi) == -1 ){
         return 1;
      }
      return 3;
   };
}]);