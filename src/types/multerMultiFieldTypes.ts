export type Files = {
  [fieldname: string]: Express.Multer.File[];
  artwork: Express.Multer.File[];
  mp3: Express.Multer.File[];
  wav: Express.Multer.File[];
};
