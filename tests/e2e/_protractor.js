/*jshint expr: true, undef: true */
/* global element: true, by: true, browser: true, model:true */
(function(){
  "use strict";

  // todo. Refactor this whole file to not be stupidly redundant.

var RegistrationPage = function(){
//  this.wait = browser.driver.wait(function(){
//    return browser.driver.getCurrentUrl().then(function(url) {
//      return /\#\//.test(url);
//    });
//  });
  this.browser = browser;
  browser.driver.wait(function() {
    return browser.driver.getCurrentUrl().then(function(url) {
      return /\#\//.test(url);
    });
  });
  this.goHome = function(){
    browser.get('http://localhost:5000/register');
  };
};

  RegistrationPage.prototype.wait = function(){
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
          return /\#\//.test(url);
      });
    });

  };
  RegistrationPage.prototype.accountNumber = element(by.name('account_number'));
  RegistrationPage.prototype.submitAccountButton = element(by.css('.hoverdiv .noncommerce'));
  RegistrationPage.prototype.selectHasAccount = function(){
    this.elem = element.all(by.name('account_exists'));
    this.elem.get(0).click();
    return browser.getCurrentUrl();
  };
  RegistrationPage.prototype.enterAccountNumber = function(keys){
    this.selectHasAccount()
      .then(function(){
      this.accountNumber.sendKeys(keys);
      this.submitAccountButton.click();
    });
    return keys;
  };
  RegistrationPage.prototype.navigateToAddUser = function(){
      return browser.getCurrentUrl();
  };
  RegistrationPage.prototype.noAccount = function(){
    var elem = element.all(by.name('account_exists'));
    elem.get(1).click();
    return this.browser.getCurrentUrl();
  };
  RegistrationPage.prototype.noVat = function(){
    this.noAccount()
      .then(function(){
        var elem = element.all(by.name('vat-exists'));
        elem.get(1).click();
      });
    return browser.getCurrentUrl();
  };
  RegistrationPage.prototype.toUserReg = function(){
    this.noVat()
    .then(function(){
      var submitAccountButton = element(by.css('.hoverdiv .noncommerce'));
      submitAccountButton.click();
    });
    return browser.getCurrentUrl();
  };


  var account = new RegistrationPage();
  var _account = new RegistrationPage();



  account.accountNumber = element(by.name('account_number'));
  account.submitAccountButton = element(by.css('.hoverdiv .noncommerce'));

  account.selectHasAccount = function(){
    account.elem = element.all(by.name('account_exists'));
    account.elem.get(0).click();
    return browser.getCurrentUrl();
  };
  account.enterAccountNumber = function(keys){
    account.selectHasAccount()
      .then(function(){
      account.accountNumber.sendKeys(keys);
      account.submitAccountButton.click();
    });
    return keys;
  };
  account.navigateToAddUser = function(){
      return browser.getCurrentUrl();
  };
  account.noAccount = function(){
    account.elem = element.all(by.name('account_exists'));
    account.elem.get(1).click();
    return browser.getCurrentUrl();
  };
  account.noVat = function(){
    account.noAccount()
      .then(function(){
        account.elem = element.all(by.name('vat-exists'));
        account.elem.get(1).click();
      });
    return browser.getCurrentUrl();
  };
  account.toUserReg = function(){
    account.noVat()
    .then(function(){
      account.submitAccountButton.click();
    });
    return browser.getCurrentUrl();
  };

describe('registration page', function() {
  it("will survive", function(){
    var registrationPage = new RegistrationPage()
    , title = browser.getTitle();
    expect(title).toBe('Fabory Web Shop | Homepage');
  });
  describe("account exists checkboxes", function(){
    it('will change route on account_exists radiobox click', function(){
      var elem = element.all(by.name('account_exists'))
        , _url;
      elem.get(0).click()
        .then(function(){
          _url = browser.getCurrentUrl().then(function(_url){
            expect(_url).toBe('http://localhost:5000/register#/has');
          });
        })
        .then(function(){
          elem.get(1).click().then(function(){
            _url = browser.getCurrentUrl();
            expect(_url).toBe('http://localhost:5000/register#/no');
          });
        });
    });
  });
  describe('navigate the hasAccount path:', function(){
    it('will click hasAccount which will cause a route change.', function () {
      expect(account.selectHasAccount()).toBe('http://localhost:5000/register#/has');
    });
    it("will submit a valid account number", function(){
      expect(account.enterAccountNumber('1231231231')).toBe('1231231231');
    });
    it("will submit a valid account number", function(){
      expect(browser.getCurrentUrl()).toBe('http://localhost:5000/register#/adduser');
    });
  });
  describe('navigate the no account path', function(){
    beforeEach(function(){
      _account.goHome();
    });
//    beforeEach(function(){
//    });
    it('will click noAccount which will cause a route change.', function () {
        expect(_account.noAccount()).toBe('http://localhost:5000/register#/no');
    });
    it('will click noVat which will cause a route change.', function () {
      _account .noVat()
        .then(function(){
          expect(_account.browser.getCurrentUrl()).toBe('http://localhost:5000/register#/no/none');
        });
    });
    it('will click continue which will cause a route change..', function () {
      _account .toUserReg()
        .then(function(){
            expect(_account.browser.getCurrentUrl()).toBe('http://localhost:5000/register#/user');
        });
    });
  });
});

})();