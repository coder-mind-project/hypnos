import ISMTPEnvelope from './IsmtpEnvelope';

interface ISMTPMessageSent {
  accepted: Array<string>;
  envelope: ISMTPEnvelope;
  envelopeTime: number;
  messageId: string;
  messageSize: number;
  messageTime: number;
  rejected: Array<string>;
  response: string;
}

export default ISMTPMessageSent;
