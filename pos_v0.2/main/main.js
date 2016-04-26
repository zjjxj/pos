//TODO: Please write code in this file.
function printReceipt(inputs) {
  var subitems = buildSubItems(inputs);
  var Items = buildItems(subitems);
  var cartItems = buildCartItems(Items);
  var Total = buildReceiptItems(cartItems);

  console.log(toReceipt(Total));
}

function buildSubItems(inputs) {
  var allItems = loadAllItems();
  var subItems = [];

  for (var i = 0; i < inputs.length; i++) {
    subItems = searchsameSubItems(inputs[i], allItems, subItems)
  }

  return subItems;
}

function searchsameSubItems(input, allitems, subitems) {

  for (var i = 0; i < allitems.length; i++) {
    if (input === allitems[i].barcode)  subitems.push(allitems[i]);
  }

  return subitems;
}

function buildItems(subItems) {
  var Items = [];
  var length = 1;
  Items.push(subItems[0]);
  Items[0].count = 1;

  for (var i = 1; i < subItems.length; i++) {
    Items = searchsameItems(Items, subItems[i]);
  }

  return Items;
}

function searchsameItems(items, subItems) {

  for (var i = 0; i < items.length; i++) {
    if (items[i].name === subItems.name) {
      items[i].count++;
      return items;
    }
  }
  items[i] = subItems;
  items[i].count = 1;

  return items;
}

function buildCartItems(Items) {
  var cartItems = [];
  var subtotal = 0;

  for (var i = 0; i < Items.length; i++) {
    subtotal = Items[i].price * Items[i].count;
    cartItems.push({Item: Items[i], subTotal: subtotal});
  }

  return cartItems;
}

function buildReceiptItems(cartItems) {
  var receiptItems = {}
  receiptItems.cartItems = cartItems;
  var sum = 0;

  for (var i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].subTotal;
  }
  receiptItems.total = sum;

  return receiptItems;
}

function toReceipt(receiptItems) {
  var str = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < receiptItems.cartItems.length; i++) {
    str += "名称：" + receiptItems.cartItems[i].Item.name + "，数量：" + receiptItems.cartItems[i].Item.count + receiptItems.cartItems[i].Item.unit +
      "，单价：" + receiptItems.cartItems[i].Item.price.toFixed(2) + "(元)，小计：" + receiptItems.cartItems[i].subTotal.toFixed(2) + "(元)\n"
  }
  str += "----------------------\n总计：" + receiptItems.total.toFixed(2) + "(元)\n" +
    "**********************";

  return str;
}



