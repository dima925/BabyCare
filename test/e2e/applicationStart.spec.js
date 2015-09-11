describe('Application Start', function(){
        it('Daily status bar exists', function(){
                var daily = element(by.css('.dayli-checklist'));
                expect(daily.isPresent()).toBe(true);
        });
});