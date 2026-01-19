# StrollUP - Travel Agency Super App Platform

> A modern, all-in-one SaaS platform that empowers travel agencies to build websites, manage customers, automate operations, and gain AI-powered insights — all from a single dashboard.

![Built with React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38B2AC?logo=tailwind-css)

---

## 🌟 What is StrollUP?

StrollUP is a comprehensive digital platform designed specifically for travel agencies. It eliminates the need for multiple fragmented tools by providing:

- **🌐 Website Builder** - Create beautiful travel websites without code
- **👥 CRM** - Manage customers, bookings, and communication
- **⚙️ Admin Panel** - Control offers, trips, payments, and staff
- **🧠 AI Analytics** - Smart insights to grow revenue and optimize operations

Perfect for solo agents to large agencies looking to transform their business digitally.

---

## 🚀 Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS v4.1.18
- **UI Components:** shadcn/ui
- **Icons:** lucide-react
- **Database:** Supabase (PostgreSQL)
- **Package Manager:** pnpm

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** (v8 or higher) - Install with: `npm install -g pnpm`
- **Supabase Account** - [Sign up here](https://supabase.com)

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd strollup-mvp
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all required packages including:
- React and React DOM
- Vite and build tools
- Tailwind CSS
- shadcn/ui components
- Supabase client
- All TypeScript dependencies

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
# Create .env file
touch .env
```

Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_anon_key
```

**To get your Supabase credentials:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public key**

### 4. Set Up Database

Create the `leads` table in your Supabase database:

1. Open **SQL Editor** in your Supabase Dashboard
2. Run this SQL:

```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  agency_size TEXT,
  country TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON leads
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON leads
  FOR SELECT TO authenticated USING (true);
```

Alternatively, you can use the provided migration file:
```bash
# Copy content from supabase-migration.sql and run it in Supabase SQL Editor
```

### 5. Start Development Server

```bash
pnpm dev
```

The app will be available at: **http://localhost:5173**

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm lint` | Run ESLint to check code quality |

---

## 🏗️ Project Structure

```
strollup-mvp/
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   └── ...
│   │   ├── LandingPage.tsx   # Main landing page container
│   │   ├── Navbar.tsx        # Navigation bar
│   │   ├── Hero.tsx          # Hero section
│   │   ├── Features.tsx      # Platform overview
│   │   ├── WhyStrollUP.tsx   # Value proposition
│   │   ├── HowItWorks.tsx    # 4-step process
│   │   ├── Pricing.tsx       # Pricing tiers
│   │   ├── LeadForm.tsx      # Lead capture form
│   │   ├── CallToAction.tsx  # Final CTA section
│   │   └── Footer.tsx        # Footer
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── utils/
│   └── supabase.ts           # Supabase client config
├── public/                   # Static assets
├── .env                      # Environment variables (create this)
├── components.json           # shadcn/ui config
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite config
└── README.md                 # This file
```

---

## 🎨 Features

### Landing Page Sections

1. **Navbar** - Sticky navigation with logo, links, and CTA
2. **Hero** - Compelling headline and dual CTAs
3. **Platform Overview** - 4 feature cards showcasing the platform
4. **Why StrollUP** - Value propositions and pain points
5. **How It Works** - Visual 4-step process
6. **Pricing** - 3 pricing tiers (Starter, Growth, Enterprise)
7. **Lead Form** - Contact form with Supabase integration
8. **Call to Action** - Final conversion section
9. **Footer** - Links and copyright

### Lead Capture Form

- **Fields:** Name, Email, Company, Agency Size, Country, Message
- **Validation:** Client-side required field validation
- **Database:** Auto-saves to Supabase `leads` table
- **UX:** Loading states, success/error messages, auto-reset
- **Design:** Professional SaaS styling, fully responsive

### Design System

- **Color Scheme:** Blue primary (#2563EB) with gray neutrals
- **Typography:** Responsive text sizing (4xl → 7xl for hero)
- **Components:** shadcn/ui with custom styling
- **Responsive:** Mobile-first design, breakpoints at sm/md/lg
- **Animations:** Smooth transitions, hover effects, loading spinners

---

## 🔧 Configuration

### Tailwind CSS

Tailwind v4 is configured via `@tailwindcss/vite` plugin. Custom utilities are in `src/index.css`.

### shadcn/ui

Components are configured in `components.json`. To add new components:

```bash
npx shadcn@latest add <component-name>
```

### TypeScript

Strict mode enabled with path aliases configured (`@/` → `src/`).

---

## 🌐 Deployment

### Build for Production

```bash
pnpm build
```

Output will be in the `dist/` folder.

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel settings
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Build command: `pnpm build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy!

### Other Platforms

StrollUP works on any static hosting platform:
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages
- Render
- Railway

---

## 📊 Database Schema

### Leads Table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `full_name` | TEXT | Contact's full name |
| `email` | TEXT | Contact's email address |
| `company_name` | TEXT | Travel agency name |
| `agency_size` | TEXT | Agency size (Solo, 2-5, 6-20, 20+) |
| `country` | TEXT | Contact's country |
| `message` | TEXT | Optional message from contact |
| `created_at` | TIMESTAMPTZ | Submission timestamp |

### Accessing Lead Data

**View in Supabase Dashboard:**
- Go to **Table Editor** → **leads**

**Query with SQL:**
```sql
SELECT * FROM leads ORDER BY created_at DESC;
```

**Export to CSV:**
- Click "Export" button in Table Editor

---

## 🔒 Security

### Row Level Security (RLS)

The `leads` table has RLS enabled with these policies:

- **Public Inserts:** Anyone can submit the form (anonymous users)
- **Authenticated Reads:** Only authenticated users can view leads

### Environment Variables

Never commit `.env` files to version control. The `.gitignore` file is configured to exclude them.

### API Keys

Use Supabase's `anon` key for the frontend. Never expose the `service_role` key in client-side code.

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@/components/...'"

**Solution:** Ensure TypeScript path aliases are configured in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: Supabase connection errors

**Solution:** 
1. Check your `.env` file has correct credentials
2. Verify Supabase project is active
3. Check browser console for detailed errors

### Issue: Form submissions not saving

**Solution:**
1. Verify `leads` table exists in Supabase
2. Check RLS policies are configured correctly
3. Ensure `anon` key has insert permissions

### Issue: Styles not loading

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
pnpm install
pnpm dev
```

---

## 📝 Customization

### Change Brand Colors

Edit `src/index.css` to update the blue theme:

```css
/* Change primary blue color */
.bg-blue-600 { background-color: your-color; }
```

### Modify Content

All content is in component files under `src/components/`. Update text, pricing, features, etc. directly in the components.

### Add New Sections

1. Create new component in `src/components/`
2. Import and add to `LandingPage.tsx`
3. Follow existing component patterns

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🆘 Support

For issues and questions:
- Open an issue on GitHub
- Contact support team
- Check Supabase documentation for database issues

---

## 🎉 Acknowledgments

- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Open source Firebase alternative
- **Lucide** - Beautiful icon library

---

**Built with ❤️ for the travel industry**

© 2026 StrollUP. All rights reserved.

