/* global expect */

const mockingoose = require('mockingoose').default;
const model = require('../../model/user/facade');

describe('test mongoose User model', () => {
  it('should return doc with findOne', () => {

    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'Test',
      exams: [],
      results: []
    };

    mockingoose.User.toReturn(_doc, 'findOne');

    return model
            .findOne({ username: 'Test' })
            .then((doc) => {
              expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
  });
  it('should return doc with find', () => {

    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'Test',
      exams: [],
      results: []
    };

    mockingoose.User.toReturn(_doc, 'find');

    return model
            .find({ username: 'Test' })
            .then((doc) => {
              expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
  });
  it('should return the doc with findById', () => {

    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'Test',
      exams: [],
      results: []
    };

    mockingoose.User.toReturn(_doc, 'findOne');

    return model
            .findById({ _id: '507f191e810c19729de860ea' })
            .then((doc) => {
              expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
  });
  it('should return the doc with update', () => {

    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'Test',
      exams: [],
      results: []
    };

    mockingoose.User.toReturn(_doc, 'update');

    return model
            .update({ _id: '507f191e810c19729de860ea' }, { $set: { username: 'changed' } })
            .then((doc) => {
              expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
  });
  it('should return the doc with remove', () => {

    const _doc = {
      _id: '507f191e810c19729de860ea',
      username: 'Test',
      exams: [],
      results: []
    };

    mockingoose.User.toReturn(_doc, 'remove');

    return model
            .remove({ _id: '507f191e810c19729de860ea' })
            .then((doc) => {
              expect(JSON.parse(JSON.stringify(doc))).toMatchObject(_doc);
            });
  });
  it('should return error for missing details', () => {
    mockingoose.User.toReturn(new Error(), 'save');
    return model
            .create({})
            .catch((err) => {
              expect(err).toBeInstanceOf(Error);
            });
  });
});
