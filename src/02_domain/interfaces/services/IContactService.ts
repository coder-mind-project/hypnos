interface IContactService {
    sendMessage(readerEmail: string, message: string): Promise<any>;
}

export default IContactService;