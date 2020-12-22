import { AggregateRoot } from "./interface/AggregateRoot";
import { UniqueEntityID } from "./interface/UniqueEntityID";

class TripulantTypeProps {
  description: string;
}

export class TripulantTypeDomain extends AggregateRoot<TripulantTypeProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get description (): string {
    return this.description;
  }

  set description (value: string) {
    this.props.description = value;
  }

  private constructor (props: TripulantTypeProps, id: UniqueEntityID) {
    super(props, id)
  }
  
  public static create (props: TripulantTypeProps, id: UniqueEntityID) {

    //Fazer as validações. se estiver OK cria um objeto desta classe e retorna
    //Atenção isto NÃO É O DTO!!
    //se estiver invalido retorna um objeto {error: "mensagem de erro"}
    return "";
  }
}