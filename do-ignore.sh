#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "staging" || "$VERCEL_GIT_COMMIT_REF" == "master" || "$VERCEL_ENV" == "production"  ]] ; then
  # Proceed with the build
    echo "✅ - Build can proceed"
    astro dev
  # Success build reguide
else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi