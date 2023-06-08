const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (v) => {
        return v % 2 === 0;
      },
      message: (props) => `${props.value} is not a even number `,
    },
  },
  email: {
    type: String,
    minLength: 10,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  bestFriend: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  hobbie: [String],
  address: addressSchema,
});

userSchema.methods.sayHi = function () {
  console.log(`Hi my name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  return this.where("name").equals(name).limit(1);
};

userSchema.query.Name = function (name) {
  return this.where("name").equals(name).limit(1);
};

userSchema.virtual("namedEmail").get(function () {
  return `${this.name} <> ${this.email}`;
});

module.exports = mongoose.model("User", userSchema);
