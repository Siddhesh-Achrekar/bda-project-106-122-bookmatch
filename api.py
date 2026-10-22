"""
Backend API for Book Recommendation System
Implements the exact collaborative filtering logic from app.py
"""

import json
import pickle
import urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import numpy as np

print("Loading ML artifacts from artifacts/ ...")
model = pickle.load(open('artifacts/model.pkl', 'rb'))
book_names = pickle.load(open('artifacts/book_names.pkl', 'rb'))
final_rating = pickle.load(open('artifacts/final_rating.pkl', 'rb'))
book_pivot = pickle.load(open('artifacts/book_pivot.pkl', 'rb'))
print(f"Loaded {len(book_names)} books successfully.")

# Cache book info for fast lookups
book_info_cache = {}
unique_df = final_rating.drop_duplicates(subset=['title'])
for _, row in unique_df.iterrows():
    title = str(row['title'])
    isbn = str(row['ISBN']).strip()
    img_url = str(row['image_url']).replace('http://', 'https://')
    book_info_cache[title] = {
        'title': title,
        'author': str(row['author']),
        'year': int(row['year']) if str(row['year']).isdigit() else 2000,
        'publisher': str(row['publisher']),
        'image_url': img_url,
        'isbn': isbn,
        'open_library_url': f"https://covers.openlibrary.org/b/isbn/{isbn}-L.jpg"
    }

def recommend_book(book_name):
    """Exact logic from app.py"""
    if book_name not in book_pivot.index:
        # Case insensitive fallback
        matches = [idx for idx in book_pivot.index if idx.lower() == book_name.lower()]
        if matches:
            book_name = matches[0]
        else:
            raise ValueError(f"Book '{book_name}' not found in pivot table.")

    book_id = np.where(book_pivot.index == book_name)[0][0]
    distance, suggestion = model.kneighbors(
        book_pivot.iloc[book_id, :].values.reshape(1, -1),
        n_neighbors=6
    )

    recommended = []
    # suggestion[0] contains indices: index 0 is the seed book, 1..5 are recommendations
    for i in range(1, len(suggestion[0])):
        idx = suggestion[0][i]
        rec_title = book_pivot.index[idx]
        dist = float(distance[0][i])
        
        info = book_info_cache.get(rec_title, {
            'title': rec_title,
            'author': 'Unknown',
            'year': 2000,
            'publisher': '',
            'image_url': '',
            'isbn': '',
            'open_library_url': ''
        })

        # Calculate a normalized similarity score from distance
        # Euclidean distance in this space typically ranges from 40 to 60
        similarity = round(max(60.0, min(99.8, 100.0 - (dist - 40.0) * 1.5)), 1)

        recommended.append({
            'title': rec_title,
            'author': info['author'],
            'year': info['year'],
            'publisher': info['publisher'],
            'image_url': info['image_url'],
            'isbn': info['isbn'],
            'open_library_url': info['open_library_url'],
            'distance': round(dist, 3),
            'similarity': similarity
        })

    seed_info = book_info_cache.get(book_name, {
        'title': book_name,
        'author': '',
        'year': 2000,
        'publisher': '',
        'image_url': '',
        'isbn': ''
    })

    return {
        'seed_book': {
            'title': book_name,
            'author': seed_info['author'],
            'year': seed_info['year'],
            'image_url': seed_info['image_url'],
            'isbn': seed_info['isbn']
        },
        'recommendations': recommended
    }

class RequestHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        if path == '/api/books':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            titles = list(book_names)
            self.wfile.write(json.dumps(titles, ensure_ascii=False).encode('utf-8'))
            return

        elif path == '/api/recommend':
            book_param = query.get('book', [''])[0]
            if not book_param:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Missing book parameter'}).encode('utf-8'))
                return

            try:
                result = recommend_book(book_param)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps(result, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                self.send_response(404)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))
            return

        elif path == '/api/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ok', 'books_count': len(book_names)}).encode('utf-8'))
            return

        else:
            self.send_response(404)
            self.end_headers()

def run_server(port=5000):
    server = ThreadingHTTPServer(('127.0.0.1', port), RequestHandler)
    print(f"Book Recommendation API server listening on http://127.0.0.1:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

if __name__ == '__main__':
    run_server(5000)
