"""
app.py – Streamlit wrapper that serves the built React application.

Deployment steps:
  1. npm install
  2. npm run build          (creates ./dist/)
  3. streamlit run app.py
"""
import os
import streamlit as st
import streamlit.components.v1 as components

# ── Page config ─────────────────────────────────────────────────
st.set_page_config(
    page_title="Random Quote Generator",
    page_icon="📜",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# ── Hide Streamlit chrome so the React app fills the viewport ────
st.markdown(
    """
    <style>
      #MainMenu, header, footer { visibility: hidden; }
      .block-container { padding: 0 !important; max-width: 100% !important; }
      iframe { display: block; border: none; }
    </style>
    """,
    unsafe_allow_html=True,
)

# ── Load the built React app from ./dist/index.html ─────────────
DIST_DIR = os.path.join(os.path.dirname(__file__), "dist")
INDEX_HTML = os.path.join(DIST_DIR, "index.html")

if not os.path.exists(INDEX_HTML):
    st.error(
        "🚧 **Production build not found.**\n\n"
        "Please run the following commands first:\n\n"
        "```bash\n"
        "npm install\n"
        "npm run build\n"
        "```\n\n"
        "Then restart the Streamlit app."
    )
    st.stop()

# Read the built HTML and inline the base URL so assets resolve correctly
with open(INDEX_HTML, "r", encoding="utf-8") as f:
    html_content = f.read()

# Serve the React app inside a full-height iframe
components.html(html_content, height=900, scrolling=True)
