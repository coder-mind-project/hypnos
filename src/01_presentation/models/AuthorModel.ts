import IUser from '../../02_domain/interfaces/entities/IUser';

class AuthorModel {
  public id: string;
  public name: string;
  public birthDate: string | Date;
  public profilePhoto: string;
  public instagram: string;
  public twitter: string;
  public github: string;
  public youtube: string;
  public occupation: string;
  public especiality: string;
  public customUrl: string;

  constructor(user: IUser) {
    this.id = user?.id;
    this.name = user?.name;
    this.birthDate = user?.birthDate;
    this.profilePhoto = user?.profilePhoto;
    this.instagram = user?.instagram;
    this.twitter = user?.twitter;
    this.github = user?.github;
    this.youtube = user?.youtube;
    this.occupation = user?.occupation;
    this.especiality = user?.especiality;
    this.customUrl = user?.customUrl;
  }
}

export default AuthorModel;
