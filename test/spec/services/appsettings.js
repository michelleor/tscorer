'use strict';

describe('Service: AppSettings', function () {

  // load the service's module
  beforeEach(module('tscorerApp'));

  // instantiate service
  var AppSettings;
  beforeEach(inject(function (_AppSettings_) {
    AppSettings = _AppSettings_;
  }));

  it('should do something', function () {
    expect(!!AppSettings).toBe(true);
  });

  it( 'should define gameTypes as an array of 2', function(){
    expect(AppSettings.gameTypes).toBeDefined();
    expect(AppSettings.gameTypes.length).toBe(2);
  });

  it( 'should define gamesPerSet as an array which contains the values 6 and 8', function(){
    expect(AppSettings.games).toContain(6);
    expect(AppSettings.games).toContain(8);
  });

  it( 'should define sets as an array which contains the values 1 and 3', function(){
    expect(AppSettings.sets).toContain(1);
    expect(AppSettings.sets).toContain(3);
  });

  it( 'should define scores as an object', function(){
    expect(AppSettings.scores).toEqual(jasmine.any(Object));
  });

  it( 'should define chases as an object', function(){
    expect(AppSettings.chases).toEqual(jasmine.any(Object));
  });

  it( 'should be an object with 7 properties' , function(){
    expect(Object.keys(AppSettings).length).toBe(7);
  });
});
