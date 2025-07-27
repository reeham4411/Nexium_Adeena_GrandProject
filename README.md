# Serenely 🧠✨

A comprehensive mental health tracking application that helps users monitor their daily mood and receive personalized AI-powered recommendations for better mental wellness.

## 🌟 Features

- **Daily Mood Logging**: Track your emotional state with intuitive mood selection
- **AI-Powered Recommendations**: Get personalized mental health suggestions powered by Gemini AI
- **Interactive Dashboard**: Visualize your mood patterns and access all your data
- **Secure Authentication**: Magic link authentication for seamless and secure login
- **Journal Entries**: Document your thoughts and feelings alongside mood tracking
- **Data Persistence**: All your progress is safely stored and accessible anytime

## 🏗️ Tech Stack

### Frontend

- **Next.js** - React framework for production
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform

### Backend

- **Next.js API Routes** - Serverless API endpoints (`app/api/`)
- **Supabase** - Authentication and structured data storage
- **MongoDB** - Document-based data storage for logs and analytics

### AI & Automation

- **N8N** - Workflow automation platform (hosted on Railway)
- **Gemini API** - AI recommendation engine
- **Railway** - N8N hosting platform

## 📁 Project Structure

```
serenely/
├── app/
│   ├── api/                 # Backend API routes
│   ├── components/          # Reusable React components
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard page
│   ├── login/
│   │   └── page.tsx        # Login page
│   └── ...                 # Other app pages
├── public/                 # Static assets
├── README.md
└── package.json
```

## 🗄️ Database Schema

### MongoDB Collections

#### `mood_logs`

```javascript
{
  user_id: ObjectId,
  mood_rating: Number,
  date: Date,
  email: String,

}
```

#### `journal_entries`

```javascript
{
  user_id: ObjectId,
  note: String,
  email: String,
  date: Date,

}
```

#### `ai_analysis_logs`

```javascript
{
  user_id: ObjectId,
  ai_analysis: Object,
  note: Object,
  date: Date
}
```

### Supabase Tables

#### `auth.users`

- Built-in Supabase authentication table
- Handles user registration and magic link authentication

#### `ai_recommendations`

```sql
CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  mood_keywords TEXT[],
  recommendations TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase account
- MongoDB database
- Railway account (for N8N)
- Google Cloud account (for Gemini API)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/serenely.git
   cd serenely
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # MongoDB Configuration
   MONGODB_URI=your_mongodb_connection_string

   # Gemini API
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Database Setup**

   **Supabase:**

   - Run the SQL commands to create the `ai_recommendations` table
   - Enable Row Level Security (RLS) policies

   **MongoDB:**

   - Ensure your MongoDB instance is running
   - Collections will be created automatically on first use

5. **N8N Workflow Setup**

   - Deploy N8N on Railway
   - Import the mood analysis workflow
   - Configure Gemini API integration
   - Set up webhook endpoints

6. **Run the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Supabase Authentication

Enable magic link authentication in your Supabase dashboard:

- Go to Authentication → Settings
- Enable "Enable email confirmations"
- Configure email templates for magic links

### N8N Workflow

The N8N workflow handles:

- Processing mood data from the frontend
- Analyzing patterns using Gemini AI
- Storing recommendations back to Supabase
- Triggering notifications for users

## 📊 Key Features Explained

### Magic Link Authentication

Users receive secure login links via email, eliminating the need for passwords while maintaining security.

### AI Recommendations

The Gemini AI analyzes mood patterns, journal entries, and historical data to provide personalized mental health recommendations.

### Mood Tracking Dashboard

Interactive visualizations show mood trends over time, helping users identify patterns and triggers.

## 🚀 Deployment

### Frontend (Vercel)

```bash
npm run build
vercel --prod
```

### Backend APIs

API routes are automatically deployed with the Next.js application on Vercel.

### N8N (Railway)

Deploy your N8N workflows on Railway for reliable automation processing.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ for better mental health awareness and support**
