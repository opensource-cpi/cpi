#!/bin/bash
# Start the Selenium server in the background
/opt/bin/entry_point.sh &
# Store the PID of the Selenium server
SELENIUM_PID=$!

# Maximum time to wait for the server (in seconds)
MAX_WAIT=30
# Interval between checks (in seconds)
CHECK_INTERVAL=2
# Counter for elapsed time
ELAPSED=0

echo "Waiting for Selenium server to start..."

# Poll until the server is ready or timeout is reached
while [ $ELAPSED -lt $MAX_WAIT ]; do
    if curl --silent --fail http://localhost:4444/wd/hub/status > /dev/null; then
        echo "Selenium server is ready!"
        break
    fi
    echo "Selenium server not ready yet, waiting $CHECK_INTERVAL seconds..."
    sleep $CHECK_INTERVAL
    ELAPSED=$((ELAPSED + CHECK_INTERVAL))
done

# Check if the server started successfully
if [ $ELAPSED -ge $MAX_WAIT ]; then
    echo "Error: Selenium server did not start within $MAX_WAIT seconds."
    # Check if the Selenium process is still running
    if kill -0 $SELENIUM_PID 2>/dev/null; then
        echo "Selenium process (PID $SELENIUM_PID) is running but not responding."
    else
        echo "Selenium process (PID $SELENIUM_PID) has exited."
    fi
    exit 1
fi

# Run the Python script
echo "Starting Python script..."
exec python3 /app/script.py