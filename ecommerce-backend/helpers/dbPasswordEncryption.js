exports.encryptPassword = function (password) {
        if (!password) return ``
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch (err) {
            return ``
        }
    }