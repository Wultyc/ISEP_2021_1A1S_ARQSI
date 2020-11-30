class TripulantTypeProps {
  description: string;
}

class TripulantTypeDomain {
    
  private readonly _id: string;
  private readonly props: TripulantTypeProps;

  get id (): string {
    return this._id;
  }

  get description (): string {
    return this.description;
  }

  set description (value: string) {
    this.props.description = value;
  }

  private constructor (props: TripulantTypeProps, id: string) {
    this._id = id ;
    this.props = props;
  }
  
  public static create (props: TripulantTypeProps, id: string) {
    return new TripulantTypeDomain({ ...props }, id);
  }
}

module.exports = TripulantTypeDomain;