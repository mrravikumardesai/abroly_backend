import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors"
import https from 'https'
import http from 'http'
import path from 'path';
import fs from 'fs'
import sequelize from './config/dbconfig';
import associateModels from './config/associateModels';
import v1_routes from './v1/routes';

const app = express();

const allowedOrigins = [

];

const server = process.env.ISLOCAL == "yes" ? http.createServer(app) : https.createServer({
  key: fs.readFileSync("/etc/letsencrypt/live/visainsiders.in/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/visainsiders.in/fullchain.pem")
}, app);
const port = 3003;

if (process.env.ISLOCAL == "yes") {
  app.use(cors())
} else {
  app.use(cors({
    origin: function (origin, callback) {
      // If no origin is present (e.g., for server-to-server requests), allow it
      if (!origin) return callback(null, true);

      // Check if the origin is in the list of allowed origins
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
}

app.use(express.json())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});


app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    health: "Good!"
  })
})

// Construct the absolute path to the public directory
const publicDirectoryPath = path.join(__dirname, '..', 'public');

// Serve files from the public directory under the "/public" route
app.use('/public', express.static(publicDirectoryPath));

app.use("/api/v1", v1_routes)


const connectDB = async () => {
  associateModels();

  await sequelize
    .authenticate()
    .then(() => {
      console.log("MySQL connected..");
      // create default folders
      createDefaultFolders("profiles")
      createDefaultFolders("testimonials")
      createDefaultFolders("content_writing_files")
      createDefaultFolders("courses")
      createDefaultFolders("course_chapter_items")
    })
    .catch((e) => {
      console.error("ERROR TO CONNECT DB", e.toString());
    });

  app.locals.db = sequelize; // Add the Sequelize instance to app.locals
  // app.locals.modelsv1 = modelsv1;

};



server.listen(port, '0.0.0.0', () => {
  connectDB();
  // swaggerDocs(app)
  // start cron job
  // CronJobs.cronInit();
  console.log(`Server is running at http://localhost:${port}`);
});



// Check if the folder exists, if not, create it
async function createDefaultFolders(folderPath: string) {


  if (!fs.existsSync(`public`)) {
    fs.mkdir(`public`, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating folder:', err);
      } else {
        console.log('Folder created successfully.');
      }
    });
  }

  if (!fs.existsSync(`public/${folderPath}`)) {
    fs.mkdir(`public/${folderPath}`, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating folder:', err);
      } else {
        console.log('Folder created successfully.');
      }
    });
  }
}

