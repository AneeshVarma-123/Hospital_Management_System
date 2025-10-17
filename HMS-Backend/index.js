const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
// Allow specifying a single FRONTEND_URL for production CORS restrictions (e.g. https://your-frontend.vercel.app)
const FRONTEND_URL = process.env.FRONTEND_URL;
if (FRONTEND_URL) {
  console.log('CORS restricted to:', FRONTEND_URL);
  app.use(cors({ origin: FRONTEND_URL }));
} else {
  console.error('FRONTEND_URL is not set. Please configure it in the .env file.');
  process.exit(1); // Exit if FRONTEND_URL is not set
}

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow cookies if needed
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and only start server after successful connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    // start server only after DB connection is established
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // call seed after server start
    seedDoctors();
    seedAdmin();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Common fixes: ensure your Atlas cluster allows your current IP (Network Access), the connection string (MONGODB_URI) is correct, and your cluster is running.');
    process.exit(1);
  });

// seed doctors if not present
const seedDoctors = async () => {
  try {
    const Doctor = require('./models/Doctor');
    const bcrypt = require('bcryptjs');
    // Instead of aborting when collection is non-empty, ensure each default doctor exists.
    const docs = [
      { docId: 'DOC1001', name: 'Dr. Rajesh Kumar', speciality: 'Cardiology', honours: 'MD, DM', password: 'docpass1' },
      { docId: 'DOC1002', name: 'Dr. Anjali Mehra', speciality: 'Pediatrics', honours: 'MBBS, MD', password: 'docpass2' },
      { docId: 'DOC1003', name: 'Dr. Suresh Iyer', speciality: 'Orthopedics', honours: 'MS, MCh', password: 'docpass3' },
      { docId: 'DOC1004', name: 'Dr. Priya Sharma', speciality: 'Neurology', honours: 'MBBS, DNB', password: 'docpass4' },
      // new pulmonologist requested
      { docId: 'DOC1005', name: 'Dr. Manish Verma', speciality: 'Pulmonology', honours: 'MD, DNB', password: 'docpass5' },
    ];

    for (const d of docs) {
      const found = await Doctor.findOne({ docId: d.docId });
      if (found) {
        console.log(`Doctor ${d.docId} already exists, skipping`);
        continue;
      }
      const hash = await bcrypt.hash(d.password, 8);
      const doctor = new Doctor({ ...d, password: hash });
      await doctor.save();
      console.log(`Created doctor ${d.docId} (${d.name})`);
    }
    console.log('Seeding doctors complete');
  } catch (err) {
    console.error('Seeding doctors failed', err);
  }
};


const appointmentsRouter = require('./routes/appointments');
app.use('/api/appointments', appointmentsRouter);
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);
const doctorsRouter = require('./routes/doctors');
app.use('/api/doctors', doctorsRouter);
const messagesRouter = require('./routes/messages');
app.use('/api/messages', messagesRouter);

const adminRouter = require('./routes/admin');
app.use('/api/admin', adminRouter);

// seed admin user if missing
const seedAdmin = async () => {
  try {
    const Admin = require('./models/Admin');
    const bcrypt = require('bcryptjs');
    const existing = await Admin.findOne({ adminId: 'ADMIN01' });
    if (existing) return console.log('Admin ADMIN01 already exists');
    const hash = await bcrypt.hash('adminpass', 8);
    const admin = new Admin({ adminId: 'ADMIN01', name: 'Super Admin', password: hash });
    await admin.save();
    console.log('Seeded admin ADMIN01');
  } catch (err) {
    console.error('Seeding admin failed', err);
  }
};

app.get('/', (req, res) => res.send('HMS Backend running'));
