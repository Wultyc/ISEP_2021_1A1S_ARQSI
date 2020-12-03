export interface Mapper<T> {
    fromReqToDTO (t: T): any;
    fromDomainToDTO (t: T): any;
  }