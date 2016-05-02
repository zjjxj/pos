function printReceipt(inputs) {
  var subItems = buildSubItems(inputs);
  var Items = buildItems(subItems);
  var cartItems = buildCartItems(Items);
  var receiptItems = buildReceiptItems(cartItems);

  console.log(toReceipt(receiptItems));
}

function buildSubItems(inputs) {
  var allItems = loadAllItems();
  var subItems = [];

  for (var i = 0; i < inputs.length; i++) {
    var str = inputs[i].split("");
    var l = str.length;

    if (l == 10) {
      for (var j = 0; j < allItems.length; j++) {
        if (inputs[i] == allItems[j].barcode) {
          subItems.push(allItems[j])
        }
      }
    } else {
      for (var m = 0; m < str[l - 1]; m++) {
        var input = inputs[i].substring(0, 10);

        for (var n = 0; n < allItems.length; n++) {
          if (input == allItems[n].barcode) {
            subItems.push(allItems[n])
          }
        }
      }
    }
  }

  return subItems;
}

function buildItems(subItems) {
  var Items = [];
  var length = 1;
  Items.push(subItems[0]);
  Items[0].count = 1;

  for (var i = 1; i < subItems.length; i++) {
    for (var j = 0; j < length; j++) {
      if (Items[j].name === subItems[i].name) {
        Items[j].count++;
        break;
      }
    }
    if (j === length) {
      length++;
      Items.push(subItems[i]);
      Items[j].count = 1;
    }
  }

  return Items;
}

function buildCartItems(Items) {
  var promotions = loadPromotions();
  var subTotal = 0;
  var subSave = 0;
  var cartItems = [];

  for (var i = 0; i < Items.length; i++) {
    if (Items[i].barcode == promotions[0].barcodes[0] || Items[i].barcode == promotions[0].barcodes[1] || Items[i].barcode == promotions[0].barcodes[2]) {
      subTotal = Items[i].price * (parseInt(Items[i].count / 2) * 2);
      subSave = Items[i].price * Items[i].count - subTotal;
    }
    else {
      subTotal = Items[i].price * Items[i].count;
      subSave = 0;
    }
    cartItems.push({Item: Items[i], subTotal: subTotal, subSave: subSave});
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
  var dateDigitToString = function (num) {
    return num < 10 ? '0' + num : num;
  };
  var currentDate = new Date(),
    year = dateDigitToString(currentDate.getFullYear()),
    month = dateDigitToString(currentDate.getMonth() + 1),
    date = dateDigitToString(currentDate.getDate()),
    hour = dateDigitToString(currentDate.getHours()),
    minute = dateDigitToString(currentDate.getMinutes()),
    second = dateDigitToString(currentDate.getSeconds()),
    formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
  var str = "***<没钱赚商店>收据***\n" + "打印时间：" + formattedDateString + "\n" + "----------------------\n";

  for (var i = 0; i < receiptItems.cartItems.length; i++) {
    str += "名称：" + receiptItems.cartItems[i].Item.name + "，数量：" + receiptItems.cartItems[i].Item.count + receiptItems.cartItems[i].Item.unit +
      "，单价：" + receiptItems.cartItems[i].Item.price.toFixed(2) + "(元)，小计：" + receiptItems.cartItems[i].subTotal.toFixed(2) + "(元)\n"
  }
  str += "----------------------\n" + "总计：" + receiptItems.total.toFixed(2) + "(元)\n节省：" + receiptItems.Save.toFixed(2) + "(元)\n" +
    "**********************";

  return str;
}

