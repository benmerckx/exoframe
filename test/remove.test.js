/* eslint-env jest */
// npm packages
const nock = require('nock');
const sinon = require('sinon');

// our packages
const {handler: remove} = require('../src/commands/remove');
const {userConfig, updateConfig} = require('../src/config');

const id = 'test-id';

// test removal
test('Should remove', done => {
  // handle correct request
  const rmServer = nock('http://localhost:8080')
    .post(`/remove/${id}`)
    .reply(204);
  // spy on console
  const consoleSpy = sinon.spy(console, 'log');
  // execute login
  remove({id}).then(() => {
    // make sure log in was successful
    // check that server was called
    expect(rmServer.isDone()).toBeTruthy();
    // first check console output
    expect(consoleSpy.args).toMatchSnapshot();
    // restore console
    console.log.restore();
    rmServer.done();
    done();
  });
});

// test removal error
test('Should show remove error', done => {
  // handle correct request
  const rmServer = nock('http://localhost:8080')
    .post(`/remove/${id}`)
    .reply(500);
  // spy on console
  const consoleSpy = sinon.spy(console, 'log');
  // execute login
  remove({id}).then(() => {
    // make sure log in was successful
    // check that server was called
    expect(rmServer.isDone()).toBeTruthy();
    // first check console output
    expect(consoleSpy.args).toMatchSnapshot();
    // restore console
    console.log.restore();
    rmServer.done();
    done();
  });
});

// test removal error
test('Should show not found error', done => {
  // handle correct request
  const rmServer = nock('http://localhost:8080')
    .post(`/remove/${id}`)
    .reply(404);
  // spy on console
  const consoleSpy = sinon.spy(console, 'log');
  // execute login
  remove({id}).then(() => {
    // make sure log in was successful
    // check that server was called
    expect(rmServer.isDone()).toBeTruthy();
    // first check console output
    expect(consoleSpy.args).toMatchSnapshot();
    // restore console
    console.log.restore();
    rmServer.done();
    done();
  });
});

// test removal error on incorrect success code
test('Should show not found error', done => {
  // handle correct request
  const rmServer = nock('http://localhost:8080')
    .post(`/remove/${id}`)
    .reply(200);
  // spy on console
  const consoleSpy = sinon.spy(console, 'log');
  // execute login
  remove({id}).then(() => {
    // make sure log in was successful
    // check that server was called
    expect(rmServer.isDone()).toBeTruthy();
    // first check console output
    expect(consoleSpy.args).toMatchSnapshot();
    // restore console
    console.log.restore();
    rmServer.done();
    done();
  });
});

// test
test('Should deauth on 401', done => {
  // copy original config for restoration
  const originalConfig = Object.assign({}, userConfig);
  // handle correct request
  const rmServer = nock('http://localhost:8080')
    .post(`/remove/${id}`)
    .reply(401);
  // spy on console
  const consoleSpy = sinon.spy(console, 'log');
  // execute login
  remove({id}).then(() => {
    // make sure log in was successful
    // check that server was called
    expect(rmServer.isDone()).toBeTruthy();
    // first check console output
    expect(consoleSpy.args).toMatchSnapshot();
    // check config
    expect(userConfig.user).toBeUndefined();
    expect(userConfig.token).toBeUndefined();
    // restore console
    console.log.restore();
    // tear down nock
    rmServer.done();
    // restore original config
    updateConfig(originalConfig);
    done();
  });
});
