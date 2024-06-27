import json
from collections import Counter

def calculate_quote_percentages(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        quotes = json.load(file)
    
    name_counts = Counter(quote['name'] for quote in quotes)
    total_quotes = len(quotes)
    
    percentages = {name: (count / total_quotes) * 100 for name, count in name_counts.items()}
    
    return percentages

def main():
    filename = 'quotes.json'
    percentages = calculate_quote_percentages(filename)
    
    print("Quote Percentages by Person:")
    for name, percentage in percentages.items():
        print(f"{name}: {percentage:.2f}%")

if __name__ == "__main__":
    main()
