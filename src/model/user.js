const {Schema,model} = require("mongoose");

const userModel = new Schema({
    username: {
        type: Schema.Types.String
    },
    email: {
        type: Schema.Types.String
    },
    password: {
        type: Schema.Types.String
    }
})

module.exports = model("user", userModel);