// run 'npm run shopify app function build' in extensions/product-discount directory
// then 'cat input.json | npm run shopify app function run' to see logs in same directory

// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";
import { shopifyApi } from "@shopify/shopify-api";

// don't edit below 
/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").Target} Target
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 */

/**
 * @type {FunctionResult}
 */

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
  async (input) => {
    /**
     * @type {{
    *   quantity: number
    *   amount: number
    * }}
    */

  // don't edit above

  try {
    const storefrontAccessToken = '70e9489465f14a09f062023d20c65366';
    const shop = 'gina-test-store123.myshopify.com';
    console.log('The function ran.');

    // possible solution 
    const shopify = shopifyApi({
        apiKey: storefrontAccessToken,
        hostName: shop,
        apiSecretKey: '',
        hostScheme: 'https',
        apiVersion: types_1.LATEST_API_VERSION,
        isEmbeddedApp: true,
        isCustomStoreApp: false,
    });
    if (shopify) {
      console.log('The client was created.');
    }
    
    // other possible solution
    const storefrontClient = new shopify.clients.Storefront({domain: shop,storefrontAccessToken,});
    if (storefrontClient) {
      console.log('The client was created.');
    } else {
      console.log('The client was not created.');
    }
    } catch (error) {
      console.error('error: ', error.message);
    }
  }