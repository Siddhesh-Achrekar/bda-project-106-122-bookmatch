# 📚 BookMatch — Collaborative Filtering Book Recommendation System
### Big Data Analytics Project (106–122)

[![React](https://img.shields.io/badge/Frontend-React%2019%20%7C%20TypeScript%20%7C%20Vite-61DAFB?logo=react&logoColor=black)](frontend/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38B2AC?logo=tailwindcss&logoColor=white)](frontend/)
[![Python](https://img.shields.io/badge/Backend-Python%203%20%7C%20scikit--learn-3776AB?logo=python&logoColor=white)](api.py)
[![Streamlit](https://img.shields.io/badge/Streamlit-app.py-FF4B4B?logo=streamlit&logoColor=white)](app.py)
[![Machine Learning](https://img.shields.io/badge/Algorithm-k--Nearest%20Neighbors%20(k--NN)-blueviolet)](#-machine-learning-architecture--algorithm)

---

## 📖 Executive Summary

**BookMatch (BDA Project 106–122)** is an end-to-end Machine Learning book recommendation platform. Built on the **Book-Crossing dataset** containing over **1.1 million ratings across 270,000+ books and 278,000+ users**, the system utilizes **Collaborative Filtering** via **Unsupervised k-Nearest Neighbors (k-NN)** with Euclidean distance to recommend books tailored to reader affinity.

The project features:
1. **Interactive Modern Web Client (`frontend/`)**: Built with **React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion**, featuring dynamic ASCII cover shaders, 3D sliders, liquid chrome effects, reading progress dashboards, and full catalog discovery.
2. **High-Performance Python REST Backend (`api.py`)**: A multi-threaded HTTP server serving real-time collaborative filtering predictions, book metadata caches, and OpenLibrary cover integration.
3. **Streamlit Application (`app.py`)**: A rapid prototype application demonstrating instant interactive recommendation querying.
4. **Interactive Jupyter Notebook (`Books Recommender.ipynb`)**: Complete Big Data pipeline covering data wrangling, threshold filtering, sparse pivot matrix generation, and model serialization.

---

## 🖼️ Application Showcase (Visual Walkthrough)

*Screenshots displayed in ascending alphabetical order of screenshot name:*

### 1. All Books Page 1
> Comprehensive catalog showcasing the entire curated book dataset with real-time text search, genre filters, and publication year sorting.
<p align="center">
  <img src="demo/All%20Books%20Page%201.png" alt="All Books Page 1" width="90%">
</p>

---

### 2. All Books Page 2 (Grid View)
> Dense book grid highlighting book metadata cards, cover artwork, author tags, and instant modal inspect triggers.
<p align="center">
  <img src="demo/All%20Books%20Page%202%20.png" alt="All Books Page 2 (Grid View)" width="90%">
</p>

---

### 3. All Books Page 2 (Catalog Exploration)
> Extended exploration view illustrating catalog responsiveness, quick pagination, and seamless book browsing.
<p align="center">
  <img src="demo/All%20Books%20Page%202.png" alt="All Books Page 2" width="90%">
</p>

---

### 4. Books Recommendation Page 1 (Input & Seed Selection)
> Collaborative filtering query studio: Select any of the 706 dataset titles, view popular seeds (e.g. *1984*, *The Da Vinci Code*), and choose ASCII cover themes.
<p align="center">
  <img src="demo/Books%20Recommendation%20Page%201.png" alt="Books Recommendation Page 1" width="90%">
</p>

---

### 5. Books Recommendation Page 2 (Top 5 Nearest Neighbor Recommendations)
> Real-time inference output displaying the top 5 nearest neighbor book recommendations with computed Euclidean distance metrics and affinity match percentages.
<p align="center">
  <img src="demo/Books%20Recommendation%20Page%202.png" alt="Books Recommendation Page 2" width="90%">
</p>

---

### 6. Books Recommendation Page 3 (Dynamic ASCII Matrix Visualizer)
> Interactive hover effect generating an ASCII text matrix art of each book cover in real-time, customizable across cyan, green, amber, and silver palettes.
<p align="center">
  <img src="demo/Books%20Recommendation%20Page%203.png" alt="Books Recommendation Page 3" width="90%">
</p>

---

### 7. Books Recommendation Page 4 (Detailed Book Inspection)
> Full-screen inspection modal providing comprehensive book details, author profiles, publication years, ISBN identifiers, and instant "Find Similar" triggers.
<p align="center">
  <img src="demo/Books%20Recommendation%20Page%204.png" alt="Books Recommendation Page 4" width="90%">
</p>

---

### 8. Dashboard Page 2 (Reading Progress & Velocity Analytics)
> Personal user dashboard tracking reading velocity, active reading goals, flight status progress cards, and monthly completion targets.
<p align="center">
  <img src="demo/Dashboard%20Page%202.png" alt="Dashboard Page 2" width="90%">
</p>

---

### 9. Dashboard Page 3 (Personalized Shelves & Reading Queue)
> Shelf management displaying current reads, completion percentages, reading streaks, and customized personalized recommendations.
<p align="center">
  <img src="demo/Dashboard%20Page%203.png" alt="Dashboard Page 3" width="90%">
</p>

---

### 10. Discover Books Page 1 (Curated Editorial Collections)
> Dynamic discovery hub with an animated 3D spiral slider, curated trending books, editorial highlights, and spotlight selections.
<p align="center">
  <img src="demo/Discover%20Books%20Page%201.png" alt="Discover Books Page 1" width="90%">
</p>

---

### 11. Trends & Reviews Page 1 (Sentiment Distribution & Rating Analytics)
> Big data analytics dashboard visualizing community rating distributions, sentiment metrics, reading velocity by category, and popular genres.
<p align="center">
  <img src="demo/Trends%20&%20Reviews%20Page%201.png" alt="Trends & Reviews Page 1" width="90%">
</p>

---

### 12. Trends & Reviews Page 2 (Community Reviews & Discussions)
> Reader community discussion feed, verified reader reviews, and sentiment-scored feedback on trending literary titles.
<p align="center">
  <img src="demo/Trends%20&%20Reviews%20Page%202.png" alt="Trends & Reviews Page 2" width="90%">
</p>

---

## 🧠 Machine Learning Architecture & Algorithm

### 1. Collaborative Filtering Formulation
Collaborative filtering assumes that users who agreed in the past will agree in the future. In this item-based model:
- Each book $B_i$ is represented as a high-dimensional vector $\mathbf{v}_i \in \mathbb{R}^M$ across all active users.
- The similarity between seed book $\mathbf{v}_{\text{seed}}$ and candidate book $\mathbf{v}_j$ is determined by finding the nearest vectors in the metric space.

### 2. Matrix Sparsity & Data Filtering Pipeline
Raw rating datasets have severe sparsity (>99.9%). To extract statistically significant signals:
1. **User Filtering Threshold**: Retain only active users who rated at least **200 books** ($R_{\text{user}} \ge 200$).
2. **Book Popularity Threshold**: Retain only books that received at least **50 ratings** from active users ($R_{\text{book}} \ge 50$).
3. **Pivot Table Construction**: Generates a compact $706 \times 888$ pivot matrix (`book_pivot.pkl`) where rows are books, columns are users, and values are rating scores $[1, 10]$ (with $0$ representing unrated).

### 3. Nearest Neighbors Model (`model.pkl`)
- **Estimator**: `sklearn.neighbors.NearestNeighbors(algorithm='brute', metric='euclidean')`
- **Distance Metric**: Euclidean Distance
  $$d(\mathbf{u}, \mathbf{v}) = \sqrt{\sum_{k=1}^{n} (u_k - v_k)^2}$$
- **Query Time**: $O(K \cdot N \cdot D)$ brute-force search over the 706 vectors, returning the top $k=6$ neighbors (index 0 is the seed itself, indices 1 to 5 are the recommended books).
- **Similarity Percentage Mapping**:
  $$\text{Similarity } (\%) = \max\left(60.0, \min\left(99.8, 100.0 - (d - 40.0) \times 1.5\right)\right)$$

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite, Tailwind CSS v4 |
| **Animation & Graphics** | Framer Motion, HTML5 Canvas Shaders, Liquid Chrome Effect, ASCII Shaders |
| **Icons & UI** | Lucide React, Glassmorphism design tokens |
| **Backend API** | Python 3, ThreadingHTTPServer, REST endpoints (`/api/books`, `/api/recommend`) |
| **Machine Learning** | scikit-learn (`NearestNeighbors`), NumPy, Pandas, Pickle |
| **Alternative UI** | Streamlit (`app.py`) |
| **Data Source** | Book-Crossing Dataset (Ratings, Users, Books) |

---

## 📂 Repository File Structure

```text
├── artifacts/
│   ├── book_names.pkl           # Serialized list of 706 supported book titles
│   ├── book_pivot.pkl           # 706 x 888 User-Item interaction matrix
│   ├── final_rating.pkl         # Merged and cleaned book rating records with image URLs
│   └── model.pkl                # Trained NearestNeighbors model
├── data/
│   ├── BX-Book-Ratings.csv      # Raw user-item rating logs
│   ├── BX-Books.csv             # Book metadata (ISBN, Title, Author, Year, Publisher, Covers)
│   └── BX-Users.csv             # User demographic profiles
├── demo/                        # 12 high-resolution application screenshots
│   ├── All Books Page 1.png
│   ├── All Books Page 2 .png
│   ├── All Books Page 2.png
│   ├── Books Recommendation Page 1.png
│   ├── Books Recommendation Page 2.png
│   ├── Books Recommendation Page 3.png
│   ├── Books Recommendation Page 4.png
│   ├── Dashboard Page 2.png
│   ├── Dashboard Page 3.png
│   ├── Discover Books Page 1.png
│   ├── Trends & Reviews Page 1.png
│   └── Trends & Reviews Page 2.png
├── frontend/                    # Modern React 19 + TypeScript + Vite web app
│   ├── src/
│   │   ├── components/          # Reusable UI (AsciiEffect, LiquidChrome, BookCover, etc.)
│   │   ├── pages/               # LandingPage, DashboardPage, DiscoverPage, RecommendPage, TrendsReviewsPage
│   │   ├── data/                # Precomputed recommendations & book catalog
│   │   ├── App.tsx              # Application layout & navigation controller
│   │   └── main.tsx             # Entrypoint
│   ├── package.json
│   └── vite.config.ts
├── api.py                       # Python REST backend server on port 5000
├── app.py                       # Streamlit interactive application
├── Books Recommender.ipynb      # Machine Learning training & data engineering notebook
├── requirements.txt             # Python dependencies
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Siddhesh-Achrekar/bda-project-106-122-bookmatch.git
cd bda-project-106-122-bookmatch
```

### 2. Python Environment Setup
```bash
# Create and activate a virtual environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Run the Python Backend API
```bash
python api.py
```
> The API server will listen on `http://127.0.0.1:5000` with the following endpoints:
> - `GET /api/books`: Returns all 706 book titles
> - `GET /api/recommend?book=1984`: Returns seed details and top 5 recommendations with similarity metrics
> - `GET /api/health`: Health status probe

### 4. Run the Modern React Frontend
In a separate terminal:
```bash
cd frontend
npm install
npm run dev
```
> Open your browser at `http://localhost:5173` to experience the complete modern web application.

### 5. (Optional) Run the Streamlit Application
```bash
streamlit run app.py
```

---

## 📊 Dataset & Credits

- **Dataset**: [Book Recommendation Dataset on Kaggle](https://www.kaggle.com/datasets/ra4u12/bookrecommendation) (Book-Crossing dataset by Cai-Nicolas Ziegler, Institut für Informatik, Universität Freiburg).
- **Course**: Big Data Analytics (BDA)
- **Project Title**: BookMatch (BDA Project 106–122)
