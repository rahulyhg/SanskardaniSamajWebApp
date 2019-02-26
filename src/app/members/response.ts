export interface IResponse{
    IsSuccess: boolean,
    StatusCode: number,
    Message: string,
    Data: Object,
}

export class Response implements IResponse{
    IsSuccess: boolean;
    StatusCode: number;
    Message: string;
    Data: Object;

    constructor() {
    }
}