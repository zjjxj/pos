describe('pos', function () {
  var allItems;
  var inputs;

  beforeEach(function () {
    allItems = loadAllItems();
    inputs = [
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000000',
      'ITEM000001',
      'ITEM000001',
      'ITEM000004'
    ];
  });

  describe('Unit Test', function () {
    describe('Text SubItems', function () {
      it('return right subItems', function () {
        var subItems = buildSubItems(inputs);

        expect(subItems).toEqual([
          {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
          },
          {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
          },
          {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
          },
          {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
          },
          {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
          },
          {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
          }
        ]);
      });
    });
  });

  describe('Unit Test', function () {
    describe('Text Items', function () {
      it('return right Items', function () {
        var subItems = buildSubItems(inputs);
        var items = buildItems(subItems);

        expect(items).toEqual([
          {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00,
            count: 5
          },
          {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00,
            count: 2
          },
          {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00,
            count: 1
          }
        ]);
      });
    });
  });

  describe('Unit Test', function () {
    describe('Text cartItems', function () {
      it('return right Items', function () {
        var subItems = buildSubItems(inputs);
        var Items = buildItems(subItems);
        var cartItems = buildCartItems(Items);

        expect(cartItems).toEqual([
          {
            Item: {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00,
              count: 5
            },
            subTotal: 15
          },
          {
            Item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00,
              count: 2
            },
            subTotal: 6
          },
          {
            Item: {
              barcode: 'ITEM000004',
              name: '电池',
              unit: '个',
              price: 2.00,
              count: 1
            },
            subTotal: 2
          }
        ]);
      });
    });
  });

  describe('Unit Test', function () {
    describe('Text receiptItems', function () {
      it('return right receiptItems', function () {
        var subItems = buildSubItems(inputs);
        var Items = buildItems(subItems);
        var cartItems = buildCartItems(Items);
        var receiptItems = buildReceiptItems(cartItems);

        expect(receiptItems).toEqual({
          cartItems: [{
            Item: {
              barcode: 'ITEM000000',
              name: '可口可乐',
              unit: '瓶',
              price: 3.00,
              count: 5

            },
            subTotal: 15
          },
            {
              Item: {
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3.00,
                count: 2
              },
              subTotal: 6
            },
            {
              Item: {
                barcode: 'ITEM000004',
                name: '电池',
                unit: '个',
                price: 2.00,
                count: 1
              },
              subTotal: 2
            }],
          total: 23
        });
      });
    });
  });
});

it('should print correct text', function () {
  inputs = [
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
  ];

  spyOn(console, 'log');

  printReceipt(inputs);

  var expectText =
    '***<没钱赚商店>收据***\n' +
    '名称：可口可乐，数量：5瓶，单价：3.00(元)，小计：15.00(元)\n' +
    '名称：雪碧，数量：2瓶，单价：3.00(元)，小计：6.00(元)\n' +
    '名称：电池，数量：1个，单价：2.00(元)，小计：2.00(元)\n' +
    '----------------------\n' +
    '总计：23.00(元)\n' +
    '**********************';

  expect(console.log).toHaveBeenCalledWith(expectText);
});

