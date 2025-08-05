const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!API_KEY) {
  console.error('OpenAI API key is not set. Please check your .env file');
  throw new Error('OpenAI API key is not configured');
}

interface Question {
  question: string;
  options: string[];
  answer: number;
}

export async function generateAIQuestions(topic: string, count: number = 10): Promise<Question[]> {
  console.log('Generating questions for topic:', topic);
  console.log('Using API key:', API_KEY ? '***' + API_KEY.slice(-4) : 'Not set');
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Generate ${count} multiple-choice questions about ${topic}. 
          Format each question as a JSON object with: 
          { "question": "...", "options": ["...", "...", "...", "..."], "answer": 0 } 
          where answer is the index of the correct option. Return only the JSON array.`
        }],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI API response:', data);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI API');
    }
    
    const content = data.choices[0].message.content;
    console.log('Raw content from OpenAI:', content);
    
    // Clean up the response to ensure it's valid JSON
    let jsonString = content.replace(/```json|```/g, '').trim();
    
    // Sometimes the response might have markdown code block indicators
    if (jsonString.startsWith('```') && jsonString.endsWith('```')) {
      jsonString = jsonString.slice(3, -3).trim();
    }
    
    console.log('Cleaned JSON string:', jsonString);
    
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        throw new Error('Expected an array of questions');
      }
      return parsed;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      console.error('Problematic content:', jsonString);
      throw new Error('Failed to parse questions from OpenAI response');
    }
  } catch (error) {
    console.error('Error generating questions:', error);
    throw error;
  }
}
