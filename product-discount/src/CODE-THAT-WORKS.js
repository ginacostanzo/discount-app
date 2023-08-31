/* update tiers to Evan's code: 
let freeGiftVariantId;
let giftAmount;
if (totalPreTaxCost > 50) 
{  const ranges = [    
  { cost: 100, amount: 10 },    
  { cost: 200, amount: 20 },    
  { cost: 300, amount: 30 },    
  { cost: 500, amount: 40 },    
  { cost: 750, amount: 50 },    
  { cost: 1000, amount: 80 },    
  { cost: 1500, amount: 100 },    
  { cost: 2000, amount: 150 },    
  { cost: 2500, amount: 200 }  
];  

const matchingRange = ranges.find(range => totalPreTaxCost <= range.cost);  
if (matchingRange) {    
  freeGiftVariantId = "gid://shopify/ProductVariant/46597569413437";    
  giftAmount = matchingRange.amount;  }
}
  const freeGiftVariant = allProducts.find(product => product.id === freeGiftVariantId);
*/


// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").Target} Target
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 */

/**
 * @type {FunctionResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
  (input) => {
    /**
     * @type {{
    *   quantity: number
    *   amount: number
    * }}
    */
    const totalPreTaxCost = input.cart.cost.subtotalAmount.amount;
      
    // Conditions to check which tier subtotal falls into
  let freeGiftVariantId;
  let giftAmount;
  if (totalPreTaxCost > 50) {
    if (totalPreTaxCost >= 50 && totalPreTaxCost <= 100) {
      freeGiftVariantId = "gid://shopify/ProductVariant/46597569413437";
      giftAmount = 10.0;
    } else if (totalPreTaxCost > 100 && totalPreTaxCost <= 200) {
      freeGiftVariantId = "gid://shopify/ProductVariant/46597569413437";
      giftAmount = 20.0;
    } else if (totalPreTaxCost > 200 && totalPreTaxCost <= 300) {
      freeGiftVariantId = "gid://shopify/ProductVariant/46597569413437";
      giftAmount = 30.0;
    } else if (totalPreTaxCost > 300 && totalPreTaxCost <= 500) {
      freeGiftVariantId = "gid://shopify/ProductVariant/46102371991869";
      giftAmount = 40.0;
    } else if (totalPreTaxCost > 500 && totalPreTaxCost <= 750) {
      freeGiftVariantId = "gid://shopify/ProductVariant/46102371991869";
      giftAmount = 50.0;
    } else if (totalPreTaxCost > 750 && totalPreTaxCost <= 1000) {
      freeGiftVariantId = "id://shopify/ProductVariant/46102371991869";
      giftAmount = 80.0;
    } else if (totalPreTaxCost > 1000 && totalPreTaxCost <= 1500) {
      freeGiftVariantId = "id://shopify/ProductVariant/46102371991869";
      giftAmount = 100.0;
    } else if (totalPreTaxCost > 1500 && totalPreTaxCost <= 2000) {
      freeGiftVariantId = "gid://shopify/ProductVariant/46597569413437";
      giftAmount = 150.0;
    } else if (totalPreTaxCost > 2000 && totalPreTaxCost <= 2500) {
      freeGiftVariantId = "gid://shopify/ProductVariant/46597569413437";
      giftAmount = 200.0;
    }
  }

  let freeGiftVariant;
  const normalizeId = id => id.replace(/^(gid:\/\/shopify\/|id:\/\/shopify\/)/, '');
  for (const line of input.cart.lines) {
    const merchandise = line.merchandise;
    if (normalizeId(merchandise.id) === normalizeId(freeGiftVariantId)) {
      freeGiftVariant = merchandise;
      break;
    }
  }
  
  const targets = freeGiftVariant ? /** @type {Target} */ ({
    productVariant: {
      id: freeGiftVariant.id
    }
  }) : undefined;
  

    if (!targets) {
      console.error("No cart lines qualify for volume discount.");
      return EMPTY_DISCOUNT;
    }

    return {
      discounts: [
        {
          targets,
          value: {
            fixedAmount: {
              amount: giftAmount
            }
          }
        }
      ],
      discountApplicationStrategy: DiscountApplicationStrategy.First
    };
  };