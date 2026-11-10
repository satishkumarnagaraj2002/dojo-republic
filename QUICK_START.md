# ⚡ QUICK START GUIDE

## 🎯 Get Up and Running in 3 Minutes

### Step 1: Install and Seed Demo Data

```bash
npm install
npm run seed
```

The seed command creates fictional demo users and records in `data/`, including
today's attendance sample in `public/data/attendance.json`.

Most API-backed pages use MongoDB. To load the fixtures into a fresh local
MongoDB database, set `MONGODB_URI` in `.env.local` and run:

```bash
npm run seed:mongodb
```

**Warning:** `npm run seed:mongodb` clears the demo collections it manages
before importing the fixtures. Use it only with a fresh/demo database.

### Step 2: Run the Website

```bash
npm run dev
```

Open **http://localhost:3000**.

### Step 3: Understanding What's Available

#### 🌐 You Can Visit These Pages RIGHT NOW:

**Public Pages (No Login):**

- Home: http://localhost:3000/
- Dojos: http://localhost:3000/dojos
- Tournaments: http://localhost:3000/tournaments
- Athletes: http://localhost:3000/players
- Marketplace: http://localhost:3000/marketplace

**Login & Test:**

- Login: http://localhost:3000/auth/login

### Step 4: Login with Demo Account

**Try Admin Account First:**

```
Email: admin@demo.com
Password: password123
```

After loading the fixtures into MongoDB and logging in, you'll see the admin
dashboard with:

- Pending approvals
- Platform statistics
- Management options

---

## 🎮 5-Minute Feature Tour

### 1️⃣ Browse Dojos (30 seconds)

1. Go to http://localhost:3000/dojos
2. See 3 pre-loaded dojos
3. Filter by city or martial art
4. Click on any dojo to see details

### 2️⃣ Check Tournaments (30 seconds)

1. Go to http://localhost:3000/tournaments
2. See 3 upcoming tournaments
3. Click to view details

### 3️⃣ View Athletes (30 seconds)

1. Go to http://localhost:3000/players
2. See athlete profile (Sarah Johnson)
3. Check her 2 approved achievements

### 4️⃣ Try Live Scorecard (1 minute)

1. Go to http://localhost:3000/scorecard
2. Click "Start" timer
3. Click + buttons to add scores
4. Try declaring a winner

### 5️⃣ Login as Admin (2 minutes)

1. Go to http://localhost:3000/auth/login
2. Email: `admin@demo.com`
3. Password: `password123`
4. Click "Sign In"
5. Explore admin dashboard
6. Check platform statistics

---

## 🔑 All Demo Accounts

| Role           | Email                | Password    | What to Test                         |
| -------------- | -------------------- | ----------- | ------------------------------------ |
| **Admin**      | admin@demo.com       | password123 | Approve items, view analytics        |
| **Dojo Owner** | owner@demo.com       | password123 | Manage dojo, students, attendance    |
| **Player**     | player@demo.com      | password123 | View profile and achievements        |
| **Coach**      | coach@demo.com       | coach123    | Create tournaments, manage training |
| **Seller**     | seller@demo.com      | password123 | Manage marketplace products          |
| **Parent**     | parent@demo.com      | password123 | View linked student accounts         |
| **Student**    | maya.carter@demo.com | password123 | Open the student dashboard           |
| **Referee**    | referee@demo.com     | password123 | Open the referee dashboard           |
| **Judge**      | judge@demo.com       | password123 | Open the judge dashboard             |

---

## 📸 What You'll See

### Home Page

- Hero section with "Welcome to Dojo Republic"
- Feature cards (Find Dojos, Tournaments, Athletes, Marketplace)
- Platform statistics (500+ Dojos, 10,000+ Athletes)
- Call-to-action buttons

### Dojos Page

- Search bar and filters
- 3 dojos listed:
  - Dragon Warrior Karate Dojo (New York)
  - Phoenix Martial Arts Academy (Los Angeles)
  - Tiger Strike Karate Center (Chicago)

### Tournaments Page

- 3 upcoming tournaments:
  - Spring Karate Championship 2027 (Boston)
  - Junior Karate League (Miami)
  - Lone Star Karate Invitational (Austin)

### Player Profile

- Sarah Johnson (Black Belt 2nd Dan)
- 2 achievements:
  - National Championship 2024 - Gold
  - State Open 2023 - Silver

### Live Scorecard

- Interactive scoring interface
- Timer
- Player A and Player B cards
- Ippon, Wazaari, Yuko scoring
- Warnings and penalties

---

## ✅ Quick Functionality Checklist

Try these in order:

1. [ ] Open home page
2. [ ] Click "Find a Dojo" button
3. [ ] Filter dojos by "New York"
4. [ ] Click on "Dragon Warrior Karate Dojo"
5. [ ] Go to Tournaments
6. [ ] Click on "Spring Championship"
7. [ ] Visit Live Scorecard
8. [ ] Add some scores
9. [ ] Go to Login page
1. [ ] Login as admin (admin@demo.com / password123)
1. [ ] Check admin dashboard
1. [ ] Logout (top right corner)

**Estimated Time: 5 minutes**

---

## 🎯 What Makes This Special

✅ **Fully Functional** - Everything works
✅ **Beautiful UI** - Professional design with TailwindCSS
✅ **Demo Fixtures** - Seeded fictional users and sample records
✅ **9 User Roles** - Different experiences for each
✅ **Live Scoring** - Interactive karate scorecard
✅ **Admin Approval** - Content moderation workflow
✅ **E-commerce Ready** - Marketplace included
✅ **Mobile Responsive** - Works on all devices

---

## 💡 Quick Tips

1. **Start with Admin Login** - See the most features
2. **Try the Scorecard** - It's fun and interactive
3. **Browse All Pages** - See the complete system
4. **Test Mobile View** - Resize browser window
5. **Create Test Data** - Register new accounts, create dojos

---

## 🚀 Production Build and Start

Configure `MONGODB_URI` in the deployment environment, then build and start:

```bash
npm run build
npm start
```

For Vercel, import the repository, configure `MONGODB_URI` in Project
Environment Variables, and deploy. Seed a separate demo database first if you
want the fictional sample records available.

## 🚀 Next Steps

After exploring:

1. **Review Code Structure** - Check `app/`, `components/`, `lib/`
2. **Read API Docs** - See API_DOCUMENTATION.md
3. **Check Deployment Guide** - See DEPLOYMENT.md
4. **Plan Customization** - What features to modify
5. **Consider Production** - Database migration, payments, etc.

---

## 🆘 Need Help?

**Server Not Running?**

```bash
npm run dev
```

**Need Fresh Data?**

```bash
npm run seed
npm run dev
```

**Refresh Local Demo Fixtures**

```bash
npm run seed
```

**Refresh the MongoDB Demo Data**

```bash
npm run seed:mongodb
```

This clears and repopulates the collections managed by the demo seeder. Use
only with a disposable/demo database; it will replace data in those collections.

---

## 🎊 That's It!

You now have a complete martial arts platform running locally!

**Current Status:**

- ✅ Server running on http://localhost:3000
- ✅ Database seeded with demo data
- ✅ All features functional
- ✅ Ready to use and test

**Enjoy exploring Dojo Republic!** 🥋🏆

---

**Quick Links:**

- 🏠 Home: http://localhost:3000/
- 👤 Login: http://localhost:3000/auth/login
- 📊 Admin (after login): http://localhost:3000/admin
- 🎯 Scorecard: http://localhost:3000/scorecard
