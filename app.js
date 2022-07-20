const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes');
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorHandler = require('./middlewares/errorHander');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.send('api is working!');
});

const PORT = process.env.PORT || 4000;
app.use(helmet()); // Set security headers
app.use(xss()); // Prevent xss attacks
// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minuates
    max: 100, // 100 requests
});
app.use(limiter);
app.use(hpp()); // Prevent http param polution
app.use(cors());
app.use(router);
app.use(errorHandler);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
const db = require('./models');

// db.sequelize.sync();
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Database with { force: true }');
// });

app.listen(PORT, console.log(`Server is running on port ${PORT}`));