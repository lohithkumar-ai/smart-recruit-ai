// ========================================
//  SMART RECRUIT — Demo Data Store
// ========================================

const DemoData = {
    // ---- Jobs ----
    jobs: [
        {
            id: 'JOB001',
            title: 'Java Developer Intern',
            department: 'Engineering',
            location: 'Bangalore, India',
            type: 'Internship',
            skills: ['Java', 'SQL', 'OOP', 'Git', 'Spring Boot'],
            experience: '0-1 Years',
            description: 'Looking for a passionate Java developer intern to join our engineering team. You will work on building scalable backend services using Java and Spring Boot.',
            posted: '2026-09-15',
            status: 'Active',
            applications: 28
        },
        {
            id: 'JOB002',
            title: 'Python Developer Intern',
            department: 'Engineering',
            location: 'Hyderabad, India',
            type: 'Internship',
            skills: ['Python', 'SQL', 'Django', 'REST API', 'Git'],
            experience: '0-1 Years',
            description: 'Seeking a Python developer intern with knowledge of Django framework. You will contribute to building web applications and RESTful APIs.',
            posted: '2026-09-18',
            status: 'Active',
            applications: 22
        },
        {
            id: 'JOB003',
            title: 'Frontend Developer Intern',
            department: 'Engineering',
            location: 'Remote',
            type: 'Internship',
            skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
            experience: '0-1 Years',
            description: 'We are looking for a creative frontend developer intern who is passionate about building beautiful user interfaces using React.',
            posted: '2026-09-20',
            status: 'Active',
            applications: 19
        },
        {
            id: 'JOB004',
            title: 'Data Analyst Intern',
            department: 'Analytics',
            location: 'Mumbai, India',
            type: 'Internship',
            skills: ['Python', 'SQL', 'Excel', 'Power BI', 'Statistics'],
            experience: '0-1 Years',
            description: 'Join our analytics team as a data analyst intern. Work with large datasets and create insightful visualizations and reports.',
            posted: '2026-09-22',
            status: 'Active',
            applications: 15
        },
        {
            id: 'JOB005',
            title: 'HR Coordinator',
            department: 'Human Resources',
            location: 'Bangalore, India',
            type: 'Full-Time',
            skills: ['Communication', 'MS Office', 'HRIS', 'Recruitment', 'Employee Engagement'],
            experience: '1-3 Years',
            description: 'Looking for an organized HR coordinator to manage recruitment activities, employee onboarding and HR operations.',
            posted: '2026-09-25',
            status: 'Active',
            applications: 12
        }
    ],

    // ---- Candidates ----
    candidates: [
        {
            id: 'CAN001',
            name: 'Rahul Kumar',
            email: 'rahul.kumar@email.com',
            phone: '+91 98765 43210',
            source: 'LinkedIn',
            jobId: 'JOB001',
            job: 'Java Developer Intern',
            skills: ['Java', 'SQL', 'OOP', 'Git'],
            education: 'B.Tech Computer Science, VIT University',
            experience: 'Internship at TCS (3 months)',
            aiMatch: 87,
            appliedDate: '2026-09-20',
            status: 'Shortlisted',
            avatar: 'RK',
            color: '#4f46e5',
            timeline: [
                { stage: 'Application Received', date: '2026-09-20', completed: true },
                { stage: 'Screening', date: '2026-09-22', completed: true },
                { stage: 'Shortlisted', date: '2026-09-25', completed: true },
                { stage: 'Interview', date: '', completed: false },
                { stage: 'Selected', date: '', completed: false }
            ]
        },
        {
            id: 'CAN002',
            name: 'Priya Sharma',
            email: 'priya.sharma@email.com',
            phone: '+91 87654 32109',
            source: 'Naukri',
            jobId: 'JOB001',
            job: 'Java Developer Intern',
            skills: ['Java', 'SQL', 'HTML'],
            education: 'B.Tech IT, Anna University',
            experience: 'Academic projects only',
            aiMatch: 67,
            appliedDate: '2026-09-21',
            status: 'Screening',
            avatar: 'PS',
            color: '#06b6d4',
            timeline: [
                { stage: 'Application Received', date: '2026-09-21', completed: true },
                { stage: 'Screening', date: '2026-09-23', completed: true },
                { stage: 'Shortlisted', date: '', completed: false },
                { stage: 'Interview', date: '', completed: false },
                { stage: 'Selected', date: '', completed: false }
            ]
        },
        {
            id: 'CAN003',
            name: 'Arjun Radhakrishnan',
            email: 'arjun.r@email.com',
            phone: '+91 76543 21098',
            source: 'Company Website',
            jobId: 'JOB002',
            job: 'Python Developer Intern',
            skills: ['Python', 'SQL', 'Django'],
            education: 'B.Sc Computer Science, Christ University',
            experience: 'Freelance Python developer (6 months)',
            aiMatch: 81,
            appliedDate: '2026-09-23',
            status: 'Interview',
            avatar: 'AR',
            color: '#8b5cf6',
            timeline: [
                { stage: 'Application Received', date: '2026-09-23', completed: true },
                { stage: 'Screening', date: '2026-09-25', completed: true },
                { stage: 'Shortlisted', date: '2026-09-27', completed: true },
                { stage: 'Interview', date: '2026-10-02', completed: true },
                { stage: 'Selected', date: '', completed: false }
            ]
        },
        {
            id: 'CAN004',
            name: 'Ananya Desai',
            email: 'ananya.d@email.com',
            phone: '+91 65432 10987',
            source: 'Employee Referral',
            jobId: 'JOB003',
            job: 'Frontend Developer Intern',
            skills: ['HTML', 'CSS', 'JavaScript', 'React'],
            education: 'B.Tech CSE, IIIT Hyderabad',
            experience: 'Open source contributor, 2 personal projects',
            aiMatch: 89,
            appliedDate: '2026-09-24',
            status: 'Shortlisted',
            avatar: 'AD',
            color: '#10b981',
            timeline: [
                { stage: 'Application Received', date: '2026-09-24', completed: true },
                { stage: 'Screening', date: '2026-09-26', completed: true },
                { stage: 'Shortlisted', date: '2026-09-28', completed: true },
                { stage: 'Interview', date: '', completed: false },
                { stage: 'Selected', date: '', completed: false }
            ]
        },
        {
            id: 'CAN005',
            name: 'Vikram Singh',
            email: 'vikram.s@email.com',
            phone: '+91 54321 09876',
            source: 'LinkedIn',
            jobId: 'JOB001',
            job: 'Java Developer Intern',
            skills: ['Java', 'SQL', 'OOP', 'Git', 'Spring Boot'],
            education: 'B.Tech CSE, NIT Trichy',
            experience: 'Intern at Infosys (4 months)',
            aiMatch: 95,
            appliedDate: '2026-09-18',
            status: 'Selected',
            avatar: 'VS',
            color: '#f59e0b',
            timeline: [
                { stage: 'Application Received', date: '2026-09-18', completed: true },
                { stage: 'Screening', date: '2026-09-19', completed: true },
                { stage: 'Shortlisted', date: '2026-09-21', completed: true },
                { stage: 'Interview', date: '2026-09-25', completed: true },
                { stage: 'Selected', date: '2026-09-28', completed: true }
            ]
        },
        {
            id: 'CAN006',
            name: 'Meera Patel',
            email: 'meera.p@email.com',
            phone: '+91 43210 98765',
            source: 'Naukri',
            jobId: 'JOB002',
            job: 'Python Developer Intern',
            skills: ['Python', 'SQL', 'Flask'],
            education: 'B.Tech IT, BITS Pilani',
            experience: 'Academic projects',
            aiMatch: 72,
            appliedDate: '2026-09-25',
            status: 'Screening',
            avatar: 'MP',
            color: '#ec4899',
            timeline: [
                { stage: 'Application Received', date: '2026-09-25', completed: true },
                { stage: 'Screening', date: '2026-09-27', completed: true },
                { stage: 'Shortlisted', date: '', completed: false },
                { stage: 'Interview', date: '', completed: false },
                { stage: 'Selected', date: '', completed: false }
            ]
        },
        {
            id: 'CAN007',
            name: 'Karthik Nair',
            email: 'karthik.n@email.com',
            phone: '+91 32109 87654',
            source: 'LinkedIn',
            jobId: 'JOB003',
            job: 'Frontend Developer Intern',
            skills: ['HTML', 'CSS', 'JavaScript'],
            education: 'BCA, Amity University',
            experience: 'No experience',
            aiMatch: 62,
            appliedDate: '2026-09-26',
            status: 'Applied',
            avatar: 'KN',
            color: '#6366f1',
            timeline: [
                { stage: 'Application Received', date: '2026-09-26', completed: true },
                { stage: 'Screening', date: '', completed: false },
                { stage: 'Shortlisted', date: '', completed: false },
                { stage: 'Interview', date: '', completed: false },
                { stage: 'Selected', date: '', completed: false }
            ]
        },
        {
            id: 'CAN008',
            name: 'Sneha Gupta',
            email: 'sneha.g@email.com',
            phone: '+91 21098 76543',
            source: 'Company Website',
            jobId: 'JOB004',
            job: 'Data Analyst Intern',
            skills: ['Python', 'SQL', 'Excel', 'Power BI'],
            education: 'B.Sc Statistics, Delhi University',
            experience: 'Kaggle competitions',
            aiMatch: 84,
            appliedDate: '2026-09-27',
            status: 'Shortlisted',
            avatar: 'SG',
            color: '#14b8a6',
            timeline: [
                { stage: 'Application Received', date: '2026-09-27', completed: true },
                { stage: 'Screening', date: '2026-09-29', completed: true },
                { stage: 'Shortlisted', date: '2026-10-01', completed: true },
                { stage: 'Interview', date: '', completed: false },
                { stage: 'Selected', date: '', completed: false }
            ]
        },
        {
            id: 'CAN009',
            name: 'Deepak Reddy',
            email: 'deepak.r@email.com',
            phone: '+91 10987 65432',
            source: 'Employee Referral',
            jobId: 'JOB001',
            job: 'Java Developer Intern',
            skills: ['Java', 'SQL', 'OOP'],
            education: 'B.Tech CSE, JNTU',
            experience: 'College project',
            aiMatch: 73,
            appliedDate: '2026-09-28',
            status: 'Rejected',
            avatar: 'DR',
            color: '#ef4444',
            timeline: [
                { stage: 'Application Received', date: '2026-09-28', completed: true },
                { stage: 'Screening', date: '2026-09-30', completed: true },
                { stage: 'Rejected', date: '2026-10-01', completed: true }
            ]
        },
        {
            id: 'CAN010',
            name: 'Lakshmi Iyer',
            email: 'lakshmi.i@email.com',
            phone: '+91 09876 54321',
            source: 'Naukri',
            jobId: 'JOB004',
            job: 'Data Analyst Intern',
            skills: ['Python', 'SQL', 'Excel', 'Statistics'],
            education: 'M.Sc Data Science, IIT Madras',
            experience: 'Research assistant (6 months)',
            aiMatch: 91,
            appliedDate: '2026-09-22',
            status: 'Interview',
            avatar: 'LI',
            color: '#f97316',
            timeline: [
                { stage: 'Application Received', date: '2026-09-22', completed: true },
                { stage: 'Screening', date: '2026-09-24', completed: true },
                { stage: 'Shortlisted', date: '2026-09-26', completed: true },
                { stage: 'Interview', date: '2026-10-03', completed: true },
                { stage: 'Selected', date: '', completed: false }
            ]
        },
        {
            id: 'CAN011',
            name: 'Amit Joshi',
            email: 'amit.j@email.com',
            phone: '+91 91234 56780',
            source: 'LinkedIn',
            jobId: 'JOB005',
            job: 'HR Coordinator',
            skills: ['Communication', 'MS Office', 'HRIS', 'Recruitment'],
            education: 'MBA HR, Symbiosis University',
            experience: 'HR Intern at Wipro (6 months)',
            aiMatch: 88,
            appliedDate: '2026-09-29',
            status: 'Shortlisted',
            avatar: 'AJ',
            color: '#0ea5e9',
            timeline: [
                { stage: 'Application Received', date: '2026-09-29', completed: true },
                { stage: 'Screening', date: '2026-10-01', completed: true },
                { stage: 'Shortlisted', date: '2026-10-03', completed: true },
                { stage: 'Interview', date: '', completed: false },
                { stage: 'Selected', date: '', completed: false }
            ]
        },
        {
            id: 'CAN012',
            name: 'Roshni Menon',
            email: 'roshni.m@email.com',
            phone: '+91 81234 56789',
            source: 'Company Website',
            jobId: 'JOB003',
            job: 'Frontend Developer Intern',
            skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
            education: 'B.Tech CSE, SRM University',
            experience: 'Freelance web developer (4 months)',
            aiMatch: 94,
            appliedDate: '2026-09-19',
            status: 'Selected',
            avatar: 'RM',
            color: '#22c55e',
            timeline: [
                { stage: 'Application Received', date: '2026-09-19', completed: true },
                { stage: 'Screening', date: '2026-09-20', completed: true },
                { stage: 'Shortlisted', date: '2026-09-22', completed: true },
                { stage: 'Interview', date: '2026-09-26', completed: true },
                { stage: 'Selected', date: '2026-09-29', completed: true }
            ]
        }
    ],

    // ---- Interviews ----
    interviews: [
        {
            id: 'INT001',
            candidateId: 'CAN001',
            candidate: 'Rahul Kumar',
            job: 'Java Developer Intern',
            date: '2026-10-15',
            time: '10:00 AM',
            mode: 'Online',
            interviewer: 'HR Manager',
            status: 'Scheduled'
        },
        {
            id: 'INT002',
            candidateId: 'CAN004',
            candidate: 'Ananya Desai',
            job: 'Frontend Developer Intern',
            date: '2026-10-16',
            time: '2:00 PM',
            mode: 'Online',
            interviewer: 'Tech Lead',
            status: 'Scheduled'
        },
        {
            id: 'INT003',
            candidateId: 'CAN008',
            candidate: 'Sneha Gupta',
            job: 'Data Analyst Intern',
            date: '2026-10-17',
            time: '11:00 AM',
            mode: 'In-Person',
            interviewer: 'Analytics Manager',
            status: 'Scheduled'
        },
        {
            id: 'INT004',
            candidateId: 'CAN011',
            candidate: 'Amit Joshi',
            job: 'HR Coordinator',
            date: '2026-10-18',
            time: '3:00 PM',
            mode: 'Online',
            interviewer: 'HR Director',
            status: 'Scheduled'
        }
    ],

    // ---- Email Templates ----
    emailTemplates: [
        {
            id: 'ET001',
            name: 'Application Received',
            icon: 'fa-inbox',
            subject: 'Application Received — {jobTitle}',
            body: `Dear {candidateName},

Thank you for your interest in the {jobTitle} position at our organization.

We have successfully received your application and it is currently under review by our recruitment team. We appreciate you taking the time to apply.

Our team will carefully evaluate your qualifications and experience. You can expect to hear from us within the next 5-7 business days regarding the status of your application.

If you have any questions in the meantime, please don't hesitate to reach out.

Best regards,
HR Team
Smart Recruit`
        },
        {
            id: 'ET002',
            name: 'Shortlisted',
            icon: 'fa-star',
            subject: 'Congratulations! You have been Shortlisted — {jobTitle}',
            body: `Dear {candidateName},

Congratulations! Your application has been shortlisted for the next stage of our recruitment process for the {jobTitle} position.

Your qualifications and experience have impressed our hiring team, and we would like to move forward with your candidacy.

You will soon receive further details about the next steps, which may include a technical assessment or interview scheduling.

We look forward to getting to know you better!

Regards,
HR Team
Smart Recruit`
        },
        {
            id: 'ET003',
            name: 'Interview Invitation',
            icon: 'fa-calendar-check',
            subject: 'Interview Invitation — {jobTitle}',
            body: `Dear {candidateName},

We are pleased to invite you for an interview for the {jobTitle} position.

Interview Details:
- Date: {interviewDate}
- Time: {interviewTime}
- Mode: {interviewMode}
- Interviewer: {interviewer}

Please confirm your availability by replying to this email at your earliest convenience.

If you need to reschedule, please let us know at least 24 hours in advance.

We wish you the best!

Regards,
HR Team
Smart Recruit`
        },
        {
            id: 'ET004',
            name: 'Interview Reminder',
            icon: 'fa-bell',
            subject: 'Reminder: Upcoming Interview — {jobTitle}',
            body: `Dear {candidateName},

This is a friendly reminder about your upcoming interview for the {jobTitle} position.

Interview Details:
- Date: {interviewDate}
- Time: {interviewTime}
- Mode: {interviewMode}

Please ensure you are prepared and available at the scheduled time. If you have any last-minute questions, feel free to reach out.

Good luck!

Regards,
HR Team
Smart Recruit`
        },
        {
            id: 'ET005',
            name: 'Selection',
            icon: 'fa-trophy',
            subject: 'Offer of Employment — {jobTitle}',
            body: `Dear {candidateName},

We are delighted to inform you that you have been selected for the {jobTitle} position at our organization!

Your skills, experience and performance throughout the recruitment process have been outstanding, and we believe you will be a valuable addition to our team.

Our HR team will reach out to you shortly with the offer details, including compensation, start date and onboarding information.

Congratulations and welcome aboard!

Warm regards,
HR Team
Smart Recruit`
        },
        {
            id: 'ET006',
            name: 'Rejection',
            icon: 'fa-envelope',
            subject: 'Application Update — {jobTitle}',
            body: `Dear {candidateName},

Thank you for your interest in the {jobTitle} position and for taking the time to go through our recruitment process.

After careful consideration, we have decided to move forward with other candidates whose qualifications more closely align with the current requirements of this role.

We sincerely appreciate your effort and encourage you to apply for future openings that match your profile. Your information will remain in our talent database for future opportunities.

We wish you all the best in your career endeavors.

Regards,
HR Team
Smart Recruit`
        }
    ],

    // ---- Dashboard Stats ----
    stats: {
        totalApplications: 1248,
        shortlisted: 186,
        interviews: 64,
        selected: 18,
        avgTimeToHire: 12,
        sourcesBreakdown: {
            'LinkedIn': 520,
            'Naukri': 390,
            'Company Website': 238,
            'Employee Referral': 100
        },
        funnelData: {
            'Applied': 1248,
            'Screening': 542,
            'Shortlisted': 186,
            'Interview': 64,
            'Selected': 18
        },
        monthlyApplications: {
            'Apr': 85, 'May': 102, 'Jun': 134, 'Jul': 156,
            'Aug': 189, 'Sep': 268, 'Oct': 314
        },
        jobApplications: {
            'Java Developer Intern': 28,
            'Python Developer Intern': 22,
            'Frontend Developer Intern': 19,
            'Data Analyst Intern': 15,
            'HR Coordinator': 12
        }
    }
};

// ---- localStorage persistence ----
function loadData() {
    const saved = localStorage.getItem('smartrecruit_data');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // Merge saved data with defaults
            if (parsed.candidates) DemoData.candidates = parsed.candidates;
            if (parsed.jobs) DemoData.jobs = parsed.jobs;
            if (parsed.interviews) DemoData.interviews = parsed.interviews;
        } catch (e) {
            console.log('Using default demo data');
        }
    }
}

function saveData() {
    const toSave = {
        candidates: DemoData.candidates,
        jobs: DemoData.jobs,
        interviews: DemoData.interviews
    };
    localStorage.setItem('smartrecruit_data', JSON.stringify(toSave));
}

function resetData() {
    localStorage.removeItem('smartrecruit_data');
    location.reload();
}

loadData();
