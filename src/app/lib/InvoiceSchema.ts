import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  _id: { type: String , required: true},
  status: { type: String},
  pay_from:{
    street_ad_from: {type: String},
    city_from: {type: String},
    pcode_city_from: {type: String},
    country_from: {type: String}
  },
  pay_to: {
    client_name: {type: String},
    client_email: {type: String},
    street_ad_to: {type: String},
    city_to: {type: String},
    pcode_city_to: {type: String},
    country_to: {type: String},
    payment: {type: Number},
    description: {type: String}
  },
  date_added: { type: Date },
  item_list: [
    {
        item_name: {type: String},
        quant: {type: Number},
        price: {type: Number}
    }
  ]
});

export default mongoose.models.Invoices || mongoose.model("Invoices", InvoiceSchema)