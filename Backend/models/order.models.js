import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    items: [
      {
        pizza: {
          type: Schema.Types.ObjectId,
          ref: 'Pizza',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        size: {
          type: String,
          trim: true,
        },
        toppings: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered'],
      default: 'pending',
    },

    deliveryAddress: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },

    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', orderSchema);