angular.module('cleverbaby.services',[])

.service('activityService', function($firebase,firebaseConfig,$q){
	var refActivity = new OfflineFirebase(firebaseConfig.baseUrl);
	var childRefActivity =  refActivity.child('activities');

	function SaveActivity(babyId,data){
		var newActivity = childRefActivity.push(data);
		var activityID = newActivity.key();
		console.log("baby ID :"+babyId);
		childRefActivity.child(activityID+"/babies/"+babyId).set("true");
	}
	return{
		save : SaveActivity
	}

})

.service('babiesService',function($firebase,firebaseConfig,$q){
	var refBabies = new OfflineFirebase(firebaseConfig.baseUrl);
	var babiesRefActivity =  refBabies.child('babies');

	function getBabiesId(){
		var deffered = $q.defer();
		babiesRefActivity.once('child_added', function (snapshot) {
			var hasil = snapshot.key();
			deffered.resolve(hasil);
        });
		return deffered.promise;
	}
	return{
		getbabiesId : getBabiesId
	}
})