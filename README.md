# Modern Portfolio Website

A sleek, responsive portfolio website with premium UI/UX design, featuring video streaming capabilities, dark mode, and smooth animations.

## ✨ Features

### 🎨 Design & UI/UX
- **Modern Glassmorphism Effects** - Beautiful translucent elements with backdrop blur
- **Dark/Light Theme Toggle** - Seamless theme switching with localStorage persistence
- **Responsive Design** - Mobile-first approach, works perfectly on all devices
- **Smooth Animations** - Scroll-triggered animations and hover effects
- **Premium Typography** - Inter font family for clean, modern text

### 🎬 Video Streaming
- **Advanced Video Player** - Custom modal with streaming support
- **HLS Support** - Ready for .m3u8 playlist streaming
- **Range Requests** - Efficient video loading with seek support
- **Adaptive Streaming** - Optimized for different connection speeds

### 📱 Sections
1. **Hero Section** - Eye-catching intro with call-to-action buttons
2. **About Me** - Personal background with animated statistics
3. **Projects** - Interactive cards with video previews and detailed modals
4. **Tech Stack** - Organized skill categories with modern icons
5. **Contact** - Functional form with social media links

### 🚀 Performance
- **Lazy Loading** - Images load only when needed
- **Intersection Observer** - Efficient scroll animations
- **Optimized Assets** - Compressed and optimized media files
- **Fast Loading** - Minimal dependencies, maximum performance

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter)
- **Video**: HLS.js for streaming support
- **Server**: Python HTTP server with range request support

## 🚀 Quick Start

### Option 1: Python Server (Recommended)
```bash
# Navigate to the portfolio directory
cd portfolio

# Start the server (Python 3 required)
python server.py
```

### Option 2: Simple HTTP Server
```bash
# Using Python's built-in server
python -m http.server 8000

# Using Node.js (if you have it installed)
npx serve .
```

### Option 3: Live Server (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
├── server.py           # Python server with video streaming
├── README.md           # This file
└── projects/           # Project assets
    ├── 0205.mp4        # Project video 1
    ├── 0805.mp4        # Project video 2
    └── *.png           # Project thumbnails
```

## 🎯 Customization Guide

### 1. Personal Information
Edit the following in `index.html`:
- Name in the hero section
- Job title and description
- About me content
- Contact information
- Social media links

### 2. Projects
Update the `projectsData` array in `script.js`:
```javascript
const projectsData = [
    {
        id: 1,
        title: "Your Project Name",
        description: "Short description",
        thumbnail: "projects/your-thumbnail.png",
        video: "projects/your-video.mp4",
        technologies: ["React", "Node.js", "MongoDB"],
        links: {
            live: "https://your-live-site.com",
            github: "https://github.com/yourusername/repo"
        },
        fullDescription: "Detailed project description..."
    }
];
```

### 3. Skills & Technologies
Modify the skills section in `index.html` to match your tech stack.

### 4. Color Scheme
Customize colors in `styles.css` by updating CSS variables:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #f59e0b;
  --accent-color: #10b981;
  /* ... other colors */
}
```

### 5. Animations
Adjust animation timing and effects in the CSS animations section.

## 🎬 Video Setup

### For Local Videos
1. Place your video files in the `projects/` folder
2. Update the `video` property in `projectsData`
3. Supported formats: MP4, WebM, OGV

### For Streaming Videos
1. Convert videos to HLS format (.m3u8)
2. Update the video URL in `projectsData`
3. The player will automatically detect and use HLS.js

### Video Optimization Tips
- Use H.264 codec for maximum compatibility
- Keep file sizes under 50MB for better loading
- Consider using a CDN for production

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop your portfolio folder to Netlify
2. Or connect your GitHub repository
3. Automatic deployments on every push

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

## 🔧 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements, consider submitting a pull request!

## 📞 Support

If you have any questions or need help customizing your portfolio, feel free to reach out!

---

**Built with ❤️ and modern web technologies**