export interface AppState {
  id: number,
  firstname: string,
  name: string,
  username: string,
  password: string, //FIXME: RM THIS FROM APPSTATE (get overridden on PUT Req add film to MyList)
  myList: number[],
  liked: number[],
}