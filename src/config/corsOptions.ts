import allowedOrigins from "./allowedOrigins";
type origin = string | undefined;

const CorsOptions = {
  origin: (origin: origin, callback: any) => {
    if (origin !== undefined) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials:true,
  optionsSuccessStatus: 200,
};

export default CorsOptions;
