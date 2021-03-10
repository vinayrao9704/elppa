import mongoose from 'mongoose'


const connDb = async() => {

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })

        console.log(`database connnected ${conn.connection.host}`)

    } catch (error) {

        console.error(`Error: ${error.message}`)
        process.exit(1)

    }


}


export default connDb;