import json
import random
import streamlit as st

# Load quotes data
with open('Harsh_quotes_app_quotes.json', 'r', encoding='utf-8') as f:
    quotes = json.load(f)

# Helper to get a random quote, avoiding immediate repeat
def get_random_quote(pool, previous_id=None):
    if not pool:
        return None
    if len(pool) == 1:
        return pool[0]
    nxt = random.choice(pool)
    while previous_id is not None and nxt['id'] == previous_id:
        nxt = random.choice(pool)
    return nxt

# Initialize session state
if 'current_quote' not in st.session_state:
    st.session_state.current_quote = get_random_quote(quotes)
if 'favorites' not in st.session_state:
    st.session_state.favorites = []
if 'category' not in st.session_state:
    st.session_state.category = 'All'
if 'search' not in st.session_state:
    st.session_state.search = ''

# UI layout
st.title('📜 Random Quote Generator')

# Controls
col1, col2 = st.columns(2)
with col1:
    categories = ['All'] + sorted({q['category'] for q in quotes})
    st.session_state.category = st.selectbox('Category', categories, index=categories.index(st.session_state.category))
with col2:
    st.session_state.search = st.text_input('Search (author or text)', st.session_state.search)

# Filter quotes based on controls
def filter_quotes():
    filtered = quotes
    if st.session_state.category != 'All':
        filtered = [q for q in filtered if q['category'] == st.session_state.category]
    term = st.session_state.search.strip().lower()
    if term:
        filtered = [q for q in filtered if term in q['text'].lower() or term in q['author'].lower()]
    return filtered

filtered_quotes = filter_quotes()

# Update current quote if the filter changed
if st.session_state.current_quote not in filtered_quotes:
    st.session_state.current_quote = get_random_quote(filtered_quotes)

# Quote display
if st.session_state.current_quote:
    q = st.session_state.current_quote
    st.markdown(f"### {q['text']}\n*— {q['author']}*  
**Category:** {q['category']}")
    # Favorite toggle
    fav = q['id'] in st.session_state.favorites
    if st.button('⭐ Remove from Favorites' if fav else '⭐ Add to Favorites'):
        if fav:
            st.session_state.favorites.remove(q['id'])
        else:
            st.session_state.favorites.append(q['id'])
else:
    st.info('No quotes match the current filters.')

# New quote button
if st.button('New Quote'):
    st.session_state.current_quote = get_random_quote(filtered_quotes, st.session_state.current_quote.get('id') if st.session_state.current_quote else None)

st.divider()
# Favorites panel
st.subheader('💖 Favorite Quotes')
if st.session_state.favorites:
    fav_quotes = [q for q in quotes if q['id'] in st.session_state.favorites]
    for fq in fav_quotes:
        st.markdown(f"- **{fq['text']}** — *{fq['author']}* (_{fq['category']}_) ")
else:
    st.info('No favorites yet. Click the star button on a quote to add it.')
