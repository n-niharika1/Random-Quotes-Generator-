# Random Quote Generator

A beautiful, interactive React frontend application for discovering, filtering, and saving inspiring quotes. Built with React, Vite, and Streamlit.

## 🚀 Features

- **Random Quote Display**: Get random quotes with beautiful animations
- **Category Filtering**: Filter quotes by Success, Motivation, Technology, Life, and Education
- **Search Functionality**: Search quotes and authors instantly
- **Favorites**: Save and manage your favorite quotes in localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Glass Morphism UI**: Modern design with backdrop blur effects
- **Dark Theme**: Easy on the eyes with a beautiful dark aesthetic

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Harsh-maker007/Random-Quote-Generator.git
cd Random-Quote-Generator
```

### 2. Install Dependencies

**Frontend (Node.js)**
```bash
npm install
```

**Backend (Python)**
```bash
pip install -r requirements.txt
```

### 3. Build the React App
```bash
npm run build
```

This creates a `dist/` folder with the production-ready build.

### 4. Run with Streamlit
```bash
streamlit run app.py
```

The app will open at `http://localhost:8501`

## 📁 Project Structure

```
Random-Quote-Generator/
├── src/
│   ├── App.jsx              # Main React component
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── quotes.json          # Quote database
├── dist/                    # Built React app (generated)
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json             # Node.js dependencies
├── app.py                   # Streamlit wrapper
├── requirements.txt         # Python dependencies
└── README.md                # This file
```

## 💻 Development

### Development Mode (React)
```bash
npm run dev
```

Runs the Vite dev server with hot module replacement.

### Preview Production Build
```bash
npm run preview
```

## 🎨 Technologies Used

- **React 18.2.0** - UI library
- **Vite 5.2.0** - Build tool & dev server
- **Streamlit 1.38.0** - Web app framework
- **CSS3** - Styling with backdrop filter effects
- **localStorage** - Client-side data persistence

## 📝 Features Breakdown

### Random Quote Generator
- Displays a random quote from the database
- Prevents showing the same quote twice in a row
- Works with filtered results

### Category Filter
- Dynamically extracts categories from quotes
- Includes "All" option to view all quotes
- Color-coded badges for each category

### Search
- Real-time search across quote text and author names
- Case-insensitive matching
- Works in combination with category filter

### Favorites System
- Save quotes to localStorage
- Persists across sessions
- Visual indicator for favorited quotes
- Quick access to all saved quotes

## 🎯 Usage

1. **Browse Quotes**: Click "New Quote" to see random quotes
2. **Filter by Category**: Use the category dropdown to narrow results
3. **Search**: Type in the search box to find specific quotes
4. **Add to Favorites**: Click the star icon to save quotes
5. **View Matching Quotes**: See all quotes matching your filters in the sidebar
6. **Manage Favorites**: View, select, and remove saved quotes

## 📱 Responsive Design

The app is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (920px - 1200px)
- Mobile (< 640px)

## 🚀 Deployment

### Deploy to Streamlit Cloud

1. Push your code to GitHub
2. Go to [Streamlit Cloud](https://streamlit.io/cloud)
3. Connect your GitHub repository
4. Select the branch and `app.py` as the main file
5. Deploy!

### Environment Setup
Create a `.streamlit/config.toml` file:
```toml
[client]
showErrorDetails = true

[logger]
level = "info"

[server]
headless = true
```

## 🐛 Troubleshooting

### Build fails
- Clear node_modules: `rm -rf node_modules` and run `npm install`
- Check Node.js version: `node --version`

### Streamlit shows black screen
- Ensure `dist/` folder exists: Run `npm run build`
- Check Python path to Streamlit: Run `which streamlit`

### Quotes not loading
- Check `src/quotes.json` exists and is valid JSON
- Verify the React build includes the quotes file

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Harsh Shandilya**
- GitHub: [@Harsh-maker007](https://github.com/Harsh-maker007)

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!

---

**Enjoy discovering inspiring quotes! 🎯✨**
