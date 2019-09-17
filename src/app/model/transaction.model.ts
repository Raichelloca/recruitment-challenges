export interface Transaction {

    action: String;
    id: String;
    currencyCode: String;
    brandId: Number;
    amount: Number;
    card: {
      expiryMonth: Number,
      expiryYear: Number,
      firstSixDigits:Number,
      lastFourDigits: Number, 
      holderName:String
    };
    trackingCode: String;

    //New Field to develop
    isSelected: boolean; 
    
  }
