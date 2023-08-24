import mongoose from "mongoose";

function Connection() {
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => console.log("Error", err));

    mongoose.connection.on("error", (err) => console.log("lost connection", err));
}

export default Connection;