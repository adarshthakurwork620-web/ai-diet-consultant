import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_diet_plan(weight, goal):
    prompt = f"""
    Create a simple Indian diet plan for a person with:
    Weight: {weight} kg
    Goal: {goal}

    Include:
    - Breakfast
    - Lunch
    - Dinner
    - Snacks
    """

    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content