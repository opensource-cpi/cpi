# CPI Project README

## Main Objective

- Show the price of **restaurant food** over time.

## Tables

### `fct_food`

  - `food_id`
  - `food_name`
  - `restaurant`
  - `type` (enum)
      - `add_on`
      - `drink`
      - `side`
      - `entree`
      - `appetizer`
      - `dessert`
  - `url`
  - `element` (how it retrieves the value)
  - `state`
  - `ds`

### `hist_food_price`

  - `food id`
  - `price`
  - `price_ds` (for consumers \[when the price is\])
  - `ds` (for devs \[when we pull it\])

## Data Pipeline

Source (website scraping, API) → Lambda → DataLake (Unstructured) → ETL Pipeline

1.  Pull HTML using Lambda
2.  BS4 to extract data

## AWS Resources

  - S3 (HTML) (7-day cold storage)
  - Lambda
  - Neon (SQL)
  - Vercel for frontend
