import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const connectRes = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Mongodb connected at ${connectRes.connection.host}`)
    } catch (err) {
        console.log(`unable to connect to the db in connectdb.js due to ${connectDb}`)
    }
}