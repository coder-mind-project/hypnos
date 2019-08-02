module.exports = app => {
    const site_key = '6LePkK8UAAAAACKAocqyAEB2YQr4cnd3j8Ya2b2U'
    const secret_key = '6LePkK8UAAAAAG7I4S3wGbN9uX285JZlEaDQhXe5'
    const uri = 'https://www.google.com/recaptcha/api/siteverify'

    
    return {site_key, secret_key, uri}
}