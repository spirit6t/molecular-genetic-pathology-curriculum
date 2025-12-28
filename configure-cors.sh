#!/bin/bash
# Script to configure CORS for Firebase Storage bucket

BUCKET_NAME="molecular-genetic-curriculum.firebasestorage.app"

echo "Configuring CORS for bucket: $BUCKET_NAME"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "Error: gcloud CLI is not installed."
    echo "Please install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Authenticate if needed
echo "Checking authentication..."
gcloud auth list

# Set project
echo "Setting project..."
gcloud config set project molecular-genetic-curriculum

# Configure CORS
echo "Setting CORS configuration..."
gcloud storage buckets update gs://$BUCKET_NAME --cors-file=cors.json

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ CORS configuration successful!"
    echo "Wait 1-2 minutes for changes to propagate."
else
    echo ""
    echo "❌ CORS configuration failed."
    echo "Trying alternative method with gsutil..."
    gsutil cors set cors.json gs://$BUCKET_NAME
fi

echo ""
echo "To verify, run:"
echo "  gcloud storage buckets describe gs://$BUCKET_NAME --format='value(cors)'"

