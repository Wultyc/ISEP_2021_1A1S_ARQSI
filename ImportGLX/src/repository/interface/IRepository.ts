export default interface IRepository{
    save():boolean|Promise<boolean>
}