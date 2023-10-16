const mongoose=require('mongoose')
const dotenv=require('dotenv')

const connect = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error')
    }
}

module.exports = connect;