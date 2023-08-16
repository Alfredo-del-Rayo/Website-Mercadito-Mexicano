if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require ('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const verifyJWT = require('./middleware/verifyJWT')
const username = require('./middleware/username')



const accountRouter = require('./routes/account')
const indexRouter = require('./routes/index')
const pageRouter = require('./routes/pages')
const productRouter = require('./routes/products')
const policyRouter = require('./routes/policies')
const collectionRouter = require('./routes/collections')
const subscribeRouter = require('./routes/subscribe')
const checkRoute = require('./routes/check')
const cartRoute = require('./routes/cart')
const paymentsRouter = require('./routes/api/payments')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.json())
app.use (expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended: false}))
app.use(cookieParser())

app.use(username)
app.use('/', indexRouter)
app.use('/account', accountRouter)
app.use('/pages', pageRouter)
app.use('/collections', collectionRouter)
app.use('/subscribe',subscribeRouter)
app.use('/policies',policyRouter)
app.use('/check', checkRoute )
app.use('/products', productRouter )
app.use('/payments', paymentsRouter)
app.use(verifyJWT)
app.use('/cart', cartRoute)


app.listen(process.env.PORT || 3000)