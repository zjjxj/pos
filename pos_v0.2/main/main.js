function printReceipt(inputs) {
  var subItems = buildSubItems(inputs);
  var items = buildItems(subItems);
  var cartItems = buildCartItems(items);
  var receiptItems = buildReceiptItems(cartItems);

  console.log(toReceipt(receiptItems));
}

function buildSubItems(inputs) {
  var allItems = loadAllItems();
  var subItems = [];

  for (var i = 0; i < inputs.length; i++) {
    subItems = searchSameSubItems(inputs[i], allItems, subItems)
  }

  return subItems;
}

function searchSameSubItems(input, allItems, subItems) {

  for (var i = 0; i < allItems.length; i++) {
    if (input === allItems[i].barcode) {
      subItems.push(allItems[i]);
    }
  }

  return subItems;
}

function buildItems(subItems) {
  var items = [];
  var length = 1;
  items.push(subItems[0]);
  items[0].count = 1;

  for (var i = 1; i < subItems.length; i++) {
    items = searchSameItems(items, subItems[i]);
  }

  return items;
}

function searchSameItems(items, subItems) {

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

function buildCartItems(items) {
  var cartItems = [];
  var subTotal = 0;

  for (var i = 0; i < items.length; i++) {
    subTotal = items[i].price * items[i].count;
    cartItems.push({item: items[i], subTotal: subTotal});
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
  var printString = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < receiptItems.cartItems.length; i++) {
    printString += "名称：" + receiptItems.cartItems[i].item.name + "，数量：" + receiptItems.cartItems[i].item.count + receiptItems.cartItems[i].item.unit +
      "，单价：" + receiptItems.cartItems[i].item.price.toFixed(2) + "(元)，小计：" + receiptItems.cartItems[i].subTotal.toFixed(2) + "(元)\n"
  }
  printString += "----------------------\n总计：" + receiptItems.total.toFixed(2) + "(元)\n" +
    "**********************";

  return printString;
}



