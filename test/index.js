#!/usr/bin/env node

'use strict';

const assert = require('assert');
const path = require('path');
const spawn = require('child_process').spawn;
const expect = require('chai').expect;

describe('index.js', function() {
    // eslint-disable-next-line no-invalid-this
    this.timeout(8000);

    it('should exit 1 having problems', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), '--folder', 'test/test1'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 1);
            expect(out).to.match(/package-lock.json is NOT OK/);
            expect(out).to.match(/Delete the node_modules folder/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 0 having no problems', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), '--folder', 'test/test2'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 0);
            expect(out).to.match(/package-lock.json is OK/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 0 having no problems with slash', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), '--folder', 'test/test2/'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 0);
            expect(out).to.match(/package-lock.json is OK/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

	it('should exit 0 having no problems without folder', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js')], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 0);
            expect(out).to.match(/package-lock.json is OK/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 1 having problems', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), '--folder', 'test/test3'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 1);
            expect(out).to.match(/package-lock.json is NOT OK/);
            expect(out).to.match(/Delete the node_modules folder/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 1 having problems with no file', function(done) {
        let out = '';
        spawn('node', [path.join(__dirname, '../index.js'), '--folder', 'test'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 2);
            expect(out).to.match(/package-lock.json does not exists/);
            done();
        }).stdout.on('data', function(data) {
            out += data;
        });
    });

    it('should exit 3 if folder does not exist', function(done) {
        spawn('node', [path.join(__dirname, '../index.js'), '--folder', '404'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 3);
        }).stdout.on('data', function(data) {
            assert.equal(data.toString(), 'Oops! Folder does not exists: 404\n');
            done();
        });
    });

    it('should exit 4 if folder is not a folder', function(done) {
        spawn('node', [path.join(__dirname, '../index.js'), '--folder', 'test/index.js'], {
            cwd: path.join(__dirname, '../'),
        }).on('exit', function(code) {
            assert.equal(code, 4);
        }).stdout.on('data', function(data) {
            assert.equal(data.toString(), 'Oops! Folder is not a real folder: test/index.js\n');
            done();
        });
    });
});
