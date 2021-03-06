'use strict';

var should = require('chai').should();
var expect = require('chai').expect;
var bitcoinconsensus = require('../');

describe('Main', function() {

  describe('#version', function() {
    it('should get the version', function(done) {
      var version = bitcoinconsensus.version();
      version.should.equal(1);
      done();
    });
  });

  describe('#verifyScript', function() {
    it('should validate', function(done) {
      var txTo = new Buffer('01000000015884e5db9de218238671572340b207ee85b628074e7e467096c267266baf77a4000000006a4730440220340f35055aceb14250e4954b23743332f671eb803263f363d1d7272f1d487209022037a0eaf7cb73897ba9069fc538e7275c5ae188e934ae47ca4a70453b64fc836401210234257444bd3aead2b851bda4288d60abe34095a2a8d49aff1d4d19773d22b32cffffffff01a0860100000000001976a9147821c0a3768aa9d1a37e16cf76002aef5373f1a888ac00000000', 'hex');

      var scriptPubKey = new Buffer('76a9144621d47f08fcb1e6be0b91144202de7a186deade88ac', 'hex');

      var valid = bitcoinconsensus.verifyScript(scriptPubKey, txTo, 0);
      valid.should.equal(1);
      done();
    });

    it('should not validate', function(done) {
      var txTo = new Buffer('01000000015884e5db9de218238671572340b207ee85b628074e7e467096c267266baf77a4000000006a4730440220340f35055aceb14250e4954b23743332f671eb803263f363d1d7272f1d487209022037a0eaf7cb73897ba9069fc538e7275c5ae188e934ae47ca4a70453b64fc836401210234257444bd3aead2b851bda4288d60abe34095a2a8d49aff1d4d19773d22b32cffffffff01a0860100000000001976a9147821c0a3768aa9d1a37e16cf76002aef5373f1a888ac00000000', 'hex');

      var scriptPubKey = new Buffer('76a9147821c0a3768aa9d1a37e16cf76002aef5373f1a888ac', 'hex');

      var valid = bitcoinconsensus.verifyScript(scriptPubKey, txTo, 0);
      valid.should.equal(0);
      done();
    });

    it('should throw TX_INDEX when the nIn is out of range', function(done) {
      var txTo = new Buffer('01000000015884e5db9de218238671572340b207ee85b628074e7e467096c267266baf77a4000000006a4730440220340f35055aceb14250e4954b23743332f671eb803263f363d1d7272f1d487209022037a0eaf7cb73897ba9069fc538e7275c5ae188e934ae47ca4a70453b64fc836401210234257444bd3aead2b851bda4288d60abe34095a2a8d49aff1d4d19773d22b32cffffffff01a0860100000000001976a9147821c0a3768aa9d1a37e16cf76002aef5373f1a888ac00000000', 'hex');
      var scriptPubKey = new Buffer('76a9144621d47f08fcb1e6be0b91144202de7a186deade88ac', 'hex');
      var fn = function() { bitcoinconsensus.verifyScript(scriptPubKey, txTo, 100) };
      expect(fn).to.throw("1");
      done();
    });

    it('should throw TX_DESERIALIZE when there is a general deserialization error.', function(done) {
      var txTo = new Buffer('abcd', 'hex');
      var scriptPubKey = new Buffer('76a9144621d47f08fcb1e6be0b91144202de7a186deade88ac', 'hex');
      var fn = function() { bitcoinconsensus.verifyScript(scriptPubKey, txTo, 0) };
      expect(fn).to.throw("3");
      done();
    });

  });

});
