const OrderModel = require("../schema/order.model");
const OrderItemModel = require("../schema/order_item.model");
const Definer = require("../lib/mistake");
const { shapeIntoMongooseObjectId } = require("../lib/config");
const assert = require("assert");


class Order {
    constructor() {
        this.orderModel = OrderModel;
        this.orderItemModel = OrderItemModel;
    }

    async createOrderData(member, data) {
        try {
            let order_total_amount = 0, delivery_cost = 0;
            const mb_id = shapeIntoMongooseObjectId(member._id);

            data.map((item) => {
                order_total_amount += item['quantity'] * item["price"];
            });

            if (order_total_amount < 100) {
                delivery_cost = 2;
                order_total_amount += delivery_cost;
            }

            const order_id = await this.saveOrderData(
                order_total_amount,
                delivery_cost,
                mb_id
            );
            console.log("order_id:::", order_id);

           // TODO: order items creation

           await this.recordOrderItemsData(order_id, data);

           return order_id;
        } catch(err) {
          throw err;
        }
    } 

    async savaOrderData(order_total_amount, delivery_cost, mb_id) {
        try {
            const new_order = new this.orderModel({
                order_total_amount: order_total_amount,
                order_delivery_cost: delivery_cost,
                mb_id: mb_id,
            });
            const result = await new_order.save();
            assert.ok(result, Definer.order_err1);
            
            return result._id;
        } catch(err) {
            console.log(err);
            throw new Error(Definer.order_err1);
        }
    }

    async recordOrderItemsData(order_id, data) {
        try {
            const pro_list = data.map(async (item) => {
                return await this.savaOrderItemsData(item, order_id);           
            });

            const result = await Promise.all(pro_list);
            console.log("results:::", results);
            return true;
        } catch(err) {
          throw err; 
        }
    }

    async savaOrderItemsData(item, order_id) {
        try {
          order_id = shapeIntoMongooseObjectId(order_id);
          item._id = shapeIntoMongooseObjectId(item._id);

          const order_item = new this.OrderItemModel({
            item_quantity: item["quantity"],
            item_price: item["price"],
            order_id: order_id,
            product_id: item["_id"],
          });
          const result = await order_item.save();
          assert.ok(result, Definer.order_err2);
          return "inserted";
        } catch(err) {
          console.log(err);
          throw new Error(Definer.order_err2);
        }
    }
}

module.exports = Order;