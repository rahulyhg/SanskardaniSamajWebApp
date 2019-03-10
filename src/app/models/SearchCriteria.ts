export interface ISearchCriteria {
    IsName: boolean,
    Name: string,
    IsDOBRange: boolean,
    StartDOB: Date,
    EndDOB: Date,
    IsAmountRange: boolean,
    AmountFrom: Number,
    AmountTo: Number
}

export class SearchCriteria implements ISearchCriteria {
    IsName: boolean;
    Name: string;
    IsDOBRange: boolean;
    StartDOB: Date;
    EndDOB: Date;
    IsAmountRange: boolean;
    AmountFrom: Number;
    AmountTo: Number;

    constructor() {
        this.AmountFrom=0;
        this.AmountTo=0;
        this.Name="";
    }
}