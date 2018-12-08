const original = require.requireActual('../configs')

module.exports = {
  ...original,
  getTypeormOptions: jest.fn()
}
