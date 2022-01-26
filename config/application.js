module.exports = {
    google: {
        clientID: '639603604089-9int985e3ln45i5frhsve604k1fk3qns.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "/api/auth/google/redirect"
    },
    facebook: {
        clientID: '2230814807170475',
        clientSecret: '2acdcfef4b7e6b168c15835a6f13f8f0',
        callbackURL: "/api/auth/facebook/redirect"
    },
    jwt: {
        expiresIn: '1d',
        secret: 'secret'
    },
    mongodb: {
        URI: 'mongodb://localhost:27017/worthwatch-dev'
    },
    client: {
        url: 'http://localhost:3000'
    }
};