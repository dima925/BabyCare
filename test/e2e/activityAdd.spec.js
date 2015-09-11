
describe('Activity add functionality', function(){

    it('adding bottle activity', function() {
        // go home
        element(by.css('ion-tabs a[icon="icon-home"]')).click();

        // get activities count
		var count = 0;
		element(by.css('.collection-repeat-container')).evaluate('activities').then(function(items) {
			count = items.length;
		});

        // press "+""
    	element(by.css('ion-tabs a[icon="ion-plus-round"]')).click();

    	// check if modal is active
    	expect(element.all(by.css('.modal.active[ng-controller="MenuCtrl"]')).count()).toEqual(1);

    	// check and click Bottle button
    	var buttonBottle = element.all(by.css('.modal[ng-controller="MenuCtrl"] button.bottle'));
    	expect(buttonBottle.count()).toEqual(1);
    	buttonBottle.click();

    	// check if activity modal is open
    	expect(element.all(by.css('.modal.active[ng-controller="activityCtrl"]')).count()).toEqual(1);

    	// save activity
    	var buttonSave = element.all(by.css('.modal.active[ng-controller="activityCtrl"] .footer a.btn-mid'));
    	expect(buttonSave.count()).toEqual(1);
    	buttonSave.click();

    	// check if activity is added properly
    	// we can not tranerse DOM as $scope.activities are binded to collection-repeat

    	// checking if item was added successfully 
    	var activities = element(by.css('.collection-repeat-container')).evaluate('activities').then(function(items) {
    		// count check
			expect(items.length - count).toEqual(1);
		});

    });

	it('adding activity from more menu', function() {
        // go home
        element(by.css('ion-tabs a[icon="icon-home"]')).click();

        // get activities count
		var count = 0;
		element(by.css('.collection-repeat-container')).evaluate('activities').then(function(items) {
			count = items.length;
		});

        // press "+""
    	element(by.css('ion-tabs a[icon="ion-plus-round"]')).click();

    	// check if modal is active
    	expect(element.all(by.css('.modal.active[ng-controller="MenuCtrl"]')).count()).toEqual(1);

    	// check and click Bottle button
    	var buttonMore = element.all(by.css('.modal.active[ng-controller="MenuCtrl"] button.more'));
    	expect(buttonMore.count()).toEqual(1);
    	buttonMore.click();

    	// check and click Bottle button
    	var buttonMilestone = element.all(by.css('.modal.active[ng-controller="AddMoreCtrl"] button.milestone'));
    	expect(buttonMilestone.count()).toEqual(1);
    	buttonMilestone.click();

    	// check if activity modal is open
    	expect(element.all(by.css('.modal.active[ng-controller="activityCtrl"]')).count()).toEqual(1);

    	// save activity
    	var buttonSave = element.all(by.css('.modal.active[ng-controller="activityCtrl"] .footer a.btn-mid'));
    	expect(buttonSave.count()).toEqual(1);
    	buttonSave.click();

    	// check if activity is added properly
    	// we can not tranerse DOM as $scope.activities are binded to collection-repeat

    	// checking if item was added successfully 
    	var activities = element(by.css('.collection-repeat-container')).evaluate('activities').then(function(items) {
    		// count check
			expect(items.length - count).toEqual(1);
		});

    });
	
});

/*
describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('https://angularjs.org');

    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
  });
});*/