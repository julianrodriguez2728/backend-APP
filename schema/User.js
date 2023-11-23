import mongoose from "mongoose";

let UserModel;

try {
  // Check if the model has already been defined
  UserModel = mongoose.model('User');
} catch (e) {
  // If the model does not exist, define it
  const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please complete this field"]
    },
    email: {
      type: String,
      required: [true, "Please complete this field"]
    },
    todo: [{
      title: String,
      body: String,
      complete: {
        type: Boolean,
        default: false,
      },
    }]
  }, {
    timestamps: true,
    versionKey: false
  });

  UserModel = mongoose.model('User', UserSchema);
}

export default UserModel;