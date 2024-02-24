import mongoose from "mongoose";
import Joi from "joi";

const transectionsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    type: {
      required: true,
      type: String,
      enum: ["Expense", "Income"],
    },

    title: {
      required: true,
      type: String,
    },

    category: {
      type: String,
      enum: [
        "Salary",
        "Bonus",
        "Gift",
        "Investment",
        "Food",
        "Rent",
        "Shopping",
        "Transportation",
        "Utilities",
        "Others",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

function validateTransections(transection) {
  const transectionValidation = Joi.object({
    userID: Joi.string().required(),
    title: Joi.string().required(),
    type: Joi.string().valid("Expense", "Income").required(),
    category: Joi.string()
      .valid(
        "Salary",
        "Bonus",
        "Gift",
        "Investment",
        "Food",
        "Rent",
        "Shopping",
        "Transportation",
        "Utilities",
        "Others"
      )
      .required(),
    description: Joi.string().required(),
    amount: Joi.number().required(),
    date: Joi.date().iso(),
  });
  return transectionValidation.validate(transection);
}

const transModel = mongoose.model("transection", transectionsSchema);

export { transModel, validateTransections };
