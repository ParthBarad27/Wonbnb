# **Wanderlust - Full Stack Travel Listing Platform**

![Wanderlust](https://img.shields.io/badge/Wanderlust-Travel%20Listing%20Platform-ff5a5f?style=for-the-badge&logo=airbnb&logoColor=white)

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.0-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.0-880000?style=flat-square&logo=mongoose&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-3.1-B4CA65?style=flat-square&logo=ejs&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![Passport](https://img.shields.io/badge/Passport.js-Auth-34E27A?style=flat-square&logo=passport&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Storage-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![Mapbox](https://img.shields.io/badge/Mapbox-Maps-000000?style=flat-square&logo=mapbox&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-Uploads-FF6B35?style=flat-square&logo=files&logoColor=white)
![Joi](https://img.shields.io/badge/Joi-Validation-0080FF?style=flat-square&logo=javascript&logoColor=white)
![Session](https://img.shields.io/badge/Sessions-MongoDB-13AA52?style=flat-square&logo=mongodb&logoColor=white)

**A comprehensive full-stack travel listing platform with user authentication, property management, reviews, and interactive maps powered by Mapbox.**

[Live Demo](#) • [Report Bug](https://github.com/yourusername/wanderlust/issues/new?template=bug_report.md) • [Request Feature](https://github.com/yourusername/wanderlust/issues/new?template=feature_request.md)

---

## **🌟 Features**

### **Core Features**

- **User Authentication** - Secure signup/login with Passport.js and session management
- **Listing Management** - Create, read, update, and delete travel listings with ownership controls
- **Image Uploads** - Cloudinary integration for seamless image storage and optimization
- **Interactive Maps** - Mapbox GL JS integration with geocoding for location visualization
- **Review System** - Community reviews with author ownership and validation
- **Flash Messaging** - Real-time user feedback for actions and errors

### **Advanced Features**

- **Persistent Sessions** - MongoDB-backed sessions with connect-mongo
- **Server-side Validation** - Joi schemas for robust data validation
- **Authorization Checks** - Middleware-based ownership verification for listings and reviews
- **Responsive Design** - Bootstrap 5 for mobile-friendly interfaces
- **EJS Layouts** - Template inheritance with ejs-mate for maintainable views
- **Error Handling** - Centralized error handling with custom ExpressError class

---

## **🏗️ Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Views)                          │
│            EJS Templates + Bootstrap 5 + Mapbox              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Node.js Server)                    │
│        Express 5 + Passport.js + Mongoose + Sessions        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Database & Storage                      │
│         MongoDB Atlas + Cloudinary + Mapbox Geocoding       │
└─────────────────────────────────────────────────────────────┘
```

---

## **🛠️ Tech Stack**

| **Layer** | **Technologies** |
|-----------|------------------|
| **Backend** | Express.js 5, Node.js 22.x, Passport.js, Passport-local-mongoose |
| **Database** | MongoDB Atlas, Mongoose ODM, connect-mongo (sessions) |
| **Frontend** | EJS, ejs-mate, Bootstrap 5, Mapbox GL JS |
| **File Storage** | Multer, multer-storage-cloudinary, Cloudinary |
| **Maps & Geocoding** | Mapbox GL JS, @mapbox/mapbox-sdk |
| **Validation** | Joi schemas, express-session |

---

## **📁 Project Structure**

```
wanderlust/
├── app.js                  # Express application bootstrap
├── routes/
│   ├── listing.js          # Listing CRUD routes
│   ├── review.js           # Review routes
│   └── user.js             # Authentication routes
├── controllers/
│   ├── listings.js         # Listing controller logic
│   ├── reviews.js          # Review controller logic
│   └── users.js            # User/auth controller logic
├── models/
│   ├── listing.js          # Listing mongoose model
│   ├── review.js           # Review mongoose model
│   └── user.js             # User mongoose model (with passport)
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Main layout template
│   ├── listings/
│   │   ├── index.ejs       # All listings
│   │   ├── show.ejs        # Single listing with map
│   │   ├── new.ejs         # Create listing form
│   │   └── edit.ejs        # Edit listing form
│   ├── users/
│   │   ├── signup.ejs      # Registration form
│   │   └── login.ejs       # Login form
│   └── includes/
│       ├── navbar.ejs      # Navigation bar
│       ├── flash.ejs       # Flash messages
│       └── footer.ejs      # Footer
├── public/
│   ├── css/                # Custom stylesheets
│   └── js/
│       └── map.js          # Mapbox map initialization
├── utils/
│   ├── ExpressError.js     # Custom error class
│   ├── wrapAsync.js        # Async error wrapper
│   └── middleware.js       # Custom middleware (auth, validation)
├── init/
│   └── index.js            # Database seeding script
└── schemas.js              # Joi validation schemas
```

---

## **🚀 Quick Start**

### **Prerequisites**

- Node.js v18+ (tested on v22.x)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Mapbox account

### **Installation**

```bash
# Clone the repository
git clone https://github.com/yourusername/wanderlust.git
cd wanderlust

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials (see Environment Variables section)

# Start the development server
npm start
# Or with nodemon for auto-restart
nodemon app.js
```

Server runs at `http://localhost:8080`

---

## **🔐 Environment Variables**

Create a `.env` file in the root directory:

```env
# MongoDB Atlas Connection
# If password has special characters, URL-encode them
# Example: P@ss#w/rd! → P%40ss%23w%2Frd%21
ATLASDB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# Session Secret (use a strong random string)
SECRET=your_super_secret_session_key

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox Configuration
MAP_TOKEN=your_mapbox_public_access_token
```

### **Important Notes:**

- **MongoDB Password Encoding**: If your MongoDB password contains special characters (`@`, `#`, `/`, etc.), you must URL-encode them:
  - `@` → `%40`
  - `#` → `%23`
  - `/` → `%2F`
  - `!` → `%21`
- **Session Secret**: Use a strong, random string and never commit it to version control
- **Mapbox Token**: Use your public token (starts with `pk.`)

---

## **🔌 API Routes**

| **Route** | **Method** | **Description** | **Auth Required** |
|-----------|------------|-----------------|-------------------|
| `/listings` | GET | View all listings | No |
| `/listings/new` | GET | New listing form | Yes |
| `/listings` | POST | Create new listing | Yes |
| `/listings/:id` | GET | View single listing with map | No |
| `/listings/:id/edit` | GET | Edit listing form | Yes (Owner) |
| `/listings/:id` | PUT | Update listing | Yes (Owner) |
| `/listings/:id` | DELETE | Delete listing | Yes (Owner) |
| `/listings/:id/reviews` | POST | Add review to listing | Yes |
| `/listings/:id/reviews/:reviewId` | DELETE | Delete review | Yes (Author) |
| `/signup` | GET/POST | User registration | No |
| `/login` | GET/POST | User login | No |
| `/logout` | GET | User logout | Yes |

---

## **💾 Database Models**

### **Listing Model**
```javascript
{
  title: String,
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  geometry: {
    type: { type: String },
    coordinates: [Number]
  },
  owner: ObjectId (ref: User),
  reviews: [ObjectId] (ref: Review)
}
```

### **Review Model**
```javascript
{
  comment: String,
  rating: Number (1-5),
  author: ObjectId (ref: User),
  createdAt: Date
}
```

### **User Model**
```javascript
{
  email: String,
  username: String,
  // password handled by passport-local-mongoose
}
```

---

## **🗺️ Mapbox Integration**

### **Features:**
- **Geocoding**: Automatically converts location strings to coordinates when creating listings
- **Interactive Maps**: Displays listing location on the show page
- **Fallback**: Uses default coordinates if geocoding fails

### **Map Display:**
Location is displayed using Mapbox GL JS on the listing detail page. The map is initialized in `public/js/map.js` using coordinates stored in the listing's `geometry` field.

---

## **🖼️ Image Upload Flow**

1. User selects image via file input in listing form
2. Multer intercepts the upload
3. multer-storage-cloudinary streams directly to Cloudinary
4. Cloudinary returns URL and filename
5. URL and filename stored in MongoDB listing document

**Supported Formats**: JPEG, PNG, WebP  
**Max File Size**: Configured in Cloudinary settings

---

## **🔒 Authentication & Authorization**

### **Authentication (Passport.js)**
- Local strategy with username/password
- Passwords hashed using passport-local-mongoose
- Sessions stored in MongoDB with 7-day expiry
- Secure httpOnly cookies

### **Authorization Middleware**
- `isLoggedIn`: Checks if user is authenticated
- `isOwner`: Verifies user owns the listing before edit/delete
- `isReviewAuthor`: Verifies user authored the review before delete

---

## **✅ Validation**

### **Server-side Validation (Joi)**
All user inputs validated using Joi schemas before database operations:

- **Listing Schema**: Validates title, description, price, location, country, image URL
- **Review Schema**: Validates rating (1-5) and comment text

Validation errors trigger flash messages and prevent invalid data storage.

---

## **⚠️ Error Handling**

- **WrapAsync**: Wraps async route handlers to catch errors
- **ExpressError**: Custom error class with statusCode and message
- **Error Middleware**: Centralized error handling in `app.js`
- **Flash Messages**: User-friendly error feedback via connect-flash

---

## **🤝 Contributing**

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Good First Issues**
- Add search functionality for listings
- Implement listing filters (price, location, rating)
- Add user profile pages
- Improve mobile responsiveness
- Add more map features (markers, popups)

---

## **🐛 Common Issues & Solutions**

### **MongoDB Connection Error**
**Problem**: `MongooseError: Invalid connection string`  
**Solution**: URL-encode special characters in your MongoDB password

### **Map Not Displaying**
**Problem**: Blank map on listing page  
**Solution**: 
- Verify `MAP_TOKEN` is set in `.env`
- Check browser console for Mapbox errors
- Ensure listing has valid `geometry.coordinates`

### **Image Upload Fails**
**Problem**: Images not uploading to Cloudinary  
**Solution**:
- Verify Cloudinary credentials in `.env`
- Check multer field name matches form input name (`listing[image]`)
- Ensure Cloudinary account has sufficient storage

### **Session Not Persisting**
**Problem**: User logged out after server restart  
**Solution**: Sessions are stored in MongoDB and should persist. Check:
- `ATLASDB_URL` is correct
- MongoDB Atlas cluster is running
- connect-mongo is properly configured

---

## **🚀 Deployment**

### **Recommended Platforms:**
- **Render**: Easy Node.js deployment with free tier
- **Railway**: Simple deployment with MongoDB integration
- **Heroku**: Classic platform with add-ons support
- **DigitalOcean App Platform**: Scalable with managed databases

### **Pre-deployment Checklist:**
- [ ] Set `NODE_ENV=production`
- [ ] Configure all environment variables on hosting platform
- [ ] Set `secure: true` on session cookies (requires HTTPS)
- [ ] Enable CORS if needed
- [ ] Set up MongoDB Atlas IP whitelist for production server
- [ ] Test all routes in production environment

---

## **📊 Scripts**

```bash
# Start server
npm start
# or
node app.js

# Development with auto-restart (requires nodemon)
npm run dev
# or
nodemon app.js

# Database seeding (if init script exists)
node init/index.js
```

---

## **🔐 Security Notes**

- Never commit `.env` to version control (add to `.gitignore`)
- Use strong, random `SECRET` for session encryption
- Rotate secrets if compromised
- Enable HTTPS in production (set `secure: true` on cookies)
- Keep dependencies updated (`npm audit` regularly)
- Sanitize user inputs (Joi schemas help prevent injection)
- Implement rate limiting for auth routes (consider express-rate-limit)

---

## **📄 License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **🙏 Acknowledgments**

- Express.js and Node.js communities
- Mapbox for mapping services
- Cloudinary for image hosting
- MongoDB for database solutions
- Bootstrap team for UI framework

---

## **📞 Support**

- 📧 Create an issue for bugs or feature requests
- 💬 Check existing issues before creating new ones
- ⭐ Star this repo if you find it helpful!

---

**Built with ❤️wonbnb**

![GitHub stars](https://img.shields.io/github/stars/ParthBarad27/Wonbnb)
![GitHub forks](https://img.shields.io/github/forks/ParthBarad27/Wonbnb)
