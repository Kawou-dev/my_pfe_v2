export async function POST(req) {
    const body = await req.json();
    const userMessage = body.message;
  
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'KawouBot',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',  // Utilise le modèle sans le préfixe 'openrouter/'
          messages: [
            { role: 'system', content: 'Tu es KawouBot, un assistant stylé et drôle.' },
            { role: 'user', content: userMessage },
          ],
        }),
      });
  
      // Vérifie le statut de la réponse
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur API:', errorData);
        return new Response(JSON.stringify({ error: 'Erreur API', details: errorData }), { status: 500 });
      }
  
      const data = await response.json();
  
      // Vérifie si les données sont valides
      if (!data.choices || !data.choices[0]?.message?.content) {
        console.error('Aucune réponse valide reçue:', data);
        return new Response(JSON.stringify({ error: 'Aucune réponse reçue de l’API', details: data }), { status: 500 });
      }
  
      return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (error) {
      console.error('Erreur serveur :', error);
      return new Response(JSON.stringify({ error: 'Erreur serveur interne' }), { status: 500 });
    }
  }
  
  
  // body: JSON.stringify({
  //   model: 'mistral/mistral-7b-instruct',  // modèle gratuit
  //   messages: [
  //     { role: 'system', content: 'Tu es KawouBot, un assistant stylé et drôle.' },
  //     { role: 'user', content: userMessage },
  //   ],
  // }),
  