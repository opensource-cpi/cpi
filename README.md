# CPI Project README

https://opensourcecpi.com

## Objectives

- Show the price of **restaurant food** over time.
- Calculate CPI
- Predict food prices over time
- Compare food prices between states

## Prerequisite
- postgresql@17

## Data Pipeline

Source (website scraping, API) → Lambda → DataLake (Unstructured) → ETL Pipeline

1.  Pull HTML using Lambda
2.  BS4 to extract data

## AWS Resources

  - S3 (HTML) (7-day cold storage)
  - Lambda
  - Neon (SQL)
  - Vercel for frontend
