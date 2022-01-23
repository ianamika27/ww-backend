module.exports = {
    signOptions: {
        issuer: 'worthwatch',
        subject: 'authentication',
        audience: 'worthwatch.in',
        algorithm: "RS256",
        expiresIn: '24h'
    },
    verifyOptions: {
        issuer: 'worthwatch',
        subject: 'authentication',
        audience: 'worthwatch.in',
        algorithm: ["RS256"],
        expiresIn: '24h'
    },
    jwtKey: "LWR-6$SugQ3NZqfd+PdG2tp!a-7W^7ztQS&&aQH&Q?Z*b*kage!^+k6x4e*%g+=C-qcE$LbQy7J!Jh"
}