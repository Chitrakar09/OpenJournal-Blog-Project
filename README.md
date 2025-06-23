# ✨ OpenJournal — Where Ideas Live

**Live Demo:** [openjournal.netlify.app](https://openjournal.netlify.app)

OpenJournal is more than just a blog platform — it’s your creative space. Built with **React.js** and powered by **Appwrite**, it lets you write, edit, and manage your stories in a clean and intuitive interface. Whether you’re documenting your thoughts, projects, or tutorials, OpenJournal is designed to make your writing experience smooth and enjoyable.

---

## 🧭 Table of Contents

- [✨ About the Project](#-about-the-project)
- [🚀 Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [⚙️ Getting Started](#-getting-started)
- [📦 Installation & Setup](#-installation--setup)
- [💻 Usage](#-usage)
- [🚢 Deployment](#-deployment)
- [🎨 Customization](#-customization)
- [🔗 Connect With Me](#-connect-with-me)
- [📄 License](#-license)

---

## ✨ About the Project

OpenJournal started as a passion project to build something real while learning modern full-stack development. I wanted a space where writing doesn’t feel like a chore but a joy — and that’s what OpenJournal became.

It’s lightweight yet powerful, clean yet expressive. You can write blog posts, style them using a rich text editor, manage them easily, and even upload images for that perfect aesthetic. Everything syncs with Appwrite’s secure backend.

OpenJournal isn’t just my project. It’s yours too — clone it, customize it, and tell your stories your way.

---

## 🚀 Features

- 🔐 **User Auth:** Sign up, log in, log out — securely
- 📝 **Rich Blog Editor:** Write beautiful posts using TinyMCE
- 📸 **Image Uploads:** Add visuals to your posts via Appwrite’s storage
- 🧾 **Full CRUD:** Create, Read, Update, Delete posts effortlessly
- 🧠 **User Dashboard:** Only see & manage your own posts
- ⚡ **Fast UI:** Built with Tailwind CSS and optimized for speed
- 📱 **Responsive Design:** Mobile-friendly and good-looking everywhere
- 🔒 **Protected Routes:** Authenticated users only where it matters

---

## 🛠 Tech Stack

**Frontend:**
- React.js (Vite)
- Redux Toolkit
- React Router
- Tailwind CSS

**Backend:**
- Appwrite (Auth, Database, Storage)

**Other Libraries:**
- `@tinymce/tinymce-react` – for rich text editing
- `react-hook-form` – smooth form handling
- `react-spinners` – for beautiful loaders
- FontAwesome – icons that shine

---

## 📁 Folder Structure

```bash
src/
├── App.jsx
├── main.jsx
├── index.css
├── appwrite/
│   ├── auth.js
│   └── databaseConfig.js
├── components/
│   ├── Buttons/
│   ├── Container/
│   ├── Form/
│   ├── Header/
│   ├── InputField/
│   ├── Loader/
│   ├── PreviewCard/
│   ├── RTE/
│   └── Select/
├── config/
│   └── config.js
├── features/
│   └── auth/
│       └── authSlice.js
├── Pages/
│   ├── AddPost.jsx
│   ├── AllPost.jsx
│   ├── EditPost.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Post.jsx
│   ├── Signup.jsx
│   ├── InitialPage.jsx
│   └── index.js
└── store/
    └── store.js
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- A running Appwrite instance (self-hosted or cloud)

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/OpenJournal.git
cd OpenJournal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Rename `.envSample` → `.env` and add your Appwrite credentials:

```env
VITE_APPWRITE_API_ENDPOINT=your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID=your-collection-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
```

---

## 💻 Usage

### 🧪 Development Server

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

### 🛠 Production Build

```bash
npm run build
```

### 🔍 Linting

```bash
npm run lint
```

---

## 🧭 Navigation

- `/signup` – Create a new account
- `/login` – Log in to your dashboard
- `/addPost` – Write and publish a new blog
- `/allPost` – See all your posts
- `/post/:slug` – View single post (with edit/delete if you own it)

---

## 🚢 Deployment

This project is production-ready and deploys easily with Netlify or any static hosting platform.

- Uses **Vite** for fast builds
- Includes `public/_redirects` for SPA routing support on Netlify

---

## 🎨 Customization

Want to make it yours? Here’s how:

- **Branding & Theme:** Update colors, logos, and icons in components and `tailwind.config.js`
- **Editor Settings:** Customize TinyMCE behavior from `RTE/index.jsx`
- **Add Features:** It’s your journal — enhance it however you like!

---

## 🔗 Connect With Me

Hey, I’m **Pratyush Chitrakar** — a CSIT student at TU and a passionate web developer.

Let’s connect:

- 🌐 Portfolio (coming soon!)
- 📫 Email: [chitrakarpratyush@gmail.com](mailto:chitrakarpratyush@gmail.com)
- 💼 LinkedIn: [@pratyush-chitrakar](https://www.linkedin.com/in/pratyush-chitrakar/)
- 💻 GitHub: [@Chitrakar09](https://github.com/Chitrakar09)

---

## 📄 License

**MIT License** — free to use, modify, and share.

---

**Made with ❤️ using React.js + Appwrite + a lot of midnight coffee.**

> _"Write it. Share it. Own it." — OpenJournal_
