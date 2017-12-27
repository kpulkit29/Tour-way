var app=angular.module("app",["ngMaterial","dndLists"])
app.controller("control1",function($scope,$http,$rootScope){
  $scope.added_place=" ";
  $rootScope.tab_switch=false;
  $rootScope.tab1=false;
  var map=undefined;
  marker=[];
  $rootScope.places=["America","India","ghana","janakpuri","London"];
  $rootScope.tours=[{"title":"tour1","points":["delhi"]},{"title":"tour2","points":["delhi"]},{"title":"tour3","points":["delhi"]}];
  $scope.load_list=function(){
   
  }
  //to add new waypoint
  $scope.new=function(){
    console.log($scope.added_place);
    if($scope.added_place.length>0){
      $scope.places.unshift($scope.added_place);
      $scope.added_place="";
    }
     for(var i=0;i<$scope.places.length;i++){
     $scope.draw($scope.places[i]);
   }
  }
  //to create the map
  $scope.create=function(){
    var uluru = {lat: 28.7041, lng:77.1025};
     map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: uluru
    });
   /* marker.push(new google.maps.Marker({
        position: uluru,
        map: map,
        icon:"images/marker3.svg",
        animation: google.maps.Animation.DROP,
      }));*/
    console.log($rootScope.tab1);
}
$scope.draw=function(str){
  
  
    var request = {
      query: str
    };
  
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  }
  
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results[0].geometry.location);
      map.setCenter(results[0].geometry.location);
      marker.push(new google.maps.Marker({
        position: results[0].geometry.location,
        map: map,
        icon:"images/marker3.svg",
        animation: google.maps.Animation.DROP,
      }));
    }
  }
  ///to swtich between tabs
   $scope.change_style=function(arg){
       if(arg==='1'){
         $rootScope.tab_switch=false;
       }
       else{
        $rootScope.tab_switch=true;
       }
   }
   $scope.display=function(arr){
     $scope.create();
   for(var i=0;i<arr.length;i++){
     $scope.draw(arr[i]);
   }
   }
   //////////end/////////
   $scope.create();
   for(var i=0;i<$scope.places.length;i++){
     $scope.draw($scope.places[i]);
   }
});

///control2
app.controller("control2",function($scope,$rootScope){
  $scope.added_tour=" ";
  $scope.dropCall = function(index, item,t) {
    console.log('dropped at',index);
    for(var i=0;i<$rootScope.tours.length;i++){
      if($rootScope.tours[i].title===t){
        $rootScope.tours[i].points.push(item);
      }
    }
    // Return false here to cancel drop. Return true if you insert the item yourself.
   // return item;
};

   $scope.delete=function(title,item){
     for(var i=0;i<$rootScope.tours.length;i++){
       if($rootScope.tours[i].title===title){
          $rootScope.tours[i].points.splice($rootScope.tours[i].points.indexOf(item),1);
       }
     }

   }
  $scope.new_tour=function(){
    console.log("yes");
     if($scope.added_tour.length>0){
       $rootScope.tours.push({"title":$scope.added_tour,"points":[]})
     }
  }
});
/*angular
.module('demo', ['dndLists'])
.controller('DemoController', function($scope) {
  $scope.model = [generateList(1), generateList(2)];

  $scope.onDrop = function(srcList, srcIndex, targetList, targetIndex) {
    // Copy the item from source to target.
    targetList.splice(targetIndex, 0, srcList[srcIndex]);
    // Remove the item from the source, possibly correcting the index first.
    // We must do this immediately, otherwise ng-repeat complains about duplicates.
    if (srcList == targetList && targetIndex <= srcIndex) srcIndex++;
    srcList.splice(srcIndex, 1);
    // By returning true from dnd-drop we signalize we already inserted the item.
    return true;
  };

  function generateList(id) {
    return ['A', 'B', 'C'].map(function(letter) {
      // angular-drag-and-drop-lists usually serializes the objects to drag, thus we
      // can not transfer functions on the objects. However, as this fiddle uses dnd-callback
      // to move the objects directly without serialization, we can use a function reference
      // on the item here.
      return {
        labelFunc: function(index) {
          return "Item " + id + letter + " at index " + index;
        }
      };
    });
  }
});*/



