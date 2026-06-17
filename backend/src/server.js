const dns = require("node:dns/promises");
dns.setServers(["1.1.1.1"]);
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const { connectDB, getModel } = require('./db');

// Import routes
const authRoute = require('./routes/auth').router;
const coursesRoute = require('./routes/courses');
const blogsRoute = require('./routes/blogs');
const galleryRoute = require('./routes/gallery');
const testimonialsRoute = require('./routes/testimonials');
const queriesRoute = require('./routes/queries');
const schoolsRoute = require('./routes/schools');
const trainingRoute = require('./routes/training');
const analyticsRoute = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));

// Mount API routes
app.use('/api/auth', authRoute);
app.use('/api/courses', coursesRoute);
app.use('/api/blogs', blogsRoute);
app.use('/api/gallery', galleryRoute);
app.use('/api/testimonials', testimonialsRoute);
app.use('/api/queries', queriesRoute);
app.use('/api/schools', schoolsRoute);
app.use('/api/training', trainingRoute);
app.use('/api/analytics', analyticsRoute);

// Default API Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', time: new Date() });
});

// Seed data function
async function seedInitialData() {
  try {
    const User = getModel('User');
    const Course = getModel('Course');
    const Blog = getModel('Blog');
    const Testimonial = getModel('Testimonial');
    const School = getModel('School');
    const Training = getModel('Training');
    const Gallery = getModel('Gallery');

    // 1. Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@techminds.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'TechMinds Administrator',
        email: 'admin@techminds.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user seeded: admin@techminds.com / admin123');
    }

    // 2. Seed Courses (STEM Programs)
    const coursesCount = await Course.countDocuments();
    if (coursesCount === 0) {
      const defaultCourses = [
        {
          title: 'Junior Robotics & Mechanics',
          grade: '1-3',
          category: 'Robotics',
          description: 'Introduction to spatial thinking, building blocks, and simple machines using colorful block structures. Students learn logic patterns and visual motor skills.',
          curriculum: ['Intro to Gears and Axles', 'Levers & Pulleys', 'First Motorized Robot', 'Sensory Play'],
          kits: ['TechMinds Junior Play Kit', 'Visual Block Motor Set'],
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Scratch Coding & Interactive Stories',
          grade: '4-5',
          category: 'Coding',
          description: 'Students learn standard computational logic, sequencing, conditional logic, and variables by building their own interactive animations and stories.',
          curriculum: ['Visual Programming Basics', 'Sequencing & Loops', 'Conditionals & Game Design', 'Variables & Animation'],
          kits: ['TechMinds Block Coding Platform Access'],
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Internet of Things & Smart Microcontrollers',
          grade: '6-7',
          category: 'IoT',
          description: 'Diving into electronics! Students configure sensors, wire circuits, and write scripts to interact with temperature, light, and motion hardware components.',
          curriculum: ['Introduction to Microcontrollers', 'Circuit Wiring & Breadboards', 'LEDs and Light Sensors', 'Smart Home Prototypes'],
          kits: ['TechMinds Explorer IoT Starter Kit', 'Arduino Development Shield'],
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Artificial Intelligence & Python Robotics',
          grade: '8-9',
          category: 'AI',
          description: 'Learn real text-based Python code to control smart autonomous robots. Program line-followers, obstacle avoiders, and gesture recognition triggers.',
          curriculum: ['Python syntax & programming', 'Motor Controls & Speed Calibrations', 'Ultrasonic Sensor Routing', 'Intro to Computer Vision'],
          kits: ['TechMinds Rover V2 Autonomous Car', 'Raspberry Pi Camera Pack'],
          image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Drone Aerodynamics & Computer Vision',
          grade: '10-12',
          category: 'Drone',
          description: 'Explore quadcopter aerodynamics and programmatic navigation controls. Integrate OpenCV image recognition to identify targets from the air.',
          curriculum: ['Drone Flight Physics & Coordinates', 'Python Dronekit Integration', 'Real-time Video Processing', 'Autonomous Pathing'],
          kits: ['TechMinds Scout Drone Quad', 'Visual Recognition Camera Mod'],
          image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
        }
      ];

      for (const course of defaultCourses) {
        await Course.create(course);
      }
      console.log('Default STEM courses seeded.');
    }

    // 3. Seed Blogs
    const blogsCount = await Blog.countDocuments();
    if (blogsCount === 0) {
      const defaultBlogs = [
        {
          title: 'Unlocking the Power of AI inside School Classrooms',
          summary: 'How artificial intelligence is transitioning from a high-tech novelty to a fundamental learning assistant inside K-12 education.',
          content: 'As artificial intelligence continues to reshape the landscape of work and technology, schools are facing an important realization: teaching AI is no longer optional. But how do we teach such a complex topic to middle schoolers or high schoolers? The answer lies in hands-on, conceptual learning. By integrating block-based AI tools, speech recognition projects, and machine learning model training in a fun, gamified way, students learn not just how to code but the ethical implications of data and modeling.',
          category: 'AI Education',
          author: 'Dr. Vivek Anand (STEM Specialist)',
          image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&w=800&q=80',
          publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
        },
        {
          title: 'Why Robotics is the Ultimate Collaborative Catalyst',
          summary: 'Robotics isn’t just about wires and gears – it’s a powerful vehicle for building emotional intelligence and teamwork skills.',
          content: 'When you walk into a TechMinds STEM laboratory, the first thing you hear is not silence, but collaboration. Robotics requires a diversity of skills: design, engineering, coding, testing, and troubleshooting. Some students excel at logical code paths, while others have a knack for mechanical assembly. By working in multidisciplinary teams, students develop critical soft skills like empathy, delegation, patience, and visual communication.',
          category: 'Robotics',
          author: 'Priya Sen (Lead STEM Curriculum Designer)',
          image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
          publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
        }
      ];
      for (const blog of defaultBlogs) {
        await Blog.create(blog);
      }
      console.log('Default blogs seeded.');
    }

    // 4. Seed Testimonials
    const testimonialsCount = await Testimonial.countDocuments();
    if (testimonialsCount === 0) {
      const defaultTestimonials = [
        {
          name: 'Sister Mary Joseph',
          role: 'Principal',
          school: 'St. Xavier High School',
          text: 'TechMinds set up a complete Robotics and AI Lab in our school within 2 weeks. Their curriculum is fully integrated with our board guidelines, and teachers are now highly confident.',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
        },
        {
          name: 'Dr. Ramesh K. Srivastav',
          role: 'STEM Coordinator',
          school: 'The Heritage School',
          text: 'The Robotics Kits provided by TechMinds are extremely durable and well-packaged. The modular nature allows kids from various grades to work on the same hardware with progressive challenges.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
        }
      ];
      for (const testimonial of defaultTestimonials) {
        await Testimonial.create(testimonial);
      }
      console.log('Default testimonials seeded.');
    }

    // 5. Seed Schools
    const schoolsCount = await School.countDocuments();
    if (schoolsCount === 0) {
      const defaultSchools = [
        { name: 'Pinegrove Public School', location: 'Shimla, HP', logo: 'https://images.unsplash.com/photo-1590012314607-cda9d9b6a9a9?auto=format&fit=crop&w=200&q=80', status: 'Active' },
        { name: 'St. Stephens Academy', location: 'Chandigarh', logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=200&q=80', status: 'Active' },
        { name: 'Nalanda International School', location: 'Vadodara, GJ', logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80', status: 'Active' }
      ];
      for (const school of defaultSchools) {
        await School.create(school);
      }
      console.log('Default partner schools seeded.');
    }

    // 6. Seed Trainings
    const trainingCount = await Training.countDocuments();
    if (trainingCount === 0) {
      const defaultTrainings = [
        {
          title: 'Capacity Building Program in AI Pedagogy',
          duration: '3 Days Workshop',
          targetAudience: 'Computer Science and Mathematics Teachers',
          description: 'Equip your staff with teaching strategies for machine learning models, block coding integration, and data science concepts without requiring an engineering degree.',
          syllabus: ['Demystifying AI/ML for Kids', 'Building Image Classification Models', 'Ethical AI Classroom Debates', 'Assessing STEM Portfolios'],
          image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Robotics Kit Integration & Troubleshooting',
          duration: '2 Weeks Cohort',
          targetAudience: 'Science Lab Assistants & Physics Teachers',
          description: 'A deep dive into structural assembly, wiring boards, soldering safety, sensor integrations, and debugging firmware anomalies for K-12 kits.',
          syllabus: ['Structural Mechanics Basics', 'Sensor Arrays & Circuit Troubleshooting', 'Arduino IDE & Upload Procedures', 'Annual Maintenance Rules'],
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
        }
      ];
      for (const training of defaultTrainings) {
        await Training.create(training);
      }
      console.log('Default training programs seeded.');
    }

    // 7. Seed Gallery
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      const defaultGallery = [
        { title: 'Inauguration of STEM Innovation Lab', category: 'STEM Labs', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80' },
        { title: 'National Coding Competition Winners', category: 'Events', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
        { title: 'Hands-on Drone Assembly Program', category: 'Robotics Kits', image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80' },
        { title: 'Junior Engineers displaying Circuit boards', category: 'STEM Labs', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80' }
      ];
      for (const galleryItem of defaultGallery) {
        await Gallery.create(galleryItem);
      }
      console.log('Default gallery items seeded.');
    }
  } catch (err) {
    console.error('Error seeding initial data:', err.message);
  }
}

// Start Server
async function start() {
  await connectDB();
  await seedInitialData();

  app.listen(PORT, () => {
    console.log(`[TechMinds Express Backend] running on port ${PORT}`);
  });
}

start();
