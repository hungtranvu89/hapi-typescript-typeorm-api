process.env.PORT = '8989'
process.env.HOST = 'localhost'
process.env.JWT_SECRET = 'my_secret'
process.env.JWT_EXP = '500000'

jest.mock('../src/configs')
