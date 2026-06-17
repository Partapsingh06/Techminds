const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI;
const LOCAL_DB_PATH = path.join(__dirname, '..', 'data', 'local_db.json');

let isMongo = false;

// Connect to database
async function connectDB() {
  if (MONGO_URI) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connected successfully!');
      isMongo = true;
      return true;
    } catch (err) {
      console.error('MongoDB connection error, falling back to local JSON database:', err.message);
    }
  }

  // Ensure data folder exists
  const dataDir = path.dirname(LOCAL_DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Ensure local db file exists
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify({
      users: [],
      courses: [],
      blogs: [],
      inquiries: [],
      testimonials: [],
      schools: [],
      trainings: [],
      gallery: []
    }, null, 2));
    console.log('Created local JSON database file at:', LOCAL_DB_PATH);
  } else {
    console.log('Loaded local JSON database from:', LOCAL_DB_PATH);
  }

  isMongo = false;
  return false;
}

// Local Database Helper
class LocalCollection {
  constructor(collectionName) {
    this.name = collectionName;
  }

  _read() {
    try {
      const data = fs.readFileSync(LOCAL_DB_PATH, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      return {};
    }
  }

  _write(data) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2));
  }

  async find(filter = {}) {
    const db = this._read();
    let list = db[this.name] || [];
    
    // Simple filter matching
    return list.filter(item => {
      for (let key in filter) {
        if (filter[key] !== undefined && item[key] !== filter[key]) {
          return false;
        }
      }
      return true;
    });
  }

  async findOne(filter = {}) {
    const list = await this.find(filter);
    return list[0] || null;
  }

  async findById(id) {
    const db = this._read();
    const list = db[this.name] || [];
    return list.find(item => item._id === id || item.id === id) || null;
  }

  async create(data) {
    const db = this._read();
    if (!db[this.name]) db[this.name] = [];
    
    const newItem = {
      _id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    
    db[this.name].push(newItem);
    this._write(db);
    return newItem;
  }

  async findByIdAndUpdate(id, updateData, options = {}) {
    const db = this._read();
    const list = db[this.name] || [];
    const index = list.findIndex(item => item._id === id || item.id === id);
    
    if (index === -1) return null;
    
    list[index] = {
      ...list[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    this._write(db);
    return list[index];
  }

  async findByIdAndDelete(id) {
    const db = this._read();
    const list = db[this.name] || [];
    const index = list.findIndex(item => item._id === id || item.id === id);
    
    if (index === -1) return null;
    
    const deleted = list.splice(index, 1)[0];
    this._write(db);
    return deleted;
  }

  async countDocuments(filter = {}) {
    const list = await this.find(filter);
    return list.length;
  }
}

// MongoDB Schemas
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' }
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  grade: { type: String, required: true }, // '1-3', '4-5', '6-7', '8-9', '10-12'
  category: { type: String, required: true }, // 'Robotics', 'Coding', 'AI', 'IoT', 'AR/VR', 'Drone'
  description: { type: String, required: true },
  curriculum: [String],
  kits: [String],
  image: String
}, { timestamps: true });

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  category: { type: String, required: true },
  image: String,
  summary: String,
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: String,
  message: { type: String, required: true },
  schoolName: String,
  interestType: { type: String, default: 'General Inquiry' }, // 'School Partnership', 'Teacher Training', etc.
  status: { type: String, default: 'New' } // 'New', 'In Progress', 'Resolved'
}, { timestamps: true });

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // e.g. Principal, STEM Coordinator
  school: { type: String, required: true },
  text: { type: String, required: true },
  avatar: String
}, { timestamps: true });

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  logo: String,
  partnershipDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

const TrainingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: String,
  targetAudience: String,
  syllabus: [String],
  description: String,
  image: String
}, { timestamps: true });

const GallerySchema = new mongoose.Schema({
  title: { type: String },
  category: { type: String, default: 'General' }, // 'STEM Labs', 'Robotics Kits', 'Events'
  image: { type: String, required: true }
}, { timestamps: true });

// Models object mapping
let MongoModels = {};
if (MONGO_URI) {
  MongoModels = {
    User: mongoose.model('User', UserSchema),
    Course: mongoose.model('Course', CourseSchema),
    Blog: mongoose.model('Blog', BlogSchema),
    Inquiry: mongoose.model('Inquiry', InquirySchema),
    Testimonial: mongoose.model('Testimonial', TestimonialSchema),
    School: mongoose.model('School', SchoolSchema),
    Training: mongoose.model('Training', TrainingSchema),
    Gallery: mongoose.model('Gallery', GallerySchema)
  };
}

const LocalModels = {
  User: new LocalCollection('users'),
  Course: new LocalCollection('courses'),
  Blog: new LocalCollection('blogs'),
  Inquiry: new LocalCollection('inquiries'),
  Testimonial: new LocalCollection('testimonials'),
  School: new LocalCollection('schools'),
  Training: new LocalCollection('trainings'),
  Gallery: new LocalCollection('gallery')
};

// Getter function for models
function getModel(modelName) {
  if (isMongo && MongoModels[modelName]) {
    return MongoModels[modelName];
  }
  return LocalModels[modelName];
}

module.exports = {
  connectDB,
  isMongo: () => isMongo,
  getModel
};
