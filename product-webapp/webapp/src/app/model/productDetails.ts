export class Product{
    productId : String;
    productName : String;
   productCategory : String;
        productSubCategory : String;
        productBrand : String;
  //   productImage? : byte[];
   productDesc :  String;
       stockQuantity :  number;
        price :  number ;
       rating  : number;
       sellingPrice  :  number;
        sellerEmailId: String;
  
  
      constructor(data: any) {
        this.productId = data.productId;
        this.productName = data.productName;
        this.productCategory = data.productCategory;
        this.productSubCategory = data.productSubCategory;
        this.productBrand = data.productBrand;
        this.productDesc = data.productDesc;
        this.stockQuantity = data.stockQuantity;
        this.price = data.price;
        this.sellingPrice = data.sellingPrice;
        this.sellerEmailId= data.sellerEmailId;
        this.rating=data.rating;
      }
  
  }