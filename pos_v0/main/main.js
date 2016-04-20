function printReceipt(inputs) {
   var cartItems= buildSubtotal(inputs);
    var Total=buildTotal(cartItems);
    console.log(toReceipt(Total));
}
function buildSubtotal(inputs){
    var cartItems=[];
    var subtotal=0;
    for(var i=0;i<inputs.length;i++){
        subtotal=inputs[i].price*inputs[i].count;
        cartItems.push({Item:inputs[i],subTotal:subtotal});
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

    
    