import { create } from "zustand";
import { round } from "../utils/utils";
import { InterfaceOrderItem } from "../models/OrderModel";

interface IntefaceCart {
  items: InterfaceOrderItem[];
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

const initialState: IntefaceCart = {
  items: [],
  itemsPrice: 0,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
};

export const cartStore = create<IntefaceCart>(() => initialState);

export default function useCartService() {
  const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } = cartStore();

  return {
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    increase: (item: InterfaceOrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);

      const updatedCartItems = exist
        ? items.map((x) => (x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x))
        : [...items, { ...item, qty: 1 }];

      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems);

      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
    decrease: (item: InterfaceOrderItem) => {
      const exist = items.find((x) => x.slug === item.slug);
      if (!exist) return;
      const updatedCartItems =
        exist.qty === 1
          ? items.filter((x: InterfaceOrderItem) => x.slug !== item.slug)
          : items.map((x) => (item.slug ? { ...exist, qty: exist.qty - 1 } : x));
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems);
      cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
    },
  };
}

const calcPrice = (items: InterfaceOrderItem[]) => {
  const itemsPrice = round(items.reduce((acc, item) => acc + item.price * item.qty, 0)),
    shippingPrice = round(itemsPrice > 100 ? 0 : 100),
    taxPrice = round(Number(0.15 * itemsPrice)),
    totalPrice = round(itemsPrice + shippingPrice + taxPrice);

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
