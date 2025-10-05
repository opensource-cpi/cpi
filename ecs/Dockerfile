# Use the official Selenium image with Chrome
FROM selenium/standalone-chrome:latest

# Install Python dependencies (if not already present)
USER root
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install selenium

# Copy your Selenium script and bash script
COPY script.py /app/script.py
COPY entrypoint.sh /app/entrypoint.sh
WORKDIR /app

# Assign permissions, start Selenium server in the background, and then run the script
RUN chmod +x /app/entrypoint.sh
CMD ["/app/entrypoint.sh"]