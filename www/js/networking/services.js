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
	function getActivity(userId){
		/* here is the function to retieve activity by user and baby*/
	}
	return{
		save : SaveActivity
	}

})

.service('babiesService',function($firebase,firebaseConfig,$q){
	var refBabies = new OfflineFirebase(firebaseConfig.baseUrl);
	var babiesRefActivity =  refBabies.child('babies');

	function getBabiesId(){
		/* here is the function to retieve babies by user*/
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