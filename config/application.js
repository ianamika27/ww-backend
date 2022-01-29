module.exports = {
    google: {
        clientID: '639603604089-9int985e3ln45i5frhsve604k1fk3qns.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "/api/v1/auth/google/redirect"
    },
    facebook: {
        clientID: '1098048364372675',
        clientSecret: 'c6bf77d9f3d4a791c94e080190df55fb',
        callbackURL: "/api/v1/auth/facebook/redirect"
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