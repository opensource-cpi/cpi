from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--headless")  # Optional: Run without GUI
driver = webdriver.Remote(
    command_executor="http://localhost:4444/wd/hub",
    options=options
)

driver.get("https://www.apple.com")
print("======PAGE TITLE======")
print(driver.title)
print("======PAGE TITLE======")
driver.quit()