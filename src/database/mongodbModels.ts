import { model, Schema } from 'mongoose';

export const MongoCategory = model(
  'Category',
  new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
  })
);

export const MongoOrder = model(
  'Order',
  new Schema({
    table: { type: String, required: true },
    status: {
      type: String,
      enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
      default: 'WAITING',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    products: {
      required: true,
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
  })
);

export const MongoProduct = model(
  'Product',
  new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imagePath: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ingredients: {
      required: true,
      type: [
        {
          icon: {
            type: String,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
        },
      ],
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
  })
);
