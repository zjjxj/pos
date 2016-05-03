function printReceipt(inputs) {
  var cartItems = buildCartItems(inputs);
  var receiptItems = buildReceiptItems(cartItems);

  console.log(toReceipt(receiptItems));
}

function buildCartItems(inputs) {
  var cartItems = [];
  var subTotal = 0;

  for (var i = 0; i < inputs.length; i++) {
    subTotal = inputs[i].price * inputs[i].count;
    cartItems.push({item: inputs[i], subTotal: subTotal});
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
