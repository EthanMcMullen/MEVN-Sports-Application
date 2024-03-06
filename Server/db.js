const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://emcmullen:kpJ1xLzaKKpZGAee@mevn-sports-application.qmu6ghc.mongodb.net/'

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Database connected')).catch((err) => console.log(err));