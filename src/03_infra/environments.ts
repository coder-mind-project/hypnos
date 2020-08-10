import dotenv from 'dotenv'
dotenv.config()

export const database = {
  connectionString: String(process.env.CONNECTION_STRING)
}

export const captcha = {
  siteKey: process.env.SITE_KEY,
  secretKey: process.env.SECRET_KEY,
  url: process.env.CAPTCHA_URL
}

export const smtp = {
  server: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: Boolean(process.env.SMTP_SECURE === 'true'),
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS,
  receiver: process.env.SMTP_RECEIVER
}
