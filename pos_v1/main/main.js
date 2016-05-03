function printReceipt(inputs) {
  var subItems = buildSubItems(inputs);
  var items = buildItems(subItems);
  var cartItems = buildCartItems(items);
  var receiptItems = buildReceiptItems(cartItems);

  console.log(toReceipt(receiptItems));

}

function buildSubItems(inputs) {
  var allItems = loadAllItems(inputs);
  var subItems = [];

  for (var i = 0; i < inputs.length; i++) {
    var str = inputs[i].split("");
    var length = str.length;

    SearchSubItems(length, allItems, inputs, subItems, i, str)
  }

  return subItems;
}

function SearchSubItems(length, allItems, inputs, subItems, i, str) {
  if (length == 10) {
    for (var j = 0; j < allItems.length; j++) {
      if (inputs[i] == allItems[j].barcode) {
        subItems.push(allItems[j]);
      }
    }
  } else {
    for (var j = 0; j < str[length - 1]; j++) {
      var input = inputs[i].substring(0, 10);

      subItems = searchSameSubItems(input, allItems, subItems)
    }
  }
}

function searchSameSubItems(input, allItems, subItems) {

  for (var j = 0; j < allItems.length; j++) {
    if (input === allItems[j].barcode) {
      subItems.push(allItems[j]);
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
  var promotions = loadPromotions();
  var subTotal = 0;
  var subSave = 0;
  var cartItems = [];

  for (var i = 0; i < items.length; i++) {
    if (items[i].barcode == promotions[0].barcodes[0] || items[i].barcode == promotions[0].barcodes[1] || items[i].barcode == promotions[0].barcodes[2]) {
      subTotal = items[i].price * (parseInt(items[i].count / 2) * 2);
      subSave = items[i].price * items[i].count - subTotal;
    } else {
      subTotal = items[i].price * items[i].count;
      subSave = 0;
    }
    cartItems.push({item: items[i], subTotal: subTotal, subSave: subSave});
  }

  return cartItems;
}

function buildReceiptItems(cartItems) {
  var receiptItems = {}
  receiptItems.cartItems = cartItems;
  var sum = 0;
  var allSave = 0;

  for (var i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].subTotal;
    allSave += cartItems[i].subSave;
  }
  receiptItems.total = sum;
  receiptItems.Save = allSave;

  return receiptItems;
}

function toReceipt(receiptItems) {
  var printString = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < receiptItems.cartItems.length; i++) {
    printString += "名称：" + receiptItems.cartItems[i].item.name + "，数量：" + receiptItems.cartItems[i].item.count + receiptItems.cartItems[i].item.unit +
      "，单价：" + receiptItems.cartItems[i].item.price.toFixed(2) + "(元)，小计：" + receiptItems.cartItems[i].subTotal.toFixed(2) + "(元)\n"
  }
  printString += "----------------------\n总计：" + receiptItems.total.toFixed(2) + "(元)\n节省：" + receiptItems.Save.toFixed(2) + "(元)\n" +
    "**********************";

  return printString;
}
