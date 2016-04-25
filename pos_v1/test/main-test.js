describe('pos', function() {
  var allItems;
  var inputs;

  beforeEach(function() {
    allItems = loadAllItems();
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  describe('Unit Test', function() {
    describe('Text SubItems',function () {
      it('return right subItems',function () {
        var subItems=buildSubItems(inputs);
         expect(subItems).toEqual([
          {
            barcode: 'ITEM000001',
            name: '雪碧',
            price: 3.00,
            unit: '瓶'
          },
         {
          barcode: 'ITEM000001',
          name: '雪碧',
          price: 3.00,
          unit: '瓶'
         },
         {
          barcode: 'ITEM000001',
          name: '雪碧',
          price: 3.00,
          unit: '瓶'
         },
         {
         barcode: 'ITEM000001',
         name: '雪碧',
         price: 3.00,
         unit: '瓶'
         },
         {
         barcode: 'ITEM000001',
         name: '雪碧',
         price: 3.00,
         unit: '瓶'
         },
          {
            barcode: 'ITEM000003',
            name: '荔枝',
            price: 15.00,
             unit: '斤'
          },
         {
         barcode: 'ITEM000003',
         name: '荔枝',
         price: 15.00,
         unit: '斤'
         },
          {
            barcode: 'ITEM000005',
            name: '方便面',
            price: 4.50,
            unit: '袋'
          },
         {
         barcode: 'ITEM000005',
         name: '方便面',
         price: 4.50,
         unit: '袋'
         },
         {
         barcode: 'ITEM000005',
         name: '方便面',
         price: 4.50,
         unit: '袋'
         }
        ]);

      });

    });
    });


  describe('Unit Test', function() {
    describe('Text Items',function () {
      it('return right Items',function () {
        var subItems=buildSubItems(inputs);
        var Items=buildItems(subItems);
        expect(Items).toEqual([
          {
            barcode: 'ITEM000001',
            count:5,
            name:'雪碧',
            price: 3.00,
            unit: '瓶'

          },
          {
            barcode: 'ITEM000003',
            count:2,
            name: '荔枝',
            price: 15.00,
            unit: '斤'
          },
          {
            barcode: 'ITEM000005',
            count:3,
            name: '方便面',
            price: 4.50,
            unit: '袋'
          }

        ]);

      });

    });
  });

  describe('Unit Test', function() {
    describe('Text cartItems',function () {
      it('return right Items',function () {
        var subItems=buildSubItems(inputs);
        var Items=buildItems(subItems);
        var cartItems=buildCartItems(Items);
        expect(cartItems).toEqual([
          {
            Item:{
                  barcode: 'ITEM000001',
                  count:5,
                  name:'雪碧',
                  price: 3.00,
                  unit: '瓶'

                 },
            subSave:3,
            subTotal:12

          },
          {
            Item:{
              barcode: 'ITEM000003',
              count:2,
              name: '荔枝',
              price: 15.00,
              unit: '斤'

            },
            subSave:0,
            subTotal:30

          },
          {
            Item:{
              barcode: 'ITEM000005',
              count:3,
              name: '方便面',
              price: 4.50,
              unit: '袋'

            },
            subSave:4.5,
            subTotal:9

          }


        ]);

      });

    });
  });

  describe('Unit Test', function() {
    describe('Text receiptItems',function () {
      it('return right receiptItems',function () {
        var subItems=buildSubItems(inputs);
        var Items=buildItems(subItems);
        var cartItems=buildCartItems(Items);
        var  receiptItems= buildReceiptItems(cartItems);
        expect(receiptItems).toEqual({
          Save:7.5,
        cartItems:[{
            Item:{
              barcode: 'ITEM000001',
              count:5,
              name:'雪碧',
              price: 3.00,
              unit: '瓶'

            },
            subSave:3,
            subTotal:12

          },
          {
            Item:{
              barcode: 'ITEM000003',
              count:2,
              name: '荔枝',
              price: 15.00,
              unit: '斤'

            },
            subSave:0,
            subTotal:30

          },
          {
            Item:{
              barcode: 'ITEM000005',
              count:3,
              name: '方便面',
              price: 4.50,
              unit: '袋'

            },
            subSave:4.5,
            subTotal:9

          }],
          total:51


        });

      });

    });
  });

  






  it('should print correct text', function() {

    spyOn(console, 'log');

    printReceipt(inputs);

    var expectText =
      '***<没钱赚商店>收据***\n' +
      '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
      '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
      '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
      '----------------------\n' +
      '总计：51.00(元)\n' +
      '节省：7.50(元)\n' +
      '**********************';

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
});
