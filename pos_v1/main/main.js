//TODO: Please write code in this file.
function printReceipt(inputs) {
  var subitems=buildSubitems(inputs);
  var Items=buildItems(subitems);
  var cartItems= buildSubtotal(Items);
  var Total=buildTotal(cartItems);
  console.log(toReceipt(Total));

}

function buildSubitems(inputs){
  var allItems = loadAllItems();
  var subItems=[];
  for(var i=0;i<inputs.length;i++) {
    var str = inputs[i].split("");
    var l = str.length;
    if (l == 10) {
      for (var j = 0; j < allItems.length; j++) {
        if (inputs[i] == allItems[j].barcode)  subItems.push(allItems[j]);
      }
    } else {
      for (var m = 0; m < str[l - 1]; m++) {
        var input = inputs[i].substring(0,10);
        for (var n = 0; n < allItems.length; n++) {
          if (input == allItems[n].barcode)  subItems.push(allItems[n]);
        }
      }
    }
  }
  return subItems;
}
function buildItems(subItems) {
  var Items=[];
  var length=1;
  Items.push(subItems[0]);
  Items[0].count=1;
  for(var i=1;i<subItems.length;i++){
    for(var j=0;j<length;j++){
      if(Items[j].name===subItems[i].name)
      {
        Items[j].count++;
        break;
      }
    }
    if(j===length)
    {
      length++;
      Items.push(subItems[i]);
      Items[j].count=1;
    }
  }
  return Items;
}
function buildSubtotal(Items) {
  var promotions = loadPromotions();
  var subtotal = 0;
  var subsave = 0;
  var cartItems=[];
  for (var i = 0; i < Items.length; i++)
  {
    if (Items[i].barcode==promotions[0].barcodes[0]||Items[i].barcode==promotions[0].barcodes[1]||Items[i].barcode==promotions[0].barcodes[2])
    {
      subtotal = Items[i].price * (parseInt(Items[i].count / 2) * 2);
      subsave = Items[i].price * Items[i].count - subtotal;
    }
    else
    {
      subtotal = Items[i].price * Items[i].count;
      subsave = 0;
    }
    cartItems.push({Item:Items[i],subTotal:subtotal,subSave:subsave});
  }
  return cartItems;
}
function buildTotal(cartItems){
  var receiptItems={}
  receiptItems.cartItems=cartItems;
  var sum=0;
  var allsave=0;
  for(var i=0;i<cartItems.length;i++)
  {
    sum+=cartItems[i].subTotal;
    allsave+=cartItems[i].subSave;
  }
  receiptItems.total=sum;
  receiptItems.Save=allsave;
  return  receiptItems;
}
function toReceipt(receiptItems) {
  var str = "***<没钱赚商店>收据***\n";
  for (var i = 0; i < receiptItems.cartItems.length; i++) {
    str += "名称：" + receiptItems.cartItems[i].Item.name + "，数量：" + receiptItems.cartItems[i].Item.count + receiptItems.cartItems[i].Item.unit +
      "，单价：" + receiptItems.cartItems[i].Item.price.toFixed(2) + "(元)，小计：" + receiptItems.cartItems[i].subTotal.toFixed(2) + "(元)\n"
  }
  str +="----------------------\n总计：" + receiptItems.total.toFixed(2) + "(元)\n节省：" +receiptItems.Save.toFixed(2) + "(元)\n" +
    "**********************";
  return str;
}
