#!/usr/bin/env python3
"""
Quick installation script for Random Quote Generator
Installs all dependencies and builds the app
"""

import subprocess
import sys
import os
import platform

def run_command(cmd, description):
    """Run a shell command and report status"""
    print(f"\n{'='*60}")
    print(f"  {description}")
    print(f"{'='*60}\n")
    
    try:
        result = subprocess.run(cmd, shell=True, check=True)
        print(f"\n✅ {description} - SUCCESS\n")
        return True
    except subprocess.CalledProcessError as e:
        print(f"\n❌ {description} - FAILED\n")
        return False

def main():
    print("\n" + "="*60)
    print("  🚀 Random Quote Generator - Installation")
    print("="*60 + "\n")
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ is required")
        sys.exit(1)
    
    # Check Node.js
    try:
        subprocess.run("node --version", shell=True, check=True, capture_output=True)
    except subprocess.CalledProcessError:
        print("❌ Node.js is not installed. Please install Node.js v16+")
        sys.exit(1)
    
    print("✅ Python version:", sys.version.split()[0])
    node_version = subprocess.run("node --version", shell=True, capture_output=True, text=True).stdout.strip()
    print("✅ Node.js version:", node_version)
    print()
    
    # Install npm dependencies
    if not run_command("npm install", "📦 Installing Node.js dependencies"):
        sys.exit(1)
    
    # Build React app
    if not run_command("npm run build", "🏗️  Building React application"):
        sys.exit(1)
    
    # Install Python dependencies
    if not run_command("pip install -r requirements.txt", "🐍 Installing Python dependencies"):
        sys.exit(1)
    
    print("\n" + "="*60)
    print("  ✨ Installation Complete!")
    print("="*60 + "\n")
    print("🎯 To start the app, run:")
    print("   streamlit run app.py\n")
    print("📱 The app will open at: http://localhost:8501\n")

if __name__ == "__main__":
    main()
