const { 
    captcha_site_key,
    captcha_secret_key, 
    captcha_url 
} = require('../.env')

module.exports = app => {
    const site_key = captcha_site_key
    const secret_key = captcha_secret_key
    const uri = captcha_url

    return {site_key, secret_key, uri}
}