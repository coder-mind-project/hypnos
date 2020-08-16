interface IContactService {
  sendMessage(readerEmail: string, message: string): Promise<unknown>;
}

export default IContactService;
