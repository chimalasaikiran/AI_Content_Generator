# AI Content Generator

A professional, full-stack capable AI-powered web application designed to streamline content creation. Built with React and powered by the Google Gemini API, this tool generates high-quality social media captions, blog ideas, product descriptions, and email templates instantly.

<img width="1919" height="1047" alt="image" src="https://github.com/user-attachments/assets/c1b97b8f-870c-4d46-8908-76c300b67574" />



## 🚀 Features

-   **Multi-Format Generation**: Specialized prompts for 4 key content types:
    -   📱 Social Media Captions (Instagram, Twitter/X, LinkedIn)
    -   📝 Blog Post Ideas & Outlines
    -   🛍️ Product Descriptions
    -   ✉️ Professional Email Templates
-   **Smart AI Integration**: Leverages Google's **Gemini 2.5 Flash** model for fast, creative, and context-aware responses.
-   **Modern UI/UX**:
    -   Clean, responsive interface built with **Tailwind CSS**.
    -   **Dark Mode** support with persistent preference.
    -   Real-time character counting and input validation.
-   **Productivity Tools**:
    -   **History**: Automatically saves recent generations to local storage.
    -   **Markdown Support**: Renders generated content with proper formatting (bolding, lists, etc.).
    -   **One-Click Copy**: Easily copy generated text to the clipboard.
    -   **Regenerate**: Quickly iterate on content with the same settings.

## 🛠️ Technical Stack

-   **Frontend Library**: React 19 (Functional Components & Hooks)
-   **Styling**: Tailwind CSS (Dark mode enabled)
-   **Icons**: Lucide React
-   **AI Engine**: Google GenAI SDK (`@google/genai`)
-   **Markdown Rendering**: `react-markdown`
-   **State Management**: React State + LocalStorage (for history & theme)

## ⚙️ Configuration

This application requires a Google Gemini API Key to function.

1.  Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
2.  The application expects the API key to be available in the environment as `process.env.API_KEY`.

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ai-content-generator.git
    cd ai-content-generator
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run Development Server**
    ```bash
    npm start
    ```

## 📖 Usage Guide

1.  **Select Content Type**: Choose from the available cards (Social Media, Blog, Product, Email).
2.  **Enter Prompt**: Describe your topic in the text area (e.g., "A summer sale for hiking boots").
3.  **Generate**: Click the "Generate Content" button.
4.  **Review & Use**:
    -   Read the formatted output in the results panel.
    -   Click **Copy** to save to clipboard.
    -   Click **Regenerate** if you want a different variation.
5.  **History**: Access previous generations from the history list below or on the side (desktop).

## 🔒 Privacy & Safety

-   **Client-Side History**: Generation history is stored locally in your browser (`localStorage`) and is not sent to any external database.
-   **Safety Filters**: The AI model includes safety settings to prevent the generation of harmful or inappropriate content.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
