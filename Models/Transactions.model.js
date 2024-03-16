import mongoose from "mongoose";
import Joi from "joi";

const transactionsSchema = new mongoose.Schema(
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

function validateTransactions(transaction) {
  const transactionValidation = Joi.object({
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
  return transactionValidation.validate(transaction);
}

const transModel = mongoose.model("transactions", transactionsSchema);

export { transModel, validateTransactions };
