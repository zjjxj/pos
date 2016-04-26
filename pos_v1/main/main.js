//TODO: Please write code in this file.
function printReceipt(inputs) {

  var subItems = buildSubItems(inputs);
  var Items = buildItems(subItems);
  var cartItems = buildCartItems(Items);
  var Total = buildReceiptItems(cartItems);

  console.log(toReceipt(Total));

}

function buildSubItems(inputs) {

  var allItems = loadAllItems(inputs);
  var subItems = [];

  for (var i = 0; i < inputs.length; i++) {
    var str = inputs[i].split("");
    var length = str.length;
    if (length == 10) {
      for (var j = 0; j < allItems.length; j++) {
        if (inputs[i] == allItems[j].barcode)  subItems.push(allItems[j]);
      }
    } else {
      for (var j = 0; j < str[length - 1]; j++) {
        var input = inputs[i].substring(0, 10);
        //for (var n = 0; n < allItems.length; n++) {
        //if (input == allItems[n].barcode)  subItems.push(allItems[n]);
        // }
        subItems = searchsameSubItems(input, allItems, subItems)
      }
    }
  }

  return subItems;
}

function searchsameSubItems(input, allitems, subitems) {

  for (var j = 0; j < allitems.length; j++) {
    if (input === allitems[j].barcode)  subitems.push(allitems[j]);
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

  var promotions = loadPromotions();
  var subtotal = 0;
  var subsave = 0;
  var cartItems = [];

  for (var i = 0; i < Items.length; i++) {
    if (Items[i].barcode == promotions[0].barcodes[0] || Items[i].barcode == promotions[0].barcodes[1] || Items[i].barcode == promotions[0].barcodes[2]) {
      subtotal = Items[i].price * (parseInt(Items[i].count / 2) * 2);
      subsave = Items[i].price * Items[i].count - subtotal;
    }
    else {
      subtotal = Items[i].price * Items[i].count;
      subsave = 0;
    }
    cartItems.push({Item: Items[i], subTotal: subtotal, subSave: subsave});
  }

  return cartItems;
}

function buildReceiptItems(cartItems) {

  var receiptItems = {}
  receiptItems.cartItems = cartItems;
  var sum = 0;
  var allsave = 0;

  for (var i = 0; i < cartItems.length; i++) {
    sum += cartItems[i].subTotal;
    allsave += cartItems[i].subSave;
  }
  receiptItems.total = sum;
  receiptItems.Save = allsave;

  return receiptItems;
}

function toReceipt(receiptItems) {

  var str = "***<没钱赚商店>收据***\n";

  for (var i = 0; i < receiptItems.cartItems.length; i++) {
    str += "名称：" + receiptItems.cartItems[i].Item.name + "，数量：" + receiptItems.cartItems[i].Item.count + receiptItems.cartItems[i].Item.unit +
      "，单价：" + receiptItems.cartItems[i].Item.price.toFixed(2) + "(元)，小计：" + receiptItems.cartItems[i].subTotal.toFixed(2) + "(元)\n"
  }
  str += "----------------------\n总计：" + receiptItems.total.toFixed(2) + "(元)\n节省：" + receiptItems.Save.toFixed(2) + "(元)\n" +
    "**********************";
v
  return str;
}
