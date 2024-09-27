const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    name: String,
    email: {type:String , unique:true},
    password: String,
    authToken: String

});
const Todo = new Schema({
    title: String,
    done : Boolean,
    userId: ObjectId
});

const UserModel = mongoose.model('User', User);
const TodoModel = mongoose.model('Todo', Todo);

module.exports = {
    UserModel,
    TodoModel
};