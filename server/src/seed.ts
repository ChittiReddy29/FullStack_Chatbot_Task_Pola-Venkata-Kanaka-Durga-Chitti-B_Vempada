import dotenv from 'dotenv';
import { connectDB, closeDB } from './config/db.js';
import Enquiry from './models/Enquiry.js';

dotenv.config();

const sampleEnquiries = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    userType: 'Student',
    interest: 'DGCA Certified Drone Pilot Training',
    message: 'I am a final year B.Tech student interested in enrolling in the certified pilot training course starting next month. Please share syllabus and fee details.',
    status: 'New',
    adminNotes: 'Student inquiry received from website landing page.',
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@agritech-solutions.com',
    phone: '+91 98123 45678',
    userType: 'Customer',
    interest: 'Agriculture Crop Health & Precision Spraying',
    message: 'We manage 200 acres of cotton fields near Nashik. We require thermal crop health mapping and automated drone spraying services.',
    status: 'In Progress',
    adminNotes: 'Quotation sent via email. Follow-up meeting scheduled for Thursday.',
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@infra-build.org',
    phone: '+91 97654 32109',
    userType: 'Customer',
    interest: 'Aerial Infrastructure Inspection & Thermal Imaging',
    message: 'Looking for high-resolution 3D aerial modeling and thermal structural inspection for a bridge project in Gujarat.',
    status: 'Contacted',
    adminNotes: 'Initial phone call done. Site details requested from client.',
  },
  {
    name: 'Ananya Verma',
    email: 'ananya.verma@university.edu.in',
    phone: '+91 99887 76655',
    userType: 'Student',
    interest: 'Aerial Surveying & GIS Mapping Course',
    message: 'Hi, I would like to know if there are weekend batch options available for the GIS mapping course.',
    status: 'Closed',
    adminNotes: 'Enrolled in Weekend Batch B3 starting Oct 15.',
  },
  {
    name: 'Rahul Mehta',
    email: 'rahul.mehta@studio-films.in',
    phone: '+91 91234 56789',
    userType: 'Customer',
    interest: 'Aerial Cinematography & FPV Filming',
    message: 'We are shooting a documentary in Himachal Pradesh next month and need certified FPV drone pilots and 4K aerial footage.',
    status: 'New',
    adminNotes: '',
  },
];

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDB();
    await Enquiry.deleteMany({});
    console.log('[Seed] Cleared existing enquiries.');

    const created = await Enquiry.insertMany(sampleEnquiries);
    console.log(`[Seed] Successfully seeded ${created.length} sample enquiries!`);

    await closeDB();
    console.log('[Seed] Database connection closed cleanly.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
