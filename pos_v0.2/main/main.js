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
  for(var i=0;i<inputs.length;i++)
  {
    for(var j=0;j<allItems.length;j++)
    {
      if(inputs[i]===allItems[j].barcode)  subItems.push(allItems[j]);
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

function buildSubtotal(Items){
  var cartItems=[];
  var subtotal=0;
  for(var i=0;i<Items.length;i++){
    subtotal=Items[i].price*Items[i].count;
    cartItems.push({Item:Items[i],subTotal:subtotal});
  }
  return cartItems;
}
function buildTotal(cartItems){
  var receiptItems={}
  receiptItems.cartItems=cartItems;
  var sum=0;
  for(var i=0;i<cartItems.length;i++)
  {
    sum+=cartItems[i].subTotal;
  }
  receiptItems.total=sum;
  return  receiptItems;
}
function toReceipt(receiptItems) {
  var str = "***<没钱赚商店>收据***\n";
  for (var i = 0; i < receiptItems.cartItems.length; i++) {
    str += "名称：" + receiptItems.cartItems[i].Item.name + "，数量：" + receiptItems.cartItems[i].Item.count + receiptItems.cartItems[i].Item.unit +
      "，单价：" + receiptItems.cartItems[i].Item.price.toFixed(2) + "(元)，小计：" + receiptItems.cartItems[i].subTotal.toFixed(2) + "(元)\n"
  }
  str +="----------------------\n总计：" + receiptItems.total.toFixed(2) + "(元)\n" +
    "**********************";
  return str;
}



